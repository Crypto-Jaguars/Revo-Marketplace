'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRoleBasedRedirect, getDefaultRedirect } from '@/lib/auth-redirects';
import { UserRole } from '@/types/waitlist';

export default function RedirectTest() {
  const testRedirects = () => {
    const roles: UserRole[] = ['consumer', 'farmer', 'investor', 'partner', 'other'];
    const locales = ['en', 'es'];

    console.log('=== Testing Redirect URLs ===');

    roles.forEach((role) => {
      locales.forEach((locale) => {
        try {
          const url = getRoleBasedRedirect(role, locale);
          console.log(`✅ ${role} (${locale}): ${url}`);
        } catch (error) {
          console.error(`❌ ${role} (${locale}):`, error);
        }
      });
    });

    console.log('=== Testing Default Redirects ===');
    locales.forEach((locale) => {
      try {
        const url = getDefaultRedirect(locale);
        console.log(`✅ Default (${locale}): ${url}`);
      } catch (error) {
        console.error(`❌ Default (${locale}):`, error);
      }
    });

    console.log('=== Testing Edge Cases (undefined values) ===');
    try {
      const url1 = getRoleBasedRedirect(undefined as any, undefined as any);
      console.log(`✅ getRoleBasedRedirect(undefined, undefined): ${url1}`);
    } catch (error) {
      console.error(`❌ getRoleBasedRedirect(undefined, undefined):`, error);
    }

    try {
      const url2 = getDefaultRedirect(undefined as any);
      console.log(`✅ getDefaultRedirect(undefined): ${url2}`);
    } catch (error) {
      console.error(`❌ getDefaultRedirect(undefined):`, error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔗 Redirect URL Test</CardTitle>
        <CardDescription>Test redirect URLs for different roles and locales</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={testRedirects}>Test All Redirect URLs</Button>
        <p className="text-sm text-gray-600 mt-2">Check the browser console for results</p>
      </CardContent>
    </Card>
  );
}
