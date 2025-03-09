// Middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simplified middleware that only protects admin routes
export function middleware(request: NextRequest) {
  // We'll improve this later to check for actual authentication
  // For now, simply implement the protection without breaking the site
  
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ],
};
