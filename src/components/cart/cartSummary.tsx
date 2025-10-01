'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({ subtotal, shipping, total }: CartSummaryProps) {
  const t = useTranslations('CartSummary');
  
  // Calculate escrow fee (2% of subtotal)
  const escrowFee = subtotal * 0.02;

  // Calculate tax (if not included in total)
  const tax =
    total - subtotal - shipping - escrowFee > 0
      ? total - subtotal - shipping - escrowFee
      : subtotal * 0.07; // Default 7% tax if not included

  // Recalculate total if needed
  const calculatedTotal = subtotal + shipping + tax + escrowFee;

  return (
    <div className="rounded-lg bg-muted/50 p-6">
      <h2 className="text-lg font-medium mb-4">{t('title')}</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('subtotal')}</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('shipping')}</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('tax')}</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('escrowFee')}</span>
          <span>${escrowFee.toFixed(2)}</span>
        </div>

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span>{t('total')}</span>
            <span>${calculatedTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link href="/en/checkout">
        <Button
          className="w-full mt-6 bg-[#375B42] dark:bg-background-dark hover:bg-[#375B42] dark:hover:bg-[#2C4733]"
          size="lg"
        >
          {t('checkoutButton')}
        </Button>
      </Link>

      <p className="text-xs text-muted-foreground text-center mt-4">
        {t('escrowNote')}
      </p>
    </div>
  );
}
