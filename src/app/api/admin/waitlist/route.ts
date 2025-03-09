import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { waitlistService } from '@/lib/services/waitlist-service';

// Admin API key for situations where session-based auth isn't available
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'admin-secret-key';

/**
 * Checks if the request is authorized using either a session or API key
 */
async function isAuthorized(req: NextRequest) {
  // First try session-based authentication
  const session = await getServerSession(authOptions);
  if (session && isAdmin(session.user)) {
    return true;
  }
  
  // Fallback to API key authentication
  const apiKey = req.headers.get('x-api-key');
  return apiKey === ADMIN_API_KEY;
}

/**
 * Retrieves waitlist entries for admin use
 * This route is protected by authentication middleware
 */
export async function GET(req: NextRequest) {
  try {
    // Check authorization
    const authorized = await isAuthorized(req);
    if (!authorized) {
      console.warn('Unauthorized waitlist API access attempt');
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Get all waitlist entries
    const entries = await waitlistService.getAllEntries();
    
    // Get stats
    const stats = await waitlistService.getStats();
    
    return NextResponse.json({
      entries,
      stats,
    });
  } catch (error) {
    console.error('Error in waitlist admin API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        entries: [],
        stats: {
          total: 0,
          contacted: 0,
          converted: 0,
          lastWeek: 0
        }
      },
      { status: 500 }
    );
  }
}

/**
 * Update a waitlist entry
 */
export async function PATCH(req: NextRequest) {
  try {
    // Check authorization
    const authorized = await isAuthorized(req);
    if (!authorized) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { id, contacted, convertedToCustomer, notes } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing waitlist entry ID' },
        { status: 400 }
      );
    }
    
    // Build update object with only provided fields
    const updateData: any = {};
    if (contacted !== undefined) updateData.contacted = contacted;
    if (convertedToCustomer !== undefined) updateData.convertedToCustomer = convertedToCustomer;
    if (notes !== undefined) updateData.notes = notes;
    
    // Update the waitlist entry
    const success = await waitlistService.updateEntry(id, updateData);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Entry not found or update failed' },
        { status: 404 }
      );
    }
    
    // Fetch the updated entry to return
    const updatedEntry = await waitlistService.getEntry(id);
    
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
    // Check authorization
    const authorized = await isAuthorized(req);
    if (!authorized) {
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
    const success = await waitlistService.deleteEntry(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Entry not found or delete failed' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting waitlist entry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
