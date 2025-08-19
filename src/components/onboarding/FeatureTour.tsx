'use client';

import React, { useState } from 'react';
import { useOnboardingStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Search, Filter, Heart, ShoppingCart, Star, MapPin, Clock, Shield, Zap, Users } from 'lucide-react';

export const FeatureTour: React.FC = () => {
  const { nextStep, previousStep, setSkipTour, preferences } = useOnboardingStore();
  const [currentTab, setCurrentTab] = useState('marketplace');

  const handleSkipTour = () => {
    setSkipTour(true);
    nextStep();
  };

  const handleContinue = () => {
    nextStep();
  };

  const tourSections = [
    {
      id: 'marketplace',
      title: 'Marketplace',
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      features: [
        {
          icon: Search,
          title: 'Smart Search',
          description: 'Find products quickly with advanced search and filters',
          demo: 'Try searching for "organic tomatoes" or "local honey"',
        },
        {
          icon: Filter,
          title: 'Advanced Filters',
          description: 'Filter by location, price, sustainability rating, and more',
          demo: 'Use filters to find products within 50 miles or under $20',
        },
        {
          icon: Heart,
          title: 'Favorites & Lists',
          description: 'Save products you love and create shopping lists',
          demo: 'Click the heart icon to save products for later',
        },
        {
          icon: Star,
          title: 'Reviews & Ratings',
          description: 'Read authentic reviews from other customers',
          demo: 'Check ratings and reviews before making a purchase',
        },
      ],
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      features: [
        {
          icon: MapPin,
          title: 'Order Tracking',
          description: 'Track your orders from farm to doorstep in real-time',
          demo: 'See exactly where your order is and when it will arrive',
        },
        {
          icon: Clock,
          title: 'Order History',
          description: 'View all your past orders and reorder easily',
          demo: 'Access your complete order history and reorder with one click',
        },
        {
          icon: Shield,
          title: 'Account Security',
          description: 'Manage your profile, wallet, and security settings',
          demo: 'Update your profile, change wallet, and manage preferences',
        },
        {
          icon: Zap,
          title: 'Quick Actions',
          description: 'Fast access to frequently used features',
          demo: 'Quick access to orders, messages, and account settings',
        },
      ],
    },
    {
      id: 'blockchain',
      title: 'Blockchain Features',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      features: [
        {
          icon: Shield,
          title: 'Escrow Protection',
          description: 'Secure transactions with blockchain-powered escrow',
          demo: 'Your payment is held securely until you receive your order',
        },
        {
          icon: Zap,
          title: 'Instant Payments',
          description: 'Pay with Stellar Lumens for instant settlement',
          demo: 'Complete transactions in seconds with XLM cryptocurrency',
        },
        {
          icon: Users,
          title: 'Transparent Records',
          description: 'All transactions are recorded on the blockchain',
          demo: 'View complete transaction history on the Stellar blockchain',
        },
        {
          icon: MapPin,
          title: 'Supply Chain Tracking',
          description: 'Track products from farm to table',
          demo: 'See the complete journey of your food products',
        },
      ],
    },
  ];

  const getRoleSpecificFeatures = () => {
    if (preferences.userType === 'farmer') {
      return [
        'Product listing and management',
        'Inventory tracking',
        'Order fulfillment tools',
        'Customer communication',
        'Analytics and insights',
        'Marketing tools',
      ];
    } else if (preferences.userType === 'buyer') {
      return [
        'Product discovery',
        'Order placement',
        'Delivery tracking',
        'Review and rating system',
        'Favorites and lists',
        'Farmer profiles',
      ];
    }
    return [];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Platform Feature Tour
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Let&apos;s explore the key features that will help you get the most out of the Revolutionary Farmers Marketplace.
        </p>
      </div>

      {/* Feature Tabs */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mb-8">
      <TabsList className="flex flex-row items-center justify-start gap-1 sm:gap-2 md:gap-3 w-full overflow-x-auto scrollbar-hide my-8 mb-8 px-4 py-2">
  {tourSections.map((section) => (
    <TabsTrigger 
      key={section.id} 
      value={section.id} 
      className="text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0 px-2 sm:px-3 md:px-4 py-2"
    >
      {section.title}
    </TabsTrigger>
  ))}
</TabsList>

        {tourSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                    <section.icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      Discover the key features of our {section.title.toLowerCase()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.features.map((feature, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 ${section.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <feature.icon className={`w-4 h-4 ${section.color}`} />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">{feature.title}</h5>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                      <div className="ml-11">
                        <Badge variant="secondary" className="text-xs">
                          {feature.demo}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Role-Specific Features */}
      {preferences.userType && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">
              Features for {preferences.userType === 'farmer' ? 'Farmers' : 'Buyers'}
            </CardTitle>
            <CardDescription className="text-blue-800">
              Here are the key features tailored specifically for your role:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getRoleSpecificFeatures().map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-800">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Demo */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">
                Ready to explore?
              </h3>
              <p className="text-sm text-green-800 mt-1">
                You can now navigate through the platform and try out these features. Don&apos;t worry if you need help - there are tooltips and help sections throughout the interface.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3 pt-6">
        <Button variant="outline" onClick={previousStep} className='w-full md:w-auto'>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-3 w-full md:w-auto md:space-y-0 md:space-x-3">
          <Button variant="outline" onClick={handleSkipTour} className='w-full md:w-auto'>
            Skip Tour
          </Button>
          <Button
            onClick={handleContinue}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 w-full md:w-auto"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        <p>You can always access this tour later from your dashboard or account settings.</p>
      </div>
    </div>
  );
}; 