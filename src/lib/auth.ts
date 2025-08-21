import { cookies } from 'next/headers';

declare global {
  // eslint-disable-next-line no-var
  var adminSessions: Map<string, {
    token: string;
    expiresAt: string;
    isAdmin: boolean;
  }>;
}

export async function validateAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin-session')?.value;
    
    if (!sessionToken || !global.adminSessions) {
      return false;
    }
    
    const session = global.adminSessions.get(sessionToken);
    if (!session) {
      return false;
    }
    
    // Check if session has expired
    if (new Date() > new Date(session.expiresAt)) {
      global.adminSessions.delete(sessionToken);
      return false;
    }
    
    return session.isAdmin;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
}