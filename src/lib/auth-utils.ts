import { NextRequest } from 'next/server';
import { DEFAULT_ADMIN_KEY } from '@/lib/constants';
import { cookies } from 'next/headers';
import { verifyAdminSession as verifySession } from '@/lib/services/auth-service';

/**
 * Verify if a request has a valid admin session
 * This function can be called from API routes or server components
 */
export const verifyAdminSession = async (req: NextRequest): Promise<boolean> => {
  try {
    // Get the session token from cookies
    const sessionToken = req.cookies.get('admin_session')?.value;
    
    if (!sessionToken) {
      return false;
    }
    
    // Use the auth service to verify the session
    const result = await verifySession(sessionToken);
    return result.valid;
  } catch (error) {
    console.error('Error verifying admin session:', error);
    return false;
  }
};

/**
 * Simple helper to check if a cookie-based session is valid
 * For use in client components or pages
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};
