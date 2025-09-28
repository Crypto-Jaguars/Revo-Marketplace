'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { LanguageSwitcherDropdown } from './LanguageSwitcherDropdown';

export const LanguageSwitcher = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={switcherRef}>
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="md:border border-white border-0  rounded-full p-2"
      >
        <Globe size={24} style={{ color: 'white' }} />
      </button>
      {isLangOpen && (
        <div className="absolute top-full right-0 mt-2">
          <LanguageSwitcherDropdown onClose={() => setIsLangOpen(false)} />
        </div>
      )}
    </div>
  );
};
