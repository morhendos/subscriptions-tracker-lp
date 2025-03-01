import { NextRequest, NextResponse } from 'next/server';
import { WaitlistService } from '@/lib/services/waitlist-service';
import { waitlistEntrySchema } from '@/lib/validations/waitlist-schema';
import { headers } from 'next/headers';

/**
 * Handle POST requests to add users to the waitlist
 */
export async function POST(request: NextRequest) {
  try {
    // Get request data
    const body = await request.json();
    
    // Validate the request data
    const result = waitlistEntrySchema.safeParse(body);
    
    if (!result.success) {
      const errors = result.error.format();
      return NextResponse.json({ 
        success: false, 
        errors 
      }, { status: 400 });
    }
    
    // Get validated data
    const { email, name, source, referrer } = result.data;

    // Get IP address and user agent for analytics
    const headersList = headers();
    const ipAddress = headersList.get('x-forwarded-for') || 
                      headersList.get('x-real-ip') || 
                      request.ip || 
                      'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    // Actual referrer from the header or the body
    const actualReferrer = headersList.get('referer') || referrer || null;
    
    // Add to waitlist
    const response = await WaitlistService.addToWaitlist({
      email,
      name,
      ipAddress: String(ipAddress),
      userAgent,
      source: source || 'landing-page',
      referrer: actualReferrer,
      tags: ['waitlist'],
      metadata: {
        joinedAt: new Date().toISOString(),
        utm: Object.fromEntries(
          [...request.nextUrl.searchParams.entries()]
            .filter(([key]) => key.startsWith('utm_'))
        )
      }
    });
    
    if (!response.success) {
      if (response.code === 'EMAIL_EXISTS') {
        return NextResponse.json({ 
          success: false, 
          message: 'This email is already on our waitlist',
          code: 'EMAIL_EXISTS'
        }, { status: 409 });  // Conflict status code
      }
      
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to join waitlist',
        code: response.code
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true, 
      message: 'Successfully added to waitlist'
    }, { status: 201 });  // Created status code
    
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * Handle GET requests to check if an email is already on the waitlist
 */
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email parameter is required' },
        { status: 400 }
      );
    }
    
    const isRegistered = await WaitlistService.isEmailRegistered(email);
    
    return NextResponse.json({
      success: true,
      isRegistered
    });
    
  } catch (error) {
    console.error('Check waitlist error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check waitlist status' },
      { status: 500 }
    );
  }
}
