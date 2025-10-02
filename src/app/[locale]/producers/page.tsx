'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiSearch, FiFilter, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ProducersPage() {
  const t = useTranslations('Producers');
  const isEs = useLocale().startsWith('es');

  const [search, setSearch] = useState('');
  const [locationState, setLocationState] = useState<{
    enabled: boolean;
    text: string | null;
    error: string | null;
    loading: boolean;
  }>({
    enabled: false,
    text: null,
    error: null,
    loading: false,
  });
  const [typewriterText, setTypewriterText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const fullText = 'Search by producer, product or location...';

  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setLocationState(prev => ({ ...prev, error: 'Geolocation not supported' }));
      return;
    }

    navigator.permissions?.query({ name: 'geolocation' as PermissionName })
      .then(res => res.state !== 'denied' && getLocation())
      .catch(() => getLocation());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting && typewriterText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }

        if (isDeleting && typewriterText === '') {
          setIsDeleting(false);
          return;
        }

        if (isDeleting) {
          setTypewriterText(fullText.substring(0, typewriterText.length - 1));
        } else {
          setTypewriterText(fullText.substring(0, typewriterText.length + 1));
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, fullText]);


  
  const getLocation = (options = { enableHighAccuracy: false, timeout: 15000, maximumAge: 0 }) => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) return;
    
    setLocationState(prev => ({ ...prev, loading: true, error: null }));
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location success:', position);
        setLocationState({
          enabled: true,
          text: t('locationText'),
          error: null,
          loading: false,
        });
      },
      (error) => {
        console.log('Location error details:', {
          code: error.code,
          message: error.message,
          timestamp: new Date().toISOString()
        });
        
        const errorMessages: Record<number, string> = {
          1: 'Location access denied - Check browser permissions',
          2: 'Location services disabled - Enable in system settings',
          3: 'Location request timed out - Try again',
        };
        
        setLocationState({
          enabled: false,
          text: null,
          error: errorMessages[error.code] || `Location error: ${error.message}`,
          loading: false,
        });
      },
      options
    );
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log('Search for', search);
  };

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D8E8DE] via-[#B8D8C8] to-[#98C8B8]" />

        <div className="relative max-w-4xl mx-auto py-40 px-4">
          <motion.div
            className="text-primary_green text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-6xl font-black text-forest-900  text-center">
              {t('title')}
            </h1>
            <p className="mt-6 text-xl text-gray-700 leading-relaxed max-w-xl mx-auto">
              {t('description')}
            </p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                onSubmit={handleSearchSubmit}
                className=" pt-10 pb-10 rounded-2xl px-10 border-brand-200 bg-gradient-to-b from-forest-100 to-surface-0 shadow-sm transition-all duration-300 transform-gpu hover:shadow-lg hover:border-forest-200 hover:scale-[1.03] active:scale-[0.97] focus-within:ring-2 focus-within:ring-forest-400/40"
              >
                <div className="flex gap-3 items-center mb-2">
                  <div className="flex-1 relative  h-[60px]">
                    <span className="absolute inset-y-0 left-4 flex items-center text-muted-foreground">
                      <FiSearch className="w-5 h-5" />
                    </span>
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={typewriterText}
                      className="pl-12 h-full text-xl text-gray-700 border border-gray-300 rounded-full focus:border-primary_green/10 focus:ring-1 focus:ring-red-500 transition-all duration-200"
                      aria-label="Search producers"
                    />
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => console.log('Open filters')}
                    className="group h-[50px] px-6 rounded-full border border-primary_green text-primary_green hover:bg-primary_green "
                  >
                    <FiFilter className="w-5 h-5 group-hover:text-[#fff] transition-colors duration-200" />
                    <span className="hidden sm:inline font-semibold group-hover:text-[#fff] transition-colors duration-200">{t('filters')}</span>
                  </Button>

                </div>
                {locationState.enabled && locationState.text && (
                  <p className="text-base text-gray-500 flex items-center gap-2">
                    <FiMapPin className="w-4 h-4" />
                    {locationState.text}
                  </p>
                )}
                
                {!locationState.enabled && !locationState.error && !locationState.loading && (
                  <button
                    onClick={() => getLocation()}
                    className="text-sm text-primary_green hover:text-primary_green/80 flex items-center gap-2 transition-colors duration-200"
                  >
                    <FiMapPin className="w-4 h-4" />
                    Enable location to find nearby producers
                  </button>
                )}
                
                {locationState.loading && (
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary_green border-t-transparent rounded-full animate-spin"></div>
                    Getting your location...
                  </p>
                )}
                
                {locationState.error && (
                  <div className="space-y-2">
                    <div className="text-sm text-red-500 flex items-center gap-2">
                      <FiMapPin className="w-4 h-4" />
                      <span>{locationState.error}</span>
                      <button
                        onClick={() => getLocation({ enableHighAccuracy: false, timeout: 20000, maximumAge: 0 })}
                        className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 transition-colors duration-200"
                      >
                        Retry
                      </button>
                    </div>
                    
                  </div>
                )}
              </form>

            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
