'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { PasskeyState } from '@/store/slices/passkey/types';

/**
 * Passkey store implementation
 *
 * Manages passkey authentication state and operations
 * Currently stores data in localStorage, ready to pivot to server integration
 */
export const usePasskeyStore = create<PasskeyState>()(
  devtools(
    persist(
      (set, get) => ({
        keyId: null,
        contractId: null,
        isLoading: false,
        error: null,
        isConnected: false,

        setKeyId: (keyId: string | null) => set({ keyId }),
        setContractId: (contractId: string | null) => set({ contractId }),
        setLoading: (isLoading: boolean) => set({ isLoading }),
        setError: (error: string | null) => set({ error }),
        setIsConnected: (isConnected: boolean) => set({ isConnected }),

        connect: async (keyId?: string) => {
          set({ isLoading: true, error: null });
          try {
            const { account, server } = await import('@/lib/passkey');
            const { keyId: kid, contractId: cid } = await account.connectWallet({
              keyId,
              getContractId: (keyId) => server.getContractId({ keyId }),
            });
            set({
              keyId: kid.toString(),
              contractId: cid,
              isLoading: false,
              isConnected: true,
            });
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Connection failed';
            set({ isLoading: false, error: errorMessage, isConnected: false });
            throw err;
          }
        },

        register: async (name: string) => {
          set({ isLoading: true, error: null });
          try {
            const { account, server } = await import('@/lib/passkey');
            const {
              keyId: kid,
              contractId: cid,
              signedTx,
            } = await account.createWallet('Revo Marketplace', name);
            await server.send(signedTx);
            set({
              keyId: kid.toString(),
              contractId: cid,
              isLoading: false,
              isConnected: true,
            });
          } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed';
            set({ isLoading: false, error: errorMessage, isConnected: false });
            throw err;
          }
        },

        disconnect: () =>
          set({
            keyId: null,
            contractId: null,
            error: null,
            isConnected: false,
          }),

        // Future server integration methods (ready to implement)
        syncWithServer: async () => {
          // TODO: Implement server synchronization
          console.log('Server sync not implemented yet');
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: 'passkey-storage',
        partialize: (state) => ({
          keyId: state.keyId,
          contractId: state.contractId,
          isConnected: state.isConnected,
        }),
      }
    )
  )
);
