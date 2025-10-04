'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useWalletStore } from '@/store';
import { useWallet } from '@/wallet/hooks/useWallet.hook';
import { FaUserCircle } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import ItemsHeader from './ItemsHeader';
import { LanguageSwitcher } from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle'; // I did import the component ThemeToggle, it switches between light and dark
import { usePathname, useRouter } from 'next/navigation';
import { useLanguageStore } from '@/store';
import { useTranslations } from 'next-intl';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connectWallet, disconnectWallet } = useWallet();
  const { address, name } = useWalletStore();
  const { language } = useLanguageStore();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('common');

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (disconnectWallet) {
        await disconnectWallet();
        setIsMenuOpen(false);
        const basePath = `/${language}`;
        router.push(basePath);
      }
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const handleLogoClick = () => {
    const basePath = `/${language}`;
    router.push(basePath);
  };

  return (
    <header className="relative flex flex-row w-full justify-between gap-5 items-center p-4">
      <button
        onClick={handleLogoClick}
        className="md:m-0 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
        aria-label="Home"
      >
        <Image src="/logo.svg" width={40} height={40} alt="Website logo" priority />
      </button>

      <nav className="hidden md:block" aria-label="Main navigation">
        <ItemsHeader isEnabled={address} currentLocale={language} />
      </nav>

      <div className="hidden md:flex items-center justify-center gap-5">
        <LanguageSwitcher />

        {/* // This button has been added and allows the user to change themes */}
        <ThemeToggle />

        {address ? (
          <>
            <button
              type="button"
              onClick={handleDisconnect}
              className="text-white bg-primary hover:bg-primary/90 rounded-full focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium text-sm px-5 py-3 text-center transition-colors"
              aria-label={t('actions.disconnect')}
            >
              {t('actions.disconnect')}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleConnect}
            className="text-white bg-primary hover:bg-primary/90 rounded-full focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium text-sm px-5 py-3 text-center transition-colors"
            aria-label={t('actions.connect')}
          >
            {t('actions.connect')}
          </button>
        )}
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="p-2 text-white hover:bg-primary/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? t('actions.closeMenu') : t('actions.openMenu')}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
