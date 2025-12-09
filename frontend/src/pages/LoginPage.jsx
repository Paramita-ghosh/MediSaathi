// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import AuthContext from '../context/AuthContext';
// import { FaEnvelope, FaLock } from 'react-icons/fa';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await login(email, password);
//             toast.success('Welcome back!');
//             navigate('/dashboard');
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to login');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-primary flex items-center justify-center p-4">
//             <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="w-full max-w-md bg-[#FFFAFA] p-8 rounded-xl shadow-2xl border border-border-color"
//             >
//                 <h2 className="text-3xl font-serif font-bold text-center text-[#4E4B51] mb-6">Unlock Your Grimoire</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="relative">
//                         <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-3 text-[#4E4B51]" />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full bg-primary border border-border-color text-[#4E4B51] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent"
//                             required
//                         />
//                     </div>
//                     <div className="relative">
//                         <FaLock className="absolute top-1/2 -translate-y-1/2 left-3 text-[#4E4B51]" />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full bg-primary border border-border-color text-[#4E4B51] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent"
//                             required
//                         />
//                     </div>
//                     <motion.button
//                         type="submit"
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="w-full bg-gray-200 hover:bg-accent-hover text-[#4E4B51] font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-300"
//                     >
//                         Login
//                     </motion.button>
//                 </form>
//                 <p className="text-center text-[#4E4B51] mt-6">
//                     Don't have a Grimoire? <Link to="/register" className="text-accent hover:underline">Create one</Link>
//                 </p>
//             </motion.div>
//         </div>
//     );
// };

// export default LoginPage;


import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Welcome back, Alchemist!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0a0a0f] via-[#11121a] to-[#1c1d25] flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated magical glow */}
            <motion.div
                className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-24 -left-24"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-0 right-0"
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.7, 0.9, 0.7],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Card container */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md bg-[#1f1f2e]/80 backdrop-blur-xl border border-[#2a2a40] p-8 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)]"
            >
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-semibold text-center text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-indigo-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] mb-8 tracking-wide"
                >
                    Unlock Your Grimoire
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Enter your alchemical seal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 mt-1 mb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            required
                        />
                        <span className="absolute -top-5 left-2 text-sm text-indigo-400">
                            Alchemist's Seal
                        </span>
                    </div>
                    <div className="relative">
                        <FaLock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Whisper your cipher key"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 mt-1 mb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                            required
                        />
                        <span className="absolute -top-5 left-2 text-sm text-indigo-400">
                            Secret Cipher
                        </span>
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-linear-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-purple-800/30 transition-all duration-300"
                    >
                        Enter the Sanctum
                    </motion.button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Don’t have a Grimoire?{' '}
                    <Link to="/register" className="text-purple-400 hover:text-purple-300 transition-colors duration-300">
                        Craft one now
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;

