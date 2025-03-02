import { NextRequest, NextResponse } from 'next/server';

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
    
    try {
      // Call the auth endpoint to verify the session
      const response = await fetch(`${request.nextUrl.origin}/api/admin/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: sessionToken }),
      });
      
      const data = await response.json();
      
      // If the session is invalid, redirect to login
      if (!data.valid) {
        const url = new URL('/admin/login', request.url);
        url.searchParams.set('callbackUrl', request.nextUrl.pathname);
        url.searchParams.set('error', 'SessionExpired');
        return NextResponse.redirect(url);
      }
      
      // If the session is valid, allow the request
      return NextResponse.next();
    } catch (error) {
      console.error('Admin session verification error:', error);
      
      // If there's an error, redirect to login
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      url.searchParams.set('error', 'VerificationError');
      return NextResponse.redirect(url);
    }
  }
  
  // For all other routes, just proceed
  return NextResponse.next();
}

// Only run middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
};