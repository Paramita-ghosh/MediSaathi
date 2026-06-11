import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const fromEmail = process.env.EMAIL_FROM || smtpUser;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: fromEmail,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export const sendMedicationConfirmation = async (
  userEmail,
  userName,
  medication
) => {
  const subject = `New Medication Added: ${medication.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0d9488;">Hello, ${userName}!</h2>
      <p>You've successfully added a new medication to your MediSaathi schedule:</p>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Medication:</strong> ${medication.name}</li>
        <li><strong>Dosage:</strong> ${medication.dosage}</li>
        <li><strong>Frequency:</strong> ${medication.frequency}</li>
      </ul>
      <p>You will now receive reminder emails when your dose time arrives.</p>
      <p>Take care,</p>
      <p><strong>The MediSaathi Team</strong></p>
    </div>
  `;

  try {
    await sendEmail({ to: userEmail, subject, html });
    console.log(`Confirmation email sent successfully to ${userEmail}`);
  } catch (error) {
    console.error('Error sending email via Nodemailer:', error);
  }
};

export const sendReminderEmail = async (
  userEmail,
  userName,
  medicationName,
  dosage,
  time
) => {
  const subject = `Medication Reminder: ${medicationName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0d9488;">Hello, ${userName}!</h2>
      <p>This is your dose reminder for <strong>${medicationName}</strong> at <strong>${time}</strong>.</p>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Medication:</strong> ${medicationName}</li>
        <li><strong>Dosage:</strong> ${dosage}</li>
        <li><strong>Scheduled time:</strong> ${time}</li>
      </ul>
      <p>Please log your dose as taken once you have taken it.</p>
      <p>Stay healthy,</p>
      <p><strong>The MediSaathi Team</strong></p>
    </div>
  `;

  try {
    await sendEmail({ to: userEmail, subject, html });
    console.log(`Reminder email sent to ${userEmail} for ${medicationName} at ${time}`);
  } catch (error) {
    console.error('Error sending reminder email via Nodemailer:', error);
  }
};
