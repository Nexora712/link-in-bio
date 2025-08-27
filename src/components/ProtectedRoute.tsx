"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Only redirect if not already redirecting to prevent multiple redirects
    if (!loading && !user && !isRedirecting) {
      console.log('User not authenticated, redirecting to login');
      setIsRedirecting(true);
      router.push('/login');
    } else if (!loading && user) {
      console.log('User authenticated:', user.uid);
    } else if (loading) {
      console.log('Auth state still loading...');
    }
  }, [user, loading, router, isRedirecting]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-400 mb-3"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="mt-2 text-sm text-gray-500">Checking authentication...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Authentication Required</div>
          <div className="text-gray-600 mb-4">Redirecting to login...</div>
        </div>
      </div>
    );
  }
  
  // Render children if user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
