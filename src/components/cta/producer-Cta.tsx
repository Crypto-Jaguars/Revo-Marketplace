'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const ProducerCTA: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-400 via-forest-500 to-forest-600 shadow-xl"
        style={{
          background: 'radial-gradient(circle at center, #5ba373, #3e8654, #2f6a42)',
        }}
      >
        <div className="relative z-10 mx-auto max-w-4xl px-8 py-16 text-center">
          {/* Title - Bilingual */}
          <h2
            className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: 'white' }}
          >
            {t('producerCTA.title', { fallback: 'Are You a Producer?' })}
          </h2>

          {/* Subtitle in Spanish (if applicable) */}
          <h3 className="mb-8 text-xl font-semibold text-forest-100 sm:text-2xl">
            {t('producerCTA.subtitle', { fallback: '¿Eres un Productor?' })}
          </h3>

          {/* Description */}
          <p className="mb-8 text-lg leading-relaxed text-forest-50 sm:text-xl lg:text-2xl">
            {t('producerCTA.description', {
              fallback:
                'Join our marketplace and connect directly with consumers who value fresh, quality produce. Expand your reach, increase your sales, and build lasting relationships with customers who appreciate your hard work.',
            })}
          </p>

          {/* Benefits List */}
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="text-forest-100">
              <div className="mb-2 text-lg font-semibold" style={{ color: 'white' }}>
                {t('producerCTA.benefit1Title', { fallback: 'Direct Sales' })}
              </div>
              <p className="text-sm">
                {t('producerCTA.benefit1Desc', {
                  fallback: 'Sell directly to consumers without intermediaries',
                })}
              </p>
            </div>
            <div className="text-forest-100">
              <div className="mb-2 text-lg font-semibold " style={{ color: 'white' }}>
                {t('producerCTA.benefit2Title', { fallback: 'Fair Pricing' })}
              </div>
              <p className="text-sm">
                {t('producerCTA.benefit2Desc', {
                  fallback: 'Set your own prices and maximize your profits',
                })}
              </p>
            </div>
            <div className="text-forest-100">
              <div className="mb-2 text-lg font-semibold " style={{ color: 'white' }}>
                {t('producerCTA.benefit3Title', { fallback: 'Community Building' })}
              </div>
              <p className="text-sm">
                {t('producerCTA.benefit3Desc', {
                  fallback: 'Build relationships with local consumers',
                })}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => router.push('/join-farmer')}
            className="group relative inline-flex items-center justify-center rounded-full bg-white px-12 py-4 text-lg font-bold text-primary_green shadow-lg transition-all duration-300 hover:bg-forest-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            <span className="relative z-10">
              {t('producerCTA.buttonText', { fallback: 'Join as Producer' })}
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-revolutionary_green to-primary_green opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
          </button>

          
        </div>

        {/* Background decorative elements */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white opacity-5"></div>
        <div className="absolute right-1/4 top-1/4 h-20 w-20 rounded-full bg-white opacity-10"></div>
      </div>
    </section>
  );
};

export default ProducerCTA;
