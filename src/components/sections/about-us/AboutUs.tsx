import React from 'react';
import FeatureCard from './FeatureCard';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Users, Sprout } from 'lucide-react';
import Image from 'next/image';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useInView } from 'react-intersection-observer';

export function AboutUs() {
  const t = useTranslations('AboutUs');

  // Use typewriter effect for the main title with default 100ms speed
  const typewriterTitle = useTypewriter(t('title'));

  // Add scroll animation
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-forest-500" />,
      title: t('features.smartContracts.title'),
      description: t('features.smartContracts.description'),
    },
    {
      icon: <Users className="w-7 h-7 text-forest-500" />,
      title: t('features.trustSystem.title'),
      description: t('features.trustSystem.description'),
    },
    {
      icon: <Sprout className="w-7 h-7 text-forest-500" />,
      title: t('features.supplyChain.title'),
      description: t('features.supplyChain.description'),
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-radial from-emerald-500/20 via-emerald-600/10 to-transparent">
      <Image
        src="/images/crops-cottage.png"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-20"
      />
      <div
        ref={ref}
        className={`container mx-auto px-6 max-w-6xl transition-all duration-700 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-forest-800 mb-8 text-center">
          {typewriterTitle}
        </h2>
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto text-center mb-16">
          {t('description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
