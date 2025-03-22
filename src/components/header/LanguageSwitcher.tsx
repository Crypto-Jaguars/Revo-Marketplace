import { useLanguageStore } from '@/store/languageStore/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguageStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (locale: string) => {
    setLanguage(locale);

    const segments = pathname.split('/');
    const hasLangPrefix = /^[a-z]{2}$/.test(segments[1]);
    const newPath = hasLangPrefix
      ? `/${locale}/${segments.slice(2).join('/')}`
      : `/${locale}${pathname}`;

    router.push(newPath);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 text-white hover:text-white/90 transition-colors"
      >
        <span className="text-[#FFFFFF]">
          {language === 'en' ? 'English' : 'Español'}
        </span>
        <ChevronDown className="w-4 h-4 text-[#FFFFFF]" />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 bg-white rounded-md shadow-lg overflow-hidden">
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
      )}
    </div>
  );
};

export default LanguageSwitcher;