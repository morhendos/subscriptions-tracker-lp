'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Auth Provider Component
 * 
 * This component wraps the application with SessionProvider from NextAuth
 * to provide authentication state throughout the app.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
