'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { 
  Shield, 
  Lock, 
  Key, 
  Smartphone, 
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettingsStore } from '@/store';
import WithAuthProtect from '@/constants/helpers/WithAuth';
import Breadcrumb from '@/components/shared/Breadcrumb';

function SecuritySettingsPage() {
  const t = useTranslations('Settings.security');
  const locale = useLocale();
  const { 
    security, 
    updateSecuritySettings,
    setLoading 
  } = useSettingsStore();

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const breadcrumbItems = [
    { label: t('breadcrumb.home'), href: '/' },
    { label: t('breadcrumb.settings'), href: `/${locale}/settings` },
    { label: t('breadcrumb.security'), href: '', isCurrent: true },
  ];

  const sessionTimeouts = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
    { value: 480, label: '8 hours' },
  ];

  const handleSaveSettings = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert(t('passwordChange.errorMismatch'));
      return;
    }
    if (newPassword.length < 8) {
      alert(t('passwordChange.errorTooShort'));
      return;
    }
    
    setLoading(true);
    // Simulate password change
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    
    // Clear form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEnable2FA = async () => {
    setLoading(true);
    // Simulate 2FA setup
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    updateSecuritySettings({ twoFactorAuth: true });
  };

  const handleDisable2FA = async () => {
    if (confirm(t('twoFactor.disableConfirm'))) {
      setLoading(true);
      // Simulate 2FA disable
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
      updateSecuritySettings({ twoFactorAuth: false });
    }
  };

  const getSecurityScore = () => {
    let score = 0;
    if (security.twoFactorAuth) score += 40;
    if (security.loginNotifications) score += 20;
    if (security.deviceManagement) score += 20;
    if (security.sessionTimeout <= 30) score += 20;
    return Math.min(score, 100);
  };

  const getSecurityLevel = (score: number) => {
    if (score >= 80) return { level: 'excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { level: 'good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 40) return { level: 'fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const securityScore = getSecurityScore();
  const securityLevel = getSecurityLevel(securityScore);

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
        {/* Security Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Security Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('securityScore.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold">{securityScore}/100</div>
                    <div>
                      <div className={`font-medium ${securityLevel.color}`}>
                        {t(`securityScore.${securityLevel.level}`)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {t('securityScore.description')}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${securityLevel.bg} ${securityLevel.color}`}>
                    {securityLevel.level.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      securityLevel.level === 'excellent' ? 'bg-green-500' :
                      securityLevel.level === 'good' ? 'bg-blue-500' :
                      securityLevel.level === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${securityScore}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${security.twoFactorAuth ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>{t('securityScore.twoFactor')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${security.loginNotifications ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>{t('securityScore.loginNotifications')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${security.deviceManagement ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>{t('securityScore.deviceManagement')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${security.sessionTimeout <= 30 ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>{t('securityScore.sessionTimeout')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                {t('twoFactor.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {t('twoFactor.setting')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('twoFactor.description')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={security.twoFactorAuth ? "default" : "secondary"}
                    >
                      {security.twoFactorAuth ? t('status.enabled') : t('status.disabled')}
                    </Badge>
                    {security.twoFactorAuth ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDisable2FA}
                        className="flex items-center gap-1"
                      >
                        <Lock className="w-4 h-4" />
                        {t('twoFactor.disable')}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={handleEnable2FA}
                        className="flex items-center gap-1"
                      >
                        <Key className="w-4 h-4" />
                        {t('twoFactor.enable')}
                      </Button>
                    )}
                  </div>
                </div>

                {!security.twoFactorAuth && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          {t('twoFactor.recommendation.title')}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          {t('twoFactor.recommendation.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                {t('passwordChange.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('passwordChange.currentPassword')}
                    </label>
                    <div className="relative mt-1">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder={t('passwordChange.currentPasswordPlaceholder')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('passwordChange.newPassword')}
                    </label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={t('passwordChange.newPasswordPlaceholder')}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('passwordChange.confirmPassword')}
                    </label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('passwordChange.confirmPasswordPlaceholder')}
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleChangePassword}
                  className="flex items-center gap-2"
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                >
                  <RefreshCw className="w-4 h-4" />
                  {t('passwordChange.change')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Session Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t('sessionManagement.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {t('sessionManagement.timeout')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('sessionManagement.timeoutDescription')}
                    </p>
                  </div>
                  <Select
                    value={security.sessionTimeout.toString()}
                    onValueChange={(value) => 
                      updateSecuritySettings({ sessionTimeout: parseInt(value) })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTimeouts.map((timeout) => (
                        <SelectItem key={timeout.value} value={timeout.value.toString()}>
                          {timeout.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {t('sessionManagement.loginNotifications')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('sessionManagement.loginNotificationsDescription')}
                    </p>
                  </div>
                  <Switch
                    checked={security.loginNotifications}
                    onCheckedChange={(checked) => 
                      updateSecuritySettings({ loginNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {t('sessionManagement.deviceManagement')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('sessionManagement.deviceManagementDescription')}
                    </p>
                  </div>
                  <Switch
                    checked={security.deviceManagement}
                    onCheckedChange={(checked) => 
                      updateSecuritySettings({ deviceManagement: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Security Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('securityStatus.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('securityStatus.twoFactor')}
                  </span>
                  <Badge 
                    variant={security.twoFactorAuth ? "default" : "secondary"}
                  >
                    {security.twoFactorAuth ? t('status.enabled') : t('status.disabled')}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('securityStatus.lastPasswordChange')}
                  </span>
                  <span className="text-sm">3 months ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('securityStatus.activeSessions')}
                  </span>
                  <span className="text-sm">2 devices</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {t('securityStatus.lastLogin')}
                  </span>
                  <span className="text-sm">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card>
            <CardHeader>
              <CardTitle>{t('securityTips.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      {t('securityTips.strongPassword.title')}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {t('securityTips.strongPassword.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <Key className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      {t('securityTips.twoFactor.title')}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      {t('securityTips.twoFactor.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      {t('securityTips.regularReview.title')}
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      {t('securityTips.regularReview.description')}
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
                  <Users className="w-4 h-4 mr-2" />
                  {t('quickActions.manageDevices')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t('quickActions.clearSessions')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {}}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {t('quickActions.securityAudit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WithAuthProtect(SecuritySettingsPage); 