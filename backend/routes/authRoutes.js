import express from 'express';
import {
  registerUser,
  verifyRegistration,
  authUser,
  getUserProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-registration', verifyRegistration);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);

export default router;
