import Image from 'next/image';
import { RiGithubLine } from 'react-icons/ri';
import { RiLinkedinLine } from 'react-icons/ri';
import { RiTwitterLine } from 'react-icons/ri';
import { useTranslations } from 'next-intl';

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
    title: 'support',
    items: ['San Jose, Costa Rica', 'Revolutionaryfarmer@gmail.com'],
  },
  {
    title: 'account',
    items: [
      { label: 'myAccount', href: '#' },
      { label: 'loginRegister', href: '#' },
      { label: 'cart', href: '#' },
      { label: 'wishlist', href: '#' },
      { label: 'shop', href: '/products' },
    ],
  },
  {
    title: 'quickLinks',
    items: [
      { label: 'privacyPolicy', href: '#' },
      { label: 'termsOfUse', href: '#' },
      { label: 'faq', href: '#' },
      { label: 'contact', href: '#' },
      {
        label: 'documentation',
        href: 'https://revolutionary-farmers.gitbook.io/revolutionary-farmers',
      },
    ],
  },
  {
    title: 'downloadApp',
    items: [
      {
        label: 'barcode',
        img: '/qrcode.png',
        href: '#',
      },
      {
        label: 'playStore',
        href: '#',
        img: '/googleplay.png',
      },
    ],
    social: [
      {
        label: 'twitter',
        href: 'https://x.com/revofarmers',
        component: <RiTwitterLine size={20} />,
      },
      {
        label: 'linkedIn',
        href: 'https://www.linkedin.com/company/revofarmers/',
        component: <RiLinkedinLine size={20} />,
      },
      {
        label: 'github',
        href: 'https://github.com/Crypto-Jaguars',
        component: <RiGithubLine size={20} />,
      },
    ],
  },
];

const Footer = () => {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const isFooterLinkItem = (item: string | FooterLinkItem): item is FooterLinkItem => {
    return typeof item !== 'string';
  };

  return (
    <div className="bg-[#375B42] dark:bg-background-dark h-auto w-full ">
      <div className="py-16 px-10 md:px-40">
        <div className="flex flex-col md:flex-row justify-between">
              {footerLinks.map(({ title, items, social }) => (
            <div key={title} className="flex text-base flex-col gap-4 w-full md:w-1/6">
              <h3 className="text-white-dark font-bold">{t(title)}</h3>
              <ul
                  className={`flex ${
                  title === 'downloadApp' ? 'flex-row ' : 'flex-col'
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
                {title === 'downloadApp' && social && (
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
                          aria-label={t(label)}
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
