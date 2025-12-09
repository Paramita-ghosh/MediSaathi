import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

// Set the API key for SendGrid
// This line looks for the SENDGRID_API_KEY in your backend/.env file
console.log("Loaded API key starts with:", process.env.SENDGRID_API_KEY?.slice(0, 5));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Sends a confirmation email when a new medication is added.
 * @param {string} userEmail - The email address of the user.
 * @param {string} userName - The name of the user.
 * @param {object} medication - The medication object that was just created.
 * @param {string} medication.name - The name of the medication.
 * @param {string} medication.dosage - The dosage (e.g., "50mg").
 * @param {string} medication.frequency - The frequency (e.g., "Twice a day").
 */
export const sendMedicationConfirmation = async (
  userEmail,
  userName,
  medication
) => {
  // --- IMPORTANT ---
  // This 'from' email MUST be a "Verified Sender" in your SendGrid account.
  // Go to SendGrid > Settings > Sender Authentication to verify your email.
  const fromEmail = 'ghoshparamita0110@gmail.com'; // <--- !!! REPLACE THIS !!!

  const msg = {
    to: userEmail,
    from: {
      name: 'MediSaathi',
      email: fromEmail,
    },
    subject: `New Medication Added: ${medication.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0d9488;">Hello, ${userName}!</h2>
        <p>You've successfully added a new medication to your Grimoire:</p>
        
        <ul style="list-style-type: none; padding-left: 0;">
          <li><strong>Medication:</strong> ${medication.name}</li>
          <li><strong>Dosage:</strong> ${medication.dosage}</li>
          <li><strong>Frequency:</strong> ${medication.frequency}</li>
        </ul>
        
        <p>You will now receive reminders for this schedule.</p>
        <p>Stay healthy,</p>
        <p><strong>The MediSaathi Team</strong></p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Confirmation email sent successfully to ${userEmail}`);
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};