import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageStore } from '@/store/languageStore';
import SearchBar from './SearchBar';
import NavMenu from './NavMenu';
import CartWidget from './CartWidget';
import UserMenu from './UserMenu';
import LanguageSwitcher from '@/components/header/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CartDropdown from '@/components/cart/cartDropdown';

const MarketplaceHeader = () => {
  const { language } = useLanguageStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('Marketplace.navigation');

  return (
    <header className="w-full bg-white">

      <div className="w-full bg-filter_active">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
   
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <Link href={`/${language}`}>
                <Image
                  src="/logo.svg"
                  alt="Revolutionary Farmers"
                  width={40}
                  height={40}
                  priority
                  className="object-contain"
                />
              </Link>
            </div>

            <NavMenu className="hidden md:flex" />

            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-6">
              <CartDropdown />
              <UserMenu />
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <SearchBar />
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="p-4 space-y-4">
              <Link 
                href={`/${language}`}
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                {t('home')}
              </Link>
              <Link 
                href={`/${language}/products`}
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                {t('products')}
              </Link>
              <Link 
                href={`/${language}/farm`}
                className="block px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                {t('farm')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MarketplaceHeader;