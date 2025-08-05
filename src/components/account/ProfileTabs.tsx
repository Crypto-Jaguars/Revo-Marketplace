"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Wallet, History, Sprout, Settings, Shield } from "lucide-react"
import { ProfileForm } from "./ProfileForm"
import WalletSection from "./WalletSection"
import TransactionHistory from "./TransactionHistory"
import FarmingActivity from "./FarmingActivity"
import SecuritySettings from "./SecuritySettings"
import ProfileSettings from "./ProfileSettings"

export function ProfileTabs() {
  const t = useTranslations("Account")
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-6 bg-gray-100 mb-8">
        <TabsTrigger
          value="profile"
          className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="wallet"
          className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Wallet
        </TabsTrigger>
        <TabsTrigger
          value="transactions"
          className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
        >
          <History className="h-4 w-4 mr-2" />
          Transactions
        </TabsTrigger>
        <TabsTrigger
          value="farming"
          className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
        >
          <Sprout className="h-4 w-4 mr-2" />
          Farming
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
        >
          <Shield className="h-4 w-4 mr-2" />
          Security
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileForm />
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
        <ProfileSettings />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  )
}
