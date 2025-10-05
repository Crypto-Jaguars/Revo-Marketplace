'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileForm } from './ProfileForm';
import WalletSection from './WalletSection';
import { TransactionHistory } from './TransactionHistory';
import { FarmingActivity } from './FarmingActivity';
import { ProfileSettings } from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import { useStellarWallet } from '@/hooks/useStellarWallet';
import { useWalletStore } from '@/store';
import { DollarSign, Repeat, Sprout, FileText } from 'lucide-react';

export function ProfileTabs() {
  const t = useTranslations('ProfileTabs');
  const [activeTab, setActiveTab] = useState('profile');
  const { address } = useWalletStore();
  const { totalXlmUsdValue, transactions } = useStellarWallet(address);

  // Mock data for farming activities and contracts count for summary cards
  // In a real app, these would come from actual data sources
  const farmingActivitiesCount = 12; // Example count
  const contractsCount = 5; // Example count

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 md:grid-cols-5 lg:grid-cols-5 bg-gray-100">
          <TabsTrigger
            value="profile"
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
          >
            {t('tabs.profile')}
          </TabsTrigger>
          <TabsTrigger
            value="wallet"
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
          >
            {t('tabs.wallet')}
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
          >
            {t('tabs.transactions')}
          </TabsTrigger>
          <TabsTrigger
            value="farming"
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
          >
            {t('tabs.farming')}
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="text-gray-700 data-[state=active]:bg-white data-[state=active]:text-[#375B42]"
          >
            {t('tabs.settings')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm />
          {address && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#375B42]">{t('walletSummary.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('walletSummary.totalBalance')}</CardTitle>
                    <DollarSign className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalXlmUsdValue} USD</div>
                    <p className="text-xs text-gray-500">{t('walletSummary.xlmEquivalent')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('walletSummary.totalTransactions')}</CardTitle>
                    <Repeat className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{transactions.length}</div>
                    <p className="text-xs text-gray-500">{t('walletSummary.transactionsRecorded')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('walletSummary.farmingActivities')}</CardTitle>
                    <Sprout className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{farmingActivitiesCount}</div>
                    <p className="text-xs text-gray-500">{t('walletSummary.activitiesLogged')}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('walletSummary.activeContracts')}</CardTitle>
                    <FileText className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{contractsCount}</div>
                    <p className="text-xs text-gray-500">{t('walletSummary.activeEscrowContracts')}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
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

        <TabsContent value="settings" className="space-y-6">
          <ProfileSettings />
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
