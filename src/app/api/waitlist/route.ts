import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    
    // Validate inputs
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }
    
    // For now, just log the data
    // In a real implementation, store in a database
    console.log('Waitlist submission:', { email, name });
    
    // Future implementation: 
    // - Store in database
    // - Send confirmation email
    // - Add to marketing list
    
    return NextResponse.json(
      { success: true, message: 'Added to waitlist' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
