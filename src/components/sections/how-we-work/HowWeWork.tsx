import React, { useState } from 'react';
import StepCard from './StepCard';
import ToggleUserType from './ToggleUserType';
import { useTranslations } from 'next-intl';
import { ShoppingCart, CreditCard, Truck, Store, Package, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

export function HowWeWork() {
  const t = useTranslations('HowWeWork');
  const [activeType, setActiveType] = useState<'farmer' | 'buyer'>('farmer');

  const farmerSteps = [
    {
      icon: <Store className="w-10 h-10" style={{ color: '#FFFFFF' }} />,
      title: t('farmerSteps.listProducts.title'),
      description: t('farmerSteps.listProducts.description'),
    },
    {
      icon: <ThumbsUp className="w-10 h-10" style={{ color: '#FFFFFF' }} />,
      title: t('farmerSteps.receiveOrders.title'),
      description: t('farmerSteps.receiveOrders.description'),
    },
    {
      icon: <Package className="w-10 h-10" style={{ color: '#FFFFFF' }} />,
      title: t('farmerSteps.prepareShipment.title'),
      description: t('farmerSteps.prepareShipment.description'),
    },
  ];

  const buyerSteps = [
    {
      icon: <ShoppingCart className="w-10 h-10" style={{ color: '#FFFFFF' }} />,
      title: t('buyerSteps.browsePurchase.title'),
      description: t('buyerSteps.browsePurchase.description'),
    },
    {
      icon: <CreditCard className="w-10 h-10" style={{ color: '#FFFFFF' }} />,
      title: t('buyerSteps.securePayment.title'),
      description: t('buyerSteps.securePayment.description'),
    },
    {
      icon: <Truck className="w-10 h-10" style={{ color: '#FFFFFF' }} />,
      title: t('buyerSteps.deliveryTracking.title'),
      description: t('buyerSteps.deliveryTracking.description'),
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden">
      <Image
        src="/background-lp-sections.png"
        alt="Background"
        fill
        style={{ objectFit: 'cover' }}
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-10"
      />
      <div className="container mx-auto px-6 max-w-6xl relative z-10 ">
        <h2 className="text-3xl md:text-4xl font-bold text-forest-800 mb-8 text-center">
          {t('title')}
        </h2>
        <div className="mb-12 flex justify-center">
          <ToggleUserType activeType={activeType} onChange={setActiveType} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {(activeType === 'farmer' ? farmerSteps : buyerSteps).map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
