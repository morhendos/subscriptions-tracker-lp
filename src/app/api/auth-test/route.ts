import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Get parameters from request
    const data = await request.json();
    
    // Validate the secret key (set this in your environment variables)
    const expectedSecret = process.env.ADMIN_FIX_SECRET;
    if (!expectedSecret) {
      return NextResponse.json(
        { error: 'Admin fix secret not configured on server' },
        { status: 500 }
      );
    }
    
    if (data.secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Invalid secret' },
        { status: 403 }
      );
    }
    
    // Validate required parameters
    if (!data.email || !data.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase() }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found', email: data.email },
        { status: 404 }
      );
    }
    
    // Test password verification
    const isPasswordValid = await bcrypt.compare(data.password, user.hashedPassword);
    
    // Parse roles for debugging
    let roles;
    try {
      if (typeof user.roles === 'string') {
        roles = JSON.parse(user.roles);
      } else {
        roles = user.roles;
      }
    } catch (e) {
      roles = { error: 'Failed to parse roles', original: String(user.roles).substring(0, 100) };
    }

    // Return detailed but safe information for debugging
    return NextResponse.json({
      success: true,
      message: 'Auth test results',
      user: {
        id: user.id.substring(0, 8) + '...',
        email: user.email,
        emailVerified: user.emailVerified,
        passwordValid: isPasswordValid,
        hashedPasswordLength: user.hashedPassword.length,
        rolesType: typeof user.roles,
        roles: roles,
        failedLoginAttempts: user.failedLoginAttempts || 0,
      }
    });
    
  } catch (error) {
    console.error('Auth test API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal error running auth test', details: errorMessage },
      { status: 500 }
    );
  }
}
