'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '@/store';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import InteractiveHeroGallery from './InteractiveHeroGallery';

export default function HeroSectionNew() {
  const t = useTranslations('Hero');
  const tButton = useTranslations('HeroSection');
  const { language } = useLanguageStore();

  // Use typewriter effect for the main title with 120ms speed
  const typewriterTitle = useTypewriter(t('title'), 120);

  return (
    <section 
      className="w-full min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at center, rgba(72, 187, 120, 0.3) 0%, rgba(34, 197, 94, 0.2) 35%, rgba(22, 163, 74, 0.1) 70%, transparent 100%),
          linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #4ade80 100%)
        `,
      }}
    >
      {/* Background crops overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/crops-collage.jpg)',
          opacity: 0.08,
          zIndex: 1,
        }}
      />
      
      {/* Main content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 pt-28 md:px-14 lg:pt-20 gap-8 lg:gap-12">
        {/* Hero content container */}
        <div className="max-w-6xl mx-auto w-full">
          {/* Title and description section */}
          <article className="max-w-4xl mx-auto mb-8 lg:mb-12">
            {/* Animated title with typewriter effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-800 leading-tight mb-6"
            >
              {typewriterTitle}
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl lg:text-2xl text-green-700 leading-relaxed mb-6"
            >
              {t('subtitle')}
            </motion.p>
            
            {/* Project description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base sm:text-lg text-green-600 leading-relaxed max-w-3xl mx-auto"
            >
              {t('description')}
            </motion.p>
          </article>

          {/* Interactive Gallery */}
          <InteractiveHeroGallery />
        </div>
      </main>
      
      {/* CTA Buttons Section */}
      <section className="relative z-10 py-12 bg-gradient-to-b from-green-400/20 to-green-500/30">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              className="py-4 px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Link href={`/${language}/marketplace`}>{tButton('exploreMarketplace')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="py-4 px-8 bg-white/90 hover:bg-white text-green-700 font-semibold rounded-full border-2 border-green-600 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Link href={`/${language}/join-farmer`}>{tButton('joinAsFarmer')}</Link>
            </Button>
            <Button
              asChild
              className="py-4 px-8 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-yellow-900 font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Link href={`/${language}/invest`}>{tButton('investNow')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mobile scroll indicator */}
      <div className="lg:hidden relative z-10 flex justify-center items-center py-2 bg-green-500/20">
        <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
          <span>← Scroll Gallery →</span>
        </div>
      </div>
    </section>
  );
}
