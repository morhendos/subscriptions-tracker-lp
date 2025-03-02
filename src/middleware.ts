import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple middleware that logs the cookies for each admin request
 * This helps us trace what's happening with sessions
 */
export async function middleware(request: NextRequest) {
  // Only apply to admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Don't interfere with the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Log the cookie for debugging
    const sessionCookie = request.cookies.get('admin_session');
    console.log('MIDDLEWARE - Request path:', request.nextUrl.pathname);
    console.log('MIDDLEWARE - Session cookie present:', !!sessionCookie);
    
    // Check if the session cookie exists
    if (!sessionCookie) {
      // If no cookie, redirect to login
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    // If cookie exists, allow the request
    return NextResponse.next();
  }
  
  // For non-admin routes, proceed normally
  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
};