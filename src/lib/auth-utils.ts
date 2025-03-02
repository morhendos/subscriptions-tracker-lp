import { NextRequest } from 'next/server';
import { DEFAULT_ADMIN_KEY } from '@/lib/constants';

// Store active sessions - in a production app, you'd use Redis or a database
// Note: This is cleared on server restart, so admins would need to login again
// In production, you should replace this with a real database or Redis store
export const activeSessions: Record<string, { createdAt: Date }> = {};

// Clean up expired sessions (older than 24 hours)
export const cleanupSessions = (): void => {
  const now = new Date();
  Object.keys(activeSessions).forEach(sessionId => {
    const sessionAge = now.getTime() - activeSessions[sessionId].createdAt.getTime();
    // 24 hours in milliseconds
    if (sessionAge > 24 * 60 * 60 * 1000) {
      delete activeSessions[sessionId];
    }
  });
};

/**
 * Verify if a request has a valid admin session
 * This function handles multiple authentication methods in order of security:
 * 1. Session cookie (most secure)
 * 2. API Key header (for programmatic access)
 * 3. Request context API key (for middleware)
 */
export const verifyAdminSession = (req: NextRequest): boolean => {
  // First method: Session cookie 
  const sessionId = req.cookies.get('admin_session')?.value;
  if (sessionId && activeSessions[sessionId]) {
    // Update the session timestamp to extend its life
    activeSessions[sessionId].createdAt = new Date();
    return true;
  }
  
  // Second method: API key in header
  const apiKey = req.headers.get('x-api-key');
  const validApiKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
  if (apiKey === validApiKey) {
    return true;
  }
  
  // Third method: API key in request context (for middleware or server components)
  const requestApiKey = (req as any).apiKey;
  if (requestApiKey === validApiKey) {
    return true;
  }
  
  return false;
};

/**
 * Creates a middleware handler to attach API key from authorization header
 * This is useful for server-side rendering where cookies aren't available
 */
export const withApiKeyFromHeader = (req: NextRequest): NextRequest => {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey) {
    // Attach the API key to the request object for later verification
    (req as any).apiKey = apiKey;
  }
  return req;
};