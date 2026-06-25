import Medication from '../models/Medication.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { sendMedicationConfirmation } from '../utils/emailService.js';
import { getDoctorSuggestionsForMedication } from '../utils/doctorSuggestionService.js';

const MISSED_GRACE_PERIOD_MINUTES = 10;


const getMedications = asyncHandler(async (req, res) => {
  const medications = await Medication.find({ user: req.user.id }).sort({ createdAt: -1 });

  // Get today’s start and end time
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(todayStart.getDate() + 1);

  // Filter out medications already logged as taken today
  const filteredMeds = medications.filter((med) => {
    if (!med.history || med.history.length === 0) return true;

    // Check if there’s a "taken" entry within today
    const takenToday = med.history.some((entry) => {
      const date = new Date(entry.date);
      return (
        entry.status === "taken" &&
        date >= todayStart &&
        date < tomorrowStart
      );
    });

    return !takenToday; // show only if NOT taken today
  });

  res.status(200).json(medications);
});

// @desc    Create a new medication
// @route   POST /api/medications
// @access  Private
const createMedication = asyncHandler(async (req, res) => {
  const { name, dosage, frequency, times, latitude, longitude } = req.body;

  if (!name || !dosage || !frequency || !times) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const medication = new Medication({
    user: req.user.id,
    name,
    dosage,
    frequency,
    times,
    adherence: [],
  });

  const createdMedication = await medication.save();

  sendMedicationConfirmation(user.email, user.name, createdMedication).catch((err) => {
    console.error('Failed to send email in background:', err);
  });

  const response = createdMedication.toObject();

  try {
    response.doctorSuggestion = await getDoctorSuggestionsForMedication({
      medicineName: name,
      latitude,
      longitude,
    });
    createdMedication.doctorSuggestion = response.doctorSuggestion;
    await createdMedication.save();
  } catch (error) {
    console.error('Failed to create doctor suggestion:', error);
  }

  res.status(201).json(response);
});

// @desc    Update a medication
// @route   PUT /api/medications/:id
// @access  Private
const updateMedication = asyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);

  if (!medication) {
    res.status(404);
    throw new Error('Medication not found');
  }

  if (medication.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this medication');
  }

  const updatedMedication = await Medication.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedMedication);
});

// @desc    Delete a medication
// @route   DELETE /api/medications/:id
// @access  Private
const deleteMedication = asyncHandler(async (req, res) => {
  const medication = await Medication.findById(req.params.id);

  if (!medication) {
    res.status(404);
    throw new Error('Medication not found');
  }

  if (medication.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to delete this medication');
  }

  await Medication.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id, message: 'Medication removed' });
});

// @desc    Log a dose as taken
// @route   POST /api/medications/:id/log
// @access  Private
const logDose = asyncHandler(async (req, res) => {
  const timeTaken = req.body.timeTaken || req.body.date || new Date();
  const medication = await Medication.findById(req.params.id);

  if (!medication) {
    res.status(404);
    throw new Error('Medication not found');
  }

  if (medication.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to log dose');
  }

  if (!Array.isArray(medication.history)) {
    medication.history = [];
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const dateToLog = new Date(timeTaken);
  medication.history.push({
    date: dateToLog,
    status: 'taken',
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDose = user.lastDoseLoggedAt ? new Date(user.lastDoseLoggedAt) : null;
  const wasLoggedToday = lastDose && lastDose.toDateString() === new Date().toDateString();
  let streakUpdated = user.currentStreak || 0;

  if (!wasLoggedToday) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastDose && lastDose.toDateString() === yesterday.toDateString()) {
      streakUpdated = (user.currentStreak || 0) + 1;
    } else {
      streakUpdated = 1;
    }

    user.currentStreak = streakUpdated;
    user.lastDoseLoggedAt = dateToLog;
  }

  if (!Array.isArray(user.badges)) {
    user.badges = [];
  }

  const awardedBadges = [];
  if (!user.badges.includes('Bronze Dose')) {
    user.badges.push('Bronze Dose');
    awardedBadges.push('Bronze Dose');
  }

  if (streakUpdated >= 3 && !user.badges.includes('3-Day Streak')) {
    user.badges.push('3-Day Streak');
    awardedBadges.push('3-Day Streak');
  }

  if (streakUpdated >= 7 && !user.badges.includes('7-Day Guardian')) {
    user.badges.push('7-Day Guardian');
    awardedBadges.push('7-Day Guardian');
  }

  await Promise.all([medication.save(), user.save()]);

  res.status(201).json({
    success: true,
    message: 'Dose logged successfully',
    medication,
    currentStreak: user.currentStreak,
    badges: user.badges,
    awardedBadges,
  });
});

// @desc    Get all medications with full adherence history
// @route   GET /api/medications/adherence
// @access  Private
const getAdherenceStats = asyncHandler(async (req, res) => {
  const medications = await Medication.find({ user: req.user.id });

  let taken = 0;
  let missed = 0;

  const now = new Date();

  medications.forEach((med) => {
    // For each scheduled time in `med.times`, check if missed
    if (med.times && med.times.length > 0) {
      med.times.forEach((time) => {
        const [hour, minute] = time.split(':').map(Number);
        const doseTime = new Date();
        doseTime.setHours(hour, minute, 0, 0);
        const missedAfter = new Date(
          doseTime.getTime() + MISSED_GRACE_PERIOD_MINUTES * 60 * 1000
        );

        // Allow the user ten minutes after the scheduled time to log the dose.
        const takenToday = med.history?.some((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entry.status === "taken" &&
            entryDate.getFullYear() === doseTime.getFullYear() &&
            entryDate.getMonth() === doseTime.getMonth() &&
            entryDate.getDate() === doseTime.getDate() &&
            (
              entryDate.getHours() === doseTime.getHours() ||
              (entryDate >= doseTime && entryDate <= missedAfter)
            )
          );
        });

        if (now >= missedAfter && !takenToday) {
          const missedAlready = med.history?.some((entry) => {
            const entryDate = new Date(entry.date);
            return (
              entry.status === 'missed' &&
              entryDate.getHours() === doseTime.getHours() &&
              entryDate.getMinutes() === doseTime.getMinutes() &&
              entryDate.getDate() === doseTime.getDate() &&
              entryDate.getMonth() === doseTime.getMonth() &&
              entryDate.getFullYear() === doseTime.getFullYear()
            );
          });

          if (!missedAlready) {
            med.history.push({ date: doseTime, status: 'missed' });
          }
        }
      });
    }

    // Count totals
    med.history?.forEach((entry) => {
      if (entry.status === "taken") taken++;
      else if (entry.status === "missed") missed++;
    });
  });

  await Promise.all(medications.map((m) => m.save()));

  const total = taken + missed;
  const adherenceRate = total > 0 ? Math.round((taken / total) * 100) : 0;

  res.status(200).json({ taken, missed, adherenceRate, medications });
});

// @desc    Suggest doctor specialty and nearby doctors for a medicine
// @route   POST /api/medications/doctor-suggestions
// @access  Private
const suggestDoctors = asyncHandler(async (req, res) => {
  const { medicineName, latitude, longitude } = req.body;

  if (!medicineName) {
    res.status(400);
    throw new Error('Medicine name is required');
  }

  const suggestion = await getDoctorSuggestionsForMedication({
    medicineName,
    latitude,
    longitude,
  });

  res.status(200).json(suggestion);
});



export {
  getMedications,
  createMedication,
  updateMedication,
  deleteMedication,
  logDose,
  getAdherenceStats,
  suggestDoctors,
};
