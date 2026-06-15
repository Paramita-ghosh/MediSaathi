import express from 'express';
import helmet from "helmet";
import dotenv from 'dotenv';

dotenv.config({ path: new URL('./.env', import.meta.url).pathname });

import cors from 'cors';
import cron from 'node-cron';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import Medication from './models/Medication.js';
import { sendReminderEmail } from './utils/emailService.js';





connectDB();


const app = express();


app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Alchemist\'s Grimoire API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/community", communityRoutes);

const normalizeTime = (timeString) => {
  if (!timeString) return null;
  const [hour, minute] = timeString.split(':').map((value) => parseInt(value, 10));
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

const scheduleMedicationReminders = () => {
  cron.schedule(
    '* * * * *',
    async () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

      try {
        const medications = await Medication.find({}).populate('user', 'name email');

        for (const medication of medications) {
          const hasDueTime = medication.times?.some(
            (timeString) => normalizeTime(timeString) === currentTime
          );

          if (!hasDueTime || !medication.user?.email) {
            continue;
          }

          const alreadyTaken = medication.history?.some((entry) => {
            const entryDate = new Date(entry.date);
            return (
              entry.status === 'taken' &&
              entryDate.getFullYear() === now.getFullYear() &&
              entryDate.getMonth() === now.getMonth() &&
              entryDate.getDate() === now.getDate() &&
              entryDate.getHours() === now.getHours() &&
              entryDate.getMinutes() === now.getMinutes()
            );
          });

          if (alreadyTaken) {
            continue;
          }

          await sendReminderEmail(
            medication.user.email,
            medication.user.name,
            medication.name,
            medication.dosage,
            currentTime
          );
        }
      } catch (error) {
        console.error('Medication reminder cron job error:', error);
      }
    },
    {
      scheduled: true,
      timezone: process.env.CRON_TIMEZONE || 'Asia/Kolkata',
    }
  );
};

scheduleMedicationReminders();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
