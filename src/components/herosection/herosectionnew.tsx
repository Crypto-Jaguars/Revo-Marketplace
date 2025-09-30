'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Headernew from '../header/Headernew';
import { useLanguageStore } from '@/store';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSectionNew() {
  const t = useTranslations('Hero');
  const tButton = useTranslations('HeroSection');
  const { language } = useLanguageStore();
  const [expandedIndex, setExpandedIndex] = useState(0);

  function handleMouseEnter(index: number) {
    setExpandedIndex(index);
  }

  function handleMouseLeave() {
    setExpandedIndex(0);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full min-h-screen flex flex-col overflow-hidden">
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center text-center px-4 pt-28 md:px-14 lg:pt-20 gap-8 lg:gap-12 bg-gradient-to-b from-[#D8E8DE] via-[#B8D8C8] to-[#98C8B8]">
        <article className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-center lg:text-left font-bold text-primary_green leading-tight"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-forest-900/90 leading-relaxed mt-4 max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            {t('subtitle')}
          </motion.p>
        </article>

        {/* Image Gallery Container - Mobile scroll, desktop hover */}
        <motion.div
          onMouseLeave={handleMouseLeave}
          className="w-full lg:w-auto mt-8 flex items-center justify-start lg:justify-center gap-3 max-w-full overflow-x-auto lg:overflow-visible py-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile: Full width scrollable container */}
          <div className="flex lg:hidden h-64 sm:h-80 gap-4 px-4 min-w-max">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                variants={imageVariants}
                className="relative w-64 sm:w-80 h-full rounded-lg cursor-pointer flex-shrink-0"
              >
                <Image
                  src={`/images/sliderimage${index + 1}.png`}
                  alt={t(`imageText.${['processed', 'harvest', 'freshness'][index]}`)}
                  fill
                  sizes="(max-width: 640px) 256px, 320px"
                  className="rounded-lg object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg">
                  <p className="absolute bottom-4 left-4 font-medium text-white text-base sm:text-lg z-10 drop-shadow-md">
                    {t(`imageText.${['processed', 'harvest', 'freshness'][index]}`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Hover expandable images */}
          <div className="hidden lg:flex h-80 xl:h-[500px] items-center justify-center gap-3">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                variants={imageVariants}
                className={`relative h-full rounded-lg cursor-pointer transition-all duration-500 overflow-hidden group ${
                  expandedIndex === index ? 'w-80 xl:w-96' : 'w-20 xl:w-24'
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <Image
                  src={`/images/sliderimage${index + 1}.png`}
                  alt={t(`imageText.${['processed', 'harvest', 'freshness'][index]}`)}
                  fill
                  sizes="(max-width: 1280px) 320px, 384px"
                  className="rounded-lg object-cover"
                  priority={index === 0}
                />

                {/* gradient overlay always present */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg flex items-end">
                  <p className="m-4 font-medium text-lg z-10 drop-shadow-md text-transparent group-hover:text-white transition-colors duration-300">
                    {t(`imageText.${['processed', 'harvest', 'freshness'][index]}`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center items-center py-8 sm:py-12 bg-gradient-to-b from-[#98C8B8] to-[#81B8A2]">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-4xl px-4 sm:px-6 justify-center">
          <Button
            asChild
            className="py-3 px-6 bg-gradient-to-b from-green-500 to-green-700 text-white font-semibold rounded-full border-2 border-green-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 min-w-[200px] sm:min-w-0"
          >
            <Link href={`/${language}/marketplace`}>{tButton('exploreMarketplace')}</Link>
          </Button>
          <Button
            asChild
            className="py-3 px-6 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 font-semibold rounded-full border-2 border-gray-400 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 min-w-[200px] sm:min-w-0"
          >
            <Link href={`/${language}/join-farmer`}>{tButton('joinAsFarmer')}</Link>
          </Button>
          <Button
            asChild
            className="py-3 px-6 bg-gradient-to-b from-yellow-400 to-yellow-600 text-yellow-900 font-semibold rounded-full border-2 border-yellow-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 min-w-[200px] sm:min-w-0"
          >
            <Link href={`/${language}/invest`}>{tButton('investNow')}</Link>
          </Button>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="lg:hidden flex justify-center items-center py-2 bg-gradient-to-b from-[#81B8A2] to-[#6BA892]">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <span>← Scroll →</span>
        </div>
      </div>
    </section>
  );
}
