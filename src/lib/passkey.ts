import { PasskeyKit, PasskeyServer, SACClient } from 'passkey-kit';
import { Account, Keypair, StrKey } from '@stellar/stellar-sdk/minimal';
import { Buffer } from 'buffer';
import { basicNodeSigner } from '@stellar/stellar-sdk/minimal/contract';
import { Server } from '@stellar/stellar-sdk/minimal/rpc';

// Environment variables with fallback values for development
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://soroban-testnet.stellar.org:443';
const networkPassphrase =
  process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015';
const walletWasmHash = process.env.NEXT_PUBLIC_WALLET_WASM_HASH || 'mock-wallet-hash-for-dev';
const launchtubeUrl =
  process.env.NEXT_PUBLIC_LAUNCHTUBE_URL || 'https://launchtube.testnet.stellar.org';
const launchtubeJwt = process.env.NEXT_PUBLIC_LAUNCHTUBE_JWT || 'mock-jwt-for-dev';
const mercuryProjectName = process.env.NEXT_PUBLIC_MERCURY_PROJECT_NAME || 'mock-mercury-project';
const mercuryUrl = process.env.NEXT_PUBLIC_MERCURY_URL || 'https://mercury.testnet.stellar.org';
const mercuryJwt = process.env.NEXT_PUBLIC_MERCURY_JWT || 'mock-mercury-jwt';
const nativeContractId = process.env.NEXT_PUBLIC_NATIVE_CONTRACT_ID || 'mock-native-contract-id';

export const rpc = new Server(rpcUrl);

export const mockPubkey = StrKey.encodeEd25519PublicKey(Buffer.alloc(32));
export const mockSource = new Account(mockPubkey, '0');

export const fundKeypairPromise: Promise<Keypair> = (async () => {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  const hashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(now.getTime().toString())
  );
  const kp = Keypair.fromRawEd25519Seed(Buffer.from(hashBuffer));
  try {
    await rpc.getAccount(kp.publicKey());
  } catch {
    try {
      await rpc.requestAirdrop(kp.publicKey());
    } catch {
      // Ignore airdrop failures
    }
  }
  return kp;
})();
export async function getFundPubkey() {
  return (await fundKeypairPromise).publicKey();
}
export async function getFundSigner() {
  return basicNodeSigner(await fundKeypairPromise, networkPassphrase);
}

// Validate required URLs before creating instances
function validateUrl(url: string, name: string): string {
  if (!url || url === 'undefined') {
    throw new Error(`${name} is not properly configured. Please check your environment variables.`);
  }
  return url;
}

// Validate URLs
const validatedRpcUrl = validateUrl(rpcUrl, 'RPC_URL');
const validatedLaunchtubeUrl = validateUrl(launchtubeUrl, 'LAUNCHTUBE_URL');
const validatedMercuryUrl = validateUrl(mercuryUrl, 'MERCURY_URL');

export const account = new PasskeyKit({
  rpcUrl: validatedRpcUrl,
  networkPassphrase,
  walletWasmHash,
});

export const server = new PasskeyServer({
  rpcUrl: validatedRpcUrl,
  launchtubeUrl: validatedLaunchtubeUrl,
  launchtubeJwt,
  mercuryProjectName,
  mercuryUrl: validatedMercuryUrl,
  mercuryJwt,
});

export const sac = new SACClient({
  rpcUrl: validatedRpcUrl,
  networkPassphrase,
});
export const native = sac.getSACClient(nativeContractId);
