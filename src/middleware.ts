import { NextResponse, NextRequest } from 'next/server';

/**
 * Very simple middleware that just adds security headers without changing any auth behavior
 */
export function middleware(request: NextRequest) {
  // Get the response
  const response = NextResponse.next();
  
  // Add basic security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

// Only apply to auth routes
export const config = {
  matcher: ['/api/auth/:path*', '/auth/:path*'],
};
