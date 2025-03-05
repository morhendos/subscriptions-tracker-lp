import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminSession } from '@/lib/services/auth-service';

/**
 * Result of admin authentication check
 */
export interface AdminAuthResult {
  authenticated: boolean;
  reason?: string;
  userId?: string;
}

/**
 * Helper to check if a request is authenticated as admin
 * @param req The Next.js request object
 * @returns Authentication result with user ID if successful
 */
export const checkAdminAuth = async (req: NextRequest): Promise<AdminAuthResult> => {
  // Get the session token from cookies
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('admin_session')?.value;
  
  if (!sessionToken) {
    return { authenticated: false, reason: 'no_session' };
  }
  
  // Use the auth service to verify the session
  const result = await verifyAdminSession(sessionToken);
  
  if (!result.valid) {
    return { authenticated: false, reason: 'invalid_session' };
  }
  
  return { authenticated: true, userId: result.userId };
};

/**
 * Higher-order function to create a Next.js route handler that requires admin authentication
 * @param handler The handler function to wrap with authentication
 * @returns A new handler that checks authentication before calling the original handler
 */
export function withAdminAuth<T>(handler: (req: NextRequest, authResult: AdminAuthResult) => Promise<T>) {
  return async (req: NextRequest) => {
    // Check authentication
    const authResult = await checkAdminAuth(req);
    
    if (!authResult.authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized', reason: authResult.reason },
        { status: 401 }
      );
    }
    
    // If authenticated, call the handler with the authentication result
    return handler(req, authResult);
  };
}
