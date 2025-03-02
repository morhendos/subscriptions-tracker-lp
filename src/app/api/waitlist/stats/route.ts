import { NextRequest, NextResponse } from 'next/server';
import { waitlistService } from '@/lib/services/waitlist-service';

/**
 * Handle GET requests to retrieve waitlist statistics
 * This endpoint is protected and should only be accessible to admin users
 */
export async function GET(request: NextRequest) {
  try {
    // Check for API key authorization - replace with proper auth in production
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.ADMIN_API_KEY;
    
    if (!apiKey || !authHeader || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get waitlist statistics
    const stats = await waitlistService.getStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Waitlist stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve waitlist statistics' },
      { status: 500 }
    );
  }
}
