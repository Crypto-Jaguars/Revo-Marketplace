import { NextRequest, NextResponse } from 'next/server';
import { waitlistFormSchema } from '@/components/modules/waitlist/schema';
import type { WaitlistResponse, WaitlistSubmission } from '@/types/waitlist';
import { sendWaitlistConfirmationEmail } from '@/services/email/waitlistEmail';
import connectDB from '@/lib/mongodb';
import { WaitlistSubmissionModel } from '@/models/WaitlistSubmission';
import { getGeolocationFromIP } from '@/services/analytics/geolocation';
import crypto from 'crypto';

// MongoDB error type for duplicate key errors
interface MongoDBError extends Error {
  code?: number | string;
  message: string;
}

function extractClientIP(request: NextRequest): string {
  // Priority 1: Use NextRequest.ip when available (Edge Runtime)
  if (request.ip) {
    return normalizeIP(request.ip);
  }

  // Priority 2: First hop from x-forwarded-for (most trusted)
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const firstIP = xForwardedFor.split(',')[0].trim();
    if (firstIP) {
      return normalizeIP(firstIP);
    }
  }

  // Priority 3: x-real-ip header
  const xRealIP = request.headers.get('x-real-ip');
  if (xRealIP) {
    return normalizeIP(xRealIP.trim());
  }

  // Fallback
  return 'unknown';
}

function normalizeIP(ip: string): string {
  const trimmedIP = ip.trim();

  // Convert IPv6-mapped IPv4 addresses (::ffff:a.b.c.d) to plain IPv4
  if (trimmedIP.startsWith('::ffff:')) {
    const ipv4Part = trimmedIP.substring(7);
    // Validate it looks like an IPv4 address
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ipv4Part)) {
      return ipv4Part;
    }
  }

  return trimmedIP;
}

function extractLocaleFromRequest(
  request: NextRequest,
  submissionData?: { locale?: string }
): string {
  // Priority 1: Locale from submission data
  if (submissionData?.locale && ['en', 'es'].includes(submissionData.locale)) {
    return submissionData.locale;
  }

  // Priority 2: Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "es-ES,es;q=0.9,en;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase())
      .map((lang) => lang.split('-')[0]); // Take just the language part (es from es-ES)

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

const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 3;

const requestCounts = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requestData = requestCounts.get(ip);

  if (!requestData) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (requestData.count >= MAX_REQUESTS_PER_IP) {
    return false;
  }

  requestData.count++;
  return true;
}

function cleanupRateLimits() {
  const now = Date.now();
  const entries = Array.from(requestCounts.entries());
  for (const [ip, data] of entries) {
    if (now - data.timestamp > RATE_LIMIT_WINDOW) {
      requestCounts.delete(ip);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const ip = extractClientIP(request);

    cleanupRateLimits();

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ success: false, message: 'Too many requests' }, { status: 429 });
    }

    const body = await request.json();

    const validationResult = waitlistFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 });
    }

    const { name, email, role, consent } = validationResult.data;

    // Additional explicit consent validation for security
    if (consent !== true) {
      return NextResponse.json(
        { success: false, message: 'Consent is required to join the waitlist' },
        { status: 400 }
      );
    }

    const existingSubmission = await WaitlistSubmissionModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingSubmission) {
      // Check if user previously unsubscribed
      if (existingSubmission.unsubscribed) {
        // Reactivate their subscription
        existingSubmission.unsubscribed = false;
        existingSubmission.unsubscribedAt = undefined;
        existingSubmission.consent = consent;
        existingSubmission.role = role;
        existingSubmission.name = name?.trim();
        await existingSubmission.save();

        // Send welcome back email
        const locale = extractLocaleFromRequest(request, existingSubmission.toObject());
        const emailSent = await sendWaitlistConfirmationEmail(
          existingSubmission.toObject(),
          locale
        );
        if (emailSent) {
          existingSubmission.emailSent = true;
          existingSubmission.emailSentAt = new Date();
          await existingSubmission.save();
        }

        return NextResponse.json({
          success: true,
          message: 'Welcome back! You have been re-added to the waitlist.',
          data: {
            id: existingSubmission._id,
            email: existingSubmission.email,
            role: existingSubmission.role,
          },
        });
      }

      // User is already registered and active
      return NextResponse.json(
        { success: false, message: 'This email is already registered on our waitlist' },
        { status: 409 }
      );
    }

    const url = new URL(request.url);
    const utmSource = url.searchParams.get('utm_source');
    const referrer = request.headers.get('referer');
    const userAgent = request.headers.get('user-agent');

    const geoData = await getGeolocationFromIP(ip);

    const submissionData = {
      name: name?.trim(),
      email: email.toLowerCase().trim(),
      role,
      consent,
      source: utmSource || (referrer ? 'referral' : 'direct'),
      ip,
      userAgent,
      country: geoData.country,
      sessionId: body.sessionId,
      emailSent: false,
    };

    const submission = new WaitlistSubmissionModel(submissionData);

    // Attempt initial save with duplicate key error handling
    try {
      await submission.save();
    } catch (saveError: unknown) {
      const mongoError = saveError as MongoDBError;
      // Handle duplicate key errors (E11000)
      if (
        mongoError.code === 11000 ||
        mongoError.code === 'E11000' ||
        (mongoError.message && mongoError.message.includes('E11000'))
      ) {
        return NextResponse.json(
          { success: false, message: 'This email is already registered on our waitlist' },
          { status: 409 }
        );
      }

      // Re-throw other errors to be handled by outer catch
      throw mongoError;
    }

    // Send email after successful save
    const locale = extractLocaleFromRequest(request, submission.toObject());
    const emailSent = await sendWaitlistConfirmationEmail(submission.toObject(), locale);

    // Update email status with error handling
    if (emailSent) {
      submission.emailSent = true;
      submission.emailSentAt = new Date();

      try {
        await submission.save();
      } catch (updateError: unknown) {
        console.error('Failed to update email status:', updateError);
        // Continue execution - the main submission was successful
        // Email was sent, but we couldn't update the status flag
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Added to waitlist!',
      data: {
        id: submission._id,
        email: submission.email,
        role: submission.role,
      },
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');

    // Constant-time comparison for admin access to prevent timing attacks
    const expectedToken = process.env.ADMIN_API_KEY;
    if (!authHeader || !expectedToken || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const providedToken = authHeader.slice('Bearer '.length);

    // Convert to buffers for constant-time comparison
    const providedBuffer = Buffer.from(providedToken, 'utf8');
    const expectedBuffer = Buffer.from(expectedToken, 'utf8');

    // Check buffer lengths first
    if (providedBuffer.length !== expectedBuffer.length) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Constant-time comparison
    if (!crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const totalSignups = await WaitlistSubmissionModel.countDocuments({
      unsubscribed: { $ne: true },
    });

    // Get signup counts by role
    const signupsByRole = await WaitlistSubmissionModel.aggregate([
      { $match: { unsubscribed: { $ne: true } } },
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ]);

    const roleStats = signupsByRole.reduce(
      (acc, { _id, count }) => {
        if (_id) acc[_id] = count;
        return acc;
      },
      {} as Record<string, number>
    );

    // Get recent signups
    const recentSignups = await WaitlistSubmissionModel.find({ unsubscribed: { $ne: true } })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('email role createdAt')
      .lean();

    const stats = {
      totalSignups,
      signupsByRole: roleStats,
      recentSignups,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}
