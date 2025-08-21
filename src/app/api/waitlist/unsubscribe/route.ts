import { NextRequest, NextResponse } from 'next/server';
import { 
  generateUnsubscribeToken, 
  verifyUnsubscribeToken, 
  isUnsubscribed as checkIsUnsubscribed, 
  addToUnsubscribed, 
  isAlreadyUnsubscribed 
} from '@/services/email/unsubscribe';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    // Redirect to unsubscribe page without params for manual entry
    return NextResponse.redirect(new URL('/en/waitlist/unsubscribe', request.url));
  }

  // Verify token
  if (!verifyUnsubscribeToken(email, token)) {
    return NextResponse.redirect(
      new URL('/en/waitlist/unsubscribe?error=invalid_token', request.url)
    );
  }

  // Redirect to unsubscribe page with valid email and token
  return NextResponse.redirect(
    new URL(`/en/waitlist/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`, request.url)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token, reason } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // If token is provided, verify it
    if (token && !verifyUnsubscribeToken(email, token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid unsubscribe link' },
        { status: 401 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already unsubscribed
    if (await isAlreadyUnsubscribed(normalizedEmail)) {
      return NextResponse.json({
        success: true,
        message: 'You have already been unsubscribed from our waitlist',
      });
    }

    // Add to unsubscribed list
    await addToUnsubscribed(normalizedEmail, reason);

    // Log the unsubscribe (in production, update database)
    console.log('Unsubscribed:', {
      email: normalizedEmail,
      reason: reason || 'No reason provided',
      timestamp: new Date().toISOString(),
    });

    // TODO: In production, also:
    // 1. Update the database to mark user as unsubscribed
    // 2. Send confirmation email (optional)
    // 3. Track analytics event

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from the waitlist',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

