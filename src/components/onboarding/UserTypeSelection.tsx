'use client';

import React, { useState } from 'react';
import { useOnboardingStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Leaf, ShoppingCart, Users, TrendingUp, Shield, Globe, Zap } from 'lucide-react';

export const UserTypeSelection: React.FC = () => {
  const { nextStep, previousStep, setUserType, preferences } = useOnboardingStore();
  const [selectedType, setSelectedType] = useState<'farmer' | 'buyer' | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      setUserType(selectedType);
      nextStep();
    }
  };

  const userTypes = [
    {
      type: 'farmer',
              title: 'I am a Farmer',
      subtitle: 'Sell your products and grow your business',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-200',
      features: [
        {
          icon: TrendingUp,
          title: 'Expand Your Market',
          description: 'Reach customers worldwide through our global marketplace',
          color: 'text-green-600',
        },
        {
          icon: Shield,
          title: 'Secure Payments',
          description: 'Get paid instantly with blockchain-powered escrow protection',
          color: 'text-blue-600',
        },
        {
          icon: Users,
          title: 'Build Community',
          description: 'Connect with other farmers and share best practices',
          color: 'text-purple-600',
        },
        {
          icon: Globe,
          title: 'Sustainable Focus',
          description: 'Join a community that values eco-friendly practices',
          color: 'text-emerald-600',
        },
      ],
      benefits: [
        'List unlimited products',
        'Set your own prices',
        'Direct customer relationships',
        'Analytics and insights',
        'Marketing tools',
        'Community support',
      ],
    },
    {
      type: 'buyer',
              title: 'I am a Buyer',
      subtitle: 'Discover fresh, sustainable products from trusted farmers',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
      features: [
        {
          icon: Leaf,
          title: 'Fresh & Sustainable',
          description: 'Access to fresh, locally-sourced, sustainable products',
          color: 'text-green-600',
        },
        {
          icon: Shield,
          title: 'Quality Assured',
          description: 'Verified farmers and transparent supply chains',
          color: 'text-blue-600',
        },
        {
          icon: Zap,
          title: 'Fast Delivery',
          description: 'Quick delivery from farm to your doorstep',
          color: 'text-orange-600',
        },
        {
          icon: Users,
          title: 'Direct Connection',
          description: 'Connect directly with farmers and learn about your food',
          color: 'text-purple-600',
        },
      ],
      benefits: [
        'Fresh, local products',
        'Transparent sourcing',
        'Quality guarantees',
        'Fast delivery',
        'Farmer stories',
        'Community support',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Choose Your Role
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Tell us about yourself so we can customize your experience and show you the most relevant features.
        </p>
      </div>

      {/* User Type Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {userTypes.map((userType) => (
          <Card
            key={userType.type}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedType === userType.type
                ? `ring-2 ring-blue-500 ${userType.borderColor}`
                : 'hover:scale-105'
            }`}
                          onClick={() => setSelectedType(userType.type as 'farmer' | 'buyer')}
          >
            <CardHeader className="text-center pb-4">
              <div className={`w-16 h-16 ${userType.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <userType.icon className={`w-8 h-8 ${userType.color}`} />
              </div>
              <CardTitle className="text-2xl">{userType.title}</CardTitle>
              <CardDescription className="text-gray-600 text-base">
                {userType.subtitle}
              </CardDescription>
              {selectedType === userType.type && (
                <Badge className="bg-blue-100 text-blue-800 mt-2">
                  Selected
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Features */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Key Features</h4>
                <div className="grid grid-cols-1 gap-4">
                  {userType.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 ${userType.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <feature.icon className={`w-4 h-4 ${feature.color}`} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">{feature.title}</h5>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What you&apos;ll get:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {userType.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selection Info */}
      {selectedType && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">
                  Great choice! You&apos;ve selected the {selectedType} role.
                </h3>
                <p className="text-sm text-blue-800 mt-1">
                  We&apos;ll customize your dashboard and show you the most relevant features for {selectedType === 'farmer' ? 'selling your products' : 'finding fresh products'}.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3 pt-6">
        <Button variant="outline" onClick={previousStep} className='w-full md:w-auto'>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedType}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 w-full md:w-auto"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        <p>Don&apos;t worry! You can change your role later in your account settings.</p>
      </div>
    </div>
  );
}; 