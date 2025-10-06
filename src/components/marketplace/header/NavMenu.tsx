import React from 'react';
import Link from 'next/link';
import { useLanguageStore } from '@/store';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Store } from 'lucide-react';

interface NavMenuProps {
  className?: string;
}

export function NavMenu({ className }: NavMenuProps) {
  const { language } = useLanguageStore();
  const t = useTranslations('Marketplace.navigation');

  const navItems = [
    { key: 'home', label: 'Home', href: `/${language}`, icon: Store },
    { key: 'producers', label: 'Producers', href: `/${language}/producers` },
  ].map((item) => ({
    ...item,
    label: t(item.key),
  }));

  return (
    <nav className={cn('hidden md:flex items-center space-x-6', className)}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 py-2 transition-colors font-medium"
            style={{ color: 'white' }}
          >
            {Icon && <Icon className="h-5 w-5" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
