import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  authenticateAdmin, 
  verifyAdminSession, 
  refreshAdminSession, 
  invalidateAdminSession,
  getAdminUser,
  cleanupExpiredSessions
} from '@/lib/services/auth-service';

/**
 * POST /api/admin/auth - Admin login
 */
export async function POST(req: NextRequest) {
  console.log("POST /api/admin/auth - Processing admin login request");
  
  try {
    // Parse the request body
    const body = await req.json();
    console.log("Login attempt for email:", body.email);
    
    // Check required fields
    const { email, password } = body;
    if (!email || !password) {
      console.log("Missing email or password");
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Extract user agent and IP for security tracking
    const userAgent = req.headers.get('user-agent') || undefined;
    const ipAddress = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') || 
                    undefined;
    
    // Try to authenticate
    console.log("Authenticating admin user...");
    const result = await authenticateAdmin(email, password, userAgent, ipAddress);
    console.log("Authentication result:", result);
    
    if (!result.authenticated || !result.sessionToken) {
      console.log("Authentication failed");
      return NextResponse.json(
        { error: 'Invalid email or password', debug: 'Authentication failed in authenticateAdmin function' },
        { status: 401 }
      );
    }
    
    // Cleanup expired sessions in background (non-blocking)
    cleanupExpiredSessions().catch(err => {
      console.error('Background session cleanup error:', err);
    });
    
    // Set a cookie with the session token
    console.log("Setting session cookie");
    const cookieStore = cookies();
    
    // Use a long expiration to help with persistence
    const expiresIn = 30 * 24 * 60 * 60; // 30 days in seconds
    
    cookieStore.set('admin_session', result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn, 
      path: '/',
      sameSite: 'lax' // Changed from 'strict' to 'lax' to help with redirects
    });
    
    // Get user information
    const user = result.userId ? await getAdminUser(result.userId) : null;
    console.log("User data retrieved:", user ? "success" : "failed");
    
    // Debug information
    console.log("Cookie set with name: admin_session");
    console.log("Cookie value (first 10 chars):", result.sessionToken?.substring(0, 10) + "...");
    console.log("Cookie maxAge:", expiresIn);
    
    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token: result.sessionToken, // Return the token for localStorage backup
      user: user ? {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles
      } : null
    });
  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth - Check if the admin is authenticated
 */
export async function GET(req: NextRequest) {
  console.log("GET /api/admin/auth - Checking authentication status");
  
  try {
    // Get the session token from cookies
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;
    
    console.log("Session token present:", !!sessionToken);
    if (sessionToken) {
      console.log("Session token (first 10 chars):", sessionToken.substring(0, 10) + "...");
    }
    
    // Debug: show all cookies
    const allCookies = cookieStore.getAll();
    console.log("All cookies:", allCookies.map(c => c.name));
    
    if (!sessionToken) {
      console.log("No session token found");
      return NextResponse.json(
        { authenticated: false, reason: "no_session" },
        { status: 401 }
      );
    }
    
    // Verify the session
    console.log("Verifying session...");
    const { valid, userId } = await verifyAdminSession(sessionToken);
    console.log("Session valid:", valid, "User ID:", userId);
    
    if (!valid) {
      // Clear the invalid cookie
      console.log("Session is invalid, clearing cookie");
      cookieStore.set('admin_session', '', {
        expires: new Date(0),
        path: '/'
      });
      
      return NextResponse.json(
        { authenticated: false, reason: "invalid_session" },
        { status: 401 }
      );
    }
    
    // Try to refresh the session to extend its lifetime
    // This is done in the background to avoid blocking the response
    refreshAdminSession(sessionToken).then(({ success, newToken }) => {
      if (success && newToken) {
        console.log("Session token refreshed successfully");
        
        // Note: We can't update cookies here since it's in a Promise callback
        // This is handled in the admin layout with the revalidate endpoint
      }
    }).catch(error => {
      console.error("Error refreshing session:", error);
    });
    
    // Get user information
    console.log("Getting user information...");
    const user = userId ? await getAdminUser(userId) : null;
    console.log("User found:", !!user);
    
    return NextResponse.json({
      authenticated: true,
      user: user ? {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles
      } : null
    });
  } catch (error) {
    console.error('Admin session check error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Session check failed', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth - Admin logout
 */
export async function DELETE(req: NextRequest) {
  console.log("DELETE /api/admin/auth - Processing logout request");
  
  try {
    // Get the session token from cookies
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;
    
    console.log("Session token present:", !!sessionToken);
    
    if (sessionToken) {
      // Invalidate the session
      console.log("Invalidating session...");
      await invalidateAdminSession(sessionToken);
    }
    
    // Clear the cookie
    console.log("Clearing session cookie");
    cookieStore.set('admin_session', '', {
      expires: new Date(0),
      path: '/'
    });
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed', details: String(error) },
      { status: 500 }
    );
  }
}