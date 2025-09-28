/**
 * Passkey store types
 */

export interface PasskeyState {
  keyId: string | null;
  contractId: string | null;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;

  // Actions
  setKeyId: (keyId: string | null) => void;
  setContractId: (contractId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setIsConnected: (isConnected: boolean) => void;

  // Passkey operations
  connect: (keyId?: string) => Promise<void>;
  register: (name: string) => Promise<void>;
  disconnect: () => void;

  // Future server integration
  syncWithServer: () => Promise<void>;
  clearError: () => void;
}
