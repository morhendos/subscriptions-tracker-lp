import { NextRequest, NextResponse } from 'next/server';

// Default admin key for fallback
const DEFAULT_ADMIN_KEY = 'admin-secret-key';

/**
 * GET /api/admin/auth - Get admin API key
 * 
 * This endpoint provides the admin API key to authorized client-side code.
 * In development, it returns a key without authentication.
 * In production, this should be properly secured.
 */
export async function GET(req: NextRequest) {
  // In a real production app, this would check for a valid session
  // For now, we're keeping it simple
  
  // Use the environment variable if available, otherwise use the default
  const apiKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
  
  return NextResponse.json({
    success: true,
    apiKey
  });
}
