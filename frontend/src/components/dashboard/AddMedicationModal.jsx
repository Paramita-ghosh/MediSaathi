import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pill, Clock, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddMedicationModal = ({ token, onClose, onMedicationAdded }) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [times, setTimes] = useState(['10:00']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Adding your potion...');

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const medicationData = {
        name,
        dosage,
        frequency,
        times: times.filter(t => t), // Send only non-empty times
      };

      const { data } = await axios.post('/api/medications', medicationData, config);
      
      toast.success('New potion added!', { id: toastId });
      onMedicationAdded(data); // Update the dashboard list
      onClose(); // Close the modal

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add medication.', { id: toastId });
    }
  };

  // Helper to add a new time slot
  const addTimeSlot = () => {
    setTimes([...times, '']);
  };

  // Helper to update a specific time slot
  const handleTimeChange = (index, value) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 50, scale: 0.95 }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex justify-center items-center"
        onClick={onClose} // Close on backdrop click
      >
      </motion.div>

      <motion.div
        key="modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex justify-center items-center p-4"
      >
        <div 
          className="bg-secondary w-full max-w-lg rounded-xl shadow-2xl border border-border-color"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <div className="flex justify-between items-center p-4 border-b border-border-color">
            <h3 className="text-xl font-serif font-bold text-text-primary">Add a New Potion</h3>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div className="relative">
              <Pill className="absolute top-1/2 -translate-y-1/2 left-3 text-text-secondary" />
              <input
                type="text"
                placeholder="Potion Name (e.g., 'Paracetamol')"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-primary border border-border-color text-text-primary rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Dosage */}
            <div className="relative">
              <Pill className="absolute top-1/2 -translate-y-1/2 left-3 text-text-secondary" />
              <input
                type="text"
                placeholder="Dosage (e.g., '500mg')"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full bg-primary border border-border-color text-text-primary rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Frequency */}
            <div className="relative">
              <Calendar className="absolute top-1/2 -translate-y-1/2 left-3 text-text-secondary" />
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-primary border border-border-color text-text-primary rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent appearance-none"
                required
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="alternate-days">On Alternate Days</option>
                <option value="as-needed">As Needed</option>
              </select>
            </div>

            {/* Times */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Dose Times</label>
              {times.map((time, index) => (
                <div key={index} className="relative">
                  <Clock className="absolute top-1/2 -translate-y-1/2 left-3 text-text-secondary" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    className="w-full bg-primary border border-border-color text-text-primary rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addTimeSlot}
                className="text-sm text-accent hover:underline"
              >
                + Add another time
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300"
            >
              Add Potion to Grimoire
            </motion.button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddMedicationModal;
