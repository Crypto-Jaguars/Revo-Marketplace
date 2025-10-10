'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LoadingJoinFarmer() {
  const t = useTranslations('JoinFarmer');
  const breadcrumb = useTranslations('common.breadcrumb');
  const params = useParams() as Record<string, string> | undefined;
  const locale = (params && params.locale) || 'en';

  return (
    <div className="max-w-4xl mx-auto w-full mb-8">
      <div
        className="bg-white/80 backdrop-blur-sm rounded-md px-4 py-3"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center text-sm text-gray-700 flex-wrap gap-2">
          <Link
            href={`/${locale}/`}
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7035] rounded"
            aria-label={breadcrumb('home')}
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-[#2a7035]" />
            <span className="font-medium text-[#2a7035] group-hover:underline">
              {breadcrumb('home')}
            </span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium" aria-current="page">
            {t('joinFarmer') || t('title')}
          </span>
        </div>
      </div>
    </div>
  );
}
