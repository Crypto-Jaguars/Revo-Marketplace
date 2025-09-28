import { useCallback } from 'react';
import { usePasskeyStore } from '@/store/slices/passkey';

export interface PasskeyRegistrationData {
  name: string;
  email: string;
  userId: string;
}

export const usePasskey = () => {
  const { register, isLoading, error, clearError, isConnected } = usePasskeyStore();

  const createPasskey = useCallback(
    async (registrationData: PasskeyRegistrationData) => {
      try {
        // Create passkey after user registration
        await register(registrationData.name);

        // Store additional user data in localStorage for future server integration
        const userData = {
          ...registrationData,
          createdAt: new Date().toISOString(),
          passkeyCreated: true,
        };

        localStorage.setItem('user-registration-data', JSON.stringify(userData));

        return { success: true };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create passkey';
        return { success: false, error: errorMessage };
      }
    },
    [register]
  );

  return {
    createPasskey,
    isCreating: isLoading,
    error,
    clearError,
    isConnected,
  };
};
