// import express from 'express';
// import {
//   getMedications,
//   createMedication, // <-- This was the fix (changed from addMedication)
//   updateMedication,
//   deleteMedication,
//   logDose,
// } from '../controllers/medicationController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.route('/').post(protect, addMedication).get(protect, getMedications);
// router.route('/:id')
//   .get(protect, getMedicationById)
//   .put(protect, updateMedication)
//   .delete(protect, deleteMedication);
// router.post('/:id/log', protect, logDose);


// export default router;


import express from 'express';
const router = express.Router();
import {
  getMedications,
  createMedication, // <-- This was the fix (changed from addMedication)
  updateMedication,
  deleteMedication,
  logDose,
  getAdherenceStats,
} from '../controllers/medicationController.js';
import { protect } from '../middleware/authMiddleware.js';

// /api/medications
router
  .route('/')
  .get(protect, getMedications)
  .post(protect, createMedication); // <-- And here

// /api/medications/:id
router
  .route('/:id')
  .put(protect, updateMedication)
  .delete(protect, deleteMedication);

// /api/medications/:id/log
router.route('/:id/log').post(protect, logDose);

router.route('/adherence').get(protect, getAdherenceStats);

export default router;

// import express from 'express';
// const router = express.Router();
// import { protect } from '../middleware/authMiddleware.js';
// import {
//   createMedication,
//   getUserMedications, // <-- Fixed from getMedications
//   updateMedication,
//   deleteMedication,
// } from '../controllers/medicationController.js';

// // @route   /api/medications
// router
//   .route('/')
//   .post(protect, createMedication)
//   .get(protect, getUserMedications); // <-- Fixed from getMedications

// // @route   /api/medications/:id
// router
//   .route('/:id')
//   .put(protect, updateMedication)
//   .delete(protect, deleteMedication);

// export default router;