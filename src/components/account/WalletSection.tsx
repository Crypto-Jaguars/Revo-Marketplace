"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Wallet, Copy, ExternalLink, RefreshCw, CheckCircle, DollarSign, Send, Plus, AlertCircle, Globe, TestTube, Info } from 'lucide-react'
import { useWalletStore } from "@/store"
import { useWallet } from "@/wallet/hooks/useWallet.hook"
import { toast } from "sonner"
import { useStellarWallet } from "@/hooks/useStellarWallet"
import { Keypair } from "@stellar/stellar-sdk"

// Define the type for prepared transaction details
interface PreparedTransactionDetails {
  xdr: string
  estimatedFee: string
  sourceAccount: string
  destination: string
  amount: string
  assetCode: string
  assetIssuer: string
  memo: string
}

export default function WalletSection() {
  const t = useTranslations("Account")
  const { address, name } = useWalletStore()
  const { connectWallet, disconnectWallet } = useWallet()
  const {
    balances,
    transactions,
    isLoading,
    error,
    network,
    exchangeRates,
    fetchBalances,
    preparePaymentTransaction,
    sendPayment,
    createTrustline,
    switchNetwork,
  } = useStellarWallet(address)

  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showTrustlineModal, setShowTrustlineModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    destination: "",
    amount: "",
    assetCode: "XLM",
    assetIssuer: "",
    memo: "",
  })
  const [trustlineForm, setTrustlineForm] = useState({
    assetCode: "",
    assetIssuer: "",
    limit: "",
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isCreatingTrustline, setIsCreatingTrustline] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [confirmTransactionDetails, setConfirmTransactionDetails] = useState<PreparedTransactionDetails | null>(null)

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
    if (num === 0) return "0"
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
    if (assetCode === "USDC") {
      return (
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
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

  const validateAddress = (addr: string): boolean => {
    try {
      Keypair.fromPublicKey(addr)
      return true
    } catch (e) {
      return false
    }
  }

  const handleMaxAmount = () => {
    const selectedAsset = balances.find(
      (b) => b.asset_code === paymentForm.assetCode && b.asset_issuer === paymentForm.assetIssuer,
    )
    if (selectedAsset) {
      let maxAmount = Number.parseFloat(selectedAsset.balance)
      // For XLM, account for minimum balance and transaction fees
      if (paymentForm.assetCode === "XLM") {
        // A typical base reserve is 0.5 XLM, and fee is 0.00001 XLM per operation.
        // For simplicity, let's reserve 1 XLM for future operations/minimum balance.
        // This is a simplified calculation and might need to be more precise based on actual network reserves.
        maxAmount = Math.max(0, maxAmount - 1.5) // Reserve 1.5 XLM for base reserve + fees
      }
      setPaymentForm((prev) => ({ ...prev, amount: maxAmount.toFixed(7).replace(/\.?0+$/, "") }))
    }
  }

  const getAvailableAssets = () => {
    const assets = [{ code: "XLM", issuer: "" }]
    balances.forEach((balance) => {
      if (balance.asset_code && balance.asset_code !== "XLM") {
        assets.push({
          code: balance.asset_code,
          issuer: balance.asset_issuer || "",
        })
      }
    })
    return assets
  }

  const getAssetBalance = (assetCode: string, assetIssuer: string) => {
    const asset = balances.find((b) => (b.asset_code || "XLM") === assetCode && (b.asset_issuer || "") === assetIssuer)
    return asset ? Number.parseFloat(asset.balance) : 0
  }

  const getUsdEquivalent = (amount: string, assetCode: string) => {
    const rate = exchangeRates[assetCode]
    if (rate) {
      return (Number.parseFloat(amount) * rate).toFixed(2)
    }
    return "N/A"
  }

  const handlePreparePayment = async () => {
    setPaymentError(null)
    if (!paymentForm.destination || !paymentForm.amount) {
      setPaymentError("Please fill in destination and amount")
      return
    }

    if (!validateAddress(paymentForm.destination)) {
      setPaymentError("Invalid Stellar destination address")
      return
    }

    const amountNum = Number.parseFloat(paymentForm.amount)
    if (amountNum <= 0) {
      setPaymentError("Amount must be greater than 0")
      return
    }

    const currentBalance = getAssetBalance(paymentForm.assetCode, paymentForm.assetIssuer)
    if (amountNum > currentBalance) {
      setPaymentError("Insufficient balance")
      return
    }

    setIsSending(true)
    try {
      const details = await preparePaymentTransaction(
        paymentForm.destination,
        paymentForm.amount,
        paymentForm.assetCode === "XLM" ? undefined : paymentForm.assetCode,
        paymentForm.assetIssuer || undefined,
        paymentForm.memo || undefined,
      )
      setConfirmTransactionDetails(details)
      setShowPaymentModal(false)
      setShowConfirmModal(true)
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Failed to prepare transaction")
    } finally {
      setIsSending(false)
    }
  }

  const handleConfirmSend = async () => {
    if (!confirmTransactionDetails) return

    setIsSending(true)
    try {
      const hash = await sendPayment(confirmTransactionDetails.xdr)
      toast.success(`Payment sent successfully! Hash: ${hash.slice(0, 10)}...`)
      setShowConfirmModal(false)
      setPaymentForm({ destination: "", amount: "", assetCode: "XLM", assetIssuer: "", memo: "" })
      setConfirmTransactionDetails(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send payment")
    } finally {
      setIsSending(false)
    }
  }

  const handleCreateTrustline = async () => {
    if (!trustlineForm.assetCode || !trustlineForm.assetIssuer) {
      toast.error("Please fill in asset code and issuer")
      return
    }

    if (!validateAddress(trustlineForm.assetIssuer)) {
      toast.error("Invalid asset issuer address")
      return
    }

    setIsCreatingTrustline(true)

    try {
      const hash = await createTrustline(
        trustlineForm.assetCode,
        trustlineForm.assetIssuer,
        trustlineForm.limit || undefined,
      )

      toast.success(`Trustline created successfully! Hash: ${hash.slice(0, 10)}...`)
      setShowTrustlineModal(false)
      setTrustlineForm({ assetCode: "", assetIssuer: "", limit: "" })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create trustline")
    } finally {
      setIsCreatingTrustline(false)
    }
  }

  const handleNetworkSwitch = async (newNetwork: "PUBLIC" | "TESTNET") => {
    await switchNetwork(newNetwork)
    toast.success(`Switched to ${newNetwork === "PUBLIC" ? "Mainnet" : "Testnet"}`)
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

  const selectedAssetBalance = getAssetBalance(paymentForm.assetCode, paymentForm.assetIssuer)
  const selectedAssetUsdValue = getUsdEquivalent(selectedAssetBalance.toString(), paymentForm.assetCode)
  const sendingAmountUsdValue = getUsdEquivalent(paymentForm.amount, paymentForm.assetCode)

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
            <Badge
              variant="outline"
              className={`${network === "PUBLIC" ? "border-green-600 text-green-600" : "border-orange-600 text-orange-600"}`}
            >
              {network === "PUBLIC" ? <Globe className="h-3 w-3 mr-1" /> : <TestTube className="h-3 w-3 mr-1" />}
              {network === "PUBLIC" ? "Mainnet" : "Testnet"}
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
                  onClick={() =>
                    window.open(`https://stellar.expert/explorer/${network.toLowerCase()}/account/${address}`, "_blank")
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Connected Via</label>
              <div className="mt-1 flex items-center justify-between">
                <span className="bg-gray-50 px-3 py-2 rounded text-sm border border-gray-200 inline-block">
                  {name || "Stellar Wallet"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNetworkSwitch(network === "PUBLIC" ? "TESTNET" : "PUBLIC")}
                  className="ml-2"
                >
                  Switch to {network === "PUBLIC" ? "Testnet" : "Mainnet"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="border border-red-200 bg-red-50 p-4 rounded-sm">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="font-semibold">Error</span>
          </div>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

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
                  {exchangeRates[balance.asset_code || "XLM"] && (
                    <p className="text-gray-500 text-sm">
                      ~${getUsdEquivalent(balance.balance, balance.asset_code || "XLM")} USD
                    </p>
                  )}
                  {balance.limit && <p className="text-gray-500 text-sm">Limit: {formatBalance(balance.limit)}</p>}
                  {balance.buying_liabilities && Number.parseFloat(balance.buying_liabilities) > 0 && (
                    <p className="text-orange-500 text-sm">Buying: {formatBalance(balance.buying_liabilities)}</p>
                  )}
                  {balance.selling_liabilities && Number.parseFloat(balance.selling_liabilities) > 0 && (
                    <p className="text-blue-500 text-sm">Selling: {formatBalance(balance.selling_liabilities)}</p>
                  )}
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
          <Button
            onClick={() => setShowPaymentModal(true)}
            className="bg-[#375B42] hover:bg-[#2A4632] text-white"
            disabled={balances.length === 0}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Payment
          </Button>
          <Button
            onClick={() => setShowTrustlineModal(true)}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            onClick={handleCopyAddress}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Address
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            onClick={() =>
              window.open(`https://stellar.expert/explorer/${network.toLowerCase()}/account/${address}`, "_blank")
            }
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Explorer
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-sm w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-medium text-[#375B42] mb-4">Send Payment</h3>
            <div className="space-y-4">
              {paymentError && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{paymentError}</span>
                </div>
              )}
              <div>
                <Label htmlFor="destination" className="text-sm text-gray-600">
                  Destination Address *
                </Label>
                <Input
                  id="destination"
                  value={paymentForm.destination}
                  onChange={(e) => {
                    setPaymentForm((prev) => ({ ...prev, destination: e.target.value }))
                    setPaymentError(null) // Clear error on change
                  }}
                  className="mt-1 bg-gray-50 border border-gray-200"
                  placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
                {!validateAddress(paymentForm.destination) && paymentForm.destination.length > 0 && (
                  <p className="text-red-500 text-xs mt-1">Invalid Stellar address format</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount" className="text-sm text-gray-600">
                    Amount *
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="amount"
                      type="number"
                      step="0.0000001"
                      value={paymentForm.amount}
                      onChange={(e) => {
                        setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))
                        setPaymentError(null) // Clear error on change
                      }}
                      className="bg-gray-50 border border-gray-200 pr-12"
                      placeholder="0.00"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-xs"
                      onClick={handleMaxAmount}
                    >
                      Max
                    </Button>
                  </div>
                  {paymentForm.amount && exchangeRates[paymentForm.assetCode] && (
                    <p className="text-gray-500 text-xs mt-1">~${sendingAmountUsdValue} USD</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="asset" className="text-sm text-gray-600">
                    Asset
                  </Label>
                  <Select
                    value={paymentForm.assetCode}
                    onValueChange={(value) => {
                      const asset = getAvailableAssets().find((a) => a.code === value)
                      setPaymentForm((prev) => ({
                        ...prev,
                        assetCode: value,
                        assetIssuer: asset?.issuer || "",
                      }))
                      setPaymentError(null) // Clear error on change
                    }}
                  >
                    <SelectTrigger className="mt-1 bg-gray-50 border border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableAssets().map((asset) => (
                        <SelectItem key={`${asset.code}-${asset.issuer}`} value={asset.code}>
                          {asset.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-gray-500 text-xs mt-1">
                    Balance: {formatBalance(selectedAssetBalance.toString())} {paymentForm.assetCode}
                    {exchangeRates[paymentForm.assetCode] && ` (~$${selectedAssetUsdValue} USD)`}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="memo" className="text-sm text-gray-600">
                  Memo (Optional)
                </Label>
                <Textarea
                  id="memo"
                  value={paymentForm.memo}
                  onChange={(e) => setPaymentForm((prev) => ({ ...prev, memo: e.target.value }))}
                  className="mt-1 bg-gray-50 border border-gray-200"
                  placeholder="Optional memo"
                  rows={2}
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={handlePreparePayment}
                  disabled={isSending}
                  className="flex-1 bg-[#375B42] hover:bg-[#2A4632] text-white"
                >
                  {isSending ? "Preparing..." : "Review & Send"}
                </Button>
                <Button
                  onClick={() => setShowPaymentModal(false)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isSending}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trustline Modal */}
      {showTrustlineModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-sm w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-medium text-[#375B42] mb-4">Add Asset Trustline</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="assetCode" className="text-sm text-gray-600">
                  Asset Code *
                </Label>
                <Input
                  id="assetCode"
                  value={trustlineForm.assetCode}
                  onChange={(e) => setTrustlineForm((prev) => ({ ...prev, assetCode: e.target.value.toUpperCase() }))}
                  className="mt-1 bg-gray-50 border border-gray-200"
                  placeholder="USDT, USDC, etc."
                />
              </div>

              <div>
                <Label htmlFor="assetIssuer" className="text-sm text-gray-600">
                  Asset Issuer *
                </Label>
                <Input
                  id="assetIssuer"
                  value={trustlineForm.assetIssuer}
                  onChange={(e) => setTrustlineForm((prev) => ({ ...prev, assetIssuer: e.target.value }))}
                  className="mt-1 bg-gray-50 border border-gray-200"
                  placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                />
                {!validateAddress(trustlineForm.assetIssuer) && trustlineForm.assetIssuer.length > 0 && (
                  <p className="text-red-500 text-xs mt-1">Invalid Stellar address format</p>
                )}
              </div>

              <div>
                <Label htmlFor="limit" className="text-sm text-gray-600">
                  Trust Limit (Optional)
                </Label>
                <Input
                  id="limit"
                  type="number"
                  value={trustlineForm.limit}
                  onChange={(e) => setTrustlineForm((prev) => ({ ...prev, limit: e.target.value }))}
                  className="mt-1 bg-gray-50 border border-gray-200"
                  placeholder="Leave empty for maximum"
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={handleCreateTrustline}
                  disabled={isCreatingTrustline}
                  className="flex-1 bg-[#375B42] hover:bg-[#2A4632] text-white"
                >
                  {isCreatingTrustline ? "Creating..." : "Create Trustline"}
                </Button>
                <Button
                  onClick={() => setShowTrustlineModal(false)}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={isCreatingTrustline}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && confirmTransactionDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-gray-200 rounded-sm w-full max-w-md mx-4 p-6">
            <h3 className="text-lg font-medium text-[#375B42] mb-4">Confirm Transaction</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Sending:</span>
                <span className="font-semibold">
                  {confirmTransactionDetails.amount} {confirmTransactionDetails.assetCode}
                  {exchangeRates[confirmTransactionDetails.assetCode] &&
                    ` (~$${getUsdEquivalent(confirmTransactionDetails.amount, confirmTransactionDetails.assetCode)} USD)`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>To:</span>
                <span className="font-semibold truncate max-w-[70%]">{confirmTransactionDetails.destination}</span>
              </div>
              {confirmTransactionDetails.memo && (
                <div className="flex justify-between">
                  <span>Memo:</span>
                  <span className="font-semibold truncate max-w-[70%]">{confirmTransactionDetails.memo}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Fee:</span>
                <span className="font-semibold">
                  {confirmTransactionDetails.estimatedFee} XLM
                  {exchangeRates.XLM && ` (~$${getUsdEquivalent(confirmTransactionDetails.estimatedFee, "XLM")} USD)`}
                </span>
              </div>
              <div className="pt-2">
                <Label htmlFor="xdr" className="text-sm text-gray-600 flex items-center">
                  Transaction XDR <Info className="h-3 w-3 ml-1 text-gray-400" />
                </Label>
                <Textarea
                  id="xdr"
                  value={confirmTransactionDetails.xdr}
                  readOnly
                  rows={4}
                  className="mt-1 bg-gray-50 border border-gray-200 font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-6">
              <Button
                onClick={handleConfirmSend}
                disabled={isSending}
                className="flex-1 bg-[#375B42] hover:bg-[#2A4632] text-white"
              >
                {isSending ? "Confirming..." : "Confirm Send"}
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmModal(false)
                  setConfirmTransactionDetails(null)
                  setPaymentForm({ destination: "", amount: "", assetCode: "XLM", assetIssuer: "", memo: "" })
                }}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                disabled={isSending}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
