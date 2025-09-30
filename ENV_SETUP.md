# Environment Variables Setup for Passkey Development

## Problem
The passkey functionality requires several environment variables that are currently not set, causing the error:
```
Error: undefined is not a valid argument for URI
```

## Solution
Create a `.env.local` file in the project root with the following content:

```bash
# Stellar Testnet Configuration for Passkey Development
NEXT_PUBLIC_RPC_URL=https://soroban-testnet.stellar.org:443
NEXT_PUBLIC_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# Mock values for development (replace with real values when deploying)
NEXT_PUBLIC_WALLET_WASM_HASH=mock-wallet-hash-for-development
NEXT_PUBLIC_LAUNCHTUBE_URL=https://launchtube.testnet.stellar.org
NEXT_PUBLIC_LAUNCHTUBE_JWT=mock-jwt-for-development
NEXT_PUBLIC_MERCURY_PROJECT_NAME=mock-mercury-project
NEXT_PUBLIC_MERCURY_URL=https://mercury.testnet.stellar.org
NEXT_PUBLIC_MERCURY_JWT=mock-mercury-jwt-for-development
NEXT_PUBLIC_NATIVE_CONTRACT_ID=mock-native-contract-id
```

## Steps to Fix:
1. Create `.env.local` file in project root
2. Copy the content above into the file
3. Restart the development server
4. Test the passkey functionality

## Note:
These are mock values for local development. For production, replace with actual values from your Stellar/Soroban setup.
