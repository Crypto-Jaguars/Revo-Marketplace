// walletkit.ts
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  FREIGHTER_ID,
} from '@creit.tech/stellar-wallets-kit';

let kit: StellarWalletsKit | null = null;

if (typeof window !== 'undefined') {
  if (!(window as any).stellarKitInitialized) {
    kit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: allowAllModules(),
    });
    (window as any).stellarKitInitialized = true;
  }
}

export { kit };
