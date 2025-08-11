'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { useLanguageStore } from '@/store';
import { type SupportedLocale } from '@/i18n/locales';

// SupportedLocale is centralized in '@/i18n/locales'

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

async function loadBaseMessages(locale: SupportedLocale): Promise<AbstractIntlMessages> {
  // Load legacy combined messages to preserve existing keys
  try {
    const mod = await import(`../../messages/${locale}.json`);
    return mod.default as AbstractIntlMessages;
  } catch {
    return {} as AbstractIntlMessages;
  }
}

const NAMESPACES = [
  'header',
  'hero',
  'sections',
  'footer',
  'auth',
  'pages',
  'team',
  'faq',
  'contact',
] as const;

async function loadNamespacedMessages(
  locale: SupportedLocale
): Promise<AbstractIntlMessages> {
  const results: Record<string, any> = {};
  await Promise.all(
    NAMESPACES.map(async (ns) => {
      try {
        const mod = await import(`../../messages/${locale}/${ns}.json`);
        results[ns] = mod.default as AbstractIntlMessages;
      } catch {
        // optional namespace
      }
    })
  );
  return results as AbstractIntlMessages;
}

function mergeMessages(
  base: AbstractIntlMessages,
  overrides: AbstractIntlMessages
): AbstractIntlMessages {
  // Shallow merge by namespace; overrides take precedence
  return { ...base, ...overrides };
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { language, setLanguage } = useLanguageStore();
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    try {
      const raw = localStorage.getItem('language-store');
      if (raw) {
        const parsed = JSON.parse(raw) as { state?: { language?: string } };
        const fromStore = parsed?.state?.language as SupportedLocale | undefined;
        if (fromStore) return fromStore;
      }
      const direct = localStorage.getItem('language') as SupportedLocale | null;
      return (direct as SupportedLocale) || (language as SupportedLocale) || 'es';
    } catch {
      return (language as SupportedLocale) || 'es';
    }
  });
  const [messages, setMessages] = useState<AbstractIntlMessages | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

  // Persist current locale for layout/middleware compatibility
  useEffect(() => {
    try {
      localStorage.setItem('language', locale);
      const isProduction = process.env.NODE_ENV === 'production';
      const secure = isProduction ? '; Secure' : '';
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax${secure}`;
    } catch {}
  }, [locale]);

  useEffect(() => {
    let active = true;
    (async () => {
      const base = await loadBaseMessages(locale);
      const namespaced = await loadNamespacedMessages(locale);
      const merged = mergeMessages(base, namespaced);
      if (active) setMessages(merged);
    })();
    return () => {
      active = false;
    };
  }, [locale]);

  const announceChange = useCallback((next: SupportedLocale) => {
    setLiveAnnouncement(next === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English');
    // clear after a moment
    setTimeout(() => setLiveAnnouncement(''), 1200);
  }, []);

  const setLocale = useCallback(
    (next: SupportedLocale) => {
      setLocaleState(next);
      setLanguage(next);
      try {
        localStorage.setItem('language', next);
        const isProduction = process.env.NODE_ENV === 'production';
        const secure = isProduction ? '; Secure' : '';
        document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax${secure}`;
      } catch {}
      announceChange(next);
    },
    [announceChange, setLanguage]
  );

  // Provide a t wrapper with graceful fallback using loaded messages
  const tWrapper = useCallback(
    (key: string, values?: Record<string, unknown>) => {
      if (!messages) return key;
      const segments = key.split('.');
      let node: any = messages;
      // Traverse nested keys
      for (const seg of segments) {
        if (node && typeof node === 'object' && seg in node) {
          node = node[seg];
        } else {
          return key;
        }
      }
      if (typeof node !== 'string') return key;
      // Simple interpolation
      if (values) {
        return node.replace(/\{(\w+)\}/g, (_, v) => String(values[v] ?? `{${v}}`));
      }
      return node;
    },
    [messages]
  );

  const contextValue = useMemo<I18nContextValue>(() => ({ locale, setLocale, t: tWrapper }), [locale, setLocale, tWrapper]);

  if (!messages) return null;

  return (
    <I18nContext.Provider value={contextValue}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div aria-live="polite" aria-atomic="true" className="sr-only" data-testid="lang-live">
          {liveAnnouncement}
        </div>
        {children}
      </NextIntlClientProvider>
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}


