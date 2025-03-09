import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/auth/login' || 
    path === '/auth/error' || 
    path.startsWith('/api/auth/') || 
    path === '/' || 
    path.startsWith('/about') || 
    path.startsWith('/features') || 
    path.startsWith('/pricing') || 
    path.startsWith('/blog') || 
    path.startsWith('/contact') || 
    path.startsWith('/waitlist') || 
    path.startsWith('/terms') || 
    path.startsWith('/privacy') || 
    path.startsWith('/cookie-policy') || 
    path.startsWith('/gdpr');
  
  // Define admin paths that require admin role
  const isAdminPath = path.startsWith('/admin');

  // Define paths that require authentication
  const isAuthPath = isAdminPath;

  // If the path doesn't require authentication, continue
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get the token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // If the path requires authentication but the user is not authenticated,
  // redirect to the login page
  if (isAuthPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Check if the user has the admin role for admin paths
  if (isAdminPath) {
    const userRoles = token?.roles || [];
    const isAdmin = userRoles.some((role: any) => role.name === 'admin');
    
    if (!isAdmin) {
      // If the user doesn't have the admin role, redirect to an unauthorized page
      // or the homepage depending on your application's requirements
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If all checks pass, continue with the request
  return NextResponse.next();
}

// Fix: Only protect specific routes that need authentication
export const config = {
  matcher: [
    // Only match admin routes and API routes that need protection
    '/admin/:path*',
    '/api/admin/:path*',
    '/auth/:path*'
  ],
};
