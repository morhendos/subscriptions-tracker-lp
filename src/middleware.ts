import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from './lib/services/auth-service';

export async function middleware(request: NextRequest) {
  // Only apply middleware to admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for the login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Get the token from the cookie
    const sessionToken = request.cookies.get('admin_session')?.value;
    
    // If there's no token, redirect to login
    if (!sessionToken) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    
    // Verify the session
    const { valid } = await verifyAdminSession(sessionToken);
    
    // If the session is invalid, redirect to login
    if (!valid) {
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      url.searchParams.set('error', 'SessionExpired');
      return NextResponse.redirect(url);
    }
    
    // If the session is valid, allow the request
    return NextResponse.next();
  }
  
  // For all other routes, just proceed
  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
};