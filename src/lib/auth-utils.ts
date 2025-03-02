import { NextRequest } from 'next/server';
import { DEFAULT_ADMIN_KEY } from '@/lib/constants';

// Store active sessions - in a production app, you'd use Redis or a database
// Note: This is cleared on server restart, so admins would need to login again
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

// Verify if a request has a valid admin session
export const verifyAdminSession = (req: NextRequest): boolean => {
  // Get the session ID from cookies
  const sessionId = req.cookies.get('admin_session')?.value;
  
  // First check: Valid session cookie
  if (sessionId && activeSessions[sessionId]) {
    return true;
  }
  
  // Second check (fallback): Check for API key in header for testing
  // Note: This is less secure but helps with serverless memory isolation issues
  const apiKey = req.headers.get('x-api-key');
  const validApiKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
  
  if (apiKey === validApiKey) {
    return true;
  }
  
  return false;
};