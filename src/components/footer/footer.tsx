'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiFacebookLine, RiGithubLine, RiInstagramLine } from 'react-icons/ri';
import { RiLinkedinLine } from 'react-icons/ri';
import { RiTwitterLine } from 'react-icons/ri';
import { FaGithub } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useLanguageStore } from '@/store';

interface FooterLinkItem {
  label: string;
  href: string;
  img?: string;
}

interface SocialLink {
  label: string;
  href: string;
  component: JSX.Element;
}

interface FooterLink {
  title: string;
  items: (string | FooterLinkItem)[];
  social?: SocialLink[];
}

const footerLinks: FooterLink[] = [
  {
    title: 'Support',
    items: ['San Jose, Costa Rica', 'Revolutionaryfarmer@gmail.com'],
  },
  {
    title: 'Account',
    items: [
      { label: 'My Account', href: '#' },
      { label: 'Login / Register', href: '#' },
      { label: 'Cart', href: '#' },
      { label: 'Wishlist', href: '#' },
      { label: 'Shop', href: '/products' },
    ],
  },
  {
    title: 'Quick Links',
    items: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Contact', href: '#' },
      {
        label: 'Documentation',
        href: 'https://revolutionary-farmers.gitbook.io/revolutionary-farmers',
      },
    ],
  },
  {
    title: 'Download App',
    items: [
      {
        label: 'Barcode',
        img: '/qrcode.png',
        href: '#',
      },
      {
        label: 'Play store',
        href: '#',
        img: '/googleplay.png',
      },
    ],
    social: [
      {
        label: 'Twitter',
        href: 'https://x.com/revofarmers',
        component: <RiTwitterLine size={20} />,
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/revofarmers/',
        component: <RiLinkedinLine size={20} />,
      },
      {
        label: 'Github',
        href: 'https://github.com/Crypto-Jaguars',
        component: <RiGithubLine size={20} />,
      },
    ],
  },
];

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const { language } = useLanguageStore();
  const pathname = usePathname();
  
  // Check if we're on the waitlist page
  const isWaitlistPage = pathname?.includes('/waitlist');

  const isFooterLinkItem = (item: string | FooterLinkItem): item is FooterLinkItem => {
    return typeof item !== 'string';
  };

  return (
    <div className="bg-[#375B42] dark:bg-background-dark h-auto w-full ">
      {/* Waitlist CTA Section - Only show if not on waitlist page */}
      {!isWaitlistPage && (
        <div className="bg-revolutionary_green/10 border-t border-revolutionary_green/20">
          <div className="py-8 px-10 md:px-40">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-revolutionary_green" />
                <div>
                  <h3 className="text-white font-semibold text-lg">{t('waitlistCta.title')}</h3>
                  <p className="text-white/80 text-sm">{t('waitlistCta.subtitle')}</p>
                </div>
              </div>
              <Button
                asChild
                className="bg-revolutionary_green hover:bg-revolutionary_green/90 text-white"
              >
                <Link href={`/${language}/waitlist`}>
                  {t('waitlistCta.button')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="py-16 px-10 md:px-40">
        <div className="flex flex-col md:flex-row justify-between">
          {footerLinks.map(({ title, items, social }) => (
            <div key={title} className="flex text-base flex-col gap-4 w-full md:w-1/6">
              <h3 className="text-white-dark font-bold">{t(title)}</h3>
              <ul
                className={`flex ${
                  title === 'Download App' ? 'flex-row ' : 'flex-col'
                } text-sm font-normal gap-5`}
              >
                {items.map((item, index) => (
                  <li key={index}>
                    {!isFooterLinkItem(item) && title === 'Support' ? (
                      <span className="text-white-dark">{item}</span>
                    ) : (
                      isFooterLinkItem(item) && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white-dark hover:underline"
                        >
                          {item.img ? (
                            <Image
                              src={item.img}
                              alt={t(item.label)}
                              width={120}
                              height={40}
                              quality={75}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            t(item.label)
                          )}
                        </a>
                      )
                    )}
                  </li>
                ))}
              </ul>
              {/* Render social links only for 'Download App' */}
              {title === 'Download App' && social && (
                <div className="flex flex-col">
                  {/* Display social icons in a row */}
                  <div className="flex flex-row gap-4">
                    {social.map(({ label, href, component }, index) => (
                      <a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white-dark hover:text-primary"
                        aria-label={label}
                      >
                        {component}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center border-t border-white border-opacity-5 py-5">
        <p className="text-white-dark text-opacity-95 opacity-85 font-normal text-sm">
          {t('copyright', { year: currentYear })}
        </p>
      </div>
    </div>
  );
};

export default Footer;
