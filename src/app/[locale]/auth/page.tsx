'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLanguageStore } from '@/store';
import {
  getRoleBasedRedirect,
  getBuyerRedirect,
  getFarmerRedirect,
  getDefaultRedirect,
} from '@/lib/auth-redirects';
import { usePasskey } from '@/hooks/usePasskey';
import { usePasskeyStore } from '@/store/slices/passkey';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Fingerprint,
  Mail,
  Wallet,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface DeviceCompatibility {
  isSupported: boolean;
  hasBiometrics: boolean;
  platform: string;
}

export default function AuthPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const { language } = useLanguageStore();
  const [deviceCompatibility, setDeviceCompatibility] = useState<DeviceCompatibility>({
    isSupported: false,
    hasBiometrics: false,
    platform: 'unknown',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { getCurrentUser, createPasskey, isCreating, error, clearError } = usePasskey();
  const { connect, isLoading: isConnecting, isConnected } = usePasskeyStore();

  // Check device compatibility for WebAuthn/Passkeys
  useEffect(() => {
    const checkCompatibility = () => {
      const isSupported =
        typeof window !== 'undefined' &&
        'navigator' in window &&
        'credentials' in navigator &&
        'create' in navigator.credentials;

      const hasBiometrics = isSupported && 'authenticatorAttachment' in PublicKeyCredential;

      const platform = typeof window !== 'undefined' ? navigator.platform || 'unknown' : 'unknown';

      setDeviceCompatibility({
        isSupported,
        hasBiometrics,
        platform,
      });
    };

    checkCompatibility();
  }, []);

  const handlePasskeyLogin = async () => {
    try {
      setIsLoading(true);
      clearError();

      // Usar connect del passkey store para conectar con passkey
      await connect();

      // Después de conectar exitosamente, verificar usuario y redirigir
      const currentUser = getCurrentUser();

      if (currentUser && currentUser.hasPasskey) {
        // Usuario ya tiene passkey, redirigir al dashboard
        const safeLanguage = language || 'en';
        const redirectUrl = getRoleBasedRedirect(currentUser.role as any, safeLanguage);
        router.push(redirectUrl);
        return;
      }

      // Si no hay usuario, redirigir al marketplace
      const safeLanguage = language || 'en';
      router.push(`/${safeLanguage}/marketplace`);
    } catch (error) {
      console.error('Passkey login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailPassword = () => {
    const safeLanguage = language || 'en';
    router.push(`/${safeLanguage}/signin`);
  };

  const handleWalletConnect = () => {
    // This will use the existing wallet connection flow
    // After successful wallet connection, redirect based on role
    const safeLanguage = language || 'en';
    router.push(`/${safeLanguage}/`);
  };

  const handleCreatePasskey = async () => {
    try {
      setIsLoading(true);
      clearError();

      // Redirigir directamente a signup para crear cuenta con passkey
      const safeLanguage = language || 'en';
      router.push(`/${safeLanguage}/signup`);
    } catch (error) {
      console.error('Passkey registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5 text-green-800" />
          <span className="text-green-800 font-medium">{t('backToHome')}</span>
        </Link>
        <Image src="/logo.svg" width={40} height={40} alt="Revolutionary Farmers" />
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        {/* Left Side - Branding */}
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
          <div className="max-w-md">
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="w-32 h-32 mx-auto mb-6">
                <Image
                  src="/logo.svg"
                  alt="Revolutionary Farmers Logo"
                  className="w-full h-full object-contain"
                  width={128}
                  height={128}
                />
              </div>
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Revolutionary Farmers
              </h1>
              <p className="text-center text-gray-600 text-lg">
                Secure, transparent, and trusted agricultural marketplace
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Options */}
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('title')}</h2>
              <p className="text-gray-600">{t('subtitle')}</p>
            </div>

            {/* Device Compatibility Banner */}
            {!deviceCompatibility.isSupported && (
              <Alert className="mb-6 border-amber-200 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  {t('deviceNotSupported')}
                </AlertDescription>
              </Alert>
            )}

            {/* Passkey Error Banner */}
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {/* Auth Options Cards */}
            <div className="space-y-4">
              {/* Primary: Passkey Login */}
              <Card
                className={`border-2 transition-all duration-200 hover:shadow-lg ${
                  deviceCompatibility.isSupported
                    ? 'border-green-200 hover:border-green-300'
                    : 'border-gray-200 opacity-60'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Fingerprint className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{t('passkeyTitle')}</CardTitle>
                        <CardDescription>{t('passkeyDescription')}</CardDescription>
                      </div>
                    </div>
                    {deviceCompatibility.isSupported && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {t('passkeyAvailable')}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    onClick={handlePasskeyLogin}
                    disabled={
                      !deviceCompatibility.isSupported || isLoading || isCreating || isConnecting
                    }
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 py-3 rounded-full font-medium"
                  >
                    {isLoading || isCreating || isConnecting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>
                          {isCreating
                            ? 'Setting up...'
                            : isConnecting
                              ? 'Connecting...'
                              : t('signingIn')}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Fingerprint className="h-4 w-4" />
                        <span>{isConnected ? 'Connected' : t('passkeyButton')}</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Secondary: Email/Password */}
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{t('emailTitle')}</CardTitle>
                      <CardDescription>{t('emailDescription')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    onClick={handleEmailPassword}
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 py-3 rounded-full font-medium"
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{t('emailButton')}</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Secondary: Wallet Connection */}
              <Card className="border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Wallet className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{t('walletTitle')}</CardTitle>
                      <CardDescription>{t('walletDescription')}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    onClick={handleWalletConnect}
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 py-3 rounded-full font-medium"
                  >
                    <div className="flex items-center space-x-2">
                      <Wallet className="h-4 w-4" />
                      <span>{t('walletButton')}</span>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Create Passkey Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-3">{t('createPasskey')}</p>
              <Button
                onClick={handleCreatePasskey}
                variant="ghost"
                className="text-green-800 hover:text-green-700 hover:bg-green-50 font-medium"
                disabled={!deviceCompatibility.isSupported || isLoading || isCreating}
              >
                {isLoading || isCreating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                    <span>Setting up...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>{t('createPasskeyButton')}</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">{t('securityTitle')}</h4>
                  <p className="text-sm text-green-700">{t('securityDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
