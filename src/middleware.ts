import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
export default createMiddleware(routing);

export const config = {
  // insted of using de i use en
  matcher: ['/', '/(en|es)/:path*'],
};
