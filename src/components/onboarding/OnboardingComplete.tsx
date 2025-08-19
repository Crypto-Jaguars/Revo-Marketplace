'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, PartyPopper, ArrowRight, Home, User, Settings, HelpCircle, Star } from 'lucide-react';

interface OnboardingCompleteProps {
  onComplete: () => void;
}

export const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onComplete }) => {
  const router = useRouter();
  const { preferences } = useOnboardingStore();

  const handleGetStarted = () => {
    onComplete();
    router.push('/');
  };

  const nextSteps = [
    {
      icon: Home,
      title: 'Explore the Marketplace',
      description: 'Browse products, discover farmers, and start shopping',
      action: 'Go to Marketplace',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: User,
      title: 'Complete Your Profile',
      description: 'Add photos, verify your account, and build trust',
      action: 'Edit Profile',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Settings,
      title: 'Customize Settings',
      description: 'Set preferences, notifications, and privacy options',
      action: 'Go to Settings',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: HelpCircle,
      title: 'Get Help',
      description: 'Access tutorials, FAQs, and customer support',
      action: 'View Help Center',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const roleSpecificTips = preferences.userType === 'farmer' ? [
    'List your first product',
    'Set up your farm profile',
    'Connect with potential customers',
    'Learn about pricing strategies',
  ] : [
    'Browse farmer profiles',
    'Add products to favorites',
    'Read product reviews',
    'Set up delivery preferences',
  ];

  return (
    <div className="text-center space-y-8">
      {/* Success Celebration */}
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <PartyPopper className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            🎉 Welcome to Revolutionary Farmers!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! You&apos;ve successfully completed the onboarding process and are now ready to explore the marketplace.
          </p>
          <div className="flex justify-center">
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
              <CheckCircle className="w-5 h-5 mr-2" />
              Onboarding Complete!
            </Badge>
          </div>
        </div>
      </div>

      {/* Role Welcome */}
      {preferences.userType && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">
                Welcome, {preferences.userType === 'farmer' ? 'Farmer' : 'Buyer'}!
              </h3>
            </div>
            <p className="text-blue-800 mb-4">
              We&apos;ve customized your experience based on your role. Here are some tips to get you started:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roleSpecificTips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-800">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">What&apos;s Next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {nextSteps.map((step, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {step.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Your Onboarding Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-sm text-gray-600">Steps Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {preferences.userType ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-gray-600">Role Selected</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {preferences.hasWallet ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-gray-600">Wallet Connected</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {preferences.skipTour ? 'Skipped' : 'Completed'}
              </div>
              <div className="text-sm text-gray-600">Feature Tour</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-3">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Need Help?</h3>
              <p className="text-sm text-blue-800 mt-1">
                Our support team is here to help you get started. Contact us anytime for assistance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Button */}
      <div className="pt-4">
        <Button 
          size="lg" 
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
        >
          Get Started with Revolutionary Farmers
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Final Message */}
      <div className="text-center space-y-2">
        <p className="text-lg text-gray-700">
          Thank you for joining our community of sustainable farmers and conscious consumers!
        </p>
        <p className="text-sm text-gray-500">
          Together, we&apos;re building a better future for agriculture and our planet.
        </p>
      </div>
    </div>
  );
}; 