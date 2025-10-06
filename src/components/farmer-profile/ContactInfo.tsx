'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { Edit3, Phone, Mail, MapPin, Clock, Facebook, Instagram, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactData {
  phone: string;
  email: string;
  whatsapp: string;
  location: string;
  schedule: {
    weekdays: string;
    weekend: string;
  };
}

interface ContactInfoProps {
  isOwner?: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ isOwner = false }) => {
  const t = useTranslations('ContactInfo');
  const tCommon = useTranslations('Common');
  
  const contactData = useMemo<ContactData>(() => ({
    phone: '+34 123 456 789',
    email: 'contacto@granjaelparaiso.es',
    whatsapp: '+34 123 456 789',
    location: 'Valle Verde, Región Agrícola, España',
    schedule: {
      weekdays: '8:00 - 18:00',
      weekend: '9:00 - 14:00',
    },
  }), []);

  const handleEdit = useCallback(() => {
    // TODO: Implement edit functionality
    console.log('Edit contact info clicked');
  }, []);

  const handleCall = useCallback(() => {
    // TODO: Implement call functionality
    window.open(`tel:${contactData.phone}`);
  }, [contactData.phone]);

  const handleEmail = useCallback(() => {
    // TODO: Implement email functionality
    window.open(`mailto:${contactData.email}`);
  }, [contactData.email]);

  const handleSocialClick = useCallback((platform: string) => {
    // TODO: Implement social media navigation
    console.log(`${platform} clicked`);
  }, []);

  return (
    <section className="bg-white p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{t('title')}</h2>
        {isOwner && (
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            onClick={handleEdit}
            aria-label={t('editAriaLabel')}
          >
            <Edit3 size={16} />
            {tCommon('actions.edit')}
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Ubicación */}
        <div className="flex items-start space-x-3">
          <MapPin className="w-6 h-6 text-filter_active stroke-2 flex-shrink-0 mt-1" fill="none" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">{t('location')}</h3>
            <p className="text-gray-600">{contactData.location}</p>
          </div>
        </div>

        {/* Teléfono */}
        <div className="flex items-start space-x-3">
          <Phone className="w-6 h-6 text-filter_active stroke-2 flex-shrink-0 mt-1" fill="none" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">{t('phone')}</h3>
            <p className="text-gray-600">{contactData.phone}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-3">
          <Mail className="w-6 h-6 text-filter_active stroke-2 flex-shrink-0 mt-1" fill="none" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">{t('email')}</h3>
            <p className="text-gray-600 break-all">{contactData.email}</p>
          </div>
        </div>

        {/* Horario de Atención */}
        <div className="flex items-start space-x-3">
          <Clock className="w-6 h-6 text-filter_active stroke-2 flex-shrink-0 mt-1" fill="none" />
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">{t('schedule')}</h3>
            <div className="text-gray-600 space-y-1">
              <p>{t('weekdays')}: {contactData.schedule.weekdays}</p>
              <p>{t('sunday')}: {contactData.schedule.weekend}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">{t('socialMedia')}</h3>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => handleSocialClick('Facebook')}
            className="text-filter_active hover:opacity-75 transition-opacity"
            aria-label={t('visitFacebook')}
          >
            <Facebook className="w-6 h-6 stroke-2" fill="none" />
          </button>
          <button
            onClick={() => handleSocialClick('Instagram')}
            className="text-filter_active hover:opacity-75 transition-opacity"
            aria-label={t('visitInstagram')}
          >
            <Instagram className="w-6 h-6 stroke-2" fill="none" />
          </button>
          <button
            onClick={() => handleSocialClick('WhatsApp')}
            className="text-filter_active hover:opacity-75 transition-opacity"
            aria-label={t('contactWhatsApp')}
          >
            <Phone className="w-6 h-6 stroke-2" fill="none" />
          </button>
          <button
            onClick={() => handleSocialClick('Website')}
            className="text-filter_active hover:opacity-75 transition-opacity"
            aria-label={t('visitWebsite')}
          >
            <Globe className="w-6 h-6 stroke-2" fill="none" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(ContactInfo);
