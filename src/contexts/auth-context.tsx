"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface UserProfile {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  username?: string;
  bio?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  onboardingCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  profilePicture?: string | null;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  completeOnboarding: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOutUser: async () => {},
  updateUserProfile: async () => {},
  completeOnboarding: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Memoize the auth state change handler
  const handleAuthStateChange = useCallback(async (currentUser: User | null) => {
    console.log('Auth state changed:', currentUser ? 'User logged in' : 'User logged out', currentUser?.uid);
    
    setUser(currentUser);
    
    if (currentUser) {
      try {
        // Try to fetch user profile, but don't fail if it doesn't exist
        const userDocRef = doc(db, 'users', currentUser.uid);
        
        // Set a basic profile first
        const basicProfile: UserProfile = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          plan: 'free',
          onboardingCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        setUserProfile(basicProfile);
        
        // Then try to fetch full profile
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserProfile(userDoc.data() as UserProfile);
        } else {
          // Create the profile document
          await setDoc(userDocRef, basicProfile);
        }
        
      } catch (error: any) {
        console.warn('Could not fetch/create user profile, using basic profile:', error.message);
        // Don't throw - just continue with basic profile
      }
    } else {
      setUserProfile(null);
    }
    
    setLoading(false);
  }, []);
  

  useEffect(() => {
    // Set loading state immediately
    setLoading(true);
    
    // Use a local variable to track component mount state
    let isMounted = true;
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Only update state if component is still mounted
      if (!isMounted) return;
      handleAuthStateChange(user);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [handleAuthStateChange]);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Re-throw with more user-friendly message
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else if (error.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/invalid-login-credentials') {
        throw new Error('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      } else if (error.code === 'unavailable') {
        throw new Error('Service unavailable. This may be due to network issues. Please try again later.');
      } else if (error.message?.includes('Firebase is not available')) {
        throw new Error('Firebase is not available. Please try again later.');
      }
      
      throw new Error(error.message || 'An error occurred during login. Please try again.');
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      // Update display name
      await updateProfile(newUser, { displayName });
      
      // Create user profile
      const initialProfile: UserProfile = {
        displayName,
        email,
        photoURL: null,
        onboardingCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        plan: 'free'
      };
      
      await setDoc(doc(db, 'users', newUser.uid), initialProfile);
      setUserProfile(initialProfile);
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      // Re-throw with more user-friendly message
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already in use. Please try another email or log in instead.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address. Please check and try again.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Password is too weak. Please use a stronger password.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many sign up attempts. Please try again later.');
      } else if (error.code === 'unavailable') {
        throw new Error('Service unavailable. This may be due to network issues. Please try again later.');
      }
      
      throw new Error(error.message || 'An error occurred during sign up. Please try again.');
    }
  };

  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      
      // Re-throw with more user-friendly message
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else if (error.code === 'unavailable') {
        throw new Error('Service unavailable. This may be due to network issues. Please try again later.');
      }
      
      throw new Error(error.message || 'An error occurred during sign out. Please try again.');
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('No user found. Please log in and try again.');
    }

    try {
      const updatedData = {
        ...data,
        updatedAt: new Date(),
      };
      
      await updateDoc(doc(db, 'users', user.uid), updatedData);
      setUserProfile(prev => prev ? { ...prev, ...updatedData } : null);
    } catch (error: any) {
      console.error('Update profile error:', error);
      
      if (error.code === 'unavailable' || error.message?.includes('offline')) {
        throw new Error('You appear to be offline. Please check your internet connection and try again.');
      }
      
      throw new Error(error.message || 'An error occurred while updating your profile. Please try again.');
    }
  };

  const completeOnboarding = async (data: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('No user found. Please log in and try again.');
    }

    try {
      const onboardingData = {
        ...data,
        onboardingCompleted: true,
        updatedAt: new Date(),
      };
      
      await updateDoc(doc(db, 'users', user.uid), onboardingData);
      setUserProfile(prev => prev ? { ...prev, ...onboardingData } : null);
      router.push('/builder');
    } catch (error: any) {
      console.error('Complete onboarding error:', error);
      
      if (error.code === 'unavailable' || error.message?.includes('offline')) {
        throw new Error('You appear to be offline. Please check your internet connection and try again.');
      }
      
      throw new Error(error.message || 'An error occurred while completing onboarding. Please try again.');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        userProfile, 
        loading, 
        signIn, 
        signUp, 
        signOutUser, 
        updateUserProfile, 
        completeOnboarding 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
