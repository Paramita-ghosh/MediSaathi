# MediSaathi

MediSaathi is a full-stack medication management and wellness tracking application built with React, Node.js, Express, and MongoDB.
It helps users manage medicines, track adherence, receive reminder emails, and participate in a simple community forum.

---

## Features

- Secure user registration and login with JWT authentication
- Medication CRUD: add, update, delete medicines
- Log doses as taken and track medication adherence
- A backend `/api/medications/adherence` endpoint for adherence totals
- Automated reminder emails using `node-cron` and Nodemailer
- Community posts module with create, list, and like functionality

---

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT
- Email: Nodemailer via SMTP
- Scheduler: node-cron

---

## Folder Structure

```
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
    src/
    public/
    vite.config.js
```

---

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` with keys:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `EMAIL_FROM`
   - `CRON_TIMEZONE`
4. `npm run start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## Notes

- The application uses Nodemailer for email reminders and confirmation emails.
- The community module supports post creation, listing posts, and liking posts.
- The chat feature was present in the codebase but is currently removed from the dashboard UI.

---

## GitHub Push
After updating the README, run:

```bash
git add README.md
git commit -m "Update README for MediSaathi features and setup"
git push origin main
```