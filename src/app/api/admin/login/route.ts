import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { adminKey } = await request.json();
    
    // Validate admin key
    if (adminKey !== process.env.ADMIN_API_KEY) {
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