import { NextResponse, NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

/**
 * This middleware adds security headers and handles authentication routes
 * to implement more secure password handling.
 * 
 * It works by:
 * 1. Adding security headers to all responses
 * 2. Securing auth endpoints to ensure HTTPS in production
 * 3. Will be extended with client-side password hashing in the future
 */

function addSecurityHeaders(response: NextResponse) {
  // Add security headers to help protect against common attacks
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Only allow HTTPS connections in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  return response;
}

// Function to check if this is an auth-related request
function isAuthRequest(request: NextRequest): boolean {
  return request.nextUrl.pathname.startsWith('/api/auth') || 
         request.nextUrl.pathname === '/login' ||
         request.nextUrl.pathname === '/signup';
}

// Function to handle auth-specific middleware functionality
async function handleAuthRequest(request: NextRequest): Promise<NextResponse | null> {
  // In production, redirect HTTP to HTTPS for auth endpoints
  if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url);
  }
  
  // For now, we'll just pass through auth requests
  // In the future, this is where client-side password hashing could be implemented
  return null;
}

// Main middleware function
export async function middleware(request: NextRequest) {
  // Special handling for auth requests
  if (isAuthRequest(request)) {
    const authResponse = await handleAuthRequest(request);
    if (authResponse) {
      return addSecurityHeaders(authResponse);
    }
  }
  
  // For all other requests, just continue with the response but add security headers
  return addSecurityHeaders(NextResponse.next());
}

// Define which routes this middleware applies to
export const config = {
  matcher: [
    // Apply to all routes
    '/(.*)',
    // Exclude static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
