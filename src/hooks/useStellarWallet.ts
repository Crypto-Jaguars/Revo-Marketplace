"use client"

import { useState, useCallback, useEffect } from "react"
import { Horizon, Networks, Asset, Operation, TransactionBuilder, BASE_FEE, Keypair, Memo } from "@stellar/stellar-sdk"
import { kit } from "@/wallet/walletKit"

interface StellarBalance {
  asset_type: string
  asset_code?: string
  asset_issuer?: string
  balance: string
  limit?: string
  buying_liabilities?: string
  selling_liabilities?: string
}

interface Transaction {
  id: string
  hash: string
  type: "payment" | "create_account" | "manage_offer" | "path_payment" | "manage_data" | "change_trust"
  amount: string
  asset: string
  from: string
  to: string
  timestamp: string
  status: "success" | "pending" | "failed"
  memo?: string
  fee: string
  operation_count: number
}

export function useStellarWallet(address: string | null) {
  const [balances, setBalances] = useState<StellarBalance[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [network, setNetwork] = useState<"PUBLIC" | "TESTNET">("PUBLIC")

  const getServer = useCallback(() => {
    return network === "PUBLIC"
      ? new Horizon.Server("https://horizon.stellar.org")
      : new Horizon.Server("https://horizon-testnet.stellar.org")
  }, [network])

  const getNetworkPassphrase = useCallback(() => {
    return network === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET
  }, [network])

  const fetchBalances = useCallback(async () => {
    if (!address) {
      setBalances([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const server = getServer()
      const account = await server.loadAccount(address)

      const stellarBalances: StellarBalance[] = account.balances.map((balance: any) => ({
        asset_type: balance.asset_type,
        asset_code: balance.asset_code,
        asset_issuer: balance.asset_issuer,
        balance: balance.balance,
        limit: balance.limit,
        buying_liabilities: balance.buying_liabilities,
        selling_liabilities: balance.selling_liabilities,
      }))

      setBalances(stellarBalances)
    } catch (err: any) {
      console.error("Failed to fetch balances:", err)
      if (err.response?.status === 404) {
        setError("Account not found on the Stellar network")
      } else {
        setError(err.message || "Failed to fetch balances")
      }
      setBalances([])
    } finally {
      setIsLoading(false)
    }
  }, [address, getServer])

  const fetchTransactions = useCallback(async () => {
    if (!address) {
      setTransactions([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const server = getServer()

      // Fetch transactions for the account
      const transactionsResponse = await server.transactions().forAccount(address).order("desc").limit(50).call()

      const stellarTransactions: Transaction[] = await Promise.all(
        transactionsResponse.records.map(async (tx: any) => {
          try {
            // Get operations for this transaction to determine type and amount
            const operations = await server.operations().forTransaction(tx.hash).call()

            let amount = "0"
            let asset = "XLM"
            let from = address
            let to = address
            let type: Transaction["type"] = "payment"

            if (operations.records.length > 0) {
              const firstOp = operations.records[0]

              // Fix the type assignment issue
              switch (firstOp.type) {
                case "payment":
                  type = "payment"
                  amount = (firstOp as any).amount || "0"
                  asset = (firstOp as any).asset_type === "native" ? "XLM" : (firstOp as any).asset_code || "XLM"
                  from = (firstOp as any).from || address
                  to = (firstOp as any).to || address
                  break
                case "create_account":
                  type = "create_account"
                  amount = (firstOp as any).starting_balance || "0"
                  asset = "XLM"
                  from = (firstOp as any).funder || address
                  to = (firstOp as any).account || address
                  break
                case "path_payment_strict_receive":
                case "path_payment_strict_send":
                  type = "path_payment"
                  amount = (firstOp as any).amount || (firstOp as any).source_amount || "0"
                  asset = (firstOp as any).asset_type === "native" ? "XLM" : (firstOp as any).asset_code || "XLM"
                  from = (firstOp as any).from || address
                  to = (firstOp as any).to || address
                  break
                case "manage_sell_offer":
                case "manage_buy_offer":
                case "create_passive_sell_offer":
                  type = "manage_offer"
                  amount = (firstOp as any).amount || "0"
                  asset =
                    (firstOp as any).selling_asset_type === "native"
                      ? "XLM"
                      : (firstOp as any).selling_asset_code || "XLM"
                  break
                case "change_trust":
                  type = "change_trust"
                  amount = (firstOp as any).limit || "0"
                  asset = (firstOp as any).asset_code || "UNKNOWN"
                  break
                case "manage_data":
                  type = "manage_data"
                  break
                default:
                  // For other operations, we'll show minimal info
                  break
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
              status: tx.successful ? "success" : ("failed" as const),
              memo: tx.memo || "",
              fee: (Number.parseInt(tx.fee_charged) / 10000000).toString(),
              operation_count: tx.operation_count,
            }
          } catch (opError) {
            console.error("Error fetching operations for transaction:", opError)
            return {
              id: tx.id,
              hash: tx.hash,
              type: "payment" as const,
              amount: "0",
              asset: "XLM",
              from: address,
              to: address,
              timestamp: tx.created_at,
              status: tx.successful ? "success" : ("failed" as const),
              memo: tx.memo || "",
              fee: (Number.parseInt(tx.fee_charged) / 10000000).toString(),
              operation_count: tx.operation_count,
            }
          }
        }),
      )

      setTransactions(stellarTransactions)
    } catch (err: any) {
      console.error("Failed to fetch transactions:", err)
      if (err.response?.status === 404) {
        setError("No transactions found for this account")
      } else {
        setError(err.message || "Failed to fetch transactions")
      }
      setTransactions([])
    } finally {
      setIsLoading(false)
    }
  }, [address, getServer])

  const sendPayment = useCallback(
    async (destination: string, amount: string, assetCode?: string, assetIssuer?: string, memo?: string) => {
      if (!address) {
        throw new Error("Wallet not connected")
      }

      try {
        // Validate destination address
        try {
          Keypair.fromPublicKey(destination)
        } catch {
          throw new Error("Invalid destination address")
        }

        const server = getServer()
        const networkPassphrase = getNetworkPassphrase()

        // Load the source account
        const sourceAccount = await server.loadAccount(address)

        // Create the asset
        let asset: Asset
        if (!assetCode || assetCode === "XLM") {
          asset = Asset.native()
        } else {
          if (!assetIssuer) {
            throw new Error("Asset issuer is required for non-native assets")
          }
          asset = new Asset(assetCode, assetIssuer)
        }

        // Create the payment operation
        const operation = Operation.payment({
          destination,
          asset,
          amount,
        })

        // Build the transaction
        let transactionBuilder = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase,
        }).addOperation(operation)

        // Add memo if provided
        if (memo) {
          transactionBuilder = transactionBuilder.addMemo(Memo.text(memo))
        }

        const transaction = transactionBuilder.setTimeout(300).build()

        // Sign the transaction using the wallet kit
        // const signedXdr = await kit.signTransaction({
        //   xdr: transaction.toXDR(),
        //   publicKeys: [address],
        //   network: networkPassphrase,
        // })
        const signedXdr = await kit.signTransaction({
            networkPassphrase: networkPassphrase,
            address: [address]
        })

        // Submit the transaction
        const transactionResult = await server.submitTransaction(
          TransactionBuilder.fromXDR(signedXdr, networkPassphrase),
        )

        // Refresh balances and transactions after successful payment
        setTimeout(() => {
          fetchBalances()
          fetchTransactions()
        }, 2000)

        return transactionResult.hash
      } catch (err: any) {
        console.error("Payment error:", err)
        throw new Error(err.message || "Failed to send payment")
      }
    },
    [address, getServer, getNetworkPassphrase, fetchBalances, fetchTransactions],
  )

  const createTrustline = useCallback(
    async (assetCode: string, assetIssuer: string, limit?: string) => {
      if (!address) {
        throw new Error("Wallet not connected")
      }

      try {
        const server = getServer()
        const networkPassphrase = getNetworkPassphrase()

        // Load the source account
        const sourceAccount = await server.loadAccount(address)

        // Create the asset
        const asset = new Asset(assetCode, assetIssuer)

        // Create the change trust operation
        const operation = Operation.changeTrust({
          asset,
          limit,
        })

        // Build the transaction
        const transaction = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase,
        })
          .addOperation(operation)
          .setTimeout(300)
          .build()

        // Sign the transaction using the wallet kit
        const signedXdr = await kit.signTransaction({
          xdr: transaction.toXDR(),
          publicKeys: [address],
          network: networkPassphrase,
        })

        // Submit the transaction
        const transactionResult = await server.submitTransaction(
          TransactionBuilder.fromXDR(signedXdr, networkPassphrase),
        )

        // Refresh balances after successful trustline creation
        setTimeout(() => {
          fetchBalances()
        }, 2000)

        return transactionResult.hash
      } catch (err: any) {
        console.error("Trustline creation error:", err)
        throw new Error(err.message || "Failed to create trustline")
      }
    },
    [address, getServer, getNetworkPassphrase, fetchBalances],
  )

  const switchNetwork = useCallback(async (newNetwork: "PUBLIC" | "TESTNET") => {
    setNetwork(newNetwork)
    // Clear current data when switching networks
    setBalances([])
    setTransactions([])
    setError(null)
  }, [])

  // Auto-refresh balances and transactions when address changes
  useEffect(() => {
    if (address) {
      fetchBalances()
      fetchTransactions()
    } else {
      setBalances([])
      setTransactions([])
      setError(null)
    }
  }, [address, fetchBalances, fetchTransactions])

  // Set up periodic refresh for balances (every 30 seconds)
  useEffect(() => {
    if (!address) return

    const interval = setInterval(() => {
      fetchBalances()
    }, 30000)

    return () => clearInterval(interval)
  }, [address, fetchBalances])

  return {
    balances,
    transactions,
    isLoading,
    error,
    network,
    fetchBalances,
    fetchTransactions,
    sendPayment,
    createTrustline,
    switchNetwork,
  }
}
