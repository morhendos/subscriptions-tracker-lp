'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

type SafeAuthProviderProps = {
  children: ReactNode;
};

/**
 * Safe Auth Provider Component
 * 
 * This component wraps SessionProvider and adds error handling to prevent
 * client-side errors related to environment variables or initialization.
 */
export default function SafeAuthProvider({ children }: SafeAuthProviderProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Clear any previous errors on mount
    setError(null);
  }, []);

  // Render the children even if there was an error with auth
  // This ensures the basic site functionality works regardless of auth state
  return (
    <>
      {error ? (
        // Just render children if auth provider fails
        <>{children}</>
      ) : (
        // Try to use the SessionProvider
        <SessionProvider onError={(error) => {
          console.error('NextAuth session error:', error);
          setError(error.message);
        }}>
          {children}
        </SessionProvider>
      )}
    </>
  );
}
