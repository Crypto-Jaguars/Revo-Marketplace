'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Horizon,
  Networks,
  Asset,
  Operation,
  TransactionBuilder,
  BASE_FEE,
  Keypair,
  Memo,
} from '@stellar/stellar-sdk';
import { getKit } from '@/wallet/walletKit';

// Custom types for Horizon responses
interface CustomBalanceLine {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
  limit?: string;
  buying_liabilities?: string;
  selling_liabilities?: string;
}

interface CustomAccountResponse {
  id: string;
  paging_token: string;
  account_id: string;
  sequence: string;
  subentry_count: number;
  balances: CustomBalanceLine[];
  // Add other fields if needed, e.g., signers, data, flags
}

interface CustomOperationResponse {
  id: string;
  paging_token: string;
  type: string;
  created_at: string;
  transaction_hash: string;
  source_account: string;
  // Common fields for all operations
}

interface CustomPaymentOperationResponse extends CustomOperationResponse {
  type: 'payment';
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  amount: string;
  from: string;
  to: string;
}

interface CustomCreateAccountOperationResponse extends CustomOperationResponse {
  type: 'create_account';
  starting_balance: string;
  funder: string;
  account: string;
}

interface CustomPathPaymentOperationResponse extends CustomOperationResponse {
  type: 'path_payment_strict_receive' | 'path_payment_strict_send';
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  amount: string;
  from: string;
  to: string;
  source_asset_type?: string;
  source_asset_code?: string;
  source_asset_issuer?: string;
  source_amount?: string;
}

interface CustomManageOfferOperationResponse extends CustomOperationResponse {
  type: 'manage_sell_offer' | 'manage_buy_offer';
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  amount: string;
  price: string;
  offer_id: string;
  selling_asset_type: string;
  selling_asset_code?: string;
  selling_asset_issuer?: string;
  buying_asset_type: string;
  buying_asset_code?: string;
  buying_asset_issuer?: string;
}

interface CustomChangeTrustOperationResponse extends CustomOperationResponse {
  type: 'change_trust';
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  limit: string;
}

interface CustomManageDataOperationResponse extends CustomOperationResponse {
  type: 'manage_data';
  name: string;
  value?: string;
}

interface StellarBalance {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
  limit?: string;
  buying_liabilities?: string;
  selling_liabilities?: string;
}

interface Transaction {
  id: string;
  hash: string;
  type:
    | 'payment'
    | 'create_account'
    | 'manage_offer'
    | 'path_payment'
    | 'manage_data'
    | 'change_trust';
  amount: string;
  asset: string;
  from: string;
  to: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
  memo?: string;
  fee: string;
  operation_count: number;
}

// Type for Horizon error responses
interface HorizonErrorResponse {
  response?: {
    status: number;
    data?: unknown;
  };
  message?: string;
}

// Type guard to check if error is a Horizon error with response
function isHorizonError(error: unknown): error is HorizonErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as HorizonErrorResponse).response === 'object' &&
    (error as HorizonErrorResponse).response !== null &&
    'status' in (error as HorizonErrorResponse).response!
  );
}

export function useStellarWallet(address: string | null) {
  const [balances, setBalances] = useState<StellarBalance[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [network, setNetwork] = useState<'PUBLIC' | 'TESTNET'>('PUBLIC');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [totalXlmUsdValue, setTotalXlmUsdValue] = useState('0.00');

  const getServer = useCallback(() => {
    return network === 'PUBLIC'
      ? new Horizon.Server('https://horizon.stellar.org')
      : new Horizon.Server('https://horizon-testnet.stellar.org');
  }, [network]);

  const getNetworkPassphrase = useCallback(() => {
    return network === 'PUBLIC' ? Networks.PUBLIC : Networks.TESTNET;
  }, [network]);

  const fetchExchangeRates = useCallback(async () => {
    try {
      // In a real application, you would fetch this from a reliable API like CoinGecko
      // For demonstration, we'll use mock data.
      const mockRates = {
        XLM: 0.12, // 1 XLM = 0.12 USD
        USDT: 1.0, // 1 USDT = 1.00 USD
        USDC: 1.0, // 1 USDC = 1.00 USD
      };
      setExchangeRates(mockRates);
    } catch (err: unknown) {
      console.error('Failed to fetch exchange rates:', err);
      // Optionally set an error state for exchange rates
    }
  }, []);

  const fetchBalances = useCallback(async () => {
    if (!address) {
      setBalances([]);
      setTotalXlmUsdValue('0.00');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const server = getServer();
      const account: CustomAccountResponse = await server.loadAccount(address);

      const stellarBalances: StellarBalance[] = account.balances.map(
        (balance: CustomBalanceLine) => ({
          asset_type: balance.asset_type,
          asset_code: balance.asset_code,
          asset_issuer: balance.asset_issuer,
          balance: balance.balance,
          limit: balance.limit,
          buying_liabilities: balance.buying_liabilities,
          selling_liabilities: balance.selling_liabilities,
        })
      );

      setBalances(stellarBalances);

      // Calculate total XLM equivalent in USD
      const xlmBalance = stellarBalances.find((b) => b.asset_type === 'native')?.balance || '0';
      if (exchangeRates.XLM) {
        setTotalXlmUsdValue((Number.parseFloat(xlmBalance) * exchangeRates.XLM).toFixed(2));
      } else {
        setTotalXlmUsdValue('0.00');
      }
    } catch (err: unknown) {
      console.error('Failed to fetch balances:', err);
      if (isHorizonError(err) && err.response?.status === 404) {
        setError('Account not found on the Stellar network');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch balances');
      }
      setBalances([]);
      setTotalXlmUsdValue('0.00');
    } finally {
      setIsLoading(false);
    }
  }, [address, getServer, exchangeRates.XLM]); // Depend on exchangeRates.XLM

  const fetchTransactions = useCallback(async () => {
    if (!address) {
      setTransactions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const server = getServer();

      // Fetch transactions for the account
      const transactionsResponse = await server
        .transactions()
        .forAccount(address)
        .order('desc')
        .limit(50)
        .call();

      const stellarTransactions: Transaction[] = await Promise.all(
        transactionsResponse.records.map(async (tx) => {
          try {
            // Get operations for this transaction to determine type and amount
            const operations = await server.operations().forTransaction(tx.hash).call();

            let amount = '0';
            let asset = 'XLM';
            let from = address;
            let to = address;
            let type: Transaction['type'] = 'payment';

            if (operations.records.length > 0) {
              const firstOp: CustomOperationResponse = operations.records[0];
              const opType = firstOp.type;

              // Handle all possible operation types with string comparison
              if (opType === 'payment') {
                const paymentOp = firstOp as CustomPaymentOperationResponse;
                type = 'payment';
                amount = paymentOp.amount || '0';
                asset = paymentOp.asset_type === 'native' ? 'XLM' : paymentOp.asset_code || 'XLM';
                from = paymentOp.from || address;
                to = paymentOp.to || address;
              } else if (opType === 'create_account') {
                const createAccountOp = firstOp as CustomCreateAccountOperationResponse;
                type = 'create_account';
                amount = createAccountOp.starting_balance || '0';
                asset = 'XLM';
                from = createAccountOp.funder || address;
                to = createAccountOp.account || address;
              } else if (
                opType === 'path_payment_strict_receive' ||
                opType === 'path_payment_strict_send'
              ) {
                const pathPaymentOp = firstOp as CustomPathPaymentOperationResponse;
                type = 'path_payment';
                amount = pathPaymentOp.amount || pathPaymentOp.source_amount || '0';
                asset =
                  pathPaymentOp.asset_type === 'native' ? 'XLM' : pathPaymentOp.asset_code || 'XLM';
                from = pathPaymentOp.from || address;
                to = pathPaymentOp.to || address;
              } else if (opType === 'manage_sell_offer' || opType === 'manage_buy_offer') {
                const offerOp = firstOp as CustomManageOfferOperationResponse;
                type = 'manage_offer';
                amount = offerOp.amount || '0';
                asset =
                  offerOp.selling_asset_type === 'native'
                    ? 'XLM'
                    : offerOp.selling_asset_code || 'XLM';
              } else if (opType === 'change_trust') {
                const changeTrustOp = firstOp as CustomChangeTrustOperationResponse;
                type = 'change_trust';
                amount = changeTrustOp.limit || '0';
                asset = changeTrustOp.asset_code || 'UNKNOWN';
              } else if (opType === 'manage_data') {
                type = 'manage_data';
              }
            }

            return {
              id: tx.id,
              hash: tx.hash,
              type,
              amount,
              asset,
              from,
              to,
              timestamp: tx.created_at,
              status: tx.successful ? 'success' : ('failed' as const),
              memo: tx.memo || '',
              fee: (Number.parseInt(tx.fee_charged.toString()) / 10000000).toString(),
              operation_count: tx.operation_count,
            };
          } catch (opError: unknown) {
            console.error('Error fetching operations for transaction:', opError);
            return {
              id: tx.id,
              hash: tx.hash,
              type: 'payment' as const,
              amount: '0',
              asset: 'XLM',
              from: address,
              to: address,
              timestamp: tx.created_at,
              status: tx.successful ? 'success' : ('failed' as const),
              memo: tx.memo || '',
              fee: (Number.parseInt(tx.fee_charged.toString()) / 10000000).toString(),
              operation_count: tx.operation_count,
            };
          }
        })
      );

      setTransactions(stellarTransactions);
    } catch (err: unknown) {
      console.error('Failed to fetch transactions:', err);
      if (isHorizonError(err) && err.response?.status === 404) {
        setError('No transactions found for this account');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch transactions');
      }
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }, [address, getServer]);

  const preparePaymentTransaction = useCallback(
    async (
      destination: string,
      amount: string,
      assetCode?: string,
      assetIssuer?: string,
      memo?: string
    ) => {
      if (!address) {
        throw new Error('Wallet not connected');
      }

      try {
        Keypair.fromPublicKey(destination); // Validate destination address
      } catch {
        throw new Error('Invalid destination address');
      }

      const server = getServer();
      const networkPassphrase = getNetworkPassphrase();
      const sourceAccount = await server.loadAccount(address);

      let asset: Asset;
      if (!assetCode || assetCode === 'XLM') {
        asset = Asset.native();
      } else {
        if (!assetIssuer) {
          throw new Error('Asset issuer is required for non-native assets');
        }
        asset = new Asset(assetCode, assetIssuer);
      }

      const operation = Operation.payment({
        destination,
        asset,
        amount,
      });

      let transactionBuilder = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase,
      }).addOperation(operation);

      if (memo) {
        transactionBuilder = transactionBuilder.addMemo(Memo.text(memo));
      }

      const transaction = transactionBuilder.setTimeout(300).build();
      const estimatedFee = (Number.parseInt(transaction.fee) / 10000000).toString();

      return {
        xdr: transaction.toXDR(),
        estimatedFee,
        sourceAccount: address,
        destination,
        amount,
        assetCode: assetCode || 'XLM',
        assetIssuer: assetIssuer || '',
        memo: memo || '',
      };
    },
    [address, getServer, getNetworkPassphrase]
  );

  const sendPayment = useCallback(
    async (xdr: string) => {
      if (!address) {
        throw new Error('Wallet not connected');
      }

      try {
        const server = getServer();
        const networkPassphrase = getNetworkPassphrase();

        // Sign the transaction using the wallet kit
        const signResponse = await getKit().signTransaction(xdr, {
          address: address,
          networkPassphrase: networkPassphrase,
        });

        // Extract the signed XDR from the response
        const signedXdr = signResponse.signedTxXdr;

        // Submit the transaction
        const transactionResult = await server.submitTransaction(
          TransactionBuilder.fromXDR(signedXdr, networkPassphrase)
        );

        // Refresh balances and transactions after successful payment
        setTimeout(() => {
          fetchBalances();
          fetchTransactions();
        }, 2000);

        return transactionResult.hash;
      } catch (err: unknown) {
        console.error('Payment error:', err);
        throw new Error(err instanceof Error ? err.message : 'Failed to send payment');
      }
    },
    [address, getServer, getNetworkPassphrase, fetchBalances, fetchTransactions]
  );

  const createTrustline = useCallback(
    async (assetCode: string, assetIssuer: string, limit?: string) => {
      if (!address) {
        throw new Error('Wallet not connected');
      }

      try {
        const server = getServer();
        const networkPassphrase = getNetworkPassphrase();

        // Load the source account
        const sourceAccount = await server.loadAccount(address);

        // Create the asset
        const asset = new Asset(assetCode, assetIssuer);

        // Create the change trust operation
        const operation = Operation.changeTrust({
          asset,
          limit,
        });

        // Build the transaction
        const transaction = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase,
        })
          .addOperation(operation)
          .setTimeout(300)
          .build();

        // Sign the transaction using the wallet kit
        const signResponse = await getKit().signTransaction(transaction.toXDR(), {
          address: address,
          networkPassphrase: networkPassphrase,
        });

        // Extract the signed XDR from the response
        const signedXdr = signResponse.signedTxXdr;

        // Submit the transaction
        const transactionResult = await server.submitTransaction(
          TransactionBuilder.fromXDR(signedXdr, networkPassphrase)
        );

        // Refresh balances after successful trustline creation
        setTimeout(() => {
          fetchBalances();
        }, 2000);

        return transactionResult.hash;
      } catch (err: unknown) {
        console.error('Trustline creation error:', err);
        throw new Error(err instanceof Error ? err.message : 'Failed to create trustline');
      }
    },
    [address, getServer, getNetworkPassphrase, fetchBalances]
  );

  const switchNetwork = useCallback(async (newNetwork: 'PUBLIC' | 'TESTNET') => {
    setNetwork(newNetwork);
    // Clear current data when switching networks
    setBalances([]);
    setTransactions([]);
    setError(null);
  }, []);

  // Fetch exchange rates on component mount
  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Auto-refresh balances and transactions when address or network changes
  useEffect(() => {
    if (address) {
      fetchBalances();
      fetchTransactions();
    } else {
      setBalances([]);
      setTransactions([]);
      setError(null);
    }
  }, [address, network, fetchBalances, fetchTransactions]); // Added network to dependency array

  // Set up periodic refresh for balances (every 30 seconds)
  useEffect(() => {
    if (!address) return;

    const interval = setInterval(() => {
      fetchBalances();
    }, 30000);

    return () => clearInterval(interval);
  }, [address, fetchBalances]);

  return {
    balances,
    transactions,
    isLoading,
    error,
    network,
    exchangeRates,
    totalXlmUsdValue,
    fetchBalances,
    fetchTransactions,
    preparePaymentTransaction,
    sendPayment,
    createTrustline,
    switchNetwork,
  };
}
