'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
// import { useTranslations } from 'next-intl';
import { useLanguageStore } from '@/store';

export default function RegistrationHeroSection() {
  // const t = useTranslations('RegistrationHero');
  const { language } = useLanguageStore();

  // Content based on your requirements
  const heroContent = {
    title: 'Join Revolutionary Farmers',
    description:
      'Transform your farming journey with cutting-edge technology, community support, and sustainable practices. Join thousands of farmers already revolutionizing agriculture.',
    primaryCta: 'Start Your Journey',
    secondaryCta: 'Learn More',
    trustIndicator1: '5000+ Farmers Joined',
    trustIndicator2: '24/7 Expert Support',
    trustIndicator3: 'Sustainable Methods',
  };

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at center, rgba(42, 112, 53, 0.85) 0%, rgba(56, 182, 106, 0.9) 100%),
          url('/images/crops-collage.png')
        `,
      }}
      role="banner"
      aria-label={heroContent.title}
    >
      {/* Enhanced background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a7035]/80 via-[#2a7035]/70 to-[#38b66a]/80" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl px-4 sm:px-6 text-center"
      >
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 sm:mb-8 text-white leading-tight tracking-tight"
        >
          {heroContent.title}
        </motion.h1>

        {/* Decorative Line - Using specified gradient colors */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '12rem', opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1.5 mx-auto mb-8 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #2a7035 0%, #38b66a 100%)',
          }}
          aria-hidden="true"
        />

        {/* Description - Centered with max-width */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm sm:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-12 text-white/95 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed drop-shadow-sm px-4"
        >
          {heroContent.description}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <Button
            asChild
            size="lg"
            className="px-6 sm:px-8 py-5 sm:py-6 w-full md:w-auto  text-base sm:text-lg font-bold text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border-0 min-w-[200px] sm:min-w-[220px]"
            style={{
              background: 'linear-gradient(135deg, #38b66a 0%, #2a7035 100%)',
              boxShadow: '0 4px 15px rgba(42, 112, 53, 0.4)',
            }}
          >
            <Link href={`/${language}/register`} className="!text-white">
              {heroContent.primaryCta}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="px-6 sm:px-8 py-5 sm:py-6 w-full md:w-auto text-base sm:text-lg font-semibold text-white border-2 border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50 rounded-full backdrop-blur-sm transition-all duration-300 min-w-[200px] sm:min-w-[220px]"
          >
            <Link href={`/${language}/learn-more`} className="!text-white">
              {heroContent.secondaryCta}
            </Link>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 sm:mt-16 grid md:grid-cols-3 items-center justify-center gap-4 sm:gap-8 px-4 
            mx-auto max-w-6xl text-white/80"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full flex-shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              {heroContent.trustIndicator1}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full flex-shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              {heroContent.trustIndicator2}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full flex-shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">
              {heroContent.trustIndicator3}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
