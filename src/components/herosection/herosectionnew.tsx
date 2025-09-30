'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Headernew from '../header/Headernew';
import { useLanguageStore } from '@/store';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';

export default function HeroSectionNew() {
  const t = useTranslations('Hero');
  const tButton = useTranslations('HeroSection');
  const { language } = useLanguageStore();
  const [expandedIndex, setExpandedIndex] = useState(0);

  
  // Use typewriter effect for the main title with 120ms speed
  const typewriterTitle = useTypewriter(t('title'), 120);
function handleMouseEnter(index: number){
setExpandedIndex(index);
}
function handleMouseLeave(){
  setExpandedIndex(0)
}

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
    <section className="w-full h-screen flex flex-col">
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center text-center px-4 pt-28 md:px-14 lg:pt-20 gap-8 lg:gap-2 bg-gradient-to-b from-[#D8E8DE] via-[#B8D8C8] to-[#98C8B8] ">
        <article className="max-w-4xl ">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-center lg:text-left font-bold text-primary_green leading-tight"
          >
            {typewriterTitle}
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
          <motion.div
            variants={imageVariants}
            className={`relative h-full rounded-lg cursor-pointer transition-all duration-500 ${expandedIndex === 0 ? 'w-72 md:w-96' : 'w-24 md:w-28'}`}
            onMouseEnter={() => handleMouseEnter(0)}
          >
            <Image
              src="/images/sliderimage1.png"
              alt="Description 1"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {expandedIndex === 0 && (
              <p
                style={{ color: 'white' }}
                className="absolute bottom-4 left-4 font-medium text-lg z-10 drop-shadow-md"
              >
                {t('imageText.processed')}
              </p>
            )}
          </motion.div>
          <motion.div
            variants={imageVariants}
            className={`relative h-full rounded-lg cursor-pointer transition-all duration-500 ${expandedIndex === 1 ? 'w-72 md:w-96' : 'w-24 md:w-28'}`}
            onMouseEnter={() => handleMouseEnter(1)}
          >
            <Image
              src="/images/sliderimage2.png"
              alt="Description 2"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {expandedIndex === 1 && (
              <p
                style={{ color: 'white' }}
                className="absolute bottom-4 left-4 font-medium text-lg z-10 drop-shadow-md"
              >
                {t('imageText.harvest')}
              </p>
            )}
          </motion.div>
          <motion.div
            variants={imageVariants}
            className={`relative h-full rounded-lg cursor-pointer transition-all duration-500 ${expandedIndex === 2 ? 'w-72 md:w-96' : 'w-24 md:w-28'}`}
            onMouseEnter={() => handleMouseEnter(2)}
          >
            <Image
              src="/images/sliderimage3.png"
              alt="Description 3"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {expandedIndex === 2 && (
              <p
                style={{ color: 'white' }}
                className="absolute bottom-4 left-4 font-medium text-lg z-10 drop-shadow-md"
              >
                {t('imageText.freshness')}
              </p>
            )}
          </motion.div>
        </motion.div>
      </main>
      <main className="flex justify-center items-center py-12 bg-gradient-to-b from-[#98C8B8] to-[#81B8A2]">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Button
            asChild
            style={{ color: 'white' }}
            className="py-3 px-6 bg-gradient-to-b from-green-500 to-green-700 text-white font-semibold rounded-full border-2 border-green-800 shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 active:translate-y-px"

          >
            <Link href={`/${language}/marketplace`}>{tButton('exploreMarketplace')}</Link>
          </Button>
          <Button
            asChild
            className="py-3 px-6 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 font-semibold rounded-full border-2 border-gray-400 shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 active:translate-y-px"

          >
            <Link href={`/${language}/join-farmer`}>{tButton('joinAsFarmer')}</Link>
          </Button>
          <Button
            asChild
            className="py-3 px-6 bg-gradient-to-b from-yellow-400 to-yellow-600 text-yellow-900 font-semibold rounded-full border-2 border-yellow-700 shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 active:translate-y-px"

          >
            <Link href={`/${language}/invest`}>{tButton('investNow')}</Link>
          </Button>
        </div>
      </main>

      {/* Mobile scroll indicator */}
      <div className="lg:hidden flex justify-center items-center py-2 bg-gradient-to-b from-[#81B8A2] to-[#6BA892]">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <span>← Scroll →</span>
        </div>
      </div>
    </section>
  );
}
