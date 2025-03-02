import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminSession, getAdminUser } from '@/lib/services/auth-service';

/**
 * POST /api/admin/auth/revalidate - Revalidate admin session from localStorage token
 * This endpoint is used to restore a session when the server session is lost but a token exists in localStorage
 */
export async function POST(req: NextRequest) {
  try {
    // Get the token from the request body
    const body = await req.json();
    const { token } = body;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 400 }
      );
    }
    
    // Verify the token 
    const result = await verifyAdminSession(token);
    
    if (!result.valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }
    
    // Get user information
    const userId = result.userId;
    const user = userId ? await getAdminUser(userId) : null;
    
    // Set cookie with the session token
    const cookieStore = cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      sameSite: 'strict'
    });
    
    return NextResponse.json({
      success: true,
      authenticated: true,
      user: user ? {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles
      } : null
    });
    
  } catch (error) {
    console.error('Session revalidation error:', error);
    return NextResponse.json(
      { success: false, error: 'Session revalidation failed' },
      { status: 500 }
    );
  }
}