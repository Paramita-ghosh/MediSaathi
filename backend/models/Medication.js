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
      type: String, 
      required: true,
    },
    times: [
      {
        type: String, 
      },
    ],
    history: [
      {
        date: { type: Date },
        status: { type: String, enum: ['taken', 'missed', 'scheduled'], default: 'scheduled' },
      },
    ],
    doctorSuggestion: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;
