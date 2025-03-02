import { NextResponse } from 'next/server';
import { waitlistService } from '@/lib/services/waitlist-service';
import { FEATURES } from '@/config/features';

/**
 * Validates an email address
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * POST /api/waitlist - Add a new entry to the waitlist
 */
export async function POST(request: Request) {
  // Check if waitlist is enabled
  if (!FEATURES.WAITLIST_ENABLED) {
    return NextResponse.json(
      { error: 'Waitlist is currently disabled' },
      { status: 403 }
    );
  }

  try {
    const { email, name, source = 'waitlist_page', interests } = await request.json();
    
    // Validate inputs
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Add to waitlist
    const result = await waitlistService.addToWaitlist({
      name,
      email,
      source,
      interests
    });
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 409 } // Conflict status for duplicate emails
      );
    }
    
    // Optional: Send confirmation email
    // await sendConfirmationEmail(email, name);
    
    return NextResponse.json(
      { success: true, message: 'Added to waitlist', id: result.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/waitlist - Get waitlist stats (protected)
 * Only returns limited stats for public use
 */
export async function GET() {
  try {
    const stats = await waitlistService.getStats();
    
    // Only return limited public information
    return NextResponse.json({
      success: true,
      totalMembers: stats.total
    });
  } catch (error) {
    console.error('Error fetching waitlist stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist statistics' },
      { status: 500 }
    );
  }
}
