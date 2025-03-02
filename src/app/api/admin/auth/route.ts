import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { 
  authenticateAdmin, 
  verifyAdminSession, 
  refreshAdminSession, 
  invalidateAdminSession,
  getAdminUser 
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
    
    // Try to authenticate
    console.log("Authenticating admin user...");
    const result = await authenticateAdmin(email, password);
    console.log("Authentication result:", result);
    
    if (!result.authenticated || !result.sessionToken) {
      console.log("Authentication failed");
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Set a cookie with the session token
    console.log("Setting session cookie");
    const cookieStore = cookies();
    cookieStore.set('admin_session', result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      sameSite: 'strict'
    });
    
    // Get user information
    const user = result.userId ? await getAdminUser(result.userId) : null;
    console.log("User data retrieved:", user ? "success" : "failed");
    
    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      sessionToken: result.sessionToken, // Send token back to store in localStorage
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
        expires: new Date(0)
      });
      
      return NextResponse.json(
        { authenticated: false, reason: "invalid_session" },
        { status: 401 }
      );
    }
    
    // Refresh the session to extend its lifetime
    console.log("Refreshing session...");
    const refreshResult = await refreshAdminSession(sessionToken);
    console.log("Session refresh result:", refreshResult);
    
    if (refreshResult.success && refreshResult.newToken) {
      // Update the cookie with the new token
      console.log("Updating session cookie with new token");
      cookieStore.set('admin_session', refreshResult.newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
        sameSite: 'strict'
      });
    }
    
    // Get user information
    console.log("Getting user information...");
    const user = userId ? await getAdminUser(userId) : null;
    console.log("User found:", !!user);
    
    return NextResponse.json({
      authenticated: true,
      token: refreshResult.newToken || sessionToken, // Send token back for localStorage
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
      expires: new Date(0)
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