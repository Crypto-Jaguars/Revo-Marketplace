'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import MarketplaceHeader from '@/components/marketplace/header/MarketplaceHeader';
import './globals.css';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/Headernew';

// Configure Plus Jakarta Sans with all required weights
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap', // Optimizes font loading and prevents FOIT
  preload: true,
  fallback: ['system-ui', 'arial'],
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const [currentLocale, setCurrentLocale] = useState(locale);
  const [messages, setMessages] = useState<Record<string, Record<string, string>> | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    const storedLocale = localStorage.getItem('language') || locale;
    if (storedLocale !== currentLocale) {
      const newPathname = window.location.pathname.replace(/^\/[a-z]{2}/, `/${storedLocale}`);
      if (newPathname !== window.location.pathname) {
        setCurrentLocale(storedLocale);
        router.replace(newPathname);
      }
    }
  }, [locale, currentLocale, router]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const importedMessages = (await import(`../../../messages/${currentLocale}.json`)).default;
        setMessages(importedMessages);
      } catch (error) {
        console.error(`Failed to load messages for locale: ${currentLocale}`, error);
      }
    };
    loadMessages();
  }, [currentLocale]);

  if (!messages) {
    return (
      <html lang={currentLocale}>
        <head>
          {/* Preload Plus Jakarta Sans for critical rendering */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
            as="style"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          />
        </head>
        <body
          className={`${plusJakartaSans.variable} font-sans antialiased bg-home-background bg-no-repeat bg-cover min-h-screen`}
        >
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang={currentLocale}>
      <head>
        {/* Preload Plus Jakarta Sans for optimal performance */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
        <script src="/js/checkout-redirect.js" async></script>
      </head>
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased bg-home-background bg-no-repeat bg-cover min-h-screen`}
      >
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <Toaster />
            <SonnerToaster position="top-right" />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
