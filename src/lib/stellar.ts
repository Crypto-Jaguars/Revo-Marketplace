import { Horizon, Networks, Asset, Keypair } from '@stellar/stellar-sdk';

export const STELLAR_SERVERS = {
  PUBLIC: 'https://horizon.stellar.org',
  TESTNET: 'https://horizon-testnet.stellar.org',
};

export const NETWORK_PASSPHRASES = {
  PUBLIC: Networks.PUBLIC,
  TESTNET: Networks.TESTNET,
};

export const getServer = (network: 'PUBLIC' | 'TESTNET') => {
  return new Horizon.Server(STELLAR_SERVERS[network]);
};

export const getNetworkPassphrase = (network: 'PUBLIC' | 'TESTNET') => {
  return NETWORK_PASSPHRASES[network];
};

export const formatStellarAmount = (amount: string, decimals = 7) => {
  const num = Number.parseFloat(amount);
  return num.toFixed(decimals).replace(/\.?0+$/, '');
};

export const isValidStellarAddress = (address: string): boolean => {
  try {
    Keypair.fromPublicKey(address);
    return true;
  } catch {
    return false;
  }
};

export const STELLAR_ASSETS = {
  XLM: Asset.native(),
  USDC_CENTER: new Asset('USDC', process.env.NEXT_PUBLIC_USDC_ISSUER),
  USDT_TETHER: new Asset('USDT', process.env.NEXT_PUBLIC_USDT_ISSUER),
};

export const getAssetFromCode = (assetCode: string, issuer?: string): Asset => {
  if (assetCode === 'XLM' || assetCode === 'native') {
    return Asset.native();
  }

  if (!issuer) {
    switch (assetCode) {
      case 'USDC':
        return STELLAR_ASSETS.USDC_CENTER;
      case 'USDT':
        return STELLAR_ASSETS.USDT_TETHER;
      default:
        throw new Error(`Unknown asset: ${assetCode}`);
    }
  }

  return new Asset(assetCode, issuer);
};
