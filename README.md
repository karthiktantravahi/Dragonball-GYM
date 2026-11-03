# DRAGONBALL GYM — UNLEASH YOUR INNER POWER ⚡🔥

> Premium, modern, visually impressive athletic fitness platform inspired by high-end performance brands (Equinox, Gold's Gym, UFC Gym). Engineered with a stealth obsidian aesthetic, crimson-red energy glow, bold athletic typography, and state-of-the-art full-stack functionality.

---

## 🌟 Key Features & Architecture

### Frontend (Client)
- **Vite + React.js + Tailwind CSS** for ultra-fast HMR and responsive design.
- **7 Complete Frontend Pages & Navigation**:
  1. **Home**: Hero section with large fitness imagery, "UNLEASH YOUR INNER POWER" heading, CTAs, interactive pillars, stats bar, popular workout formats, membership highlights, coach showcase, testimonials, and flagship center spotlights.
  2. **Membership Plans**: Tiered cards (Warrior, Super Saiyan, Ultra Instinct), monthly vs. annual pricing toggle (Save 20%), detailed side-by-side feature comparison matrix, 14-day ironclad guarantee, and interactive FAQ accordion.
  3. **Gym Centers / Locations**: Flagship centers across Metropolis, Uptown, and the West Coast with square footage, direct addresses, staffed hours, highlights, and instant private tour booking.
  4. **Workout Formats & Live Timetable**: Category filters (Strength, Conditioning, Combat, Recovery, Bodyweight), search bar, and interactive weekly class schedule with remaining spots and instant mat reservations.
  5. **Elite Master Coaches**: Certified physiologists, powerlifters, and combat coaches with certifications, specialties, bios, and direct consultation booking.
  6. **Athlete Authentication**: Clean, modern Sign In & Registration forms with password validation, remember me, and quick demo shortcuts for instant evaluation.
  7. **Contact Concierge**: Direct dispatch form, toll-free lines, electronic mail, physical headquarters, and 2-hour SLA response guarantees.
- **Global VIP Enquiry Modal**: Accessible from any page or card to reserve passes, choose tiers, or book personal training.
- **Executive Admin Command Center**:
  - Live KPI metrics (Total Enquiries, Contact Messages, Registered Athletes, Active Tiers).
  - Membership enquiries manager with status transitions (`pending` → `contacted` → `converted`).
  - Registered user directory with admin privilege toggles.
  - Membership tier price and feature editor.
  - Contact dispatch inbox with read receipts and deletion actions.

### Backend (Server)
- **Node.js & Express.js REST API**:
  - `POST /api/auth/register` & `POST /api/auth/login` (Secure password hashing via `bcryptjs`).
  - `GET /api/auth/me` (Protected with JWT bearer token).
  - `POST /api/enquiries` & `GET /api/enquiries` (Admin protected).
  - `PATCH /api/enquiries/:id/status` & `DELETE /api/enquiries/:id`.
  - `POST /api/contacts`, `GET /api/contacts`, `PATCH /api/contacts/:id/read`.
  - `GET /api/plans`, `POST /api/plans`, `PUT /api/plans/:id`, `DELETE /api/plans/:id`.
  - `GET /api/admin/stats`, `GET /api/admin/users`, `PATCH /api/admin/users/:id/role`.
- **Database Integration**:
  - Mongoose models (`User`, `Enquiry`, `Contact`, `Plan`).
  - Supports MongoDB Atlas connection strings via environment variables (`MONGO_URI`).
  - Resilient fallback mechanism: if offline or MongoDB is loading, the API serves structured data gracefully without crashing.
- **Security & Best Practices**:
  - Zero hardcoded secrets: all credentials managed through `.env`.
  - JWT token verification and role-based clearance middleware (`adminOnly`).
  - Standardized error handling middleware.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ or v20+ (tested on Node v24.19)
- **npm** v9+

### 2. Installation
Clone or navigate to the repository folder:
```bash
cd Dragonball-GYM
```

Install dependencies for client and server:
```bash
# In client:
cd client
npm install

# In server:
cd ../server
npm install
```

### 3. Environment Setup
In the `server` directory, verify or update `.env` (a `.env.example` is also provided):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/dragonball_gym
JWT_SECRET=dragonball_gym_ultra_instinct_secret_token_9000
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```
> **MongoDB Atlas**: Replace `MONGO_URI` with your MongoDB Atlas connection string (`mongodb+srv://...`) to connect your live cluster.

### 4. Running the Application

You can run both services concurrently or independently:

#### Start Frontend (Vite React):
```bash
npm run dev:client
# or from client directory:
cd client && npm run dev
```
Client URL: **`http://localhost:5173`**

#### Start Backend (Express REST API):
```bash
npm run dev:server
# or from server directory:
cd server && npm run dev
```
Server URL: **`http://localhost:5000`**  
Health Check: **`http://localhost:5000/api/health`**

---

## ⚡ Instant Review & Testing Credentials

For quick inspection without filling forms:
- **One-Click Demo Admin**: On the `/login` or `/admin` page, click **"One-Click Demo Admin Login"** to immediately access the executive command center.
- **Default Seed Admin**:
  - Email: `admin@dragonballgym.com`
  - Password: `AdminPassword123!`
- **Default Seed Member**:
  - Email: `member@dragonballgym.com`
  - Password: `Member123!`

---

## 📂 Project Structure

```
Dragonball-GYM/
├── client/                     # Vite + React Frontend
│   ├── public/
│   │   └── logo.svg            # Custom Dragonball Gym emblem
│   ├── src/
│   │   ├── components/         # Reusable athletic UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PlanCard.jsx
│   │   │   ├── TrainerCard.jsx
│   │   │   ├── WorkoutCard.jsx
│   │   │   └── EnquiryModal.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state, JWT session & demo admin
│   │   ├── data/
│   │   │   └── mockData.js     # Athletic photography, plans, workouts, trainers
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Plans.jsx
│   │   │   ├── Locations.jsx
│   │   │   ├── Workouts.jsx
│   │   │   ├── Trainers.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios API client with bearer interceptor
│   │   ├── App.jsx             # Router and modal shell
│   │   ├── index.css           # Tailwind base, dark obsidian, glow effects
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Mongoose MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── enquiryController.js
│   │   │   ├── contactController.js
│   │   │   ├── planController.js
│   │   │   └── adminController.js
│   │   ├── middleware/
│   │   │   ├── auth.js         # JWT verification & adminOnly guard
│   │   │   └── errorHandler.js # Standard error response formatting
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Enquiry.js
│   │   │   ├── Contact.js
│   │   │   └── Plan.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── enquiryRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── planRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── seed.js             # Seed database script
│   │   └── server.js           # Express app & route mounting
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── package.json                # Root convenience scripts
└── README.md
```

---

## 🛡️ License
Released under the MIT License. Developed with discipline for DRAGONBALL GYM.
