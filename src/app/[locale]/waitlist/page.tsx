'use client';

import { WaitlistForm } from '@/components/modules/waitlist/WaitlistForm';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { useTranslations } from 'next-intl';
import { Sparkles, Users, TrendingUp, Globe } from 'lucide-react';
import Image from 'next/image';

export default function WaitlistPage() {
  const t = useTranslations('Waitlist');
  
  return (
    <>
      <PageViewTracker page="/waitlist" />
      <div className="min-h-screen bg-gradient-to-b from-surface-0 to-brand-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start lg:items-center max-w-7xl mx-auto">
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-forest-900 mb-4 leading-tight">
                {t('pageTitle')}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                {t('pageDescription')}
              </p>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <FeatureItem
                icon={<Users className="w-5 h-5 text-revolutionary_green" />}
                title={t('benefits.earlyAccess.title')}
                description={t('benefits.earlyAccess.description')}
              />
              <FeatureItem
                icon={<TrendingUp className="w-5 h-5 text-revolutionary_green" />}
                title={t('benefits.specialBenefits.title')}
                description={t('benefits.specialBenefits.description')}
              />
              <FeatureItem
                icon={<Globe className="w-5 h-5 text-revolutionary_green" />}
                title={t('benefits.shapeFuture.title')}
                description={t('benefits.shapeFuture.description')}
              />
              <FeatureItem
                icon={<Sparkles className="w-5 h-5 text-revolutionary_green" />}
                title={t('benefits.communityUpdates.title')}
                description={t('benefits.communityUpdates.description')}
              />
            </div>

            <div className="pt-4 lg:pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8">
                <Stat number="5,000+" label={t('stats.signups')} />
                <Stat number="15+" label={t('stats.countries')} />
                <Stat number="Q1 2025" label={t('stats.launchDate')} />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <WaitlistForm />
            </div>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">{t('trustBadges')}</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 opacity-70 grayscale">
            <Image 
              src="/logo.svg" 
              alt="Revo Farmers" 
              width={200}
              height={128}
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 object-contain max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]" 
            />
            <Image 
              src="/images/stellar-logo.png" 
              alt="Stellar" 
              width={200}
              height={128}
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 object-contain max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]" 
            />
            <Image 
              src="/images/usdc-stellar.jpg" 
              alt="USDC" 
              width={200}
              height={128}
              className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 object-contain max-w-[120px] sm:max-w-[150px] lg:max-w-[200px]" 
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-revolutionary_green/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-forest-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-revolutionary_green">{number}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}