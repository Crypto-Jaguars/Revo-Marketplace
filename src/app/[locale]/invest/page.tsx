'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, TrendingUp, DollarSign, Percent } from 'lucide-react';

export default function InvestPage() {
  const t = useTranslations('Invest');

  const investmentOpportunities = [
    {
      id: 1,
      title: t('opportunities.smallFarm.title'),
      amount: '$5,000 - $10,000',
      returnRate: '8-12%',
      duration: '12 months',
      impact: 'Support 5 local farmers',
      description: t('opportunities.smallFarm.description'),
      icon: <TrendingUp size={24} style={{ color: '#375B42' }} />
    },
    {
      id: 2,
      title: t('opportunities.organic.title'),
      amount: '$15,000 - $25,000',
      returnRate: '10-15%',
      duration: '18 months',
      impact: 'Enable transition to organic farming',
      description: t('opportunities.organic.description'),
      icon: <CheckCircle size={24} style={{ color: '#375B42' }} />
    },
    {
      id: 3,
      title: t('opportunities.irrigation.title'),
      amount: '$20,000 - $40,000',
      returnRate: '12-18%',
      duration: '24 months',
      impact: 'Reduce water usage by 40%',
      description: t('opportunities.irrigation.description'),
      icon: <DollarSign size={24} style={{ color: '#375B42' }} />
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F5F7F5] to-[#E6EFE8]">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary_green">{t('title')}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              {t('subtitle')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
            <div className="bg-white/80 p-6 rounded-lg shadow-sm">
              <Percent size={32} className="mx-auto mb-4" style={{ color: '#375B42' }} />
              <h3 className="text-xl font-semibold mb-2">{t('features.returns.title')}</h3>
              <p className="text-gray-600">{t('features.returns.description')}</p>
            </div>
            <div className="bg-white/80 p-6 rounded-lg shadow-sm">
              <TrendingUp size={32} className="mx-auto mb-4" style={{ color: '#375B42' }} />
              <h3 className="text-xl font-semibold mb-2">{t('features.impact.title')}</h3>
              <p className="text-gray-600">{t('features.impact.description')}</p>
            </div>
            <div className="bg-white/80 p-6 rounded-lg shadow-sm">
              <CheckCircle size={32} className="mx-auto mb-4" style={{ color: '#375B42' }} />
              <h3 className="text-xl font-semibold mb-2">{t('features.transparency.title')}</h3>
              <p className="text-gray-600">{t('features.transparency.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('opportunities.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {investmentOpportunities.map((opportunity) => (
              <motion.div 
                key={opportunity.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: opportunity.id * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {opportunity.icon}
                    <h3 className="text-xl font-semibold ml-2">{opportunity.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{opportunity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Investment</p>
                      <p className="font-semibold">{opportunity.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Return Rate</p>
                      <p className="font-semibold text-primary_green">{opportunity.returnRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold">{opportunity.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Impact</p>
                      <p className="font-semibold">{opportunity.impact}</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    style={{ backgroundColor: '#375B42', color: '#FFFFFF' }}
                  >
                    {t('opportunities.invest')}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg"
            style={{ backgroundColor: '#375B42', color: '#FFFFFF' }}
          >
            {t('cta.button')}
          </Button>
        </div>
      </section>
    </main>
  );
} 