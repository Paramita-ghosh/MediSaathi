import bcrypt from 'bcryptjs';
import { randomInt } from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendVerificationOtp } from '../utils/emailService.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const OTP_EXPIRY_MINUTES = 10;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const getPublicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  badges: user.badges,
  currentStreak: user.currentStreak,
});

const registerUser = async (req, res) => {
  const { name, password } = req.body;
  const email = String(req.body.email || '').trim().toLowerCase();

  if (!name?.trim() || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  const otp = String(randomInt(100000, 1000000));
  const otpHash = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  let user = await User.findOne({ email });

  if (user?.isEmailVerified) {
    return res.status(400).json({ message: 'User already exists' });
  }

  if (user) {
    user.name = name.trim();
    user.password = password;
    user.isEmailVerified = false;
    user.emailVerificationOtpHash = otpHash;
    user.emailVerificationOtpExpires = otpExpires;
  } else {
    user = new User({
      name: name.trim(),
      email,
      password,
      isEmailVerified: false,
      emailVerificationOtpHash: otpHash,
      emailVerificationOtpExpires: otpExpires,
    });
  }

  await user.save();

  try {
    await sendVerificationOtp(email, user.name, otp);
  } catch (error) {
    console.error('Failed to send verification OTP:', error);
    return res.status(500).json({
      message: 'Could not send OTP email. Please check email settings and try again.',
    });
  }

  res.status(200).json({
    message: 'OTP sent to your email',
    requiresVerification: true,
    email,
  });
};

const verifyRegistration = async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const otp = String(req.body.otp || '').trim();

  if (!emailPattern.test(email) || !/^\d{6}$/.test(otp)) {
    return res.status(400).json({ message: 'Invalid email or OTP' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.isEmailVerified) {
    return res.json({ ...getPublicUser(user), token: generateToken(user._id) });
  }

  if (!user.emailVerificationOtpHash || !user.emailVerificationOtpExpires) {
    return res.status(400).json({ message: 'Please request a new OTP' });
  }

  if (user.emailVerificationOtpExpires < new Date()) {
    return res.status(400).json({ message: 'OTP expired. Please request a new OTP' });
  }

  const isOtpValid = await bcrypt.compare(otp, user.emailVerificationOtpHash);

  if (!isOtpValid) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  user.isEmailVerified = true;
  user.emailVerificationOtpHash = undefined;
  user.emailVerificationOtpExpires = undefined;
  await user.save();

  res.status(201).json({ ...getPublicUser(user), token: generateToken(user._id) });
};

const authUser = async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const { password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.isEmailVerified === false) {
    return res.status(403).json({ message: 'Please verify your email before logging in' });
  }

  if (user && (await user.matchPassword(password))) {
    res.json({ ...getPublicUser(user), token: generateToken(user._id) });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json(getPublicUser(user));
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export { registerUser, verifyRegistration, authUser, getUserProfile };
