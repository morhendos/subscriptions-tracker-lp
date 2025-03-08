import { NextRequest, NextResponse } from 'next/server';
import { waitlistService } from '@/lib/services/waitlist-service';
import { withAdminAuth } from '@/lib/middleware/auth-middleware';

/**
 * GET /api/admin/waitlist - Get all waitlist entries (admin only)
 */
export const GET = withAdminAuth(async (req: NextRequest) => {
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
      { error: 'Failed to fetch waitlist entries', details: String(error) },
      { status: 500 }
    );
  }
});

/**
 * PATCH /api/admin/waitlist/:id - Update a waitlist entry (admin only)
 */
export const PATCH = withAdminAuth(async (req: NextRequest) => {
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
      { error: 'Failed to update waitlist entry', details: String(error) },
      { status: 500 }
    );
  }
});

/**
 * DELETE /api/admin/waitlist/:id - Delete a waitlist entry (admin only)
 */
export const DELETE = withAdminAuth(async (req: NextRequest) => {
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
      { error: 'Failed to delete waitlist entry', details: String(error) },
      { status: 500 }
    );
  }
});