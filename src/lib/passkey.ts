import { PasskeyKit, PasskeyServer, SACClient } from 'passkey-kit';
import { Account, Keypair, StrKey } from '@stellar/stellar-sdk/minimal';
import { Buffer } from 'buffer';
import { basicNodeSigner } from '@stellar/stellar-sdk/minimal/contract';
import { Server } from '@stellar/stellar-sdk/minimal/rpc';

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL!;
const networkPassphrase = process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE!;
const walletWasmHash = process.env.NEXT_PUBLIC_WALLET_WASM_HASH!;
const launchtubeUrl = process.env.NEXT_PUBLIC_LAUNCHTUBE_URL!;
const launchtubeJwt = process.env.NEXT_PUBLIC_LAUNCHTUBE_JWT!;
const mercuryProjectName = process.env.NEXT_PUBLIC_MERCURY_PROJECT_NAME!;
const mercuryUrl = process.env.NEXT_PUBLIC_MERCURY_URL!;
const mercuryJwt = process.env.NEXT_PUBLIC_MERCURY_JWT!;
const nativeContractId = process.env.NEXT_PUBLIC_NATIVE_CONTRACT_ID!;

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
    } catch {}
  }
  return kp;
})();
export async function getFundPubkey() {
  return (await fundKeypairPromise).publicKey();
}
export async function getFundSigner() {
  return basicNodeSigner(await fundKeypairPromise, networkPassphrase);
}

export const account = new PasskeyKit({ rpcUrl, networkPassphrase, walletWasmHash });
export const server = new PasskeyServer({
  rpcUrl,
  launchtubeUrl,
  launchtubeJwt,
  mercuryProjectName,
  mercuryUrl,
  mercuryJwt,
});

export const sac = new SACClient({ rpcUrl, networkPassphrase });
export const native = sac.getSACClient(nativeContractId);
