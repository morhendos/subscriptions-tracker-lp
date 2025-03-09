import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get the session and check if the user is authenticated
    const session = await getServerSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Check if the user has admin role
    if (!isAdmin(session.user)) {
      return NextResponse.json(
        { error: 'Not authorized' },
        { status: 403 }
      );
    }
    
    // Fetch waitlist entries
    const entries = await prisma.waitlistEntry.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching waitlist entries' },
      { status: 500 }
    );
  }
}
