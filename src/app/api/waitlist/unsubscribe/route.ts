import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { 
  generateUnsubscribeToken, 
  verifyUnsubscribeToken, 
  isUnsubscribed as checkIsUnsubscribed, 
  addToUnsubscribed, 
  isAlreadyUnsubscribed 
} from '@/services/email/unsubscribe';

// Helper to create a non-reversible hashed identifier for PII-safe logging
function hashEmail(email: string): string {
  return crypto
    .createHash('sha256')
    .update(email.toLowerCase().trim())
    .digest('hex')
    .substring(0, 16); // First 16 hex chars for stable identifier
}

function extractLocaleFromRequest(request: NextRequest): string {
  // Priority 1: Try to extract locale from current URL pathname
  const pathname = request.nextUrl.pathname;
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0 && ['en', 'es'].includes(pathSegments[0])) {
    return pathSegments[0];
  }
  
  // Priority 2: Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "es-ES,es;q=0.9,en;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().toLowerCase())
      .map(lang => lang.split('-')[0]); // Take just the language part (es from es-ES)
    
    // Find first supported language
    for (const lang of languages) {
      if (['en', 'es'].includes(lang)) {
        return lang;
      }
    }
  }
  
  // Fallback to English
  return 'en';
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const exp = searchParams.get('exp');

  if (!email || !token || !exp) {
    // Redirect to unsubscribe page without params for manual entry
    const locale = extractLocaleFromRequest(request);
    return NextResponse.redirect(new URL(`/${locale}/waitlist/unsubscribe`, request.url));
  }

  // Parse and validate expiration
  const expTimestamp = parseInt(exp, 10);
  if (isNaN(expTimestamp) || expTimestamp <= Math.floor(Date.now() / 1000)) {
    const locale = extractLocaleFromRequest(request);
    return NextResponse.redirect(
      new URL(`/${locale}/waitlist/unsubscribe?error=expired_token`, request.url)
    );
  }

  // Reconstruct payload for verification
  const emailLowercased = email.toLowerCase().trim();
  const payload = `${emailLowercased}:${expTimestamp}`;

  // Verify token
  if (!verifyUnsubscribeToken(payload, token)) {
    const locale = extractLocaleFromRequest(request);
    return NextResponse.redirect(
      new URL(`/${locale}/waitlist/unsubscribe?error=invalid_token`, request.url)
    );
  }

  // Redirect to unsubscribe page with valid email and token
  const locale = extractLocaleFromRequest(request);
  return NextResponse.redirect(
    new URL(`/${locale}/waitlist/unsubscribe?email=${encodeURIComponent(email)}&token=${token}&exp=${exp}`, request.url)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token, exp, reason } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Require signed token + expiration for state-changing unsubscribe
    if (!token || !exp) {
      return NextResponse.json(
        { success: false, message: 'Unsubscribe link required. Please use the link we sent to your email.' },
        { status: 401 }
      );
    }

    // Parse and validate expiration
    const expTimestamp = parseInt(exp, 10);
    if (isNaN(expTimestamp) || expTimestamp <= Math.floor(Date.now() / 1000)) {
      return NextResponse.json(
        { success: false, message: 'Unsubscribe link has expired' },
        { status: 401 }
      );
    }

    // Reconstruct payload for verification
    const emailLowercased = email.toLowerCase().trim();
    const payload = `${emailLowercased}:${expTimestamp}`;

    if (!verifyUnsubscribeToken(payload, token)) {
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

    // Log the unsubscribe with hashed email for PII/GDPR compliance
    console.log('Unsubscribed:', {
      emailHash: hashEmail(normalizedEmail),
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

