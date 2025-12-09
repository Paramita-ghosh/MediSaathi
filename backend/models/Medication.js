import mongoose from 'mongoose';

const medicationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String, // e.g., 'Daily', 'Once in two days'
      required: true,
    },
    times: [
      {
        type: String, // e.g., '09:00', '21:00'
      },
    ],
    history: [
      {
        date: { type: Date },
        status: { type: String, enum: ['taken', 'missed', 'scheduled'], default: 'scheduled' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;