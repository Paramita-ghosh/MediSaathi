// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import AuthContext from '../context/AuthContext';
// import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

// const RegisterPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { register } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (password.length < 6) {
//             toast.error('Password must be at least 6 characters long');
//             return;
//         }
//         try {
//             await register(name, email, password);
//             toast.success('Account created successfully!');
//             navigate('/dashboard');
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to register');
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
//                 <h2 className="text-3xl font-serif font-bold text-center text-[#4E4B51] mb-6">Create Your Grimoire</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="relative">
//                         <FaUser className="absolute top-1/2 -translate-y-1/2 left-3 text-[#4E4B51]" />
//                         <input
//                             type="text"
//                             placeholder="Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             className="w-full bg-primary border border-border-color text-[#4E4B51] rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-accent"
//                             required
//                         />
//                     </div>
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
//                         Create Account
//                     </motion.button>
//                 </form>
//                 <p className="text-center text-[#4E4B51] mt-6">
//                     Already have a Grimoire? <Link to="/login" className="text-accent hover:underline">Login</Link>
//                 </p>
//             </motion.div>
//         </div>
//     );
// };

// export default RegisterPage;


import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }
        try {
            await register(name, email, password);
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to register');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#0b0a13] via-[#11111b] to-[#1c1d25] flex items-center justify-center p-4 overflow-hidden relative font-serif">
            {/* Ethereal Background Orbs */}
            <motion.div
                className="absolute w-md h-md bg-purple-500/20 rounded-full blur-3xl -top-20 -left-20"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute w-104 h-104 bg-indigo-500/20 rounded-full blur-3xl bottom-0 right-0"
                animate={{
                    scale: [1.1, 1, 1.1],
                    opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Floating sparkles */}
            <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md bg-[#1f1f2e]/80 backdrop-blur-xl border border-[#3a3a50] p-8 rounded-2xl shadow-[0_0_30px_rgba(130,60,255,0.2)]"
            >
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl font-bold text-center text-purple-300 mb-10 tracking-wide drop-shadow-[0_0_10px_rgba(170,120,255,0.6)]"
                >
                    🪶 Forge Your Alchemist’s Grimoire
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <FaUser className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="e.g. Aurelius Nightshade"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 mt-1 mb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-500"
                            required
                        />
                        <span className="absolute -top-5 left-2 text-sm text-purple-400">
                            Alchemist Name
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                    >
                        <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                        <input
                            type="email"
                            placeholder="e.g. elara.moonveil@alchemyguild.org"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 mt-1 mb-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 placeholder-gray-500"
                            required
                        />
                        <span className="absolute -top-5 left-2 text-sm text-indigo-400">
                            Arcane Contact Sigil
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <FaLock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="e.g. ✧ mixFire&Water2025 ✧"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 mt-1 mb-1 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-500"
                            required
                        />
                        <span className="absolute -top-5 left-2 text-sm text-purple-400">
                            Secret Incantation
                        </span>
                    </motion.div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(150, 100, 255, 0.6)' }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-linear-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-purple-800/40 transition-all duration-300"
                    >
                        Bind My Essence
                    </motion.button>
                </form>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-gray-400 mt-6"
                >
                    Already a Keeper of Secrets?{' '}
                    <Link
                        to="/login"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
                    >
                        Enter the Sanctum
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
