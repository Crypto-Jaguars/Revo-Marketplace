import { NextRequest, NextResponse } from 'next/server';
import { waitlistFormSchema } from '@/components/modules/waitlist/schema';
import type { WaitlistResponse, WaitlistSubmission } from '@/types/waitlist';
import { sendWaitlistConfirmationEmail } from '@/services/email/waitlistEmail';
import connectDB from '@/lib/mongodb';
import { WaitlistSubmissionModel } from '@/models/WaitlistSubmission';
import { getGeolocationFromIP } from '@/services/analytics/geolocation';

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
    
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    cleanupRateLimits();
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    const validationResult = waitlistFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid data' },
        { status: 400 }
      );
    }

    const { name, email, role, consent } = validationResult.data;

    const existingSubmission = await WaitlistSubmissionModel.findOne({ 
      email: email.toLowerCase() 
    });
    
    if (existingSubmission) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
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
    await submission.save();

    // Send email
    const emailSent = await sendWaitlistConfirmationEmail(submission.toObject(), 'en');
    if (emailSent) {
      submission.emailSent = true;
      submission.emailSentAt = new Date();
      await submission.save();
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
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    
    const authHeader = request.headers.get('authorization');
    
    // Simple auth check for admin access
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const totalSignups = await WaitlistSubmissionModel.countDocuments({ unsubscribed: { $ne: true } });
    
    // Get signup counts by role
    const signupsByRole = await WaitlistSubmissionModel.aggregate([
      { $match: { unsubscribed: { $ne: true } } },
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const roleStats = signupsByRole.reduce((acc, { _id, count }) => {
      if (_id) acc[_id] = count;
      return acc;
    }, {} as Record<string, number>);

    // Get recent signups
    const recentSignups = await WaitlistSubmissionModel
      .find({ unsubscribed: { $ne: true } })
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
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}