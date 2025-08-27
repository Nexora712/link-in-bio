import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

// Template interface
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  tags?: string[];
  popularity?: number;
  createdAt?: string;
  codeRef?: string;
  tier?: 'free' | 'pro';
  styles?: {
    background: string;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    borderRadius: string;
    [key: string]: any;
  };
}

// Function to fetch templates from Firestore
export const getTemplates = async (): Promise<Template[]> => {
  try {
    const templatesRef = collection(db, 'templates');
    const snapshot = await getDocs(templatesRef);
    
    const templates: Template[] = [];
    snapshot.forEach((doc) => {
      templates.push({ 
        id: doc.id, 
        ...doc.data() 
      } as Template);
    });
    
    return templates;
  } catch (error) {
    console.error('Error fetching templates from Firebase:', error);
    return [];
  }
};
