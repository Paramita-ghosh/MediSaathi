import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import { FaTrash, FaPencilAlt, FaPlus, FaClock } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // No longer needed
// import { FiArrowLeft } from 'react-icons/fi'; // No longer needed

const SchedulePage = () => {
    const { api } = useContext(AuthContext);
    const [medications, setMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [frequency, setFrequency] = useState('Daily');
    const [times, setTimes] = useState(['09:00']);

    const fetchMedications = async () => {
        try {
            const { data } = await api.get('/api/medications');
            setMedications(data);
        } catch (error) {
            toast.error("Could not fetch medications.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMedications();
    }, []);
    
    const handleAddTime = () => {
        setTimes([...times, '12:00']);
    };
    
    const handleTimeChange = (index, value) => {
        const newTimes = [...times];
        newTimes[index] = value;
        setTimes(newTimes);
    };

    const handleRemoveTime = (index) => {
        const newTimes = times.filter((_, i) => i !== index);
        setTimes(newTimes);
    }
    
    const resetForm = () => {
        setName('');
        setDosage('');
        setFrequency('Daily');
        setTimes(['09:00']);
        setShowForm(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/medications', { name, dosage, frequency, times });
            toast.success(`${name} added to your schedule!`);
            resetForm();
            fetchMedications();
        } catch (error) {
            toast.error('Failed to add medication.');
        }
    }
    
    const handleDelete = async (id) => {
        // A simple confirmation before deleting.
        if (window.confirm('Are you sure you want to remove this from your schedule?')) {
            try {
                await api.delete(`/api/medications/${id}`);
                toast.success('Medication removed.');
                fetchMedications();
            } catch (error) {
                toast.error('Failed to remove medication.');
            }
        }
    }

    return (
  <div className="relative min-h-screen bg-linear-to-br from-[#0b0b12] via-[#141422] to-[#1c1c2e] overflow-hidden p-4 sm:p-6 lg:p-8">
    {/* ✨ Floating Glows */}
    <motion.div
      className="absolute w-140 h-140 bg-purple-700/20 rounded-full blur-3xl -top-32 -left-32"
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-120 h-120 bg-indigo-700/20 rounded-full blur-3xl bottom-0 right-0"
      animate={{ scale: [1.1, 1, 1.1], opacity: [0.7, 0.9, 0.7] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.05),transparent_60%)] pointer-events-none" />

    {/* 🌟 Main content */}
    <div className="relative max-w-4xl mx-auto z-10 text-gray-200">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-6"
      >
        <motion.h1
          animate={{
            textShadow: [
              "0 0 5px #b794f4",
              "0 0 10px #f472b6",
              "0 0 15px #c084fc",
              "0 0 10px #f472b6",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-4xl font-serif font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-400 via-pink-400 to-indigo-400 drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]"
        >
          Elixir Chronicle
        </motion.h1>

        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-linear-to-r from-purple-600 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-purple-800/30 transition-all duration-300 flex items-center gap-2"
          >
            <FaPlus /> Brew New Potion
          </motion.button>
        )}
      </motion.div>

      <p className="text-gray-400 italic mb-6 text-center">
        “Record your arcane brews and their celestial timings.”
      </p>

      {/* 🧙 Original code begins below - unchanged */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1f1f2e]/80 backdrop-blur-lg p-6 rounded-2xl border border-[#2a2a40] shadow-[0_0_25px_rgba(147,112,219,0.3)] mb-8 overflow-hidden"
          >
            <h2 className="text-xl font-serif mb-4 text-purple-300">Add a New Potion</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* your original form content stays the same */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Elixir Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="input-style"
                    placeholder="e.g., Felix Felicis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Dosage Strength</label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={e => setDosage(e.target.value)}
                    required
                    className="input-style"
                    placeholder="e.g., 1 vial or 50mg"
                  />
                </div>
              </div>
              {/* Rest of your form stays unchanged */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Frequency of Ritual</label>
                <select value={frequency} onChange={e => setFrequency(e.target.value)} className="input-style">
                  <option>Daily</option>
                  <option>Once in two days</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Chrono Points</label>
                {times.map((time, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input type="time" value={time} onChange={e => handleTimeChange(index, e.target.value)} className="input-style" />
                    {times.length > 1 && (
                      <button type="button" onClick={() => handleRemoveTime(index)} className="text-red-500 hover:text-red-400">
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddTime}
                  className="text-accent text-sm flex items-center gap-2 hover:underline"
                >
                  <FaPlus /> Add another time
                </button>
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-border-color text-text-primary py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-linear-to-r from-purple-600 to-indigo-500 text-white py-2 px-4 rounded-lg shadow-md shadow-indigo-700/30 hover:from-purple-500 hover:to-indigo-400 transition-colors"
                >
                  Save Potion
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List area unchanged */}
      <div className="space-y-4">
        {isLoading ? (
          <p className="text-text-secondary">Summoning your potion records...</p>
        ) : (
          medications.map((med, index) => (
            <motion.div
              key={med._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1f1f2e]/80 backdrop-blur-lg p-4 rounded-2xl border border-[#2a2a40] shadow-[0_0_25px_rgba(120,81,169,0.3)] flex justify-between items-start"
            >
              <div>
                <p className="text-lg font-bold text-purple-200">{med.name}</p>
                <p className="text-text-secondary">{med.dosage} - {med.frequency}</p>
                <div className="flex items-center gap-2 mt-2 text-indigo-300">
                  <FaClock />
                  <span className="text-sm text-text-secondary">{med.times.join(', ')}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleDelete(med._id)} className="text-text-secondary hover:text-red-500 transition-colors" aria-label="Delete">
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))
        )}
        {!isLoading && medications.length === 0 && !showForm && (
          <div className="text-center py-10 bg-[#1f1f2e]/70 rounded-2xl border border-dashed border-[#2a2a40] shadow-inner">
            <p className="text-gray-400">Your Grimoire is empty.</p>
            <p className="text-gray-500 mt-1">Add your first elixir to start your arcane routine.</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default SchedulePage;

