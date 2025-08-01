import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

// IMPORTANT: Replace this with your own Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9i-ZppPkFvGBljvJ559joW8G6IvxFObY",
  authDomain: "linknest-b67ed.firebaseapp.com",
  projectId: "linknest-b67ed",
  storageBucket: "linknest-b67ed.firebasestorage.app",
  messagingSenderId: "874827019698",
  appId: "1:874827019698:web:057d573f35d6f405bc60ab",
  measurementId: "G-8X236DYQW9"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { app, auth, db };
