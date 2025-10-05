'use client';

import Bounded from '@/components/Bounded';
import HeroSection from '@/components/herosection/heroSection';
import { useTranslations } from 'next-intl';
import { AboutUs } from '@/components/sections/about-us/AboutUs';
import { HowWeWork } from '@/components/sections/how-we-work/HowWeWork';
import CtaSection from '@/components/cta/CtaSection';
import HeroSectionNew from '@/components/herosection/herosectionnew';
import { AnimatedSection } from '@/components/AnimatedSection/AnimatedSection';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex flex-col w-full">
      <AnimatedSection>
        <HeroSectionNew />
      </AnimatedSection>
      <AnimatedSection>
        <AboutUs />
      </AnimatedSection>
      <AnimatedSection>
        <HowWeWork />
      </AnimatedSection>
      <AnimatedSection>
        <CtaSection />
      </AnimatedSection>
    </main>
  );
}
