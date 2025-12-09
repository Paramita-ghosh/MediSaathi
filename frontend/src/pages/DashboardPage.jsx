import React, { useContext, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
// import { FiLogOut } from 'react-icons/fi'; // No longer needed here
// import { useNavigate } from 'react-router-dom'; // No longer needed here
import MedicationList from '../components/dashboard/MedicationList';
import AdherenceChart from '../components/dashboard/AdherenceChart';
import Navbar from '../components/Layout/Navbar'; // adjust the path if needed
import Chatbot from '../components/dashboard/Chatbot';
import toast from 'react-hot-toast';

const DashboardPage = () => {
    const { user, api } = useContext(AuthContext); // Removed logout and navigate
    // const navigate = useNavigate(); // No longer needed here
    const [medications, setMedications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMedications = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get('/api/medications');
            setMedications(data);
        } catch (error) {
            toast.error("Could not fetch medication data.");
        } finally {
            setIsLoading(false);
        }
    }, [api]);

    useEffect(() => {
        if (user) {
            fetchMedications();
        }
    }, [user, fetchMedications]);


    /* This is no longer needed, it's in Navbar.jsx
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    */

    return (
  <div className="relative min-h-screen bg-linear-to-br from-[#0b0b12] via-[#141422] to-[#1c1c2e] overflow-hidden p-4 sm:p-6 lg:p-8">
    <Navbar />

    {/* ✨ Animated glowing orbs */}
    <motion.div
      className="absolute w-140 h-140 bg-purple-700/20 rounded-full blur-3xl -top-32 -left-32"
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute w-120 h-120 bg-indigo-700/20 rounded-full blur-3xl bottom-0 right-0"
      animate={{ scale: [1.1, 1, 1.1], opacity: [0.7, 0.9, 0.7] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* 🌫️ Subtle magical mist */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />

    <div className="relative max-w-7xl mx-auto z-10 text-gray-200">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
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
          className="text-4xl font-serif mt-8 font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-gray-400 to-white drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]"
        >
          The Philosopher’s Desk 🪶
        </motion.h1>
        <p className="text-gray-400 italic mt-2">
          “Beneath the astral veil, your potions and patterns align.”
        </p>
      </motion.header>

      {/* --- Keep your original grid content unchanged --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1f1f2e]/80 backdrop-blur-lg p-6 rounded-2xl border border-[#2a2a40] shadow-[0_0_25px_rgba(120,81,169,0.3)]"
          >
            <h2 className="text-xl font-serif mb-4 text-purple-300">🧪 Potion Schedule</h2>
            <MedicationList medications={medications} isLoading={isLoading} api={api} refetch={fetchMedications} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#1f1f2e]/80 backdrop-blur-lg p-6 rounded-2xl border border-[#2a2a40] shadow-[0_0_25px_rgba(147,112,219,0.3)]"
          >
            <h2 className="text-xl font-serif mb-4 text-indigo-300">🌙 Celestial Balance</h2>
            <AdherenceChart medications={medications} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#1f1f2e]/80 backdrop-blur-lg p-6 rounded-2xl border border-[#2a2a40] shadow-[0_0_25px_rgba(186,85,211,0.3)]"
        >
          <h2 className="text-xl font-serif mb-4 text-pink-300">🔮 Oracle of Echoes</h2>
          <Chatbot />
        </motion.div>
      </div>
    </div>
  </div>
);

};

export default DashboardPage;


// import React, { useState, useEffect, useContext } from 'react';
// import { motion } from 'framer-motion';
// import { Loader, AlertTriangle, CheckCircle, CalendarPlus, PlusCircle } from 'lucide-react';
// import AuthContext from '../context/AuthContext';
// import MedicationList from '../components/dashboard/MedicationList';
// import AdherenceChart from '../components/dashboard/AdherenceChart';
// import Chatbot from '../components/dashboard/Chatbot';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const DashboardPage = () => {
//   const [medications, setMedications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Get the auth object from the context
//   const { auth } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchMedications = async () => {
//       // If auth is not loaded yet, don't try to fetch anything
//       if (!auth) {
//         setLoading(false); // Stop loading, as there's nothing to fetch
//         return;
//       }

//       setLoading(true);
//       try {
//         // Now it's safe to access auth.token
//         const config = {
//           headers: { Authorization: `Bearer ${auth.token}` },
//         };
//         const { data } = await axios.get('/api/medications', config);
        
//         // --- THIS IS THE FIX ---
//         // Ensure that `data` is an array before setting state.
//         // This prevents passing `undefined` to the MedicationList.
//         setMedications(Array.isArray(data) ? data : []);
//         // --- END OF FIX ---
        
//         setError(null);
//       } catch (err) {
//         const message = err.response?.data?.message || 'Failed to fetch medications.';
//         setError(message);
//         toast.error(message);
//         setMedications([]); // Also reset to an array on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedications();
//   }, [auth]); // This useEffect will re-run when `auth` changes (from null to the user object)

//   const handleMedicationAdded = (newMedication) => {
//     setMedications(prevMeds => [newMedication, ...prevMeds]);
//   };

//   const handleMedicationDeleted = (medId) => {
//     setMedications(prevMeds => prevMeds.filter(med => med._id !== medId));
//   };

//   const handleMedicationUpdated = (updatedMed) => {
//     setMedications(prevMeds => 
//       prevMeds.map(med => med._id === updatedMed._id ? updatedMed : med)
//     );
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <Loader className="w-12 h-12 animate-spin text-accent" />
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-serif font-bold text-text-primary">
//           Welcome, {auth ? auth.user.name : 'Alchemist'}!
//         </h1>
//         {/* Google Calendar Button */}
//         <div className="flex items-center space-x-4">
          
//           {/* Check for auth AND auth.user before trying to render the link */}
//           {auth && auth.user && !auth.user.googleRefreshToken && (
//             <a
//               href={`/api/calendar/auth?userId=${auth.user._id}`}
//               className="flex items-center bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
//             >
//               <CalendarPlus className="w-5 h-5 mr-2" />
//               Connect Google Calendar
//             </a>
//           )}
//           {/* Check for auth AND auth.user before rendering */}
//           {auth && auth.user && auth.user.googleRefreshToken && (
//             <p className="flex items-center text-accent font-medium">
//               <CheckCircle className="w-5 h-5 mr-2" />
//               Google Calendar Connected
//             </p>
//           )}

//           <button 
//             onClick={() => toast.error('This will open the add modal!')}
//             className="flex items-center bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
//           >
//             <PlusCircle className="w-5 h-5 mr-2" />
//             Add Potion
//           </button>
//         </div>
//       </div>
      
//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-center">
//           <AlertTriangle className="w-5 h-5 mr-3" />
//           <span><strong>Error:</strong> {error}</span>
//         </div>
//       )}

//       {/* Main Dashboard Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <MedicationList 
//             initialMedications={medications}
//             token={auth?.token} // Pass token down (safely)
//             onMedicationDeleted={handleMedicationDeleted}
//             onMedicationUpdated={handleMedicationUpdated}
//           />
//           <AdherenceChart medications={medications} />
//         </div>
//         <div className="lg:col-span-1">
//           <Chatbot />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DashboardPage;

// import React, { useState, useEffect, useContext } from 'react';
// import { motion } from 'framer-motion';
// import { Loader, AlertTriangle, CheckCircle, CalendarPlus, PlusCircle } from 'lucide-react';
// import AuthContext from '../context/AuthContext';
// import MedicationList from '../components/dashboard/MedicationList';
// import AdherenceChart from '../components/dashboard/AdherenceChart';
// import Chatbot from '../components/dashboard/Chatbot';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const DashboardPage = () => {
//   const [medications, setMedications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Get the auth object from the context
//   const { auth } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchMedications = async () => {
//       // If auth is not loaded yet, don't try to fetch anything
//       if (!auth) {
//         setLoading(false); // Stop loading, as there's nothing to fetch
//         return;
//       }

//       setLoading(true);
//       try {
//         // Now it's safe to access auth.token
//         const config = {
//           headers: { Authorization: `Bearer ${auth.token}` },
//         };
//         const { data } = await axios.get('/api/medications', config);
        
//         // --- THIS IS THE FIX ---
//         // Ensure that `data` is an array before setting state.
//         // This prevents passing `undefined` to the MedicationList.
//         setMedications(Array.isArray(data) ? data : []);
//         // --- END OF FIX ---
        
//         setError(null);
//       } catch (err) {
//         const message = err.response?.data?.message || 'Failed to fetch medications.';
//         setError(message);
//         toast.error(message);
//         setMedications([]); // Also reset to an array on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedications();
//   }, [auth]); // This useEffect will re-run when `auth` changes (from null to the user object)

//   const handleMedicationAdded = (newMedication) => {
//     setMedications(prevMeds => [newMedication, ...prevMeds]);
//   };

//   const handleMedicationDeleted = (medId) => {
//     setMedications(prevMeds => prevMeds.filter(med => med._id !== medId));
//   };

//   const handleMedicationUpdated = (updatedMed) => {
//     setMedications(prevMeds => 
//       prevMeds.map(med => med._id === updatedMed._id ? updatedMed : med)
//     );
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <Loader className="w-12 h-12 animate-spin text-accent" />
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8"
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-serif font-bold text-text-primary">
//           Welcome, {auth ? auth.user.name : 'Alchemist'}!
//         </h1>
//         {/* Google Calendar Button */}
//         <div className="flex items-center space-x-4">
          
//           {/* Check for auth AND auth.user before trying to render the link */}
//           {auth && auth.user && !auth.user.googleRefreshToken && (
//             <a
//               href={`/api/calendar/auth?userId=${auth.user._id}`}
//               className="flex items-center bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300"
//             >
//               <CalendarPlus className="w-5 h-5 mr-2" />
//               Connect Google Calendar
//             </a>
//           )}
//           {/* Check for auth AND auth.user before rendering */}
//           {auth && auth.user && auth.user.googleRefreshToken && (
//             <p className="flex items-center text-accent font-medium">
//               <CheckCircle className="w-5 h-5 mr-2" />
//               Google Calendar Connected
//             </p> 
//           )}

//           <button 
//             onClick={() => toast.error('This will open the add modal!')}
//             className="flex items-center bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300"
//           >
//             <PlusCircle className="w-5 h-5 mr-2" />
//             Add Potion
//           </button>
//         </div>
//       </div>
      
//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg flex items-center">
//           <AlertTriangle className="w-5 h-5 mr-3" />
//           <span><strong>Error:</strong> {error}</span>
//         </div>
//       )}

//       {/* Main Dashboard Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-6">
//           <MedicationList 
//             initialMedications={medications}
//             token={auth?.token} // Pass token down (safely)
//             onMedicationDeleted={handleMedicationDeleted}
//             onMedicationUpdated={handleMedicationUpdated}
//           />
//           <AdherenceChart medications={medications} />
//         </div>
//         <div className="lg:col-span-1">
//           <Chatbot />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DashboardPage;


  