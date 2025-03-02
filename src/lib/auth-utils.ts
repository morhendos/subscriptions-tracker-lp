import { NextRequest } from 'next/server';
import { DEFAULT_ADMIN_KEY } from '@/lib/constants';

// Verify if a request has a valid admin session or API key
export const verifyAdminSession = (req: NextRequest): boolean => {
  // Check for API key in header
  const apiKey = req.headers.get('x-api-key');
  const validApiKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
  
  // If API key matches, admin is authenticated
  if (apiKey === validApiKey) {
    return true;
  }
  
  // Get the session ID from cookies
  const sessionId = req.cookies.get('admin_session')?.value;
  
  // Check if session cookie exists - simple check for now
  if (sessionId) {
    return true;
  }
  
  return false;
}