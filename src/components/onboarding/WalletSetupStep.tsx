'use client';

import React, { useState } from 'react';
import { useOnboardingStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, ArrowRight, Download, ExternalLink, Wallet, Shield, Zap, CheckCircle } from 'lucide-react';

export const WalletSetupStep: React.FC = () => {
  const { nextStep, previousStep, setWalletInfo, preferences } = useOnboardingStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const handleWalletConnect = async (walletType: 'freighter' | 'albedo' | 'other') => {
    setIsConnecting(true);
    setConnectionError(null);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always succeed
      setWalletInfo(true, walletType);
      nextStep();
    } catch (error) {
      setConnectionError('Failed to connect wallet. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSkipWallet = () => {
    setWalletInfo(false);
    nextStep();
  };

  const walletOptions = [
    {
      id: 'freighter',
      name: 'Freighter',
      description: 'Popular browser extension wallet for Stellar',
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      features: ['Easy to use', 'Browser extension', 'Secure'],
      installUrl: 'https://www.freighter.app/',
    },
    {
      id: 'albedo',
      name: 'Albedo',
      description: 'Web-based wallet with advanced features',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      features: ['Web-based', 'Advanced features', 'No installation'],
      installUrl: 'https://albedo.link/',
    },
    {
      id: 'other',
      name: 'Other Wallets',
      description: 'Use any Stellar-compatible wallet',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      features: ['Any Stellar wallet', 'Flexible choice', 'Custom setup'],
      installUrl: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Set Up Your Stellar Wallet
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect your existing Stellar wallet or create a new one to start trading on the marketplace.
        </p>
      </div>

      {/* Wallet Options */}
      <Tabs defaultValue="freighter" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {walletOptions.map((wallet) => (
            <TabsTrigger key={wallet.id} value={wallet.id} className="text-sm">
              {wallet.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {walletOptions.map((wallet) => (
          <TabsContent key={wallet.id} value={wallet.id} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${wallet.bgColor} rounded-lg flex items-center justify-center`}>
                    <wallet.icon className={`w-6 h-6 ${wallet.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{wallet.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {wallet.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {wallet.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Installation/Connection */}
                {wallet.installUrl ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Download className="w-4 h-4" />
                      <span>Install {wallet.name} first, then connect</span>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => window.open(wallet.installUrl, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Install {wallet.name}
                      </Button>
                      <Button
                        onClick={() => handleWalletConnect(wallet.id as 'freighter' | 'albedo' | 'other')}
                        disabled={isConnecting}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isConnecting ? 'Connecting...' : `Connect ${wallet.name}`}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Use any Stellar-compatible wallet of your choice.
                    </p>
                    <Button
                      onClick={() => handleWalletConnect(wallet.id as 'freighter' | 'albedo' | 'other')}
                      disabled={isConnecting}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Error Display */}
      {connectionError && (
        <Alert variant="destructive">
          <AlertDescription>{connectionError}</AlertDescription>
        </Alert>
      )}

      {/* Skip Option */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={handleSkipWallet}
          className="text-gray-500 hover:text-gray-700"
        >
          I&apos;ll set up my wallet later
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={previousStep}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-sm text-gray-500">
          Step 2 of 6
        </div>
      </div>

      {/* Help Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-blue-900 mb-2">Why do I need a Stellar wallet?</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Secure storage for your Stellar Lumens (XLM)</li>
            <li>• Make instant payments to farmers and sellers</li>
            <li>• Participate in the marketplace ecosystem</li>
            <li>• Access to advanced features like escrow services</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}; 