/**
 * NextAuth API Route
 * 
 * This route handles all NextAuth.js authentication functionality
 * and provides improved error handling for production environments.
 */

import { authOptions } from '@/lib/auth';
import NextAuth from 'next-auth';

// Security utilities to sanitize data before sending to client
function sanitizeResponse(response: Response): Promise<Response> {
  return response.clone().json()
    .then(data => {
      // Check if the data contains sensitive information
      if (data && typeof data === 'object') {
        // Remove any password fields from the response
        const sanitized = sanitizeObject(data);
        
        // Create a new response with sanitized data
        return new Response(JSON.stringify(sanitized), {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      }
      
      // If not JSON or no sensitive data, return original response
      return response;
    })
    .catch(() => {
      // If parsing fails (not JSON), just return the original response
      return response;
    });
}

// Recursively sanitize an object to remove sensitive fields
function sanitizeObject(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  // Handle objects
  const result: any = {};
  for (const key in obj) {
    // Skip password-related keys
    if (/password/i.test(key)) {
      continue;
    }
    
    // Recursively sanitize nested objects
    result[key] = sanitizeObject(obj[key]);
  }
  
  return result;
}

// Add monitoring and error handling wrapper
const nextAuthHandler = NextAuth(authOptions);

// Create a wrapped handler to catch errors and sanitize responses
async function wrappedHandler(req: Request, context: any) {
  try {
    console.log(`[NEXTAUTH] Request to ${req.url}`);
    
    // Clone the request to inspect and redact sensitive logs
    const requestClone = req.clone();
    
    // Process the original request with NextAuth
    const response = await nextAuthHandler(req, context);
    
    if (response.status >= 400) {
      console.error(`[NEXTAUTH] Error response: ${response.status}`);
    }
    
    // Sanitize the response before returning it
    return await sanitizeResponse(response);
  } catch (error) {
    console.error('[NEXTAUTH] Unhandled error:', error);
    
    // Return a generic error response
    return new Response(
      JSON.stringify({ error: 'Internal authentication error' }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
          'X-XSS-Protection': '1; mode=block'
        } 
      }
    );
  }
}

export { wrappedHandler as GET, wrappedHandler as POST };
