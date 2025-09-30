import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  FREIGHTER_ID,
} from '@creit.tech/stellar-wallets-kit';

let kit: StellarWalletsKit | null = null;

export const getKit = (): StellarWalletsKit => {
  if (typeof window === 'undefined') {
    throw new Error('StellarWalletsKit can only be used in the browser');
  }

  if (!kit) {
    kit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: allowAllModules(),
    });
  }

  return kit;
};
