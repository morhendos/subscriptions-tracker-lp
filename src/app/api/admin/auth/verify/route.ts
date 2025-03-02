import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/services/auth-service';

/**
 * POST /api/admin/auth/verify - Verify a session token
 * This endpoint is called by the middleware to verify sessions
 */
export async function POST(req: NextRequest) {
  console.log("POST /api/admin/auth/verify - Verifying session token");
  
  try {
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body, null, 2));
    
    const { token } = body;
    
    if (!token) {
      console.log("No token provided in request");
      return NextResponse.json({ valid: false, reason: "no_token" }, { status: 400 });
    }
    
    console.log("Verifying token:", token.substring(0, 10) + "...");
    const result = await verifyAdminSession(token);
    console.log("Verification result:", result);
    
    return NextResponse.json({
      valid: result.valid,
      userId: result.userId
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { valid: false, error: 'Verification failed', details: String(error) },
      { status: 500 }
    );
  }
}