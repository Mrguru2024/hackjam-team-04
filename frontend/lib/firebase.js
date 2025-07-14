import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
};

// Only initialize Firebase if we're in the browser and have valid config
let app;
let auth;

if (typeof window !== 'undefined') {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
    // Create a mock auth object for development
    auth = {
      onAuthStateChanged: (callback) => {
        callback(null);
        return () => {};
      },
      signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase not configured')),
      createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase not configured')),
      signOut: () => Promise.resolve(),
    };
  }
}

export { auth }; 