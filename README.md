# MediSaathi

MediSaathi is a full-stack medication management platform that helps users schedule medicines, track doses, review adherence, receive reminders, and discover nearby healthcare facilities.

## Live Application

- Frontend: https://medi-sigma-blush.vercel.app
- Backend: https://medisaathi-k07b.onrender.com
- Health check: https://medisaathi-k07b.onrender.com/api/health

The free Render backend may take up to a minute to wake after inactivity.

## Features

- JWT-based registration, OTP email verification, login, and protected routes
- Add, update, delete, and view user medications
- Multiple dose times with a 10-minute missed-dose grace period
- Dose history and visual adherence analytics
- Medication reminder and confirmation emails
- Streak tracking and achievement badges
- Nearby doctor and clinic discovery within 20 km using OpenStreetMap
- Controlled doctor-specialty mapping with General Physician as the safe fallback
- Community posts with likes, Gemini summaries, and sentiment analysis
- Responsive React dashboard

Doctor suggestions are informational starting points only. They do not provide diagnosis or treatment advice.

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Framer Motion, Chart.js |
| Backend | Node.js, Express, MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| AI | Google Gemini for community summaries and sentiment |
| Maps | OpenStreetMap and Overpass API |
| Email | Nodemailer with SMTP |
| Scheduling | node-cron |
| Deployment | Vercel, Render, MongoDB Atlas |

## Project Structure

```text
MediSaathi/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    server.js
  frontend/
    public/
    src/
    vite.config.js
    vercel.json
```

## Local Setup

### Backend

```bash
cd backend
npm install
```

Copy `backend/.env.example` to `backend/.env`, fill in the required values, then run:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Copy `frontend/.env.example` to `frontend/.env` and set:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

## Production Configuration

Backend environment variables:

```env
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=
CRON_TIMEZONE=Asia/Kolkata
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
GEMINI_API_KEY=
GROQ_API_KEY=
```

Frontend environment variable:

```env
VITE_API_URL=https://your-backend-domain.example
```

## Deployment Note

The current reminder scheduler runs inside the backend process. Free hosting can suspend inactive services, so exact-time production reminders are not guaranteed. A production-scale version should use an always-on worker or external scheduler with a transactional email API.

## Safety

- Doctor-specialty suggestions use controlled broad-category mapping rather than AI diagnosis.
- Unknown medicines default to a General Physician.
- Nearby facility data comes from OpenStreetMap and may be incomplete.
- Users should consult qualified healthcare professionals for medical decisions.
