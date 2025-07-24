/**
 * Wallet store types
 */

export interface WalletState {
  address: string;
  name: string;
  connectWalletStore: (address: string, name: string) => void;
  disconnectWalletStore: () => void;
}
