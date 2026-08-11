import { useLanguageStore } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

interface LanguageSwitcherDropdownProps {
  onClose: () => void;
}

export function LanguageSwitcherDropdown({ onClose }: LanguageSwitcherDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguageStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const changeLanguage = (locale: string) => {
    setLanguage(locale);
    localStorage.setItem('language', locale);
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    const segments = pathname.split('/');
    const hasLangPrefix = /^[a-z]{2}$/.test(segments[1]);
    const newPath = hasLangPrefix
      ? `/${locale}/${segments.slice(2).join('/')}`
      : `/${locale}${pathname}`;

    router.push(newPath);
    router.refresh();
    onClose();
  };

  return (
    <div ref={dropdownRef} className="w-32 bg-[#83e591] rounded-md shadow-lg overflow-hidden">
      <button
        onClick={() => changeLanguage('en')}
        className={`flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#6cc578] ${
          language === 'en' ? 'font-medium bg-[#6cc578]' : ''
        }`}
      >
        English
      </button>
      <div className="h-[1px] bg-black/10 my-0 mx-2"></div>
      <button
        onClick={() => changeLanguage('es')}
        className={`flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#6cc578] ${
          language === 'es' ? 'font-medium bg-[#6cc578]' : ''
        }`}
      >
        Español
      </button>
    </div>
  );
}
