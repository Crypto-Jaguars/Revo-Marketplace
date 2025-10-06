'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Mail, Users } from 'lucide-react';
import Link from 'next/link';
import { useLanguageStore } from '@/store';

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
  const t = useTranslations('ContactSection');
  const { language } = useLanguageStore();

  const emailSubject = encodeURIComponent(t('emailSubject'));
  const emailBody = encodeURIComponent(t('emailBody'));

  const mailtoLink = `mailto:revolutionaryfarmers@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div
      className={`bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center shadow-lg border border-green-200 ${className}`}
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900">{t('title')}</h3>
          <p className="text-gray-600 text-lg">{t('description')}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Talk to Us Button */}
          <Button
            asChild
            className="
              group relative overflow-hidden
              bg-gradient-to-r from-green-600 to-green-700
              hover:from-green-700 hover:to-green-800
              text-white font-semibold
              px-6 py-3 rounded-xl
              shadow-lg hover:shadow-xl
              transform hover:scale-105 hover:-translate-y-1
              transition-all duration-300 ease-out
              border-0
              min-w-[160px]
            "
          >
            <a href={mailtoLink}>
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                <span>{t('talkToUs')}</span>
              </div>
              {/* 3D effect highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </a>
          </Button>

          {/* View Producers Button */}
          <Button
            asChild
            className="
              group relative overflow-hidden
              bg-gradient-to-r from-green-600 to-green-700
              hover:from-green-700 hover:to-green-800
              text-white font-semibold
              px-6 py-3 rounded-xl
              shadow-lg hover:shadow-xl
              transform hover:scale-105 hover:-translate-y-1
              transition-all duration-300 ease-out
              border-0
              min-w-[160px]
            "
          >
            <Link href={`/${language}/producers`}>
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                <span>{t('viewProducers')}</span>
              </div>
              {/* 3D effect highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Link>
          </Button>
        </div>

        {/* Additional decorative elements for visual appeal */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
}
