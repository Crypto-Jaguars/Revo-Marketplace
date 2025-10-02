'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Globe,
  Languages,
  DollarSign,
  Clock,
  Calendar,
  Hash,
  Settings,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSettingsStore } from '@/store';
import WithAuthProtect from '@/constants/helpers/WithAuth';
import Breadcrumb from '@/components/shared/Breadcrumb';

function RegionalSettingsPage() {
  const t = useTranslations('Settings.regional');
  const locale = useLocale();
  const { regional, updateRegionalSettings, setLoading } = useSettingsStore();

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.settings'), href: `/${locale}/settings` },
    { label: t('breadcrumb.regional'), href: '', isCurrent: true },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  ];

  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
  ];

  const numberFormats = [
    { value: 'en-US', label: '1,234.56 (US)' },
    { value: 'en-GB', label: '1,234.56 (UK)' },
    { value: 'de-DE', label: '1.234,56 (DE)' },
    { value: 'fr-FR', label: '1 234,56 (FR)' },
  ];

  const handleSaveSettings = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const formatCurrency = (currencyCode: string, amount: number) => {
    const currency = currencies.find((c) => c.code === currencyCode);
    if (!currency) return `${amount}`;
    return `${currency.symbol}${amount.toLocaleString()}`;
  };

  const formatDate = (format: string) => {
    const date = new Date();
    switch (format) {
      case 'MM/DD/YYYY':
        return date.toLocaleDateString('en-US');
      case 'DD/MM/YYYY':
        return date.toLocaleDateString('en-GB');
      case 'YYYY-MM-DD':
        return date.toISOString().split('T')[0];
      default:
        return date.toLocaleDateString();
    }
  };

  const formatNumber = (format: string, number: number) => {
    try {
      return number.toLocaleString(format);
    } catch {
      return number.toString();
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
          <Button onClick={handleSaveSettings} className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {t('actions.save')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Regional Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5" />
                {t('language.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('language.setting')}</p>
                    <p className="text-sm text-gray-600">{t('language.description')}</p>
                  </div>
                  <Select
                    value={regional.language}
                    onValueChange={(value) => updateRegionalSettings({ language: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Preview */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">{t('language.preview')}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{t('language.previewText')}</span>
                    </div>
                    <div className="text-sm text-gray-600">{t('language.previewDescription')}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Currency Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                {t('currency.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('currency.setting')}</p>
                    <p className="text-sm text-gray-600">{t('currency.description')}</p>
                  </div>
                  <Select
                    value={regional.currency}
                    onValueChange={(value) => updateRegionalSettings({ currency: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span>{currency.symbol}</span>
                            <span>
                              {currency.name} ({currency.code})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Currency Preview */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">{t('currency.preview')}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">{t('currency.previewPrice')}: </span>
                      <span className="font-medium">
                        {formatCurrency(regional.currency, 1234.56)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('currency.previewTotal')}: </span>
                      <span className="font-medium">
                        {formatCurrency(regional.currency, 5678.9)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timezone Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t('timezone.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('timezone.setting')}</p>
                    <p className="text-sm text-gray-600">{t('timezone.description')}</p>
                  </div>
                  <Select
                    value={regional.timezone}
                    onValueChange={(value) => updateRegionalSettings({ timezone: value })}
                  >
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Timezone Preview */}
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">{t('timezone.preview')}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        {new Date().toLocaleString('en-US', {
                          timeZone: regional.timezone,
                          timeZoneName: 'short',
                        })}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{t('timezone.previewDescription')}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Format Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {t('formats.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Format */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('formats.dateFormat')}
                    </label>
                    <Select
                      value={regional.dateFormat}
                      onValueChange={(value) => updateRegionalSettings({ dateFormat: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dateFormats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t('formats.preview')}: </span>
                    <span className="text-sm font-medium">{formatDate(regional.dateFormat)}</span>
                  </div>
                </div>

                {/* Number Format */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('formats.numberFormat')}
                    </label>
                    <Select
                      value={regional.numberFormat}
                      onValueChange={(value) => updateRegionalSettings({ numberFormat: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {numberFormats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t('formats.preview')}: </span>
                    <span className="text-sm font-medium">
                      {formatNumber(regional.numberFormat, 1234567.89)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Settings Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t('summary.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('summary.language')}</span>
                  <Badge variant="outline" className="capitalize">
                    {languages.find((l) => l.code === regional.language)?.name || regional.language}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('summary.currency')}</span>
                  <Badge variant="outline">{regional.currency}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('summary.timezone')}</span>
                  <Badge variant="outline">{regional.timezone}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('summary.lastUpdated')}</span>
                  <span className="text-sm">1 day ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Regional Tips */}
          <Card>
            <CardHeader>
              <CardTitle>{t('tips.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">{t('tips.language.title')}</p>
                    <p className="text-xs text-blue-700 mt-1">{t('tips.language.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">{t('tips.currency.title')}</p>
                    <p className="text-xs text-green-700 mt-1">{t('tips.currency.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      {t('tips.timezone.title')}
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">{t('tips.timezone.description')}</p>
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
                <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                  <Globe className="w-4 h-4 mr-2" />
                  {t('quickActions.detectLocation')}
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                  <Settings className="w-4 h-4 mr-2" />
                  {t('quickActions.resetToDefaults')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WithAuthProtect(RegionalSettingsPage);
