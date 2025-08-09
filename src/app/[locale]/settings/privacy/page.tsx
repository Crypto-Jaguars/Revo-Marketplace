'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Users, 
  UserCheck, 
  Lock,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettingsStore } from '@/store';
import WithAuthProtect from '@/constants/helpers/WithAuth';
import Breadcrumb from '@/components/shared/Breadcrumb';

function PrivacySettingsPage() {
  const t = useTranslations('Settings.privacy');
  const locale = useLocale();
  const { 
    privacy, 
    updatePrivacySettings,
    setLoading 
  } = useSettingsStore();

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.settings'), href: `/${locale}/settings` },
    { label: t('breadcrumb.privacy'), href: '', isCurrent: true },
  ];

  const privacyOptions = [
    {
      id: 'profileVisibility',
      label: t('profileVisibility.title'),
      description: t('profileVisibility.description'),
      icon: Users,
      type: 'select',
      options: [
        { value: 'public', label: t('profileVisibility.public') },
        { value: 'friends', label: t('profileVisibility.friends') },
        { value: 'private', label: t('profileVisibility.private') },
      ],
    },
    {
      id: 'showBalance',
      label: t('showBalance.title'),
      description: t('showBalance.description'),
      icon: Eye,
      type: 'switch',
    },
    {
      id: 'allowAnalytics',
      label: t('allowAnalytics.title'),
      description: t('allowAnalytics.description'),
      icon: Info,
      type: 'switch',
    },
    {
      id: 'allowCookies',
      label: t('allowCookies.title'),
      description: t('allowCookies.description'),
      icon: Lock,
      type: 'switch',
    },
    {
      id: 'dataSharing',
      label: t('dataSharing.title'),
      description: t('dataSharing.description'),
      icon: UserCheck,
      type: 'switch',
    },
  ];

  const handleSaveSettings = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleDownloadData = async () => {
    setLoading(true);
    // Simulate data export
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    // In a real app, this would trigger a download
  };

  const handleDeleteAccount = async () => {
    if (confirm(t('actions.deleteAccountConfirm'))) {
      setLoading(true);
      // Simulate account deletion
      await new Promise(resolve => setTimeout(resolve, 3000));
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
          <Button
            onClick={handleSaveSettings}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            {t('actions.save')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Privacy Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Visibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {t('profileVisibility.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {t('profileVisibility.setting')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('profileVisibility.description')}
                    </p>
                  </div>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => 
                      updatePrivacySettings({ profileVisibility: value as 'public' | 'private' | 'friends' })
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {t('profileVisibility.public')}
                        </div>
                      </SelectItem>
                      <SelectItem value="friends">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          {t('profileVisibility.friends')}
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          {t('profileVisibility.private')}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Visibility Preview */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {t('profileVisibility.preview')}
                  </h4>
                  <div className="space-y-2">
                    {privacy.profileVisibility === 'public' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">{t('profileVisibility.previewPublic')}</span>
                      </div>
                    )}
                    {privacy.profileVisibility === 'friends' && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <UserCheck className="w-4 h-4" />
                        <span className="text-sm">{t('profileVisibility.previewFriends')}</span>
                      </div>
                    )}
                    {privacy.profileVisibility === 'private' && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">{t('profileVisibility.previewPrivate')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Privacy Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('dataControls.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {privacyOptions.slice(1).map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {option.label}
                          </p>
                          <p className="text-sm text-gray-600">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={privacy[option.id as keyof typeof privacy] as boolean}
                        onCheckedChange={(checked) => 
                          updatePrivacySettings({ [option.id]: checked })
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                {t('dataManagement.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        {t('dataManagement.info.title')}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        {t('dataManagement.info.description')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleDownloadData}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t('dataManagement.downloadData')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {}}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t('dataManagement.deleteData')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Privacy Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('privacyStatus.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('privacyStatus.profileVisibility')}
                  </span>
                  <Badge 
                    variant={privacy.profileVisibility === 'private' ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {privacy.profileVisibility}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('privacyStatus.dataSharing')}
                  </span>
                  <Badge 
                    variant={privacy.dataSharing ? "destructive" : "default"}
                  >
                    {privacy.dataSharing ? t('status.enabled') : t('status.disabled')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('privacyStatus.analytics')}
                  </span>
                  <Badge 
                    variant={privacy.allowAnalytics ? "secondary" : "default"}
                  >
                    {privacy.allowAnalytics ? t('status.enabled') : t('status.disabled')}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('privacyStatus.lastUpdated')}
                  </span>
                  <span className="text-sm">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Tips */}
          <Card>
            <CardHeader>
              <CardTitle>{t('privacyTips.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      {t('privacyTips.strongPassword.title')}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {t('privacyTips.strongPassword.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      {t('privacyTips.twoFactor.title')}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {t('privacyTips.twoFactor.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      {t('privacyTips.regularReview.title')}
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      {t('privacyTips.regularReview.description')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                {t('accountActions.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="w-full flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('accountActions.deleteAccount')}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  {t('accountActions.warning')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WithAuthProtect(PrivacySettingsPage); 