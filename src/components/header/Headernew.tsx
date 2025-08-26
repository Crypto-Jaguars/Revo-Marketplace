'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useWalletStore } from '@/store';
import { useWallet } from '@/wallet/hooks/useWallet.hook';
import { Globe, Menu, Search, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguageStore } from '@/store';
import { LanguageSwitcherDropdown } from './LanguageSwitcherDropdown';
import { useTranslations } from 'next-intl';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
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
      <header className="relative flex flex-col px-4 sm:px-8 md:px-40 py-3 z-50" style={{ backgroundImage: "url('/images/header-bg.png')" }}>
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
              <p style={{ color: 'white' }} className="font-semibold text-base p-2 border border-transparent hover:border-white rounded-full cursor-pointer">{t('Marketplace.navigation.home')}</p>
              <p style={{ color: 'white' }} className="font-semibold text-base p-2 border border-transparent hover:border-white rounded-full cursor-pointer">{t('Marketplace.navigation.products')}</p>
              <p style={{ color: 'white' }} className="font-semibold text-base p-2 border border-transparent hover:border-white rounded-full cursor-pointer">{t('Marketplace.navigation.marketplace')}</p>
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
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="border border-white rounded-full p-2">
                <Globe size={24} style={{ color: 'white' }} />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2"><LanguageSwitcherDropdown onClose={() => setIsLangOpen(false)} /></div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex flex-col w-full relative z-10 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={toggleMenu} className="p-2" aria-expanded={isMenuOpen} aria-controls="mobile-menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <button onClick={handleLogoClick} className="flex justify-center items-center size-[30px] bg-white" aria-label="Home">
                <Image src="/logo.svg" width={20} height={20} alt="Website logo" priority />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Cart" className="p-2">
                <ShoppingCart size={24} />
              </button>
              <button
                onClick={address ? handleDisconnect : handleOpenModal}
                className="border border-white rounded-full px-4 py-1.5 text-sm"
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={20} />
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-green-700/95 shadow-lg z-40">
          <div className="flex flex-col items-center gap-2 p-4 text-white">
            <a href={`/${language}`} onClick={() => setIsMenuOpen(false)} className="font-semibold py-2 w-full text-center hover:bg-white/10 rounded-md">{t('Marketplace.navigation.home')}</a>
            <a href={`/${language}/products`} onClick={() => setIsMenuOpen(false)} className="font-semibold py-2 w-full text-center hover:bg-white/10 rounded-md">{t('Marketplace.navigation.products')}</a>
            <a href={`/${language}/marketplace`} onClick={() => setIsMenuOpen(false)} className="font-semibold py-2 w-full text-center hover:bg-white/10 rounded-md">{t('Marketplace.navigation.marketplace')}</a>
            <div className="mt-2 w-full border-t border-white/20 pt-4 flex justify-center">
              <LanguageSwitcherDropdown onClose={() => setIsMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {isModalOpen && <LoginModal onClose={handleCloseModal} t={t} />}
    </>
  );
};

export default Header;
