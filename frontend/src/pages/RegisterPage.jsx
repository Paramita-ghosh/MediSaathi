import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AuthContext from '../context/AuthContext';
import { FaEnvelope, FaLock, FaShieldAlt, FaUser } from 'react-icons/fa';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, verifyRegistration } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!emailPattern.test(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name.trim(), email.trim().toLowerCase(), password);
      setOtpSent(true);
      toast.success('OTP sent to your email.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp.trim())) {
      toast.error('Enter the 6 digit OTP from your email.');
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyRegistration(email.trim().toLowerCase(), otp.trim());
      toast.success('Account verified successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0b0a13] via-[#11111b] to-[#1c1d25] flex items-center justify-center p-4 overflow-hidden relative">
      <motion.div
        className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-20 -left-20"
        animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl bottom-0 right-0"
        animate={{ scale: [1.08, 1, 1.08], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-[#1f1f2e]/85 backdrop-blur-xl border border-[#3a3a50] p-8 rounded-2xl shadow-[0_0_30px_rgba(130,60,255,0.2)]"
      >
        <h2 className="text-2xl font-bold text-center text-purple-300 mb-8 tracking-wide">
          Create Your MediSaathi Account
        </h2>

        {!otpSent ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <FaUser className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-linear-to-r from-purple-600 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-purple-800/40 transition-all duration-300 disabled:opacity-60"
            >
              {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <p className="text-sm text-gray-300 text-center">
              We sent a 6 digit OTP to <span className="text-indigo-300">{email}</span>.
            </p>

            <div className="relative">
              <FaShieldAlt className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-[#12121b] border border-[#2f2f40] text-gray-200 rounded-lg py-3 pl-10 pr-4 tracking-[0.35em] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-linear-to-r from-emerald-500 to-cyan-500 text-slate-950 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-60"
            >
              {isSubmitting ? 'Verifying...' : 'Verify & Create Account'}
            </motion.button>

            <button
              type="button"
              onClick={handleRegister}
              disabled={isSubmitting}
              className="w-full text-sm text-purple-300 hover:text-purple-200 disabled:opacity-60"
            >
              Resend OTP
            </button>
          </form>
        )}

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
