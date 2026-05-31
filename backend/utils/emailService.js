import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();


console.log("Loaded API key starts with:", process.env.SENDGRID_API_KEY?.slice(0, 5));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export const sendMedicationConfirmation = async (
  userEmail,
  userName,
  medication
) => {
  
  const fromEmail = 'ghoshparamita0110@gmail.com'; 

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
