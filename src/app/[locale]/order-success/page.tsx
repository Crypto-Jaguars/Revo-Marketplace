'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function OrderSuccessPage() {
  const t = useTranslations('OrderSuccess');

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
            <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Completed Successfully!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/dashboard/orders">
              View My Orders
            </Link>
          </Button>
          <Button asChild>
            <Link href="/products">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 