import { ISupportedWallet } from '@creit.tech/stellar-wallets-kit';
import { useWalletStore } from '@/store';
import { getKit } from '../walletKit';

export const useWallet = () => {
  const { connectWalletStore, disconnectWalletStore } = useWalletStore();

  const connectWallet = async () => {
    try {
      const kit = getKit();
      await kit.openModal({
        modalTitle: 'Connect to your favorite wallet',
        onWalletSelected: async (option: ISupportedWallet) => {
          kit.setWallet(option.id);

          const { address } = await kit.getAddress();
          const { name } = option;

          connectWalletStore(address, name);
        },
      });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      const kit = getKit();
      await kit.disconnect();
      disconnectWalletStore();
    } catch (error) {
      console.error('Wallet disconnection failed:', error);
    }
  };

  return {
    connectWallet,
    disconnectWallet,
  };
};
