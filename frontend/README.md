# LevelUp: Gamified Career Progress Tracker

LevelUp is a full-stack web application designed to help Per Scholas alumni gamify their career journey. Users can log tasks, earn XP, unlock badges, and compete on a leaderboard—all while tracking their professional growth in a fun, engaging way.

## What This Project Includes

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand, React Context, Firebase Auth, Responsive & Dark Mode UI
- **Backend:** Node.js, Express.js, MongoDB (via Mongoose), Firebase Admin SDK for secure authentication, RESTful API
- **Features:**
  - Secure authentication (Firebase)
  - 3-step onboarding flow
  - XP and badge system
  - Task logging and tracking
  - Leaderboard for friendly competition
  - Personalized dashboard and progress analytics
  - Modern, mobile-friendly UI
  - Environment variable support for easy deployment

## Collaboration

This project is built for team collaboration. Multiple contributors can work on both frontend and backend, with clear separation of concerns and modular code structure.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or cloud instance)

### 1. Clone the repository

```bash
git clone https://github.com/Mrguru2024/hackjam-team-04.git
cd hackjam-team-04
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

- Create a `.env` file in the backend directory with your MongoDB URI and any other required secrets.
- Add your Firebase Admin SDK JSON file to `docs/` and reference it in `firebaseAdmin.js`.
- Start the backend server:

```bash
npm run dev
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install --legacy-peer-deps
```

- Create a `.env.local` file in the frontend directory with your Firebase and API config (see `.env.example`).
- Start the frontend server:

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Backend Overview

- **Express.js** REST API for user, task, and badge management
- **MongoDB** for persistent storage
- **Firebase Admin SDK** for secure authentication and user management
- **API Endpoints:**
  - `/api/tasks/user` - Get user info
  - `/api/tasks/tasks` - Get user tasks
  - `/api/tasks/user/tags` - Update user tags
  - `/api/tasks/log` - Log a new task

---

## Contributor Guidelines

- Use feature branches for new work (e.g., `feature/your-feature-name`)
- Write clear, descriptive commit messages
- Keep code modular and follow the existing folder structure
- Use Prettier and ESLint for code formatting and linting
- Add or update documentation as needed
- Open a pull request for review before merging to main or shared branches

---

## Project Structure (Frontend)

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── tasks/            # Task logging
│   ├── badges/           # Badge display
│   ├── leaderboard/      # Leaderboard
│   ├── onboarding/       # User onboarding
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable components
├── context/              # React Context providers
├── lib/                  # Utilities and API
└── public/               # Static assets
```

## Available Scripts (Frontend)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean up unused imports and variables

## Features

- ✅ Firebase Authentication
- ✅ 3-step Onboarding
- ✅ XP Tracking System
- ✅ Badge System
- ✅ Task Logging
- ✅ Leaderboard
- ✅ Responsive Design
- ✅ Dark Mode Support
