'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LanguageState } from './types';

/**
 * Language store implementation
 *
 * Manages application language preferences
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-store',
    }
  )
);
