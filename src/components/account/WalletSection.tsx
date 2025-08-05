"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, Copy, ExternalLink, RefreshCw, CheckCircle, DollarSign, Send } from "lucide-react"
import { useWalletStore } from "@/store"
import { useWallet } from "@/wallet/hooks/useWallet.hook"
import { toast } from "sonner"
import { useStellarWallet } from "@/hooks/useStellarWallet"

export default function WalletSection() {
  const t = useTranslations("Account")
  const { address, name } = useWalletStore()
  const { connectWallet, disconnectWallet } = useWallet()
  const { balances, transactions, isLoading, fetchBalances, sendPayment } = useStellarWallet(address)

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    destination: "",
    amount: "",
    asset: "XLM",
    memo: "",
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (address) {
      fetchBalances()
      // Set up real-time balance updates
      const interval = setInterval(() => {
        fetchBalances()
      }, 30000) // Update every 30 seconds

      return () => clearInterval(interval)
    }
  }, [address, fetchBalances])

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success("Address copied to clipboard")
    }
  }

  const handleRefreshBalances = async () => {
    setIsRefreshing(true)
    await fetchBalances()
    setIsRefreshing(false)
    toast.success("Balances updated")
  }

  const formatBalance = (balance: string, decimals = 7) => {
    const num = Number.parseFloat(balance)
    return num.toFixed(decimals).replace(/\.?0+$/, "")
  }

  const getAssetIcon = (assetCode?: string) => {
    if (!assetCode || assetCode === "XLM") {
      return (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          XLM
        </div>
      )
    }
    if (assetCode === "USDT") {
      return (
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          $
        </div>
      )
    }
    return (
      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        {assetCode.charAt(0)}
      </div>
    )
  }

  const handleSendPayment = async () => {
    if (!paymentForm.destination || !paymentForm.amount) {
      toast.error("Please fill in destination and amount")
      return
    }

    try {
      const hash = await sendPayment(paymentForm.destination, paymentForm.amount)
      toast.success(`Payment sent successfully! Hash: ${hash.slice(0, 8)}...`)
      setShowPaymentModal(false)
      setPaymentForm({ destination: "", amount: "", asset: "XLM", memo: "" })
      await fetchBalances() // Refresh balances after payment
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send payment")
    }
  }

  if (!address) {
    return (
      <div className="space-y-6">
        <div className="border p-6 border-gray-200 rounded-sm text-center">
          <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Connect Your Stellar Wallet</h2>
          <p className="text-gray-600 mb-6">
            Connect your wallet to manage your Stellar assets and view transaction history
          </p>
          <Button
            onClick={connectWallet}
            className="bg-[#375B42] hover:bg-[#2A4632] text-white font-semibold px-8 py-3"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Wallet Info */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Wallet Information</span>
          </h3>
          <div className="flex items-center space-x-2">
            <Badge className="bg-[#375B42] text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={disconnectWallet}
              className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
            >
              Disconnect
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Wallet Address</label>
              <div className="flex items-center space-x-2 mt-1">
                <code className="bg-gray-50 px-3 py-2 rounded text-sm flex-1 truncate border border-gray-200">
                  {address}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://stellar.expert/explorer/public/account/${address}`, "_blank")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Connected Via</label>
              <div className="mt-1">
                <span className="bg-gray-50 px-3 py-2 rounded text-sm border border-gray-200 inline-block">
                  {name || "Stellar Wallet"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Balances */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Asset Balances</span>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefreshBalances}
            disabled={isRefreshing}
            className="text-gray-500 hover:text-gray-700"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#375B42] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading balances...</p>
          </div>
        ) : balances.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No assets found in this wallet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {balances.map((balance, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  {getAssetIcon(balance.asset_code)}
                  <div>
                    <p className="text-gray-900 font-semibold">{balance.asset_code || "XLM"}</p>
                    {balance.asset_issuer && (
                      <p className="text-gray-500 text-xs truncate max-w-32">{balance.asset_issuer}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-bold text-lg">{formatBalance(balance.balance)}</p>
                  {balance.limit && <p className="text-gray-500 text-sm">Limit: {formatBalance(balance.limit)}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <h3 className="text-lg font-medium text-[#375B42] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => setShowPaymentModal(true)} className="bg-[#375B42] hover:bg-[#2A4632] text-white">
            <Send className="h-4 w-4 mr-2" />
            Send Payment
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            Receive Payment
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            Create Escrow
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            Trade Assets
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-sm w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-medium text-[#375B42] mb-4">Send Payment</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="destination" className="text-sm text-gray-600">
                  Destination Address
                </Label>
                <Input
                  id="destination"
                  value={paymentForm.destination}
                  onChange={(e) => setPaymentForm((prev) => ({ ...prev, destination: e.target.value }))}
                  className="mt-1 bg-gray-50 border border-gray-200"
                  placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="text-sm text-gray-600">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.0000001"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))}
                  className="mt-1 bg-gray-50 border border-gray-200"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="asset" className="text-sm text-gray-600">
                  Asset
                </Label>
                <Select
                  value={paymentForm.asset}
                  onValueChange={(value) => setPaymentForm((prev) => ({ ...prev, asset: value }))}
                >
                  <SelectTrigger className="mt-1 bg-gray-50 border border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XLM">XLM</SelectItem>
                    {balances
                      .filter((b) => b.asset_code && b.asset_code !== "XLM")
                      .map((balance) => (
                        <SelectItem key={balance.asset_code} value={balance.asset_code!}>
                          {balance.asset_code}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={handleSendPayment}
                  disabled={isLoading}
                  className="flex-1 bg-[#375B42] hover:bg-[#2A4632] text-white"
                >
                  {isLoading ? "Sending..." : "Send Payment"}
                </Button>
                <Button
                  onClick={() => setShowPaymentModal(false)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
