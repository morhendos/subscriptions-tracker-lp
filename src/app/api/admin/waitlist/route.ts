import { NextRequest, NextResponse } from 'next/server';
import { waitlistService } from '@/lib/services/waitlist-service';
import { DEFAULT_ADMIN_KEY, FEATURES } from '@/lib/constants';

// Helper for authentication - basic implementation for now
// In a real app, you would use a more robust auth system
const isAuthenticated = async (req: NextRequest): Promise<boolean> => {
  // If we're in development mode and auth bypass is enabled, always authenticate
  if (FEATURES.BYPASS_ADMIN_AUTH) {
    console.log('Development mode: Bypassing authentication');
    return true;
  }

  // Simple API key check
  const apiKey = req.headers.get('x-api-key');
  
  // Use environment variable if set, otherwise fall back to the default key
  const validApiKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
  
  // In development, log the authentication details (but not in production)
  if (FEATURES.DEBUG_MODE) {
    console.log('Auth check details:');
    console.log(`- Received key: ${apiKey ? '[present]' : '[missing]'}`);
    console.log(`- Using env var: ${process.env.ADMIN_API_KEY ? 'Yes' : 'No (using default)'}`);
  }
  
  return apiKey === validApiKey;
};

/**
 * GET /api/admin/waitlist - Get all waitlist entries (admin only)
 */
export async function GET(req: NextRequest) {
  // Check authentication
  if (!await isAuthenticated(req)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Invalid or missing API key' },
      { status: 401 }
    );
  }

  try {
    const entries = await waitlistService.getAllEntries();
    const stats = await waitlistService.getStats();
    
    return NextResponse.json({
      success: true,
      entries,
      stats
    });
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist entries' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/waitlist/:id - Update a waitlist entry (admin only)
 */
export async function PATCH(req: NextRequest) {
  // Check authentication
  if (!await isAuthenticated(req)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Invalid or missing API key' },
      { status: 401 }
    );
  }

  try {
    const { id, ...updates } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }
    
    const success = await waitlistService.updateEntry(id, updates);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update entry or entry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Entry updated successfully'
    });
  } catch (error) {
    console.error('Error updating waitlist entry:', error);
    return NextResponse.json(
      { error: 'Failed to update waitlist entry' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/waitlist/:id - Delete a waitlist entry (admin only)
 */
export async function DELETE(req: NextRequest) {
  // Check authentication
  if (!await isAuthenticated(req)) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Invalid or missing API key' },
      { status: 401 }
    );
  }

  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }
    
    const success = await waitlistService.deleteEntry(id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete entry or entry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting waitlist entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete waitlist entry' },
      { status: 500 }
    );
  }
}
