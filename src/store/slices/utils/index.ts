'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { LoaderState } from './types';

/**
 * Utils store implementation
 *
 * Manages utility state like loading indicators across the application
 */
export const useLoaderStore = create<LoaderState>()(
  devtools((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
  }))
);
