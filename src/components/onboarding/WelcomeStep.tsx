'use client';

import React from 'react';
import { useOnboardingStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Leaf, Shield, Users, Zap } from 'lucide-react';

export const WelcomeStep: React.FC = () => {
  const { nextStep, markStepComplete } = useOnboardingStore();

  const handleGetStarted = () => {
    markStepComplete('welcome');
    nextStep();
  };

  const features = [
    {
      icon: Leaf,
      title: 'Sustainable Farming',
      description: 'Connect with eco-conscious farmers and support sustainable agriculture practices.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Blockchain-powered escrow system ensures safe and transparent transactions.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a community of farmers, buyers, and agricultural enthusiasts.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient',
      description: 'Streamlined marketplace with instant payments and real-time updates.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="text-center space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <Leaf className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Revolutionary Farmers
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The world&apos;s first blockchain-powered marketplace connecting sustainable farmers with conscious consumers.
        </p>
        <div className="flex justify-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Stellar Blockchain
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Sustainable
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Community
          </Badge>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="text-left hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* What You'll Learn */}
      <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What you&apos;ll learn in this onboarding:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-600">Set up your Stellar wallet</span>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-600">Choose your user type</span>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-600">Explore platform features</span>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-600">Complete verification</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <Button 
          size="lg" 
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
        >
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Estimated Time */}
      <p className="text-sm text-gray-500">
        Estimated time: 5-10 minutes
      </p>
    </div>
  );
}; 