import React from 'react';
import FeatureCard from './FeatureCard';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Users, Leaf } from 'lucide-react';

export function AboutUs() {
  const t = useTranslations('AboutUs');

  // Usar una función para crear los iconos con color blanco forzado
  const createWhiteIcon = (Icon: React.ElementType) => (
    <div className="w-12 h-12 bg-primary_green p-2 rounded-full flex items-center justify-center">
      <Icon size={30} color="#FFFFFF" fill="none" strokeWidth={2} />
    </div>
  );

  const features = [
    {
      icon: createWhiteIcon(ShieldCheck),
      title: t('features.smartContracts.title'),
      description: t('features.smartContracts.description'),
    },
    {
      icon: createWhiteIcon(Users),
      title: t('features.trustSystem.title'),
      description: t('features.trustSystem.description'),
    },
    {
      icon: createWhiteIcon(Leaf),
      title: t('features.supplyChain.title'),
      description: t('features.supplyChain.description'),
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-primary_green mb-8 text-center">
          {t('title')}
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto text-center mb-16">
          {t('description')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
