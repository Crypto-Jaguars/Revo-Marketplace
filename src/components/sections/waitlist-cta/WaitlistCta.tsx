'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '@/store/languageStore/store';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Shield,
  ArrowRight,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export function WaitlistCta() {
  const t = useTranslations('Waitlist');
  const { language } = useLanguageStore();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-revolutionary_green/5 via-brand-50 to-forest-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-revolutionary_green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-forest-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-brand-200/40 rounded-full blur-2xl" />
      </div>

      <motion.div
        className="container mx-auto px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-revolutionary_green/10 border border-revolutionary_green/20">
                  <Sparkles className="w-4 h-4 text-revolutionary_green" />
                  <span className="text-sm font-medium text-forest-900">
                    Join the Revolution
                  </span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-forest-900 leading-tight">
                  {t('pageTitle')}
                </h2>
                
                <p className="text-lg lg:text-xl text-forest-700 leading-relaxed max-w-xl">
                  {t('pageDescription')}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-revolutionary_green">5,000+</div>
                  <div className="text-sm text-forest-600">{t('stats.signups')}</div>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-revolutionary_green">15+</div>
                  <div className="text-sm text-forest-600">{t('stats.countries')}</div>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-revolutionary_green">Q1 2025</div>
                  <div className="text-sm text-forest-600">{t('stats.launchDate')}</div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-revolutionary_green/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-revolutionary_green" />
                  </div>
                  <span className="text-forest-800 font-medium">
                    {t('benefits.earlyAccess.title')}
                  </span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-revolutionary_green/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-revolutionary_green" />
                  </div>
                  <span className="text-forest-800 font-medium">
                    {t('benefits.communityUpdates.title')}
                  </span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-revolutionary_green/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-revolutionary_green" />
                  </div>
                  <span className="text-forest-800 font-medium">
                    Secure, transparent blockchain transactions
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:pl-8">
              <div className="bg-gradient-to-br from-white to-brand-50/50 rounded-2xl shadow-2xl p-8 lg:p-10 border border-brand-200/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-revolutionary_green/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-forest-200/20 rounded-full translate-y-12 -translate-x-12" />
                
                <div className="relative space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-revolutionary_green/10 border border-revolutionary_green/20 mb-4">
                      <Zap className="w-4 h-4 text-revolutionary_green" />
                      <span className="text-sm font-medium text-forest-900">
                        Limited Time Offer
                      </span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-forest-900 mb-4 leading-tight">
                      Reserve Your Spot Today 
                    </h3>
                    <p className="text-lg text-forest-600 leading-relaxed">
                      {t('subtitle')}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-revolutionary_green/5 rounded-lg border border-revolutionary_green/10">
                      <div className="w-6 h-6 rounded-full bg-revolutionary_green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-revolutionary_green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-forest-900 mb-1">
                          {t('benefits.specialBenefits.title')}
                        </h4>
                        <p className="text-sm text-forest-700">
                          {t('benefits.specialBenefits.description')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-revolutionary_green/5 rounded-lg border border-revolutionary_green/10">
                      <div className="w-6 h-6 rounded-full bg-revolutionary_green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-revolutionary_green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-forest-900 mb-1">
                          {t('benefits.shapeFuture.title')}
                        </h4>
                        <p className="text-sm text-forest-700">
                          {t('benefits.shapeFuture.description')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      asChild
                      size="lg"
                      className="w-full h-14 text-lg font-bold bg-gradient-to-r from-revolutionary_green to-primary_green hover:from-revolutionary_green/90 hover:to-primary_green/90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] border-2 border-transparent hover:border-revolutionary_green/20"
                    >
                      <Link href={`/${language}/waitlist`}>
                        <Sparkles className="mr-3 h-6 w-6" />
                        {t('submit')}
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </Link>
                    </Button>
                    
                    <p className="text-sm text-forest-500 mt-4">
                      {t('privacy')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}