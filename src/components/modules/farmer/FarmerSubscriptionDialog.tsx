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
          className="inline-flex h-12 items-center justify-center rounded-md bg-[#375B42] px-6 text-base font-medium shadow-sm hover:bg-[#2A4632] transition-colors duration-200 text-white"
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


