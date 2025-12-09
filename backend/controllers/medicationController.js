import Medication from '../models/Medication.js';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { sendMedicationConfirmation } from '../utils/emailService.js';

// @desc    Get all medications for a user
// @route   GET /api/medications
// @access  Private
const getMedications = asyncHandler(async (req, res) => {
  const medications = await Medication.find({ user: req.user.id });

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

  res.status(200).json(filteredMeds);
});

// @desc    Create a new medication
// @route   POST /api/medications
// @access  Private
const createMedication = asyncHandler(async (req, res) => {
  const { name, dosage, frequency, times } = req.body;

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

  res.status(201).json(createdMedication);
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

  const dateToLog = new Date(timeTaken);
  medication.history.push({
    date: dateToLog,
    status: 'taken',
  });

  await medication.save();
  res.status(201).json({
    success: true,
    message: 'Dose logged successfully',
    medication,
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

        // Check if no "taken" entry exists for that time today
        const takenToday = med.history?.some((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entry.status === "taken" &&
            entryDate.getHours() === doseTime.getHours() &&
            entryDate.getDate() === now.getDate() &&
            entryDate.getMonth() === now.getMonth()
          );
        });

        if (doseTime < now && !takenToday) {
          // Log missed if not already
          med.history.push({ date: doseTime, status: "missed" });
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



export {
  getMedications,
  createMedication,
  updateMedication,
  deleteMedication,
  logDose,
  getAdherenceStats,
};