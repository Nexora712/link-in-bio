"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

const DashboardPage = () => {
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserPlan(userDoc.data().plan);
        }
      }
      setLoading(false);
    };

    fetchUserPlan();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-4">My Dashboard</h1>
          <p className="text-lg mb-2">Welcome, {user?.email}!</p>
          <p className="text-lg mb-6">Your current plan: <span className="font-semibold capitalize">{userPlan || 'Free'}</span></p>
          <Link href="/pricing" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Upgrade Plan
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
