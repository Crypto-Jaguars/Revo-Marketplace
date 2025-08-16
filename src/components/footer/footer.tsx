'use client';

import Image from 'next/image';
import { RiInstagramLine, RiLinkedinLine, RiTwitterLine } from 'react-icons/ri';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { ReactElement } from 'react';

interface FooterLinkItem {
  label: string;
  href: string;
  onClick?: () => void;
}

interface SocialLink {
  label: string;
  href: string;
  component: ReactElement;
  disabled?: boolean;
  tooltip?: string;
}

const Footer = () => {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = params.locale as string;
  const currentYear = new Date().getFullYear();

  const handleContactClick = () => {
    const subject = encodeURIComponent('Contact request — Revolutionary Farmers');
    const body = encodeURIComponent(
      'Hello Revolutionary Farmers,\n\nName: \nRole/Company: \nMessage: \n\nThanks.'
    );
    window.location.href = `mailto:revolutionaryfarmers@gmail.com?subject=${subject}&body=${body}`;
  };

  const navigationLinks = {
    column1: [
      { label: t('Login/Register'), href: `/${locale}/signin` },
      { label: t('My Account'), href: `/${locale}/account` },
    ],
    column2: [
      { label: t('Shop'), href: `/${locale}/products` },
      { label: t('Cart'), href: `/${locale}/cart` },
    ],
    column3: [
      { label: t('FAQ'), href: `/${locale}/faq` },
      { label: t('Contact'), href: '#', onClick: handleContactClick },
      { label: t('Our Team'), href: `/${locale}/our-team` },
    ],
  };

  const socialLinks = [
    {
      label: t('Instagram'),
      href: '#',
      component: <RiInstagramLine size={20} />,
      disabled: true,
      tooltip: t('Instagram coming soon'),
    },
    {
      label: t('Twitter'),
      href: 'https://x.com/RevoFarmers',
      component: <RiTwitterLine size={20} />,
    },
    {
      label: t('LinkedIn'),
      href: 'https://www.linkedin.com/company/revofarmers/',
      component: <RiLinkedinLine size={20} />,
    },
  ];

  return (
    <footer className="relative bg-primary_green h-auto w-full overflow-hidden ">
              <div className="font-bold max-w-7xl mx-auto px-4 ">
          <div
            className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/images/footer-img.png")' }}
          ></div>

        <div className="relative z-10 py-16 ">
          <div className="flex flex-col md:flex-row justify-between items-start gap-x-8 gap-y-12">
            <div className="flex flex-col gap-4 lg:w-1/2">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.svg"
                  alt="Revolutionary Farmers"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <span className="text-gray-50 font-bold text-xl">Revolutionary Farmers</span>
              </div>

              <p className="text-gray-50/90 text-sm leading-relaxed max-w-md">
                {t('description')}
              </p>

              <div className="flex gap-4 items-center">
                {socialLinks.map((social, index) => (
                  <div key={index} className="relative group">
                    {social.disabled ? (
                      <button
                        className="text-gray-50/60 hover:text-gray-50/80 transition-colors p-2"
                        aria-disabled="true"
                        aria-describedby={`tooltip-${index}`}
                      >
                        {social.component}
                      </button>
                    ) : (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-50/85 hover:text-gray-50 transition-colors p-2"
                        aria-label={social.label}
                      >
                        {social.component}
                      </a>
                    )}
                    {social.tooltip && (
                      <div
                        id={`tooltip-${index}`}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-white text-gray-900 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
                      >
                        {social.tooltip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
                         </div>

             <div className="flex gap-12 lg:gap-20 ">
              <div className="flex flex-col gap-3">
                {navigationLinks.column1.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-50/90 hover:text-gray-50 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {navigationLinks.column2.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-gray-50/90 hover:text-gray-50 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {navigationLinks.column3.map((link, index) => (
                  link.onClick ? (
                    <button
                      key={index}
                      onClick={link.onClick}
                      className="text-gray-50/90 hover:text-gray-50 transition-colors text-sm text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-gray-50/90 hover:text-gray-50 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>
                 </div>

         <div className="relative z-10 flex items-center justify-center border-t border-white/10 py-5 ">
                  <p className="text-gray-50/85 text-sm">
          {t('copyright', { year: currentYear })}
        </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
