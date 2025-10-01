'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, Globe, DollarSign, Lock } from 'lucide-react';
import { toast } from 'sonner';

export function ProfileSettings() {
  const t = useTranslations('common.profileSettings');
  
  const [settings, setSettings] = useState({
    language: 'en',
    currency: 'USD',
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    privacyPublicProfile: true,
  });

  const handleSelectChange = (id: string, value: string) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
    const settingName = id.replace(/([A-Z])/g, ' $1').toLowerCase();
    toast.success(t('toast.updated', { setting: settingName, value }));
  };

  const handleSwitchChange = (id: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }));
    const settingName = id.replace(/([A-Z])/g, ' $1').toLowerCase();
    toast.success(checked ? t('toast.enabled', { setting: settingName }) : t('toast.disabled', { setting: settingName }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    toast.success(t('toast.saved'));
  };

  return (
    <div className="space-y-6">
      {/* General Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>{t('generalPreferences.title')}</CardTitle>
          <CardDescription>
            {t('generalPreferences.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="language" className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4" /> {t('language.label')}
              </Label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleSelectChange('language', value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder={t('language.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('language.options.en')}</SelectItem>
                  <SelectItem value="es">{t('language.options.es')}</SelectItem>
                  <SelectItem value="fr">{t('language.options.fr')}</SelectItem>
                  <SelectItem value="de">{t('language.options.de')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency" className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4" /> {t('currency.label')}
              </Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => handleSelectChange('currency', value)}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder={t('currency.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">{t('currency.options.USD')}</SelectItem>
                  <SelectItem value="EUR">{t('currency.options.EUR')}</SelectItem>
                  <SelectItem value="GBP">{t('currency.options.GBP')}</SelectItem>
                  <SelectItem value="XLM">{t('currency.options.XLM')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="flex items-center gap-2">
              {t('darkMode')}
            </Label>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSwitchChange('darkMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('notifications.title')}</CardTitle>
          <CardDescription>{t('notifications.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> {t('notifications.email')}
            </Label>
            <Switch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="smsNotifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> {t('notifications.sms')}
            </Label>
            <Switch
              id="smsNotifications"
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleSwitchChange('smsNotifications', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('privacy.title')}</CardTitle>
          <CardDescription>{t('privacy.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="privacyPublicProfile" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> {t('privacy.publicProfile')}
            </Label>
            <Switch
              id="privacyPublicProfile"
              checked={settings.privacyPublicProfile}
              onCheckedChange={(checked) => handleSwitchChange('privacyPublicProfile', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveSettings} className="bg-[#375B42] hover:bg-[#2A4632] text-white">
        {t('saveButton')}
      </Button>
    </div>
  );
}
