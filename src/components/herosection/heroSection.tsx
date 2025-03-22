'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '@/store/languageStore/store';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  const { language } = useLanguageStore();

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F7F5] via-[#E6EFE8] to-[#D8E8DE]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary_green/10"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-primary_green/5"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary_green/10"></div>
      </div>
      
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
              href={`/${language}/marketplace`}
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
            <Link href={`/${language}/join-farmer`}>{t('joinAsFarmer')}</Link>
          </Button>
          <Button 
            asChild 
            className="bg-[#264534] hover:bg-[#264534]/90 px-6 py-6 text-base font-medium"
            style={{ color: '#FFFFFF' }}
          >
            <Link 
              href={`/${language}/invest`}
              style={{ color: '#FFFFFF' }}
              className="!text-[#FFFFFF]"
            >
              {t('investNow')}
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
