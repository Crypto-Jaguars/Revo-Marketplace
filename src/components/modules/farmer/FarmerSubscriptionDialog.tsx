"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import FarmerSubscriptionForm from './FarmerSubscriptionForm';
import { useTranslations } from 'next-intl';

export default function FarmerSubscriptionDialog() {
  const t = useTranslations('FarmerSubscription');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-tl from-forest-600 to-forest-400 px-8 font-semibold shadow-md hover:bg-forest-600 transition-all duration-200 border border-brand-700/80"
          style={{ color: '#FFFFFF' }}
        >
          {t('ctaLabel')}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('subtitle')}</DialogDescription>
        </DialogHeader>
        <FarmerSubscriptionForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}


