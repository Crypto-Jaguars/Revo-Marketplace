import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds
const RATE_LIMIT_MAX_ATTEMPTS = 5;

// Rate limiter types
interface RateLimitEntry {
  count: number;
  firstAttemptTs: number;
}

// Global rate limiter storage
// NOTE: In production with multiple instances, replace with Redis or similar shared store
declare global {
  // eslint-disable-next-line no-var
  var adminLoginRateLimit: Map<string, RateLimitEntry> | undefined;
}

// Extract client IP from request with fallbacks
function extractClientIP(request: NextRequest): string {
  // Priority 1: Use NextRequest.ip when available (Edge Runtime)
  if (request.ip) {
    return request.ip;
  }
  
  // Priority 2: First hop from x-forwarded-for (most trusted)
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    const firstIP = xForwardedFor.split(',')[0].trim();
    if (firstIP) {
      return firstIP;
    }
  }
  
  // Priority 3: x-real-ip header
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp.trim();
  }
  
  // Priority 4: CF-Connecting-IP (Cloudflare)
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  
  // Fallback to default when IP extraction fails
  return 'unknown';
}

// Check and update rate limit for IP
function checkRateLimit(ip: string): boolean {
  // Initialize global rate limit map if not exists
  if (!global.adminLoginRateLimit) {
    global.adminLoginRateLimit = new Map();
  }
  
  const now = Date.now();
  const entry = global.adminLoginRateLimit.get(ip);
  
  if (!entry) {
    // First attempt from this IP
    global.adminLoginRateLimit.set(ip, {
      count: 1,
      firstAttemptTs: now
    });
    return true;
  }
  
  // Check if window has expired
  if (now - entry.firstAttemptTs > RATE_LIMIT_WINDOW_MS) {
    // Reset the window
    global.adminLoginRateLimit.set(ip, {
      count: 1,
      firstAttemptTs: now
    });
    return true;
  }
  
  // Increment count within the window
  entry.count++;
  global.adminLoginRateLimit.set(ip, entry);
  
  // Check if limit exceeded
  return entry.count <= RATE_LIMIT_MAX_ATTEMPTS;
}

// Cleanup expired entries to prevent memory leaks
function cleanupExpiredRateLimits(): void {
  if (!global.adminLoginRateLimit) return;
  
  const now = Date.now();
  const expiredEntries: string[] = [];
  
  // Convert to array to avoid iterator issues
  const entries = Array.from(global.adminLoginRateLimit.entries());
  for (const [ip, entry] of entries) {
    if (now - entry.firstAttemptTs > RATE_LIMIT_WINDOW_MS) {
      expiredEntries.push(ip);
    }
  }
  
  // Remove expired entries
  expiredEntries.forEach(ip => {
    global.adminLoginRateLimit?.delete(ip);
  });
}

export async function POST(request: NextRequest) {
  try {
    // Extract client IP for rate limiting
    const clientIP = extractClientIP(request);
    
    // Perform cleanup occasionally (every ~20 requests to avoid overhead)
    if (Math.random() < 0.05) {
      cleanupExpiredRateLimits();
    }
    
    // Check rate limit before validating credentials
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }
    
    const { adminKey } = await request.json();
    
    // Check if admin key is configured
    if (!process.env.ADMIN_API_KEY) {
      console.error('ADMIN_API_KEY environment variable is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Validate admin key using timing-safe comparison
    if (!adminKey || typeof adminKey !== 'string') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Convert to buffers for secure comparison
    const providedKeyBuffer = Buffer.from(adminKey, 'utf8');
    const expectedKeyBuffer = Buffer.from(process.env.ADMIN_API_KEY, 'utf8');
    
    // Check buffer lengths first - timingSafeEqual throws on unequal lengths
    if (providedKeyBuffer.length !== expectedKeyBuffer.length) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Timing-safe comparison
    if (!crypto.timingSafeEqual(providedKeyBuffer, expectedKeyBuffer)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Create a session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Store session in memory (in production, use Redis or database)
    const sessionData = {
      token: sessionToken,
      expiresAt: expiresAt.toISOString(),
      isAdmin: true
    };
    
    // Store session in global memory (replace with proper store in production)
    if (!global.adminSessions) {
      global.adminSessions = new Map();
    }
    global.adminSessions.set(sessionToken, sessionData);
    
    // Set secure HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Logged in successfully' 
    });
    
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin-session')?.value;
    
    if (sessionToken && global.adminSessions) {
      global.adminSessions.delete(sessionToken);
    }
    
    // Clear the cookie
    cookieStore.delete('admin-session');
    
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
    
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}