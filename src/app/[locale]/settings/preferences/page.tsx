'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { 
  Settings, 
  Palette, 
  Monitor, 
  Smartphone, 
  Save,
  Eye,
  Search,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info
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

function PreferencesSettingsPage() {
  const t = useTranslations('Settings.preferences');
  const locale = useLocale();
  const { 
    preferences, 
    updatePreferences,
    setLoading 
  } = useSettingsStore();

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.settings'), href: `/${locale}/settings` },
    { label: t('breadcrumb.preferences'), href: '', isCurrent: true },
  ];

  const themes = [
    { value: 'light', label: t('theme.light'), icon: '☀️' },
    { value: 'dark', label: t('theme.dark'), icon: '🌙' },
    { value: 'system', label: t('theme.system'), icon: '🖥️' },
  ];

  const handleSaveSettings = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleResetPreferences = async () => {
    if (confirm(t('actions.resetConfirm'))) {
      setLoading(true);
      // Simulate reset
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
              onClick={handleResetPreferences}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              {t('actions.reset')}
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t('actions.save')}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Preferences Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                {t('theme.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {t('theme.setting')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('theme.description')}
                    </p>
                  </div>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => 
                      updatePreferences({ theme: value as 'light' | 'dark' | 'system' })
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          <div className="flex items-center gap-2">
                            <span>{theme.icon}</span>
                            <span>{theme.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Theme Preview */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {t('theme.preview')}
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {themes.map((theme) => (
                      <div
                        key={theme.value}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          preferences.theme === theme.value
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => updatePreferences({ theme: theme.value as any })}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{theme.icon}</span>
                          <span className="text-sm font-medium">{theme.label}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                          {t(`theme.${theme.value}Description`)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interface Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                {t('interface.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {t('interface.compactMode')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t('interface.compactModeDescription')}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.compactMode}
                    onCheckedChange={(checked) => 
                      updatePreferences({ compactMode: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Save className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {t('interface.autoSave')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t('interface.autoSaveDescription')}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => 
                      updatePreferences({ autoSave: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {t('interface.searchHistory')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t('interface.searchHistoryDescription')}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences.searchHistory}
                    onCheckedChange={(checked) => 
                      updatePreferences({ searchHistory: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {t('performance.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        {t('performance.info.title')}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        {t('performance.info.description')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">{t('performance.optimizations.enabled')}</span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• {t('performance.optimizations.lazyLoading')}</li>
                      <li>• {t('performance.optimizations.imageOptimization')}</li>
                      <li>• {t('performance.optimizations.caching')}</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium">{t('performance.optimizations.recommended')}</span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• {t('performance.optimizations.compression')}</li>
                      <li>• {t('performance.optimizations.minification')}</li>
                      <li>• {t('performance.optimizations.cdn')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {t('currentPreferences.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('currentPreferences.theme')}
                  </span>
                  <Badge variant="outline" className="capitalize">
                    {preferences.theme}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('currentPreferences.compactMode')}
                  </span>
                  <Badge 
                    variant={preferences.compactMode ? "default" : "secondary"}
                  >
                    {preferences.compactMode ? t('status.enabled') : t('status.disabled')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('currentPreferences.autoSave')}
                  </span>
                  <Badge 
                    variant={preferences.autoSave ? "default" : "secondary"}
                  >
                    {preferences.autoSave ? t('status.enabled') : t('status.disabled')}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('currentPreferences.lastUpdated')}
                  </span>
                  <span className="text-sm">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Tips */}
          <Card>
            <CardHeader>
              <CardTitle>{t('tips.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      {t('tips.theme.title')}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {t('tips.theme.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      {t('tips.performance.title')}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {t('tips.performance.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      {t('tips.accessibility.title')}
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      {t('tips.accessibility.description')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t('quickActions.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  {t('quickActions.previewChanges')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  {t('quickActions.mobilePreview')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {t('quickActions.optimizePerformance')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WithAuthProtect(PreferencesSettingsPage); 