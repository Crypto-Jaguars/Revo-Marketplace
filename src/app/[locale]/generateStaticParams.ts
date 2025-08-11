import { SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n/locales';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ locale: SupportedLocale }[]> {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
