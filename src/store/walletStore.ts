import { create } from "zustand"
import { persist } from "zustand/middleware"
import { isConnected, isAllowed, setAllowed, getAddress, getNetwork, signTransaction } from "@stellar/freighter-api"
import { Horizon, Networks, Asset, Operation, TransactionBuilder, BASE_FEE, Keypair } from "@stellar/stellar-sdk"
import type { WalletConfig, StellarBalance, Transaction } from "@/components/profile/types"

interface WalletStore {
    wallet: WalletConfig | null
    balances: StellarBalance[]
    transactions: Transaction[]
    isLoading: boolean
    error: string | null

    connectWallet: () => Promise<void>
    disconnectWallet: () => void
    switchNetwork: (network: "PUBLIC" | "TESTNET") => Promise<void>
    fetchBalances: () => Promise<void>
    fetchTransactions: () => Promise<void>
    signTransaction: (xdr: string) => Promise<string>
    sendPayment: (destination: string, amount: string, asset?: Asset) => Promise<string>
    setIsLoading: (isLoading: boolean) => void
}

const getDefaultNetwork = (): "PUBLIC" | "TESTNET" => {
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
        return "PUBLIC"
    }
    return "TESTNET"
}

const getServer = (network: "PUBLIC" | "TESTNET") => {
    if (network === "PUBLIC") {
        return new Horizon.Server("https://horizon.stellar.org")
    } else {
        return new Horizon.Server("https://horizon-testnet.stellar.org")
    }
}

const getNetworkPassphrase = (network: "PUBLIC" | "TESTNET") => {
    return network === "PUBLIC" ? Networks.PUBLIC : Networks.TESTNET
}

export const useWalletStore = create<WalletStore>()(
    persist(
        (set, get) => ({
            wallet: null,
            balances: [],
            transactions: [],
            isLoading: false,
            error: null,

            connectWallet: async () => {
                set({ isLoading: true, error: null })

                try {
                    // Check if Freighter is available
                    const connected = await isConnected()
                    if (!connected) {
                        throw new Error("Freighter wallet not found. Please install Freighter extension.")
                    }

                    // Request access to wallet
                    const allowed = await isAllowed()
                    if (!allowed) {
                        await setAllowed()
                    }

                    // Get public key and network from Freighter
                    const publicKeyResult = await getAddress()
                    const networkResult = await getNetwork()

                    // Extract public key - handle both string and object responses
                    let publicKey: string
                    if (typeof publicKeyResult === 'string') {
                        publicKey = publicKeyResult
                    } else if (publicKeyResult && typeof publicKeyResult === 'object' && 'publicKey' in publicKeyResult) {
                        publicKey = (publicKeyResult as any).publicKey
                    } else {
                        throw new Error("Unable to retrieve public key from Freighter")
                    }

                    // Extract network - handle both string and object responses
                    let network: "PUBLIC" | "TESTNET"
                    if (typeof networkResult === 'string') {
                        network = networkResult as "PUBLIC" | "TESTNET"
                    } else if (networkResult && typeof networkResult === 'object' && 'network' in networkResult) {
                        const networkStr = (networkResult as any).network
                        network = networkStr === 'PUBLIC' || networkStr === 'TESTNET' ? networkStr : getDefaultNetwork()
                    } else {
                        // Fallback to environment-based network
                        network = getDefaultNetwork()
                    }

                    const walletConfig: WalletConfig = {
                        address: publicKey,
                        network,
                        balance: {
                            available: "0",
                            escrow: "0",
                        },
                        isConnected: true,
                        publicKey,
                    }

                    set({ wallet: walletConfig, isLoading: false })

                    // Fetch initial data
                    await get().fetchBalances()
                    await get().fetchTransactions()
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Failed to connect wallet",
                        isLoading: false,
                    })
                }
            },

            disconnectWallet: () => {
                set({
                    wallet: null,
                    balances: [],
                    transactions: [],
                    error: null,
                })
            },

            switchNetwork: async (network: "PUBLIC" | "TESTNET") => {
                const { wallet } = get()
                if (!wallet) return

                set({ isLoading: true })

                try {
                    // Note: Freighter doesn't have a direct setNetwork method
                    // User needs to manually switch network in Freighter extension
                    // We'll just update our local state and refetch data
                    set({
                        wallet: { ...wallet, network },
                        isLoading: false,
                    })

                    // Refresh data for new network
                    await get().fetchBalances()
                    await get().fetchTransactions()
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : "Failed to switch network",
                        isLoading: false,
                    })
                }
            },

            fetchBalances: async () => {
                const { wallet } = get()
                if (!wallet?.publicKey) return

                try {
                    const server = getServer(wallet.network)
                    const account = await server.loadAccount(wallet.publicKey)

                    // Transform Stellar SDK balances to our format
                    const balances: StellarBalance[] = account.balances.map((balance: any) => ({
                        asset_type: balance.asset_type,
                        asset_code: balance.asset_code,
                        asset_issuer: balance.asset_issuer,
                        balance: balance.balance,
                        limit: balance.limit,
                    }))

                    // Calculate total available balance (XLM)
                    const xlmBalance = balances.find((b) => b.asset_type === "native")?.balance || "0"

                    // Calculate escrow balance (this would come from your escrow contracts)
                    // For now, we'll set it to 0
                    const escrowBalance = "0"

                    set({
                        balances,
                        wallet: {
                            ...wallet,
                            balance: {
                                available: xlmBalance,
                                escrow: escrowBalance,
                            },
                        },
                    })
                } catch (error) {
                    console.error("Failed to fetch balances:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to fetch balances",
                    })
                }
            },

            fetchTransactions: async () => {
                const { wallet } = get()
                if (!wallet?.publicKey) return

                try {
                    const server = getServer(wallet.network)

                    // Fetch payments for the account
                    const payments = await server.payments().forAccount(wallet.publicKey).order("desc").limit(50).call()

                    // Transform Stellar SDK transactions to our format
                    const transactions: Transaction[] = payments.records.map((payment: any) => {
                        let amount = "0"
                        let asset = "XLM"
                        let from = ""
                        let to = ""

                        if (payment.type === "payment") {
                            amount = payment.amount
                            asset = payment.asset_type === "native" ? "XLM" : payment.asset_code
                            from = payment.from
                            to = payment.to
                        } else if (payment.type === "create_account") {
                            amount = payment.starting_balance
                            asset = "XLM"
                            from = payment.funder
                            to = payment.account
                        }

                        return {
                            id: payment.id,
                            hash: payment.transaction_hash,
                            type: payment.type,
                            amount,
                            asset,
                            from,
                            to,
                            timestamp: payment.created_at,
                            status: "success", // Payments in history are successful
                            memo: "", // Would need to fetch from transaction details
                            fee: "0.00001", // Standard fee, would need to fetch actual
                        }
                    })

                    set({ transactions })
                } catch (error) {
                    console.error("Failed to fetch transactions:", error)
                    set({
                        error: error instanceof Error ? error.message : "Failed to fetch transactions",
                    })
                }
            },

            signTransaction: async (xdr: string) => {
                const { wallet } = get()
                if (!wallet) {
                    throw new Error("Wallet not connected")
                }

                try {
                    const networkPassphrase = getNetworkPassphrase(wallet.network)

                    // Call Freighter's signTransaction
                    const result = await signTransaction(xdr, {
                        networkPassphrase,
                        address: wallet.publicKey,
                    })

                    // Extract signed XDR from the result
                    if (typeof result === 'string') {
                        return result
                    } else if (result && typeof result === 'object' && 'signedTxXdr' in result) {
                        return (result as any).signedTxXdr
                    } else {
                        throw new Error("Invalid response from Freighter signTransaction")
                    }
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to sign transaction")
                }
            },

            sendPayment: async (destination: string, amount: string, asset?: Asset) => {
                const { wallet } = get()
                if (!wallet?.publicKey) {
                    throw new Error("Wallet not connected")
                }

                try {
                    const server = getServer(wallet.network)
                    const networkPassphrase = getNetworkPassphrase(wallet.network)

                    // Load the source account
                    const sourceAccount = await server.loadAccount(wallet.publicKey)

                    // Create the payment operation
                    const paymentAsset = asset || Asset.native()
                    const operation = Operation.payment({
                        destination,
                        asset: paymentAsset,
                        amount,
                    })

                    // Build the transaction
                    const transaction = new TransactionBuilder(sourceAccount, {
                        fee: BASE_FEE,
                        networkPassphrase,
                    })
                        .addOperation(operation)
                        .setTimeout(300) // 5 minutes
                        .build()

                    // Sign the transaction using Freighter
                    const signedXdr = await get().signTransaction(transaction.toXDR())

                    // Submit the transaction
                    const transactionResult = await server.submitTransaction(
                        TransactionBuilder.fromXDR(signedXdr, networkPassphrase),
                    )

                    // Refresh balances and transactions
                    await get().fetchBalances()
                    await get().fetchTransactions()

                    return transactionResult.hash
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : "Failed to send payment")
                }
            },

            setIsLoading: (isLoading: boolean) => set({ isLoading }),
        }),
        {
            name: "wallet-storage",
            partialize: (state) => ({
                wallet: state.wallet,
                balances: state.balances,
            }),
        },
    ),
)

export const setIsLoading = (isLoading: boolean) => {
    useWalletStore.setState({ isLoading })
}