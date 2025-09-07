'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { 
  Wallet, 
  Bell, 
  Shield, 
  Globe, 
  User, 
  Settings as SettingsIcon,
  ChevronRight,
  Search,
  Save,
  RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useSettingsStore } from '@/store';
import WithAuthProtect from '@/constants/helpers/WithAuth';
import Breadcrumb from '@/components/shared/Breadcrumb';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  settingsCount: number;
}

function SettingsPage() {
  const t = useTranslations('Settings');
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const { preferences, setLoading } = useSettingsStore();

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.settings'), href: '', isCurrent: true },
  ];

  const settingsSections: SettingsSection[] = [
    {
      id: 'wallet',
      title: t('sections.wallet.title'),
      description: t('sections.wallet.description'),
      icon: Wallet,
      href: `/${locale}/settings/wallet`,
      badge: '3',
      settingsCount: 5,
    },
    {
      id: 'notifications',
      title: t('sections.notifications.title'),
      description: t('sections.notifications.description'),
      icon: Bell,
      href: `/${locale}/settings/notifications`,
      badge: 'Active',
      settingsCount: 12,
    },
    {
      id: 'privacy',
      title: t('sections.privacy.title'),
      description: t('sections.privacy.description'),
      icon: Shield,
      href: `/${locale}/settings/privacy`,
      settingsCount: 5,
    },
    {
      id: 'regional',
      title: t('sections.regional.title'),
      description: t('sections.regional.description'),
      icon: Globe,
      href: `/${locale}/settings/regional`,
      settingsCount: 5,
    },
    {
      id: 'security',
      title: t('sections.security.title'),
      description: t('sections.security.description'),
      icon: User,
      href: `/${locale}/settings/security`,
      badge: '2FA',
      settingsCount: 4,
    },
    {
      id: 'preferences',
      title: t('sections.preferences.title'),
      description: t('sections.preferences.description'),
      icon: SettingsIcon,
      href: `/${locale}/settings/preferences`,
      settingsCount: 4,
    },
  ];

  const filteredSections = settingsSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuickSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleResetDefaults = async () => {
    if (confirm(t('actions.resetConfirm'))) {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('title')}
            </h1>
            <p className="text-gray-600">
              {t('description')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleResetDefaults}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {t('actions.reset')}
            </Button>
            <Button
              onClick={handleQuickSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t('actions.save')}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder={t('search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Settings Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            {t('quickSettings.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {t('quickSettings.theme')}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {preferences.theme}
                </p>
              </div>
              <Switch
                checked={preferences.theme === 'dark'}
                onCheckedChange={() => {}}
                className="ml-2"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {t('quickSettings.autoSave')}
                </p>
                <p className="text-xs text-gray-500">
                  {preferences.autoSave ? t('quickSettings.enabled') : t('quickSettings.disabled')}
                </p>
              </div>
              <Switch
                checked={preferences.autoSave}
                onCheckedChange={() => {}}
                className="ml-2"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {t('quickSettings.compactMode')}
                </p>
                <p className="text-xs text-gray-500">
                  {preferences.compactMode ? t('quickSettings.enabled') : t('quickSettings.disabled')}
                </p>
              </div>
              <Switch
                checked={preferences.compactMode}
                onCheckedChange={() => {}}
                className="ml-2"
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {t('quickSettings.searchHistory')}
                </p>
                <p className="text-xs text-gray-500">
                  {preferences.searchHistory ? t('quickSettings.enabled') : t('quickSettings.disabled')}
                </p>
              </div>
              <Switch
                checked={preferences.searchHistory}
                onCheckedChange={() => {}}
                className="ml-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={section.href}
              className="group block"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/20 group-hover:scale-[1.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {section.title}
                        </CardTitle>
                        {section.badge && (
                          <Badge variant="secondary" className="mt-1">
                            {section.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {section.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{section.settingsCount} {t('settingsCount')}</span>
                    <span className="group-hover:text-primary transition-colors">
                      {t('actions.configure')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('recentActivity.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  {t('recentActivity.walletConnected')}
                </span>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  {t('recentActivity.notificationsUpdated')}
                </span>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  {t('recentActivity.privacyChanged')}
                </span>
              </div>
              <span className="text-xs text-gray-500">3 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default WithAuthProtect(SettingsPage); 