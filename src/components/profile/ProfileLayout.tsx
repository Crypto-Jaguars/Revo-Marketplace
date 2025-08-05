"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Bounded from "@/components/Bounded"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Wallet, History, Sprout, Settings, Shield, Camera, MapPin, Calendar, CheckCircle } from "lucide-react"
import WalletSection from "./WalletSection"
import TransactionHistory from "./TransactionHistory"
import FarmingActivity from "./FarmingActivity"
import ProfileSettings from "./ProfileSettings"
import SecuritySettings from "./SecuritySettings"
import type { User as UserType } from "./types"

interface ProfileLayoutProps {
  user: UserType
  onUserUpdate: (user: UserType) => void
}

export default function ProfileLayout({ user, onUserUpdate }: ProfileLayoutProps) {
  const t = useTranslations("Profile")
  const [activeTab, setActiveTab] = useState("overview")

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Bounded>
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="bg-gray-50 border-gray-200 mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={user.profileImage || "/placeholder.svg"}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback className="bg-green-600 text-white text-2xl">
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-2 -right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  {user.isVerified && (
                    <Badge className="bg-green-600 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>

                  {user.farmName && (
                    <div className="flex items-center space-x-2">
                      <Sprout className="h-4 w-4" />
                      <span>{user.farmName}</span>
                      {user.farmType && (
                        <Badge variant="outline" className="text-gray-600 border-gray-400">
                          {user.farmType}
                        </Badge>
                      )}
                    </div>
                  )}

                  {user.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {formatDate(user.joinedDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-100 mb-8">
            <TabsTrigger
              value="overview"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600"
            >
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="wallet"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Wallet
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600"
            >
              <History className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="farming"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600"
            >
              <Sprout className="h-4 w-4 mr-2" />
              Farming
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-green-600"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-600 p-3 rounded-full">
                      <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Wallet Status</p>
                      <p className="text-gray-900 font-semibold">Connected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-3 rounded-full">
                      <History className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Total Transactions</p>
                      <p className="text-gray-900 font-semibold">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-600 p-3 rounded-full">
                      <Sprout className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Active Contracts</p>
                      <p className="text-gray-900 font-semibold">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wallet">
            <WalletSection />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="farming">
            <FarmingActivity />
          </TabsContent>

          <TabsContent value="settings">
            <ProfileSettings user={user} onUserUpdate={onUserUpdate} />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </Bounded>
  )
}
