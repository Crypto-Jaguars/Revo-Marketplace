'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import MarketplaceHeader from '@/components/marketplace/header/MarketplaceHeader';
import './globals.css';
import Footer from '@/components/footer/footer';
import { I18nProvider } from '@/i18n/I18nProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const [currentLocale, setCurrentLocale] = useState(locale);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedLocale = localStorage.getItem('language');
    const urlLocale = locale || 'es';

    // First visit: set default to URL locale (middleware already chose default 'es' when needed)
    if (!storedLocale) {
      try {
        localStorage.setItem('language', urlLocale);
        document.cookie = `NEXT_LOCALE=${urlLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
      } catch {}
      setCurrentLocale(urlLocale);
      return;
    }

    // If stored differs from URL, prefer explicit URL and sync storage/cookie. Do NOT redirect.
    if (storedLocale !== urlLocale) {
      try {
        localStorage.setItem('language', urlLocale);
        document.cookie = `NEXT_LOCALE=${urlLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
      } catch {}
    }
    setCurrentLocale(urlLocale);
  }, [locale]);

  return (
    <html lang={currentLocale}>
      <head>
        <script src="/js/checkout-redirect.js" async></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-home-background bg-no-repeat bg-cover min-h-screen`}>
        <I18nProvider>
          <div className="h-screen flex flex-col">
            <MarketplaceHeader />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <Toaster />
            <SonnerToaster position="top-right" />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
