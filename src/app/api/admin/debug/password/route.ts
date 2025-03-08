import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

/**
 * Debug endpoint to check password verification
 * This is for development use only and should be removed in production
 */
export async function POST(req: NextRequest) {
  // Only allow in development or testing environments
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Debug endpoints are not available in production' },
      { status: 403 }
    );
  }
  
  try {
    const { email, password } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const prisma = new PrismaClient();
    
    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        roles: true
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // DO NOT DO THIS IN PRODUCTION!
    // This is only for debugging purposes to help identify login issues
    return NextResponse.json({
      email: user.email,
      hashedPasswordFormat: user.hashedPassword ? {
        length: user.hashedPassword.length,
        prefix: user.hashedPassword.substring(0, 10) + '...',
        type: typeof user.hashedPassword
      } : null,
      passwordCheck: password ? {
        providedPassword: password,
        // Simply check if the password is the same as the hashed password (not secure but helpful for debugging)
        matches: user.hashedPassword === password,
      } : { message: 'No password provided for comparison' },
      roles: user.roles
    });
  } catch (error) {
    console.error('Debug password check error:', error);
    return NextResponse.json(
      { error: 'Failed to check password', details: String(error) },
      { status: 500 }
    );
  }
}