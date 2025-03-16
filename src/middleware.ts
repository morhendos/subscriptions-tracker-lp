import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Function to safely log token contents without circular references
function debugToken(token: any) {
  try {
    const seen = new WeakSet();
    const safeStr = JSON.stringify(token, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return value;
    }, 2);
    
    return safeStr;
  } catch (err) {
    return `[Error serializing token: ${err}]`;
  }
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log('[MIDDLEWARE:DEBUG] ===== Middleware called =====');
  console.log('[MIDDLEWARE:DEBUG] URL:', request.url);
  console.log('[MIDDLEWARE:DEBUG] Method:', request.method);
  console.log('[MIDDLEWARE:DEBUG] Environment:', process.env.NODE_ENV);
  
  const path = request.nextUrl.pathname;
  console.log('[MIDDLEWARE:DEBUG] Path:', path);

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
  
  console.log('[MIDDLEWARE:DEBUG] isPublicPath:', isPublicPath);
  console.log('[MIDDLEWARE:DEBUG] isAdminPath:', isAdminPath);
  console.log('[MIDDLEWARE:DEBUG] isAuthPath:', isAuthPath);

  // If the path doesn't require authentication, continue
  if (isPublicPath) {
    console.log('[MIDDLEWARE:DEBUG] Public path, allowing access');
    return NextResponse.next();
  }

  // Get the token
  console.log('[MIDDLEWARE:DEBUG] Getting JWT token');
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  console.log('[MIDDLEWARE:DEBUG] Token retrieved:', !!token);
  if (token) {
    console.log('[MIDDLEWARE:DEBUG] Token debug:', debugToken(token));
  }

  // Check if the user is authenticated
  const isAuthenticated = !!token;
  console.log('[MIDDLEWARE:DEBUG] isAuthenticated:', isAuthenticated);

  // If the path requires authentication but the user is not authenticated,
  // redirect to the login page
  if (isAuthPath && !isAuthenticated) {
    console.log('[MIDDLEWARE:DEBUG] Auth path but not authenticated, redirecting to login');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Check if the user has the admin role for admin paths
  if (isAdminPath) {
    console.log('[MIDDLEWARE:DEBUG] Admin path, checking for admin role');
    const userRoles = token?.roles || [];
    console.log('[MIDDLEWARE:DEBUG] User roles:', typeof userRoles, Array.isArray(userRoles), debugToken(userRoles));
    
    // SUPER VERBOSE role check logging
    let roleCheckDetails = [];
    
    // MORE ROBUST ADMIN CHECK - handles MongoDB ObjectId inconsistencies
    const isAdmin = userRoles.some((role: any, index: number) => {
      console.log(`[MIDDLEWARE:DEBUG] Checking role ${index}:`, typeof role, role);
      
      // Handle string roles (simple case)
      if (typeof role === 'string') {
        const result = role === 'admin';
        roleCheckDetails.push(`Role ${index} (string): "${role}" => ${result}`);
        return result;
      }
      
      // Handle object roles (normal case)
      if (typeof role === 'object' && role !== null) {
        const result = role.name === 'admin';
        roleCheckDetails.push(`Role ${index} (object): name="${role.name}" => ${result}`);
        return result;
      }
      
      roleCheckDetails.push(`Role ${index} (${typeof role}): unsupported format => false`);
      return false;
    });
    
    console.log('[MIDDLEWARE:DEBUG] Role check details:', roleCheckDetails.join(', '));
    console.log('[MIDDLEWARE:DEBUG] Is admin:', isAdmin);
    
    if (!isAdmin) {
      console.log('[MIDDLEWARE:DEBUG] Not admin, redirecting to home page');
      // If the user doesn't have the admin role, redirect to an unauthorized page
      // or the homepage depending on your application's requirements
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    console.log('[MIDDLEWARE:DEBUG] Admin access granted');
  }

  // If all checks pass, continue with the request
  console.log('[MIDDLEWARE:DEBUG] All checks passed, continuing with request');
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all paths except for static assets, api routes that don't need auth, and next-auth routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};