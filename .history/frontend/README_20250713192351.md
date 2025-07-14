# LevelUp Frontend

This is the frontend application for LevelUp - a gamified career progress tracker for Per Scholas alumni.

## Tech Stack

- **Framework:** Next.js 15.3.5 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Firebase
- **State Management:** React Context + Zustand
- **HTTP Client:** Axios

## Getting Started

1. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

2. Set up environment variables:
   Create a `.env.local` file with your Firebase configuration:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

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

## Available Scripts

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
