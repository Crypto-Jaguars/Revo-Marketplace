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

    const segments = pathname.split('/');
    const hasLangPrefix = /^[a-z]{2}$/.test(segments[1]);
    const newPath = hasLangPrefix
      ? `/${locale}/${segments.slice(2).join('/')}`
      : `/${locale}${pathname}`;

    router.push(newPath);
    onClose();
  };

  return (
    <div ref={dropdownRef} className="w-32 bg-white rounded-md shadow-lg overflow-hidden">
      <button
        onClick={() => changeLanguage('en')}
        className={`flex items-center w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 ${
          language === 'en' ? 'font-medium' : ''
        }`}
      >
        English
      </button>
      <div className="h-[1px] bg-black my-1 mx-2"></div>
      <button
        onClick={() => changeLanguage('es')}
        className={`flex items-center w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 ${
          language === 'es' ? 'font-medium' : ''
        }`}
      >
        Español
      </button>
    </div>
  );
}
