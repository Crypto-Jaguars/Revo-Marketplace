'use client';

import Bounded from '@/components/Bounded';
import HeroSection from '@/components/herosection/heroSection';
import { useTranslations } from 'next-intl';
import { AboutUs } from '@/components/sections/about-us/AboutUs';
import { HowWeWork } from '@/components/sections/how-we-work/HowWeWork';
import CtaSection from '@/components/cta/CtaSection';
import HeroSectionNew from '@/components/herosection/herosectionnew';
import { AnimatedSection } from '@/components/AnimatedSection/AnimatedSection';
import ProducerCTA from '@/components/cta/producer-Cta';
import { NewMissionVision } from '@/components/about/NewMissionVision';
import RegistrationHeroSection from '@/components/herosection/RegistrationHeroSection';


export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <main className="flex flex-col w-full">
      <AnimatedSection>
        <HeroSectionNew />
      </AnimatedSection>
      <AnimatedSection>
        <RegistrationHeroSection />
      </AnimatedSection>
      <AnimatedSection>
        <AboutUs />
      </AnimatedSection>
      <AnimatedSection>
        <NewMissionVision />
      </AnimatedSection>
      <AnimatedSection>
        <HowWeWork />
      </AnimatedSection>
      <AnimatedSection>
        <CtaSection />
      </AnimatedSection>
      <AnimatedSection>
        <ProducerCTA />
      </AnimatedSection>
    </main>
  );
}
