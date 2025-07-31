'use client';

import { useTranslations } from 'next-intl';
import Breadcrumb from '@/components/shared/Breadcrumb';
import { InventoryDashboard } from '@/components/inventory/InventoryDashboard';
import { useParams } from 'next/navigation';

export default function InventoryDashboardPage() {
  const t = useTranslations('inventory');
  const { locale } = useParams();  

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.dashboard'), href: '/dashboard' },
    { label: t('breadcrumb.home'), href: `/${locale}` },  
    { label: t('breadcrumb.dashboard'), href: `/${locale}/dashboard` },  
    { label: t('breadcrumb.inventory'), href: '', isCurrent: true },
  ];

  return (
    <div className="w-full min-h-screen bg-background pt-16 pb-48">
      <div className="container mx-auto p-4 space-y-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="container mx-auto p-4 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
          <p className="text-gray-600">{t('description')}</p>
        </div>

        <InventoryDashboard />
      </div>
    </div>
  );
}
