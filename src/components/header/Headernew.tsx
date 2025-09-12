'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useWalletStore } from '@/store';
import { useWallet } from '@/wallet/hooks/useWallet.hook';
import { Globe, Menu, Search, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguageStore } from '@/store';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslations } from 'next-intl';
import LoginModal from './LoginModal';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { disconnectWallet } = useWallet();
  const { address } = useWalletStore();
  const { language } = useLanguageStore();
  const router = useRouter();
  const t = useTranslations();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 flex flex-col px-4 sm:px-8 md:px-40 py-3 z-50" style={{ backgroundImage: "url('/images/header-bg.png')" }}>
        <div className="absolute inset-0 bg-green-700/90"></div>
        
        {/* Desktop Header */}
        <div className="hidden md:flex w-full justify-between items-center relative z-10">
          <div className="flex flex-row gap-2 items-center text-white">
            <button
              onClick={handleLogoClick}
              className="focus:outline-none flex justify-center items-center size-[30px] bg-white"
              aria-label="Home"
            >
              <Image src="/logo.svg" width={20} height={20} alt="Website logo" priority />
            </button>
            <p className="font-semibold text-base" style={{ color: 'white' }}>
              {t('HeroSection.title')}
            </p>
          </div>
          <nav aria-label="Main navigation">
            <div className="flex gap-6 items-center text-white">
              <Link style={{ color: 'white' }} href={`/${language}`} className="font-semibold text-base p-2 border border-transparent hover:border-white rounded-full cursor-pointer">
                {t('Marketplace.navigation.home')}
              </Link>
              <Link style={{ color: 'white' }} href={`/${language}/products`} className="font-semibold text-base p-2 border border-transparent hover:border-white rounded-full cursor-pointer">
                {t('Marketplace.navigation.products')}
              </Link>
              <Link style={{ color: 'white' }} href={`/${language}/marketplace`} className="font-semibold text-base p-2 border border-transparent hover:border-white rounded-full cursor-pointer">
                {t('Marketplace.navigation.marketplace')}
              </Link>
            </div>
          </nav>
          <div className='flex items-center gap-4'>
            <div className="relative flex items-center">
              <input
                type="search"
                placeholder={t('Marketplace.search.placeholder')}
                className="bg-white/20 text-white placeholder-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none w-40 border border-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'white' }} size={20} />
            </div>
            <button aria-label="Cart" className="p-2">
              <ShoppingCart size={24} style={{ color: 'white' }} />
            </button>
            <button
              onClick={address ? handleDisconnect : handleOpenModal}
              className="border border-white rounded-full px-6 py-2 bg-transparent hover:bg-white/10 transition-colors"
              style={{ color: 'white' }}
            >
              {address ? t('Marketplace.user.disconnect') : t('SignIn.submit')}
            </button>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex flex-col w-full relative z-10 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={toggleMenu} className="p-2" aria-expanded={isMenuOpen} aria-controls="mobile-menu">
                {isMenuOpen ? <X size={24} style={{ color: 'white' }} /> : <Menu size={24} style={{ color: 'white' }} />}
              </button>
              <button onClick={handleLogoClick} className="flex justify-center items-center size-[30px] bg-white" aria-label="Home">
                <Image src="/logo.svg" width={20} height={20} alt="Website logo" priority />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Cart" className="p-2">
                <ShoppingCart size={24} style={{ color: 'white' }} />
              </button>
              <LanguageSwitcher />
              <button
                style={{ color: 'white' }}
                onClick={address ? handleDisconnect : handleOpenModal}
                className="border border-white rounded-full px-4 py-1.5 text-sm text-white"
              >
                {address ? t('Marketplace.user.disconnect') : t('SignIn.submit')}
              </button>
            </div>
          </div>
          <div className="relative flex items-center w-full mt-3">
            <input
              type="search"
              placeholder={t('Marketplace.search.placeholder')}
              className="bg-white/20 placeholder-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={20} style={{ color: 'white' }} />
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-green-700/95 shadow-lg pt-24 z-40">
          <div className="flex flex-col items-center gap-2 p-4 text-white">
            <Link style={{ color: 'white' }} href={`/${language}`} onClick={() => setIsMenuOpen(false)} className="font-semibold py-2 w-full text-center hover:bg-white/10 rounded-md">{t('Marketplace.navigation.home')}</Link>
            <Link style={{ color: 'white' }} href={`/${language}/products`} onClick={() => setIsMenuOpen(false)} className="font-semibold py-2 w-full text-center hover:bg-white/10 rounded-md">{t('Marketplace.navigation.products')}</Link>
            <Link style={{ color: 'white' }} href={`/${language}/marketplace`} onClick={() => setIsMenuOpen(false)} className="font-semibold py-2 w-full text-center hover:bg-white/10 rounded-md">{t('Marketplace.navigation.marketplace')}</Link>
          </div>
        </div>
      )}

      {isModalOpen && <LoginModal onClose={handleCloseModal} t={t} />}
    </>
  );
};

export default Header;
