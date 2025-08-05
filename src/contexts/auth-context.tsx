"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userProfileData = userDoc.data() as UserProfile;
            setUserProfile(userProfileData);
            if (!userProfileData.onboardingCompleted) {
              router.push('/onboarding');
            }
          } else {
            // Create initial user profile
            const initialProfile: UserProfile = {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              onboardingCompleted: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            await setDoc(doc(db, 'users', user.uid), initialProfile);
            setUserProfile(initialProfile);
            router.push('/onboarding');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
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
      };
      
      await setDoc(doc(db, 'users', newUser.uid), initialProfile);
      setUserProfile(initialProfile);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const updatedData = {
        ...data,
        updatedAt: new Date(),
      };
      
      await updateDoc(doc(db, 'users', user.uid), updatedData);
      setUserProfile(prev => prev ? { ...prev, ...updatedData } : null);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const completeOnboarding = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const onboardingData = {
        ...data,
        onboardingCompleted: true,
        updatedAt: new Date(),
      };
      
      await updateDoc(doc(db, 'users', user.uid), onboardingData);
      setUserProfile(prev => prev ? { ...prev, ...onboardingData } : null);
      router.push('/dashboard');
    } catch (error) {
      console.error('Complete onboarding error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      signIn,
      signUp,
      signOutUser,
      updateUserProfile,
      completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
