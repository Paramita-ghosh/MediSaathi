import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config({ path: './.env' });

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpUser = process.env.SMTP_USER;
const _rawSmtpPass = process.env.SMTP_PASS || '';
const smtpPass = smtpUser && smtpUser.endsWith('@gmail.com') ? _rawSmtpPass.replace(/\s+/g, '') : _rawSmtpPass;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const runTest = async () => {
  console.log('Testing SMTP connection with:', smtpHost, smtpPort, smtpUser);
  try {
    await transporter.verify();
    console.log('Transporter verified — attempting to send a test email');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || smtpUser,
      to: smtpUser,
      subject: 'MediSaathi SMTP Test',
      text: 'This is a test email from smtpTest.js',
    });
    console.log('Test email sent:', info.response || info);
  } catch (err) {
    console.error('SMTP test failed:', err);
  }
};

runTest();
