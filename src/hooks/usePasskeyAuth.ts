import { useCallback } from 'react';
import { usePasskeyStore } from '@/store/slices/passkey';

/**
 * Hook for passkey authentication operations
 * Handles both connection and registration flows
 */
export const usePasskeyAuth = () => {
  const {
    connect,
    register,
    disconnect,
    isLoading,
    error,
    clearError,
    isConnected,
    keyId,
    contractId,
  } = usePasskeyStore();

  const authenticate = useCallback(
    async (keyId?: string) => {
      try {
        await connect(keyId);
        return { success: true };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
        return { success: false, error: errorMessage };
      }
    },
    [connect]
  );

  const createAccount = useCallback(
    async (name: string) => {
      try {
        await register(name);
        return { success: true };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Account creation failed';
        return { success: false, error: errorMessage };
      }
    },
    [register]
  );

  const signOut = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return {
    authenticate,
    createAccount,
    signOut,
    isLoading,
    error,
    clearError,
    isConnected,
    keyId,
    contractId,
  };
};
