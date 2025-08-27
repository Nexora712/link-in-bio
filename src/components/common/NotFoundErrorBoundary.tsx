"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NotFoundErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // This effect will catch any errors that occur in the children
    const handleError = (event: ErrorEvent) => {
      console.error('Error caught by NotFoundErrorBoundary:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you are looking for does not exist or has been moved.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              router.push('/');
            }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default NotFoundErrorBoundary;