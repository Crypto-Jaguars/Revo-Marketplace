'use client';

import Bounded from '@/components/Bounded';
import HeroSection from '@/components/herosection/heroSection';
import { useTranslations } from 'next-intl';
import { AboutUs } from '@/components/sections/about-us/AboutUs';
import { HowWeWork } from '@/components/sections/how-we-work/HowWeWork';
import CtaSection from '@/components/cta/CtaSection';
import HeroSectionNew from '@/components/herosection/herosectionnew';
import RegistrationHeroSection from '@/components/herosection/RegistrationHeroSection';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex flex-col w-full">
      <HeroSectionNew />
      <RegistrationHeroSection />
      <AboutUs />
      <HowWeWork />
      <CtaSection />
    </main>
  );
}
