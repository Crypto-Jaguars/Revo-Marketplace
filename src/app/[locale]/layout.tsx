'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import MarketplaceHeader from '@/components/marketplace/header/MarketplaceHeader';
import './globals.css';
import Footer from '@/components/footer/footer';

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

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const [currentLocale, setCurrentLocale] = useState(locale);
  const [messages, setMessages] = useState<Record<string, Record<string, string>> | undefined>(undefined);
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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-home-background bg-no-repeat bg-cover min-h-screen`}>
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
        <script src="/js/checkout-redirect.js" async></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-home-background bg-no-repeat bg-cover min-h-screen`}
      >
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          <div className="h-screen flex flex-col">
            <MarketplaceHeader />
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
