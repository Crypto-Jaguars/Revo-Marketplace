'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { WalletState } from './types';

/**
 * Wallet store implementation
 *
 * Manages blockchain wallet connection state for the application
 */
export const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set) => ({
        address: '',
        name: '',
        connectWalletStore: (address: string, name: string) => set({ address, name }),
        disconnectWalletStore: () => set({ address: '', name: '' }),
      }),
      {
        name: 'address-wallet',
      }
    )
  )
);
