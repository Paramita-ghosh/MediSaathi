// import express from 'express';
// import { generateChatResponse } from '../controllers/chatController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/generate', protect, generateChatResponse);

// export default router;


import express from "express";
import { generateChatResponse } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

// Use only one auth middleware to avoid double auth conflicts
router.post("/generate", generateChatResponse);

export default router;
