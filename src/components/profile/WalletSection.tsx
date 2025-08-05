"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWalletStore } from "@/store/walletStore"
import { Wallet, Copy, RefreshCw, Link } from "lucide-react"
import { toast } from "sonner"
import { formatStellarAmount } from "@/lib/stellar"

export default function WalletSection() {
  const t = useTranslations("Wallet")
  const { wallet, balances, fetchBalances, switchNetwork } = useWalletStore()
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (wallet?.isConnected) {
      fetchBalances()
    }
  }, [wallet?.isConnected, fetchBalances])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await fetchBalances()
      toast.success("Wallet balance refreshed")
    } catch (error) {
      toast.error("Failed to refresh wallet balance")
    } finally {
      setIsRefreshing(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const openInExplorer = (address: string) => {
    const network = wallet?.network === "PUBLIC" ? "public" : "testnet"
    window.open(`https://stellar.expert/explorer/${network}/account/${address}`, "_blank")
  }

  if (!wallet?.isConnected) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-8 text-center">
          <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Wallet Connected</h2>
          <p className="text-gray-600">Connect your wallet to view your balance and transactions</p>
          <Button onClick={() => useWalletStore.getState().connectWallet()}>Connect Wallet</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Wallet Overview</span>
            </span>
            <Button
              variant="outline"
              disabled={isRefreshing}
              onClick={handleRefresh}
              className="border-gray-400 text-gray-600 hover:bg-gray-200 bg-transparent"
            >
              {isRefreshing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Account Address</p>
              <div className="flex items-center space-x-2">
                <code className="bg-black/5 px-2 py-1 rounded text-sm">
                  {wallet.address.slice(0, 12)}...{wallet.address.slice(-12)}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(wallet.address, "Wallet address")}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-900"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openInExplorer(wallet.address)}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-900"
                >
                  <Link className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-gray-600">Network</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => switchNetwork(wallet.network === "PUBLIC" ? "TESTNET" : "PUBLIC")}
              >
                Switch to {wallet.network === "PUBLIC" ? "Testnet" : "Public"}
              </Button>
            </div>
          </div>

          <div>
            <p className="text-gray-600">Available Balance</p>
            <p className="text-2xl font-semibold text-gray-900">{formatStellarAmount(wallet.balance.available)} XLM</p>
          </div>

          {balances.map((balance) => {
            if (balance.asset_type === "native") return null

            return (
              <div key={`${balance.asset_code}-${balance.asset_issuer}`}>
                <p className="text-gray-600">
                  {balance.asset_code} Balance ({balance.asset_issuer})
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {formatStellarAmount(balance.balance)} {balance.asset_code}
                </p>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
