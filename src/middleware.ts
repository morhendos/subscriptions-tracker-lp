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
    path.startsWith('/api/public-diagnostics') ||
    path.startsWith('/api/auth-test') ||
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
    
    // MORE ROBUST ADMIN CHECK - handles MongoDB ObjectId inconsistencies
    const isAdmin = userRoles.some((role: any) => {
      // Handle string roles (simple case)
      if (typeof role === 'string') {
        return role === 'admin';
      }
      
      // Handle object roles (normal case)
      if (typeof role === 'object' && role !== null) {
        return role.name === 'admin';
      }
      
      return false;
    });
    
    console.log('[MIDDLEWARE] Admin check:', { 
      hasRoles: userRoles.length > 0,
      rolesType: typeof userRoles,
      isAdmin,
      userEmail: token?.email
    });
    
    if (!isAdmin) {
      // If the user doesn't have the admin role, redirect to an unauthorized page
      // or the homepage depending on your application's requirements
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If all checks pass, continue with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all paths except for static assets, api routes that don't need auth, and next-auth routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
