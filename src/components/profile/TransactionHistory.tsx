"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Clock,
  CheckCircle,
  XCircle,
  Copy,
} from "lucide-react"
import { useWalletStore } from "@/store/walletStore"
import type { Transaction } from "./types"
import { toast } from "sonner"

export default function TransactionHistory() {
  const t = useTranslations("Transactions")
  const { wallet, transactions, fetchTransactions } = useWalletStore()
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    if (wallet?.isConnected) {
      fetchTransactions()
    }
  }, [wallet?.isConnected, fetchTransactions])

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
    return `${num.toFixed(7).replace(/\.?0+$/, "")} ${asset}`
  }

  const getTransactionIcon = (type: string, from: string, to: string) => {
    const isOutgoing = from === wallet?.address

    if (isOutgoing) {
      return <ArrowUpRight className="h-4 w-4 text-red-400" />
    } else {
      return <ArrowDownLeft className="h-4 w-4 text-green-400" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
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
    const network = wallet?.network === "PUBLIC" ? "public" : "testnet"
    window.open(`https://stellar.expert/explorer/${network}/tx/${hash}`, "_blank")
  }

  if (!wallet?.isConnected) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">No Wallet Connected</h2>
          <p className="text-gray-300">Connect your wallet to view transaction history</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filter Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="create_account">Create Account</SelectItem>
                <SelectItem value="manage_offer">Manage Offer</SelectItem>
                <SelectItem value="path_payment">Path Payment</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
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
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <History className="h-5 w-5" />
              <span>Transaction History</span>
            </span>
            <Badge variant="outline" className="text-gray-300 border-gray-400">
              {filteredTransactions.length} transactions
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No transactions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getTransactionIcon(transaction.type, transaction.from, transaction.to)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-gray-900 font-semibold capitalize">{transaction.type.replace("_", " ")}</p>
                          {getStatusBadge(transaction.status)}
                        </div>

                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <span>From:</span>
                            <code className="bg-black/50 px-2 py-1 rounded text-xs">
                              {transaction.from.slice(0, 8)}...{transaction.from.slice(-8)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(transaction.from, "From address")}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span>To:</span>
                            <code className="bg-black/50 px-2 py-1 rounded text-xs">
                              {transaction.to.slice(0, 8)}...{transaction.to.slice(-8)}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(transaction.to, "To address")}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>

                          {transaction.memo && (
                            <div>
                              <span>Memo: </span>
                              <span className="text-white">{transaction.memo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-900 font-bold text-lg">
                        {formatAmount(transaction.amount, transaction.asset)}
                      </p>
                      <p className="text-gray-400 text-sm">Fee: {formatAmount(transaction.fee, "XLM")}</p>
                      <p className="text-gray-400 text-sm">{formatDate(transaction.timestamp)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openInExplorer(transaction.hash)}
                        className="mt-1 text-gray-400 hover:text-white"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
