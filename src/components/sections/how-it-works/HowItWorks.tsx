import React, { useState } from 'react';
import StepCard from './StepCard';
import ToggleUserType from './ToggleUserType';
import { useTranslations } from 'next-intl';
import { Store, Package, ThumbsUp, LineChart, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image';

export function HowWeWork() {
  const t = useTranslations('HowWeWork');
  const [howRole, setHowRole] = useState<'farmer' | 'buyer'>('farmer');

  const farmerSteps = [
    {
      icon: <Store />,
      title: t('farmerSteps.listProducts.title'),
      description: t('farmerSteps.listProducts.description'),
    },
    {
      icon: <ThumbsUp />,
      title: t('farmerSteps.receiveOrders.title'),
      description: t('farmerSteps.receiveOrders.description'),
    },
    {
      icon: <Package />,
      title: t('farmerSteps.prepareShipment.title'),
      description: t('farmerSteps.prepareShipment.description'),
    },
  ];

  const buyerSteps = [
    {
      icon: <LineChart />,
      title: t('buyerSteps.browsePurchase.title'),
      description: t('buyerSteps.browsePurchase.description'),
    },
    {
      icon: <ShieldCheck />,
      title: t('buyerSteps.securePayment.title'),
      description: t('buyerSteps.securePayment.description'),
    },
    {
      icon: <Truck />,
      title: t('buyerSteps.deliveryTracking.title'),
      description: t('buyerSteps.deliveryTracking.description'),
    },
  ];

  const currentSteps = howRole === 'farmer' ? farmerSteps : buyerSteps;

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-gray-50">
        {/* Background Image with Crops Overlay */}
        <Image
          src="/images/crops-collage.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 opacity-[0.06]"
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-6">{t('title')}</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Toggle Component */}
          <div className="flex justify-center mb-16">
            <ToggleUserType activeType={howRole} onChange={setHowRole} />
          </div>

          {/* Steps Grid with animation key */}
          <div
            key={howRole}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            style={{
              animation: 'scaleIn 0.5s ease-out',
            }}
          >
            {currentSteps.map((step, index) => (
              <StepCard
                key={`${howRole}-${index}`}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
