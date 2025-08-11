'use client';

import { useTranslations } from 'next-intl';
import Bounded from '@/components/Bounded';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, Mail, CalendarDays, CreditCard } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function OrderConfirmationPage() {
  const t = useTranslations('OrderSuccess');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  // Generate a random order number for demo purposes
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    // Generate random order number
    const randomOrderNumber = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    setOrderNumber(`RF-${randomOrderNumber}`);

    // Get current date formatted
    const now = new Date();
    setOrderDate(now.toLocaleDateString());
  }, []);

  return (
    <Bounded>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          className="bg-white rounded-lg shadow-md p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
            <p className="text-gray-600 text-lg">{t('subtitle')}</p>
          </div>

          <div className="border-t border-b border-gray-100 py-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-gray-500 text-sm">{t('shippingInfo')}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-2">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-gray-500 text-sm">{t('emailConfirmation')}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-2">
                  <CreditCard className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-gray-500 text-sm">{t('contactSupport')}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">{t('thankYou')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CalendarDays className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{t('orderDate')}</p>
                  <p className="text-sm text-gray-600">{orderDate}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Package className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-700">{t('orderNumber')}</p>
                  <p className="text-sm text-gray-600">{orderNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${locale}/products`}>
              <Button variant="outline" className="w-full sm:w-auto">
                {t('continueShopping')}
              </Button>
            </Link>

            <Link href={`/${locale}/orders`}>
              <Button className="w-full sm:w-auto bg-[#375B42] hover:bg-[#245842]">
                {t('viewOrders')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </Bounded>
  );
}
