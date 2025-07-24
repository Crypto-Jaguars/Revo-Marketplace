'use client';

import { create } from 'zustand';
import type { SearchState } from './types';

/**
 * Search store implementation
 *
 * Manages search state for marketplace and product filtering
 */
export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
