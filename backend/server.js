import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import communityRoutes from './routes/communityRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();


const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,               // allow sending cookies / headers
  })
);
app.use(express.json());

// API Routes
app.get('/', (req, res) => {
  res.send('Alchemist\'s Grimoire API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/community", communityRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


