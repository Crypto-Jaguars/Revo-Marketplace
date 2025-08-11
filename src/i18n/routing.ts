import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { SUPPORTED_LOCALES } from '@/i18n/locales';

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES as unknown as string[],
  defaultLocale: 'es',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
