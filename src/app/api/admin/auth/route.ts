import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_ADMIN_KEY } from '@/lib/constants';
import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';
import { activeSessions, cleanupSessions } from '@/lib/auth-utils';

// Generate a session ID - in a real app, you'd use a proper JWT library
const generateSessionId = () => {
  return randomBytes(32).toString('hex');
};

/**
 * POST /api/admin/auth - Admin login
 */
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    // Verify the password against the environment variable or default
    const validPassword = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
    
    if (password !== validPassword) {
      return NextResponse.json(
        { error: 'Invalid admin password' },
        { status: 401 }
      );
    }
    
    // Generate a session ID
    const sessionId = generateSessionId();
    
    // Store session (with cleanup)
    cleanupSessions();
    activeSessions[sessionId] = { createdAt: new Date() };
    
    // Set cookie with the session ID
    // Using cookies API from Next.js
    cookies().set('admin_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      sameSite: 'strict'
    });
    
    return NextResponse.json({
      success: true,
      message: 'Authentication successful'
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
    // Get the session ID from cookies
    const sessionId = cookies().get('admin_session')?.value;
    
    if (!sessionId || !activeSessions[sessionId]) {
      // Check if API key is provided as fallback
      const apiKey = req.headers.get('x-api-key');
      const validApiKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
      
      if (apiKey === validApiKey) {
        return NextResponse.json({
          authenticated: true,
          method: 'api_key'
        });
      }
      
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }
    
    // Renew session
    activeSessions[sessionId].createdAt = new Date();
    
    return NextResponse.json({
      authenticated: true,
      method: 'session'
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
    // Get the session ID from cookies
    const sessionId = cookies().get('admin_session')?.value;
    
    if (sessionId && activeSessions[sessionId]) {
      // Delete the session
      delete activeSessions[sessionId];
    }
    
    // Clear the cookie
    cookies().set('admin_session', '', {
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