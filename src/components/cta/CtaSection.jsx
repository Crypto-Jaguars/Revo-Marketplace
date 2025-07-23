'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '@/store/languageStore/store';

export default function CTASection() {
  const t = useTranslations('cta');
  const { language } = useLanguageStore();

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <motion.div
        className="container mx-auto px-6 text-center max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary_green">{t('ready')}</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={`/${language}/sales`}
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary_green px-6 text-base font-medium shadow-sm hover:bg-primary_green/90 transition-colors duration-200 !text-[#FFFFFF]"
            style={{ color: '#FFFFFF' }}
          >
            {t('startSelling')}
          </Link>
          <Link
            href={`/${language}/products`}
            className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-6 text-base font-medium text-gray-800 shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            {t('exploreProducts')}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
