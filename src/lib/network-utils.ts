import { useState, useEffect } from 'react';

// Custom hook to check network status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    // Set up event listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline };
};

// Utility function to check if Firebase is accessible
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const checkFirebaseConnectivity = async (): Promise<boolean> => {
  try {
    // Skip sign-in attempt if not in production environment
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    // Attempt to sign in with dummy credentials to check Firebase connectivity
    await signInWithEmailAndPassword(auth, 'test@example.com', 'password');
    return true; // If no error, Firebase is accessible
  } catch (error: any) {
    console.error('Firebase connectivity check failed:', error);
    if (error.code === 'auth/invalid-credential') {
      return false; // Firebase is reachable, but credentials are invalid
    }
     // Check if the error is due to network issues or Firebase unavailability
    return !(error.code === 'auth/network-request-failed' || error.message.includes('CORS'));
  }
};