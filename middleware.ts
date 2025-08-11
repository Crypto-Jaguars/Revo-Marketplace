import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE')?.value || 'es';
    const path = req.nextUrl.pathname === '/' ? '' : req.nextUrl.pathname;
    const url = new URL(`/${locale}${path}${req.nextUrl.search}`, req.url);
    const res = NextResponse.redirect(url);
    if (!req.cookies.get('NEXT_LOCALE')) {
      res.cookies.set('NEXT_LOCALE', locale, { path: '/', sameSite: 'lax' });
    }
    return res;
  }
}
