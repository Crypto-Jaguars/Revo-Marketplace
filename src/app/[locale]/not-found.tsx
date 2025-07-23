'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Breadcrumb from '@/components/shared/Breadcrumb';
import useAnalytics from '@/hooks/useAnalytics';

const NotFoundPage = () => {
  const router = useRouter();
  const t = useTranslations('notFound');
  const { trackEvent } = useAnalytics();

  const handleHomeRedirect = () => {
    trackEvent('404_error_navigated_home', { from: '404 page' });
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {' '}
      {/* bg-background */}
      <div className="mt-32 pl-60 w-full max-w-5xl">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: '404 Error', href: '/404', isCurrent: true },
          ]}
        />
      </div>
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        {/* Title responsive */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-light text-[#375B42] tracking-wide mb-4">
          {t('title')}
        </h1>
        {/* Description responsive */}
        <p className="text-base sm:text-lg text-gray-600 font-bold mb-8">{t('description')}</p>
        {/* Button color #2e4a36*/}
        <button
          className="mt-6 bg-[#375B42] hover:bg-[#2e4a36] font-medium text-lg px-8 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#375B42]"
          style={{ color: 'white' }}
          onClick={handleHomeRedirect}
        >
          {t('buttonText')}
        </button>
      </main>
    </div>
  );
};

export default NotFoundPage;
