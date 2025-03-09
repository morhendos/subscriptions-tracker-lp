import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;
    
    // Define admin paths that require admin role
    const isAdminPath = path.startsWith('/admin');
    const isProtectedApiPath = path.startsWith('/api/admin');
    
    // Only check auth for admin paths or protected API routes
    if (!isAdminPath && !isProtectedApiPath) {
      return NextResponse.next();
    }
    
    // Get the token for protected routes
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    // If no token, redirect to login
    if (!token) {
      console.log('[AUTH] No token found, redirecting to login');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    // For admin paths, check if user has admin role
    if (isAdminPath || isProtectedApiPath) {
      const userRoles = token?.roles || [];
      const isAdmin = userRoles.some((role: any) => 
        role.name === 'admin' || role === 'admin'
      );
      
      if (!isAdmin) {
        console.log('[AUTH] User does not have admin role, redirecting to home');
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
    
    // If all checks pass, continue with the request
    return NextResponse.next();
  } catch (error) {
    console.error('[AUTH MIDDLEWARE ERROR]', error);
    // On error, allow the request to proceed to avoid breaking the site
    return NextResponse.next();
  }
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ],
};
