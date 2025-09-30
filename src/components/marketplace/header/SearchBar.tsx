import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchStore } from '@/store';
import { useLanguageStore } from '@/store';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [showLink, setShowLink] = useState(false);
  const { setSearchTerm } = useSearchStore();
  const pathname = usePathname();
  const { language } = useLanguageStore();

  const handleSearch = useCallback(
    (value: string) => {
      setInputValue(value);
      setSearchTerm(value);
      setShowLink(!pathname.includes('/products'));
    },
    [pathname, setSearchTerm]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for products..."
          className="w-full py-2 px-4 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-filter_active/50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        {showLink && (
          <Link
            href={`/${language}/products`}
            className="absolute inset-0"
            onClick={() => setShowLink(false)}
          />
        )}
      </div>
    </form>
  );
}
