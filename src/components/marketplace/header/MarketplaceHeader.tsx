import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguageStore } from '@/store';
import { SearchBar } from './SearchBar';
import { NavMenu } from './NavMenu';
import { UserMenu } from './UserMenu';
import { LanguageSwitcher } from '@/components/header/LanguageSwitcher';
import { Menu, X, Store } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CartDropdown from '@/components/cart/cartDropdown';

const MarketplaceHeader = () => {
  const { language } = useLanguageStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('Marketplace.navigation');

  return (
    <header className="w-full relative">
      {/* Main Header with Green Background and Crops Overlay */}
      <div
        className="relative bg-[#22c55e]"
        style={{
          backgroundImage: 'url(/images/crops-collage.jpg)',
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for opacity control */}
        <div className="absolute inset-0 bg-[#22c55e]/10"></div>

        {/* Content */}
        <div className="relative z-10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Hamburger + Logo */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                <Link href={`/${language}`} className="flex items-center">
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

              {/* Center: Navigation (Desktop) */}
              <NavMenu className="hidden md:flex" />

              {/* Center-Right: Search (Desktop) */}
              <div className="flex-1 max-w-md mx-4 hidden md:block">
                <SearchBar />
              </div>

              {/* Right: Language + Cart + Login */}
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <CartDropdown />
                <UserMenu />
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-4 md:hidden">
              <SearchBar />
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/20 bg-[#22c55e]/95">
              <div className="p-4 space-y-2">
                <Link
                  href={`/${language}`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-md transition-colors font-medium"
                  style={{ color: 'white' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Store className="h-5 w-5" />
                  <span>{t('home')}</span>
                </Link>
                <Link
                  href={`/${language}/producers`}
                  className="block px-4 py-2 hover:bg-white/10 rounded-md transition-colors font-medium"
                  style={{ color: 'white' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('producers')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
