'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('HeroSection');

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl px-6 text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          <span className="text-primary_green block mb-2">{t('title')}</span>
          <span className="text-gray-800">{t('subtitle')}</span>
        </h1>
        <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            className="bg-primary_green hover:bg-primary_green/90 px-6 py-6 text-base font-medium"
            style={{ color: '#FFFFFF' }}
          >
            <Link 
              href="/marketplace" 
              style={{ color: '#FFFFFF' }}
              className="!text-[#FFFFFF]"
            >
              {t('exploreMarketplace')}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-primary_green hover:bg-gray-100 px-6 py-6 text-base border border-primary_green"
          >
            <Link href="/join-farmer">{t('joinAsFarmer')}</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
