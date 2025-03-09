import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Important: This is exposed publicly but protected by a secret
// This allows fixing admin access even when login is broken
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
    
    // Find the admin user by email
    const email = data.email || 'morhendos@gmail.com';
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update the user
    const updates: any = {};
    
    if (data.verifyEmail) {
      updates.emailVerified = true;
    }
    
    // Only perform update if there are changes to make
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ 
        message: 'No updates requested',
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified
        }
      });
    }
    
    // Perform the update
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updates
    });
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        emailVerified: updatedUser.emailVerified
      }
    });
    
  } catch (error) {
    console.error('Admin fix API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal error fixing admin user', details: errorMessage },
      { status: 500 }
    );
  }
}
