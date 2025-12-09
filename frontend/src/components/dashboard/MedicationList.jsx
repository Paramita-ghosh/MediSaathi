// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaPlus } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { GiPotionBall } from 'react-icons/gi';
// import toast from 'react-hot-toast';

// const MedicationList = ({ medications, isLoading, api, refetch }) => {
//   const handleTakeDose = async (medId) => {
//     try {
//       await api.post(`/api/medications/${medId}/log`, {
//         date: new Date().toISOString(),
//         status: 'taken',
//       });
//       toast.success('Dose logged!');
//       refetch(); // Refetch data to update adherence chart
//     } catch (error) {
//       toast.error('Failed to log dose.');
//     }
//   };
  
//   const today = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

//   // Find medications that have scheduled times for today and are upcoming
//   const upcomingMedications = medications
//     .filter(med => med.times.some(time => time >= today))
//     .sort((a, b) => a.times.find(time => time >= today) > b.times.find(time => time >= today) ? 1 : -1);

//   if (isLoading) {
//     return <div className="text-text-secondary text-center py-4">Loading potions...</div>;
//   }
  
//   return (
//     <div className="space-y-4">
//       {upcomingMedications.length > 0 ? (
//         upcomingMedications.map((med, index) => (
//           <motion.div
//             key={med._id}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className="bg-primary p-4 rounded-lg flex justify-between items-center border border-border-color"
//           >
//             <div className="flex items-center gap-4">
//               <GiPotionBall className="text-accent text-3xl" />
//               <div>
//                 <p className="font-bold text-text-primary">{med.name} ({med.dosage})</p>
//                 <p className="text-sm text-text-secondary">Next dose at {med.times.find(time => time >= today)}</p>
//               </div>
//             </div>
//             <motion.button 
//               onClick={() => handleTakeDose(med._id)}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors"
//             >
//               Take
//             </motion.button>
//           </motion.div>
//         ))
//       ) : (
//         <div className="text-center text-text-secondary py-8">
//             <p>No upcoming medications for today.</p>
//             <p>Your grimoire is clear.</p>
//         </div>
//       )}
//       <Link to="/schedule">
//         <button className="mt-4 w-full flex items-center justify-center gap-2 bg-secondary text-text-primary px-4 py-3 rounded-lg hover:bg-border-color transition-colors border border-dashed border-border-color">
//             <FaPlus />
//             Manage Medication Schedule
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default MedicationList;


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Pill, Trash2, Edit, ChevronDown, ChevronUp, Clock, AlertCircle } from 'lucide-react';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// // A single medication item
// const MedicationItem = ({ med, onDeleted, onUpdated, token, isExpanded, onToggle }) => {
  
//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete this medication?')) return;
    
//     const toastId = toast.loading('Deleting potion...');
//     try {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.delete(`/api/medications/${med._id}`, config);
//       toast.success('Potion deleted!', { id: toastId });
//       onDeleted(med._id);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to delete.', { id: toastId });
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: -50 }}
//       className="bg-secondary rounded-lg border border-border-color shadow-md"
//     >
//       <div 
//         className="flex items-center justify-between p-4 cursor-pointer"
//         onClick={() => onToggle(med._id)}
//       >
//         <div className="flex items-center space-x-3">
//           <Pill className="w-5 h-5 text-accent" />
//           <span className="font-semibold text-text-primary">{med.name}</span>
//           <span className="text-sm text-text-secondary">{med.dosage}</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <span className="text-sm font-mono text-accent">10:00 AM</span>
//           {isExpanded ? <ChevronUp className="w-5 h-5 text-text-secondary" /> : <ChevronDown className="w-5 h-5 text-text-secondary" />}
//         </div>
//       </div>

//       {/* Expandable Body */}
//       <AnimatePresence>
//         {isExpanded && (
//           <motion.div
//             key="content"
//             initial="collapsed"
//             animate="open"
//             exit="collapsed"
//             variants={{
//               open: { opacity: 1, height: 'auto' },
//               collapsed: { opacity: 0, height: 0 }
//             }}
//             transition={{ duration: 0.3, ease: 'easeInOut' }}
//             className="overflow-hidden"
//           >
//             <div className="border-t border-border-color p-4 space-y-3">
//               <p className="text-sm text-text-secondary">
//                 <strong>Frequency:</strong> {med.frequency}
//               </p>
//               <div className="flex items-center space-x-3">
//                 <button 
//                   onClick={() => toast.error('Edit feature not yet implemented!')}
//                   className="flex items-center text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
//                 >
//                   <Edit className="w-4 h-4 mr-1" /> Edit
//                 </button>
//                 <button 
//                   onClick={handleDelete}
//                   className="flex items-center text-sm text-red-400 hover:text-red-300 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4 mr-1" /> Delete
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };


// // The main list component
// const MedicationList = ({ initialMedications, token, onMedicationDeleted, onMedicationUpdated }) => {
//   // --- FIX #1: Ensure internal state is always an array ---
//   const [medications, setMedications] = useState(Array.isArray(initialMedications) ? initialMedications : []);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [expandedId, setExpandedId] = useState(null);

//   // --- FIX #2: Add this useEffect to sync state when the prop changes ---
//   // This is crucial for when the data loads *after* the component first renders.
//   useEffect(() => {
//     setMedications(Array.isArray(initialMedications) ? initialMedications : []);
//   }, [initialMedications]);

//   const handleToggle = (id) => {
//     setExpandedId(prevId => (prevId === id ? null : id));
//   };

//   // --- FIX #3: Safety check before filtering ---
//   // We use (medications || []) to guarantee it's an array, preventing the crash.
//   const filteredMedications = (medications || []).filter(med => {
//     if (activeFilter === 'today') {
//       // Placeholder: Implement "today" logic here
//       return true;
//     }
//     return true; // 'all'
//   });

//   return (
//     <div className="bg-primary p-6 rounded-xl shadow-lg border border-border-color">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-serif font-bold text-text-primary">Today's Potions</h3>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setActiveFilter('all')}
//             className={`px-3 py-1 text-sm rounded-full ${activeFilter === 'all' ? 'bg-accent text-white' : 'bg-secondary text-text-secondary'} transition-colors`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setActiveFilter('today')}
//             className={`px-3 py-1 text-sm rounded-full ${activeFilter === 'today' ? 'bg-accent text-white' : 'bg-secondary text-text-secondary'} transition-colors`}
//           >
//             Today
//           </button>
//         </div>
//       </div>

//       <AnimatePresence>
//         <motion.div layout className="space-y-3">
//           {filteredMedications.length > 0 ? (
//             filteredMedications.map(med => (
//               <motion.div layout key={med._id}>
//                 <MedicationItem
//                   med={med}
//                   token={token}
//                   onDeleted={onMedicationDeleted}
//                   onUpdated={onMedicationUpdated}
//                   isExpanded={expandedId === med._id}
//                   onToggle={handleToggle}
//                 />
//               </motion.div>
//             ))
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex flex-col items-center justify-center p-6 text-center text-text-secondary"
//             >
//               <AlertCircle className="w-10 h-10 mb-3" />
//               <h4 className="font-semibold">No potions found.</h4>
//               <p className="text-sm">Click "Add Potion" to get started.</p>
//             </motion.div>
//           )}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default MedicationList;

import React from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { GiPotionBall } from 'react-icons/gi';
import toast from 'react-hot-toast';

const MedicationList = ({ medications, isLoading, api, refetch }) => {
  const handleTakeDose = async (medId) => {
    try {
      await api.post(`/api/medications/${medId}/log`, {
        date: new Date().toISOString(),
        status: 'taken',
      });
      toast.success('Dose logged!');
      refetch(); // Refetch data to update adherence chart
    } catch (error) {
      toast.error('Failed to log dose.');
    }
  };
  
  const today = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  // Find medications that have scheduled times for today and are upcoming
  const upcomingMedications = medications
    .filter(med => med.times.some(time => time >= today))
    .sort((a, b) => a.times.find(time => time >= today) > b.times.find(time => time >= today) ? 1 : -1);

  if (isLoading) {
    return <div className="text-text-secondary text-center py-4">Loading potions...</div>;
  }
  
  return (
    <div className="space-y-4">
      {upcomingMedications.length > 0 ? (
        upcomingMedications.map((med, index) => (
          <motion.div
            key={med._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-primary p-4 rounded-lg flex justify-between items-center border border-border-color"
          >
            <div className="flex items-center gap-4">
              <GiPotionBall className="text-accent text-3xl" />
              <div>
                <p className="font-bold text-text-primary">{med.name} ({med.dosage})</p>
                <p className="text-sm text-text-secondary">Next dose at {med.times.find(time => time >= today)}</p>
              </div>
            </div>
            <motion.button 
              onClick={() => handleTakeDose(med._id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover transition-colors"
            >
              Take
            </motion.button>
          </motion.div>
        ))
      ) : (
        <div className="text-center text-text-secondary py-8">
            <p>No upcoming medications for today.</p>
            <p>Your grimoire is clear.</p>
        </div>
      )}
      <Link to="/schedule">
        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-secondary text-text-primary px-4 py-3 rounded-lg hover:bg-border-color transition-colors border border-dashed border-border-color">
            <FaPlus />
            Manage Medication Schedule
        </button>
      </Link>
    </div>
  );
};

export default MedicationList; 





