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
  try {
    const { email, password } = await req.json();
    
    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Authenticate the admin
    const result = await authenticateAdmin(email, password);
    
    if (!result.authenticated || !result.sessionToken) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Set a cookie with the session token
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
    
    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
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
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth - Check if the admin is authenticated
 */
export async function GET(req: NextRequest) {
  try {
    // Get the session token from cookies
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
    
    // Verify the session
    const { valid, userId } = await verifyAdminSession(sessionToken);
    
    if (!valid) {
      // Clear the invalid cookie
      cookieStore.set('admin_session', '', {
        expires: new Date(0)
      });
      
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
    
    // Refresh the session to extend its lifetime
    const refreshResult = await refreshAdminSession(sessionToken);
    
    if (refreshResult.success && refreshResult.newToken) {
      // Update the cookie with the new token
      cookieStore.set('admin_session', refreshResult.newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
        sameSite: 'strict'
      });
    }
    
    // Get user information
    const user = userId ? await getAdminUser(userId) : null;
    
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
      { authenticated: false, error: 'Session check failed' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/auth - Admin logout
 */
export async function DELETE(req: NextRequest) {
  try {
    // Get the session token from cookies
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;
    
    if (sessionToken) {
      // Invalidate the session
      await invalidateAdminSession(sessionToken);
    }
    
    // Clear the cookie
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
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}