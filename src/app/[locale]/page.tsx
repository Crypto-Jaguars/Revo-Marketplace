
'use client';

import Bounded from '@/components/Bounded';
import HeroSection from '@/components/herosection/heroSection';
import { useTranslations } from 'next-intl';
import { AboutUs } from '@/components/sections/about-us/AboutUs';
import { HowItWorks } from '@/components/sections/how-it-works/HowItWorks';
import CtaSection from '@/components/cta/CtaSection';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex flex-col w-full">
      <HeroSection />
      <Bounded>
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="flex flex-col items-center w-full space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold text-primary_green">
              {t('title')}
              <span className="block text-3xl md:text-5xl text-gray-800 mt-2">{t('subtitle')}</span>
            </h1>
            <p className="text-base md:text-lg max-w-2xl text-gray-600 text-center">
              {t('description')}
            </p>
          </div>
        </div>
      </Bounded>
      <AboutUs />
      <HowItWorks />
      <CtaSection />
    </main>
  );
}
