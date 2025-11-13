// import Medication from '../models/Medication.js';

// // @desc    Add new medication
// // @route   POST /api/medications
// // @access  Private
// const addMedication = async (req, res) => {
//   const { name, dosage, frequency, times } = req.body;

//   const medication = new Medication({
//     user: req.user._id,
//     name,
//     dosage,
//     frequency,
//     times,
//     history: [], // Initialize history
//   });

//   const createdMedication = await medication.save();
//   res.status(201).json(createdMedication);
// };

// // @desc    Get user's medications
// // @route   GET /api/medications
// // @access  Private
// const getMedications = async (req, res) => {
//   const medications = await Medication.find({ user: req.user._id });
//   res.json(medications);
// };

// // @desc    Get medication by ID
// // @route   GET /api/medications/:id
// // @access  Private
// const getMedicationById = async (req, res) => {
//   const medication = await Medication.findById(req.params.id);

//   if (medication) {
//     res.json(medication);
//   } else {
//     res.status(404).json({ message: 'Medication not found' });
//   }
// };

// // @desc    Update medication
// // @route   PUT /api/medications/:id
// // @access  Private
// const updateMedication = async (req, res) => {
//   const { name, dosage, frequency, times } = req.body;
//   const medication = await Medication.findById(req.params.id);

//   if (medication) {
//     medication.name = name;
//     medication.dosage = dosage;
//     medication.frequency = frequency;
//     medication.times = times;

//     const updatedMedication = await medication.save();
//     res.json(updatedMedication);
//   } else {
//     res.status(404).json({ message: 'Medication not found' });
//   }
// };

// // @desc    Delete medication
// // @route   DELETE /api/medications/:id
// // @access  Private
// const deleteMedication = async (req, res) => {
//     const medication = await Medication.findById(req.params.id);

//     if (medication) {
//         await medication.deleteOne();
//         res.json({ message: 'Medication removed' });
//     } else {
//         res.status(404).json({ message: 'Medication not found' });
//     }
// };


// // @desc    Log a dose as taken
// // @route   POST /api/medications/:id/log
// // @access  Private
// const logDose = async (req, res) => {
//     const { date, status } = req.body;
//     const medication = await Medication.findById(req.params.id);

//     if (medication) {
//         // Simple logic: add a new log entry.
//         // A real app would have more complex logic to update scheduled doses.
//         medication.history.push({ date: new Date(date), status });
//         await medication.save();
//         res.status(201).json({ message: 'Dose logged' });
//     } else {
//         res.status(404).json({ message: 'Medication not found' });
//     }
// };


// export {
//   addMedication,
//   getMedications,
//   getMedicationById,
//   updateMedication,
//   deleteMedication,
//   logDose,
// };


// import Medication from '../models/Medication.js'; // PREFINAL WALA
// import User from '../models/User.js';
// import asyncHandler from 'express-async-handler';
// import { sendMedicationConfirmation } from '../utils/emailService.js';

// // @desc    Get all medications for a user
// // @route   GET /api/medications
// // @access  Private
// const getMedications = asyncHandler(async (req, res) => {
//   // req.user.id is available from the 'protect' middleware
//   const medications = await Medication.find({ user: req.user.id });
//   res.status(200).json(medications);
// });

// // @desc    Create a new medication
// // @route   POST /api/medications
// // @access  Private
// const createMedication = asyncHandler(async (req, res) => {
//   const { name, dosage, frequency, times } = req.body;

//   if (!name || !dosage || !frequency || !times) {
//     res.status(400);
//     throw new Error('Please fill in all fields');
//   }

//   // Get the user to access their email and name
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   const medication = new Medication({
//     user: req.user.id,
//     name,
//     dosage,
//     frequency,
//     times,
//     adherence: [], // Initialize adherence tracking
//   });

//   const createdMedication = await medication.save();

//   // Send email notification (we don't need to wait for it)
//   sendMedicationConfirmation(user.email, user.name, createdMedication).catch(
//     (err) => {
//       console.error('Failed to send email in background:', err);
//     }
//   );

//   res.status(201).json(createdMedication);
// });

// // @desc    Update a medication
// // @route   PUT /api/medications/:id
// // @access  Private
// const updateMedication = asyncHandler(async (req, res) => {
//   const medication = await Medication.findById(req.params.id);

//   if (!medication) {
//     res.status(404);
//     throw new Error('Medication not found');
//   }

//   // Check if user owns this medication
//   if (medication.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error('Not authorized to update this medication');
//   }

//   const updatedMedication = await Medication.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true } // Return the modified document
//   );

//   res.status(200).json(updatedMedication);
// });

// // @desc    Delete a medication
// // @route   DELETE /api/medications/:id
// // @access  Private
// const deleteMedication = asyncHandler(async (req, res) => {
//   const medication = await Medication.findById(req.params.id);

//   if (!medication) {
//     res.status(404);
//     throw new Error('Medication not found');
//   }

//   // Check if user owns this medication
//   if (medication.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error('Not authorized to delete this medication');
//   }

//   await Medication.deleteOne({ _id: req.params.id });

//   res.status(200).json({ id: req.params.id, message: 'Medication removed' });
// });

// // @desc    Log a dose as taken
// // @route   POST /api/medications/:id/log
// // @access  Private
// // @desc    Log a dose as taken
// // @route   POST /api/medications/:id/log
// // @access  Private
// const logDose = asyncHandler(async (req, res) => {
//   const timeTaken = req.body.timeTaken || req.body.date || new Date();
//   const medication = await Medication.findById(req.params.id);

//   if (!medication) {
//     res.status(404);
//     throw new Error('Medication not found');
//   }

//   if (medication.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error('Not authorized to log dose');
//   }

//   // Ensure history array exists
//   if (!Array.isArray(medication.history)) {
//     medication.history = [];
//   }

//   // Use current time if not provided
//   const dateToLog = timeTaken ? new Date(timeTaken) : new Date();

//   // Push new log
//   medication.history.push({
//     date: dateToLog,
//     status: 'taken',
//   });

//   await medication.save();
//   res.status(201).json({ success: true, message: 'Dose logged successfully', medication });
// });



// export {
//   getMedications,
//   createMedication,
//   updateMedication,
//   deleteMedication,
//   logDose,
// };


// import asyncHandler from 'express-async-handler';
// import Medication from '../models/Medication.js';
// import User from '../models/User.js'; // Import User model
// import { sendConfirmationEmail } from '../utils/emailService.js'; // Import email service
// import { createCalendarEvent } from '../utils/googleCalendarService.js'; // Import calendar service

// // @desc    Create a new medication
// // @route   POST /api/medications
// // @access  Private
// const createMedication = asyncHandler(async (req, res) => {
//   const { name, dosage, frequency, times } = req.body;

//   if (!times || times.length === 0) {
//     res.status(400);
//     throw new Error('At least one time is required');
//   }

//   const medication = new Medication({
//     user: req.user._id,
//     name,
//     dosage,
//     frequency,
//     times,
//   });

//   const createdMedication = await medication.save();

//   // After saving, find the user to get their details
//   const user = await User.findById(req.user._id);

//   if (user) {
//     // --- Send Email Confirmation (Existing Feature) ---
//     try {
//       await sendConfirmationEmail(user.email, user.name, createdMedication);
//       console.log('Confirmation email sent successfully.');
//     } catch (emailError) {
//       console.error('Failed to send confirmation email:', emailError);
//       // We don't stop the request for this, just log the error
//     }

//     // --- Create Google Calendar Event (New Feature) ---
//     // Check if the user has a refresh token
//     if (user.googleRefreshToken) {
//       try {
//         await createCalendarEvent(
//           user.googleRefreshToken,
//           createdMedication
//         );
//         console.log('Google Calendar event creation initiated.');
//       } catch (calendarError) {
//         console.error('Failed to create calendar event:', calendarError);
//         // Also don't stop the request, just log it
//       }
//     } else {
//       console.log('User has not connected Google Calendar, skipping sync.');
//     }
//   }

//   res.status(201).json(createdMedication);
// });

// // @desc    Get logged in user's medications
// // @route   GET /api/medications
// // @access  Private
// const getUserMedications = asyncHandler(async (req, res) => {
//   const medications = await Medication.find({ user: req.user._id });
//   res.json(medications);
// });

// // @desc    Get medication by ID
// // @route   GET /api/medications/:id
// // @access  Private
// const getMedicationById = asyncHandler(async (req, res) => {
//   const medication = await Medication.findById(req.params.id);

//   if (medication) {
//     // Check if the medication belongs to the logged-in user
//     if (medication.user.toString() !== req.user._id.toString()) {
//       res.status(401);
//       throw new Error('Not authorized to view this medication');
//     }
//     res.json(medication);
//   } else {
//     res.status(404);
//     throw new Error('Medication not found');
//   }
// });

// // @desc    Update a medication
// // @route   PUT /api/medications/:id
// // @access  Private
// const updateMedication = asyncHandler(async (req, res) => {
//   const { name, dosage, frequency, times } = req.body;

//   const medication = await Medication.findById(req.params.id);

//   if (!medication) {
//     res.status(404);
//     throw new Error('Medication not found');
//   }

//   // Check if the medication belongs to the logged-in user
//   if (medication.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error('Not authorized to update this medication');
//   }

//   medication.name = name || medication.name;
//   medication.dosage = dosage || medication.dosage;
//   medication.frequency = frequency || medication.frequency;
//   medication.times = times || medication.times;

//   const updatedMedication = await medication.save();
//   res.json(updatedMedication);
// });

// // @desc    Delete a medication
// // @route   DELETE /api/medications/:id
// // @access  Private
// const deleteMedication = asyncHandler(async (req, res) => {
//   const medication = await Medication.findById(req.params.id);

//   if (!medication) {
//     res.status(404);
//     throw new Error('Medication not found');
//   }

//   // Check if the medication belongs to the logged-in user
//   if (medication.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error('Not authorized to delete this medication');
//   }

//   await medication.deleteOne();
//   res.json({ message: 'Medication removed' });
// });

// export {
//   createMedication,
//   getUserMedications,
//   getMedicationById,
//   updateMedication,
//   deleteMedication,
// };


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

