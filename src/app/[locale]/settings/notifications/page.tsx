'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Bell,
  Mail,
  Smartphone,
  Settings,
  Volume2,
  VolumeX,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
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

function NotificationsSettingsPage() {
  const t = useTranslations('Settings.notifications');
  const locale = useLocale();
  const { notifications, updateNotificationSettings, setLoading } = useSettingsStore();

  const [activeTab, setActiveTab] = useState<'email' | 'push' | 'sms'>('email');

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.settings'), href: `/${locale}/settings` },
    { label: t('breadcrumb.notifications'), href: '', isCurrent: true },
  ];

  const notificationTypes = [
    {
      id: 'orderUpdates',
      label: t('types.orderUpdates'),
      description: t('types.orderUpdatesDesc'),
      icon: CheckCircle,
    },
    {
      id: 'priceAlerts',
      label: t('types.priceAlerts'),
      description: t('types.priceAlertsDesc'),
      icon: AlertTriangle,
    },
    {
      id: 'securityAlerts',
      label: t('types.securityAlerts'),
      description: t('types.securityAlertsDesc'),
      icon: Shield,
    },
    {
      id: 'marketing',
      label: t('types.marketing'),
      description: t('types.marketingDesc'),
      icon: Info,
    },
  ];

  const handleToggleChannel = (channel: 'email' | 'push' | 'sms', enabled: boolean) => {
    updateNotificationSettings(channel, { enabled });
  };

  const handleToggleType = (channel: 'email' | 'push' | 'sms', type: string, enabled: boolean) => {
    updateNotificationSettings(channel, { [type]: enabled });
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return Mail;
      case 'push':
        return Bell;
      case 'sms':
        return Smartphone;
      default:
        return Bell;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'email':
        return 'bg-blue-100 text-blue-800';
      case 'push':
        return 'bg-green-100 text-green-800';
      case 'sms':
        return 'bg-purple-100 text-purple-800';
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
          <Button onClick={handleSaveSettings} className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {t('actions.save')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Notification Channels */}
        <div className="lg:col-span-3 space-y-6">
          {/* Channel Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {(['email', 'push', 'sms'] as const).map((channel) => {
              const Icon = getChannelIcon(channel);
              const isActive = activeTab === channel;
              return (
                <button
                  key={channel}
                  onClick={() => setActiveTab(channel)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ${
                    isActive
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="capitalize">{channel}</span>
                  <Badge
                    variant={notifications[channel].enabled ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {notifications[channel].enabled ? t('status.active') : t('status.inactive')}
                  </Badge>
                </button>
              );
            })}
          </div>

          {/* Channel Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const Icon = getChannelIcon(activeTab);
                  return <Icon className="w-5 h-5" />;
                })()}
                {t(`channels.${activeTab}.title`)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Channel Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t(`channels.${activeTab}.enable`)}</p>
                    <p className="text-sm text-gray-600">
                      {t(`channels.${activeTab}.description`)}
                    </p>
                  </div>
                  <Switch
                    checked={notifications[activeTab].enabled}
                    onCheckedChange={(checked) => handleToggleChannel(activeTab, checked)}
                  />
                </div>

                {notifications[activeTab].enabled && (
                  <>
                    <Separator />

                    {/* Notification Types */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">{t('notificationTypes.title')}</h3>
                      {notificationTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <div
                            key={type.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="font-medium text-gray-900">{type.label}</p>
                                <p className="text-sm text-gray-600">{type.description}</p>
                              </div>
                            </div>
                            <Switch
                              checked={
                                notifications[activeTab][
                                  type.id as keyof (typeof notifications)[typeof activeTab]
                                ]
                              }
                              onCheckedChange={(checked) =>
                                handleToggleType(activeTab, type.id, checked)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Channel Specific Settings */}
                    {activeTab === 'email' && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-900">{t('emailSettings.title')}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                {t('emailSettings.frequency')}
                              </label>
                              <Select defaultValue="immediate">
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="immediate">
                                    {t('emailSettings.frequencyImmediate')}
                                  </SelectItem>
                                  <SelectItem value="daily">
                                    {t('emailSettings.frequencyDaily')}
                                  </SelectItem>
                                  <SelectItem value="weekly">
                                    {t('emailSettings.frequencyWeekly')}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                {t('emailSettings.format')}
                              </label>
                              <Select defaultValue="html">
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="html">
                                    {t('emailSettings.formatHtml')}
                                  </SelectItem>
                                  <SelectItem value="text">
                                    {t('emailSettings.formatText')}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'push' && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-900">{t('pushSettings.title')}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                {t('pushSettings.sound')}
                              </label>
                              <Select defaultValue="default">
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="default">
                                    {t('pushSettings.soundDefault')}
                                  </SelectItem>
                                  <SelectItem value="none">
                                    {t('pushSettings.soundNone')}
                                  </SelectItem>
                                  <SelectItem value="custom">
                                    {t('pushSettings.soundCustom')}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-700">
                                {t('pushSettings.vibration')}
                              </label>
                              <Select defaultValue="default">
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="default">
                                    {t('pushSettings.vibrationDefault')}
                                  </SelectItem>
                                  <SelectItem value="none">
                                    {t('pushSettings.vibrationNone')}
                                  </SelectItem>
                                  <SelectItem value="long">
                                    {t('pushSettings.vibrationLong')}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === 'sms' && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-900">{t('smsSettings.title')}</h3>
                          <div className="p-4 bg-yellow-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-yellow-800">
                                  {t('smsSettings.warning.title')}
                                </p>
                                <p className="text-sm text-yellow-700 mt-1">
                                  {t('smsSettings.warning.description')}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
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
                  <Volume2 className="w-4 h-4 mr-2" />
                  {t('quickActions.enableAll')}
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                  <VolumeX className="w-4 h-4 mr-2" />
                  {t('quickActions.disableAll')}
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => {}}>
                  <Clock className="w-4 h-4 mr-2" />
                  {t('quickActions.snooze')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>{t('statistics.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {t('statistics.totalNotifications')}
                  </span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('statistics.today')}</span>
                  <span className="font-semibold text-blue-600">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('statistics.thisWeek')}</span>
                  <span className="font-semibold">156</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('statistics.lastNotification')}</span>
                  <span className="text-sm">5 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Channel Status */}
          <Card>
            <CardHeader>
              <CardTitle>{t('channelStatus.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(['email', 'push', 'sms'] as const).map((channel) => {
                  const Icon = getChannelIcon(channel);
                  const isEnabled = notifications[channel].enabled;
                  return (
                    <div
                      key={channel}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">{channel}</span>
                      </div>
                      <Badge
                        variant={isEnabled ? 'default' : 'secondary'}
                        className={`text-xs ${getChannelColor(channel)}`}
                      >
                        {isEnabled ? t('status.active') : t('status.inactive')}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WithAuthProtect(NotificationsSettingsPage);
