'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Wallet,
  Plus,
  Trash2,
  Star,
  Copy,
  ExternalLink,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSettingsStore, ConnectedWallet } from '@/store';
import WithAuthProtect from '@/constants/helpers/WithAuth';
import Breadcrumb from '@/components/shared/Breadcrumb';

function WalletSettingsPage() {
  const t = useTranslations('Settings.wallet');
  const locale = useLocale();
  const {
    wallet,
    updateWalletSettings,
    addConnectedWallet,
    removeConnectedWallet,
    setPrimaryWallet,
    setLoading,
  } = useSettingsStore();

  const [showAddWallet, setShowAddWallet] = useState(false);

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.settings'), href: `/${locale}/settings` },
    { label: t('breadcrumb.wallet'), href: '', isCurrent: true },
  ];

  // Mock connected wallets for demonstration
  const mockWallets: ConnectedWallet[] = [
    {
      id: '1',
      name: 'Main Stellar Wallet',
      address: 'GABC1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      type: 'stellar',
      isConnected: true,
      lastUsed: new Date(),
    },
    {
      id: '2',
      name: 'Trading Wallet',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      type: 'ethereum',
      isConnected: true,
      lastUsed: new Date(Date.now() - 86400000),
    },
    {
      id: '3',
      name: 'Backup Wallet',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      type: 'bitcoin',
      isConnected: false,
      lastUsed: new Date(Date.now() - 7 * 86400000),
    },
  ];

  const handleAddWallet = () => {
    setShowAddWallet(true);
    // In a real app, this would open a modal or redirect to wallet connection
  };

  const handleRemoveWallet = (walletId: string) => {
    if (confirm(t('actions.removeConfirm'))) {
      removeConnectedWallet(walletId);
    }
  };

  const handleSetPrimary = (walletId: string) => {
    setPrimaryWallet(walletId);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    // Show toast notification
  };

  const getWalletIcon = (type: string) => {
    switch (type) {
      case 'stellar':
        return '⭐';
      case 'ethereum':
        return '🔷';
      case 'bitcoin':
        return '₿';
      default:
        return '💳';
    }
  };

  const getWalletTypeColor = (type: string) => {
    switch (type) {
      case 'stellar':
        return 'bg-blue-100 text-blue-800';
      case 'ethereum':
        return 'bg-purple-100 text-purple-800';
      case 'bitcoin':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-gray-600">{t('description')}</p>
          </div>
          <Button onClick={handleAddWallet} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {t('actions.addWallet')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connected Wallets */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                {t('connectedWallets.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockWallets.map((connectedWallet) => (
                  <div
                    key={connectedWallet.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getWalletIcon(connectedWallet.type)}</div>
                        <div>
                          <h3 className="font-medium text-gray-900">{connectedWallet.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={connectedWallet.isConnected ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {connectedWallet.isConnected
                                ? t('status.connected')
                                : t('status.disconnected')}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`text-xs ${getWalletTypeColor(connectedWallet.type)}`}
                            >
                              {connectedWallet.type.toUpperCase()}
                            </Badge>
                            {connectedWallet.id === wallet.primaryWallet && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                {t('status.primary')}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {connectedWallet.id !== wallet.primaryWallet && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetPrimary(connectedWallet.id)}
                            className="flex items-center gap-1"
                          >
                            <Star className="w-3 h-3" />
                            {t('actions.setPrimary')}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyAddress(connectedWallet.address)}
                          className="flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          {t('actions.copy')}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveWallet(connectedWallet.id)}
                          className="flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          {t('actions.remove')}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 font-mono break-all">
                          {connectedWallet.address}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {t('lastUsed')}: {connectedWallet.lastUsed.toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {t('actions.view')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('security.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {t('security.transactionConfirmations')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('security.transactionConfirmationsDesc')}
                    </p>
                  </div>
                  <Switch
                    checked={wallet.transactionConfirmations}
                    onCheckedChange={(checked) =>
                      updateWalletSettings({ transactionConfirmations: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('security.autoConnect')}</p>
                    <p className="text-sm text-gray-600">{t('security.autoConnectDesc')}</p>
                  </div>
                  <Switch
                    checked={wallet.autoConnect}
                    onCheckedChange={(checked) => updateWalletSettings({ autoConnect: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t('quickActions.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                  <Zap className="w-4 h-4 mr-2" />
                  {t('quickActions.optimizeGas')}
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                  <Shield className="w-4 h-4 mr-2" />
                  {t('quickActions.securityCheck')}
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('quickActions.viewOnExplorer')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>{t('statistics.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('statistics.totalWallets')}</span>
                  <span className="font-semibold">{mockWallets.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('statistics.connectedWallets')}</span>
                  <span className="font-semibold text-green-600">
                    {mockWallets.filter((w) => w.isConnected).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('statistics.totalBalance')}</span>
                  <span className="font-semibold">$2,450.00</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('statistics.lastTransaction')}</span>
                  <span className="text-sm">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                {t('alerts.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      {t('alerts.backupWallet.title')}
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      {t('alerts.backupWallet.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      {t('alerts.securityCheck.title')}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {t('alerts.securityCheck.description')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WithAuthProtect(WalletSettingsPage);
