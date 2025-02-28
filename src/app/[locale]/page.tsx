'use client';

import Bounded from '@/components/Bounded';
import HeroSection from '@/components/herosection/heroSection';
import { useTranslations } from 'next-intl';
import AboutUs from '@/components/sections/about-us/AboutUs';
import HowItWorks from '@/components/sections/how-it-works/HowItWorks';
import CtaSection from '@/components/cta/CtaSection';

export default function Home() {
  const t = useTranslations('HomePage');

  return (

    <>
      <HeroSection />
      <Bounded center={true}>
        <div className="flex flex-col justify-center items-center w-full h-full mt-0 md:mt-20 gap-4">

    <Bounded center={true}>
      <div className="flex flex-col items-center w-full space-y-16">
        <div className="flex flex-col justify-center items-center w-full text-center">

          <h1 className="flex flex-col items-center">
            <span className="text-[40px] md:text-[80px] font-bold text-primary_green">
              {t('title')}
            </span>
            <span className="text-[40px] md:text-[80px] text-white">{t('subtitle')}</span>
          </h1>
          <p className="text-[16px] md:text-[20px] w-full md:max-w-[60%] text-white text-center">
            {t('description')}
          </p>
        </div>

      </Bounded>
    </>

        <AboutUs />
        <HowItWorks />
        <CtaSection />
      </div>

  );
}