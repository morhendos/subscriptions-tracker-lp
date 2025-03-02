import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/services/auth-service';

/**
 * POST /api/admin/auth/verify - Verify a session token
 * This endpoint is called by the middleware to verify sessions
 */
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    
    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }
    
    const result = await verifyAdminSession(token);
    
    return NextResponse.json({
      valid: result.valid,
      userId: result.userId
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { valid: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}