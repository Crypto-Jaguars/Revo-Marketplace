'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '@/store/languageStore/store';

const MotionLink = motion(Link);

export default function CtaSection() {
  const t = useTranslations('cta');
  const { language } = useLanguageStore();

  return (
    <section className="w-full bg-brand-200 py-14 md:py-20">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-forest-800">{t('ready')}</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={`/${language}/waitlist`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-revolutionary_green to-primary_green px-9 font-semibold shadow-lg border border-primary_green/70 text-white transition-all duration-300 ease-out transform-gpu hover:scale-[1.065] hover:shadow-2xl active:scale-[0.95] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary_green/40"
            style={{ color: '#FFFFFF' }}
          >
            Join Waitlist
          </Link>
          <Link
          <MotionLink
            href={`/${language}/sales`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-forest-600 via-forest-500 to-forest-400 px-9 font-semibold shadow-lg border border-forest-700/70 text-white transition-all duration-300 ease-out transform-gpu hover:scale-[1.065] hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-forest-400/40"
            style={{ color: '#FFFFFF' }}
            whileTap={{ scale: 0.95 }}
          >
            {t('startSelling')}
          </MotionLink>
          <MotionLink
            href={`/${language}/marketplace`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-9 text-base font-semibold text-forest-700 shadow-md border border-brand-600/40 transition-all duration-300 ease-out transform-gpu  hover:bg-brand-50 hover:text-forest-800 hover:border-forest-300 hover:shadow-2xl hover:scale-[1.065] focus:outline-none focus-visible:ring-4 focus-visible:ring-forest-300/40"
            whileTap={{ scale: 0.95 }}
          >
            {t('exploreProducts')}
          </MotionLink>
          <MotionLink
            href={`/${language}/#waitlist`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 text-yellow-900 px-9 text-base font-semibold shadow-md border border-brand-600/40 transition-all duration-300 ease-out transform-gpu  hover:bg-brand-50 hover:text-forest-800 hover:border-forest-300 hover:shadow-2xl hover:scale-[1.065] focus:outline-none focus-visible:ring-4 focus-visible:ring-forest-300/40"
            whileTap={{ scale: 0.95 }}
          >
            {t('joinWaitlist')}
          </MotionLink>         
        </div>
      </div>
    </section>
  );
}
