import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/**
 * Retrieves waitlist entries for admin use
 * This route is protected by authentication middleware
 */
export async function GET(req: NextRequest) {
  try {
    // Get the authenticated session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has admin role
    if (!session || !isAdmin(session.user)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;
    
    // Build the filter
    const filter: any = {};
    
    // Add status filter if provided
    if (status) {
      filter.status = status;
    }
    
    // Add search filter if provided
    if (search) {
      filter.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    // Get waitlist entries with pagination
    const waitlistEntries = await prisma.waitlistEntry.findMany({
      where: filter,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip,
    });
    
    // Get total count for pagination
    const totalCount = await prisma.waitlistEntry.count({
      where: filter,
    });
    
    return NextResponse.json({
      entries: waitlistEntries,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error in waitlist admin API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Update a waitlist entry
 */
export async function PUT(req: NextRequest) {
  try {
    // Get the authenticated session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has admin role
    if (!session || !isAdmin(session.user)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { id, status, notes } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing waitlist entry ID' },
        { status: 400 }
      );
    }
    
    // Update the waitlist entry
    const updatedEntry = await prisma.waitlistEntry.update({
      where: { id },
      data: {
        status: status || undefined,
        notes: notes || undefined,
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error('Error updating waitlist entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Delete a waitlist entry
 */
export async function DELETE(req: NextRequest) {
  try {
    // Get the authenticated session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has admin role
    if (!session || !isAdmin(session.user)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Get the waitlist entry ID from the query string
    const id = req.nextUrl.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing waitlist entry ID' },
        { status: 400 }
      );
    }
    
    // Delete the waitlist entry
    await prisma.waitlistEntry.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting waitlist entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
