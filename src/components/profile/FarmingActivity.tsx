"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sprout,
  ShoppingCart,
  FileText,
  TrendingUp,
  Calendar,
  Package,
  Users,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import type { FarmingActivity as FarmingActivityType, EscrowContract } from "./types"

export default function FarmingActivity() {
  const t = useTranslations("Farming")
  const [activities, setActivities] = useState<FarmingActivityType[]>([])
  const [contracts, setContracts] = useState<EscrowContract[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data loading
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockActivities: FarmingActivityType[] = [
        {
          id: "1",
          type: "harvest",
          title: "Tomato Harvest Complete",
          description: "Successfully harvested 500kg of organic tomatoes",
          amount: "2,500.00",
          currency: "USDT",
          date: "2024-01-15T10:30:00Z",
          status: "completed",
          relatedTransaction: "tx_123",
        },
        {
          id: "2",
          type: "sale",
          title: "Direct Sale to Restaurant",
          description: "Sold 200kg of fresh vegetables to Green Bistro",
          amount: "800.00",
          currency: "USDT",
          date: "2024-01-14T14:20:00Z",
          status: "completed",
          relatedTransaction: "tx_124",
        },
        {
          id: "3",
          type: "contract",
          title: "New Supply Contract",
          description: "Signed 6-month supply contract with Local Market",
          amount: "15,000.00",
          currency: "USDT",
          date: "2024-01-12T09:15:00Z",
          status: "pending",
        },
        {
          id: "4",
          type: "planting",
          title: "Spring Planting Season",
          description: "Planted 2 hectares of organic corn",
          date: "2024-01-10T08:00:00Z",
          status: "completed",
        },
      ]

      const mockContracts: EscrowContract[] = [
        {
          id: "contract_1",
          buyerAddress: "GCDVEM...EXAMPLE",
          sellerAddress: "GBXGQ...EXAMPLE",
          amount: "5000.00",
          asset: "USDT",
          status: "active",
          createdAt: "2024-01-10T00:00:00Z",
          expiresAt: "2024-02-10T00:00:00Z",
          description: "Organic vegetable supply contract",
        },
        {
          id: "contract_2",
          buyerAddress: "GAHKF...EXAMPLE",
          sellerAddress: "GBXGQ...EXAMPLE",
          amount: "3200.00",
          asset: "USDT",
          status: "completed",
          createdAt: "2024-01-05T00:00:00Z",
          expiresAt: "2024-01-15T00:00:00Z",
          description: "Fresh fruit delivery contract",
        },
      ]

      setActivities(mockActivities)
      setContracts(mockContracts)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getActivityIcon = (type: string) => {
    const icons = {
      harvest: <Sprout className="h-5 w-5 text-green-400" />,
      planting: <Sprout className="h-5 w-5 text-blue-400" />,
      sale: <ShoppingCart className="h-5 w-5 text-purple-400" />,
      purchase: <Package className="h-5 w-5 text-orange-400" />,
      contract: <FileText className="h-5 w-5 text-yellow-400" />,
    }
    return icons[type as keyof typeof icons] || <Calendar className="h-5 w-5 text-gray-400" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-600",
      active: "bg-blue-600",
      pending: "bg-yellow-600",
      cancelled: "bg-red-600",
      disputed: "bg-orange-600",
    }

    return (
      <Badge className={`${variants[status as keyof typeof variants]} text-white`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-300">Loading farming activities...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-gray-900 font-bold text-xl">$18,300</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-3 rounded-full">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Contracts</p>
                <p className="text-gray-900 font-bold text-xl">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Sales</p>
                <p className="text-gray-900 font-bold text-xl">47</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-600 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Customers</p>
                <p className="text-gray-900 font-bold text-xl">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Tabs */}
      <Tabs defaultValue="activities" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100">
          <TabsTrigger
            value="activities"
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600"
          >
            Recent Activities
          </TabsTrigger>
          <TabsTrigger
            value="contracts"
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600"
          >
            Escrow Contracts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activities" className="mt-6">
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center space-x-2">
                <Sprout className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-gray-900 font-semibold">{activity.title}</h3>
                            {getStatusBadge(activity.status)}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(activity.date)}</span>
                            </div>
                            {activity.relatedTransaction && (
                              <div className="flex items-center space-x-1">
                                <FileText className="h-4 w-4" />
                                <span>TX: {activity.relatedTransaction}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {activity.amount && (
                        <div className="text-right">
                          <p className="text-gray-900 font-bold text-lg">${activity.amount}</p>
                          <p className="text-gray-400 text-sm">{activity.currency}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Escrow Contracts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <div key={contract.id} className="p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-gray-900 font-semibold">{contract.description}</h3>
                          {getStatusBadge(contract.status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Contract ID: {contract.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900 font-bold text-lg">${contract.amount}</p>
                        <p className="text-gray-400 text-sm">{contract.asset}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Buyer Address:</p>
                        <code className="text-gray-900 bg-black/50 px-2 py-1 rounded text-xs">
                          {contract.buyerAddress}
                        </code>
                      </div>
                      <div>
                        <p className="text-gray-400">Seller Address:</p>
                        <code className="text-gray-900 bg-black/50 px-2 py-1 rounded text-xs">
                          {contract.sellerAddress}
                        </code>
                      </div>
                      <div>
                        <p className="text-gray-400">Created:</p>
                        <p className="text-gray-900">{formatDate(contract.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Expires:</p>
                        <p className="text-gray-900">{formatDate(contract.expiresAt)}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        View Details
                      </Button>
                      {contract.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white text-white hover:bg-white/10 bg-transparent"
                        >
                          Release Funds
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
