import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * GET /api/debug/session - Debug endpoint to examine all session-related data
 */
export async function GET(req: NextRequest) {
  try {
    // Get all cookies
    const cookieStore = cookies();
    const allCookies = cookieStore.getAll();
    
    // Specifically look for the admin session cookie
    const sessionCookie = cookieStore.get('admin_session');
    
    // Get all request headers
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    // Environment info
    const env = {
      NODE_ENV: process.env.NODE_ENV,
      // Add other relevant environment variables here
    };
    
    // Get the auth header specifically
    const authHeader = req.headers.get('Authorization');
    
    return NextResponse.json({
      time: new Date().toISOString(),
      cookies: {
        all: allCookies,
        session: sessionCookie || null,
      },
      headers,
      environment: env,
      url: req.url,
      authHeader,
    });
  } catch (error) {
    console.error('Session debug error:', error);
    return NextResponse.json(
      { error: 'Debug failed', details: String(error) },
      { status: 500 }
    );
  }
}