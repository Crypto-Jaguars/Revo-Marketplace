"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  History,
  Search,
  Filter,
  ExternalLink,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  RefreshCw,
  AlertCircle,
} from "lucide-react"
import { useWalletStore } from "@/store"
import { useStellarWallet } from "@/hooks/useStellarWallet"
import { toast } from "sonner"

export default function TransactionHistory() {
  const t = useTranslations("Account")
  const { address } = useWalletStore()
  const { transactions, isLoading, error, network, fetchTransactions } = useStellarWallet(address)
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    setFilteredTransactions(transactions)
  }, [transactions])

  useEffect(() => {
    let filtered = transactions

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.memo?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter((tx) => tx.type === filterType)
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter((tx) => tx.status === filterStatus)
    }

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, filterType, filterStatus])

  const handleRefreshTransactions = async () => {
    setIsRefreshing(true)
    await fetchTransactions()
    setIsRefreshing(false)
    toast.success("Transactions updated")
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatAmount = (amount: string, asset: string) => {
    const num = Number.parseFloat(amount)
    if (num === 0) return `0 ${asset}`
    return `${num.toFixed(7).replace(/\.?0+$/, "")} ${asset}`
  }

  const getTransactionIcon = (type: string, from: string, to: string) => {
    const isOutgoing = from === address

    if (isOutgoing) {
      return <ArrowUpRight className="h-4 w-4 text-red-400" />
    } else {
      return <ArrowDownLeft className="h-4 w-4 text-green-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-600",
      pending: "bg-yellow-600",
      failed: "bg-red-600",
    }

    return (
      <Badge className={`${variants[status as keyof typeof variants]} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  const openInExplorer = (hash: string) => {
    window.open(`https://stellar.expert/explorer/${network.toLowerCase()}/tx/${hash}`, "_blank")
  }

  const getTransactionTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      payment: "Payment",
      create_account: "Create Account",
      manage_offer: "Manage Offer",
      path_payment: "Path Payment",
      path_payment_strict_receive: "Path Payment",
      path_payment_strict_send: "Path Payment",
      manage_data: "Manage Data",
      change_trust: "Change Trust",
      create_passive_sell_offer: "Create Offer",
    }
    return typeMap[type] || type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  if (!address) {
    return (
      <div className="border p-6 border-gray-200 rounded-sm text-center">
        <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Wallet Connected</h2>
        <p className="text-gray-600">Connect your wallet to view transaction history</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
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

      {/* Filters */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Transactions</span>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefreshTransactions}
            disabled={isRefreshing}
            className="text-gray-500 hover:text-gray-700"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="create_account">Create Account</SelectItem>
              <SelectItem value="manage_offer">Manage Offer</SelectItem>
              <SelectItem value="path_payment">Path Payment</SelectItem>
              <SelectItem value="change_trust">Change Trust</SelectItem>
              <SelectItem value="manage_data">Manage Data</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="border p-6 border-gray-200 rounded-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-[#375B42] flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Transaction History</span>
          </h3>
          <Badge variant="outline" className="text-gray-600 border-gray-400">
            {filteredTransactions.length} transactions
          </Badge>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#375B42] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              {transactions.length === 0
                ? "No transactions found for this account"
                : "No transactions match your filters"}
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{getTransactionIcon(transaction.type, transaction.from, transaction.to)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-gray-900 font-semibold">{getTransactionTypeDisplay(transaction.type)}</p>
                        {getStatusBadge(transaction.status)}
                        {transaction.operation_count > 1 && (
                          <Badge variant="outline" className="text-gray-600 border-gray-400">
                            {transaction.operation_count} ops
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <span>From:</span>
                          <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                            {transaction.from.slice(0, 8)}...{transaction.from.slice(-8)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(transaction.from, "From address")}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-700"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span>To:</span>
                          <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                            {transaction.to.slice(0, 8)}...{transaction.to.slice(-8)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(transaction.to, "To address")}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-700"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>

                        {transaction.memo && (
                          <div>
                            <span>Memo: </span>
                            <span className="text-gray-900">{transaction.memo}</span>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <span>Hash:</span>
                          <code className="bg-gray-200 px-2 py-1 rounded text-xs">
                            {transaction.hash.slice(0, 8)}...{transaction.hash.slice(-8)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(transaction.hash, "Transaction hash")}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-700"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {Number.parseFloat(transaction.amount) > 0 && (
                      <p className="text-gray-900 font-bold text-lg">
                        {formatAmount(transaction.amount, transaction.asset)}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm">Fee: {formatAmount(transaction.fee, "XLM")}</p>
                    <p className="text-gray-500 text-sm">{formatDate(transaction.timestamp)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openInExplorer(transaction.hash)}
                      className="mt-1 text-gray-400 hover:text-gray-700"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
