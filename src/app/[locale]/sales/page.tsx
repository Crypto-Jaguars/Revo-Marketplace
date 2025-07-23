'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Bounded from '@/components/Bounded';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3,
  Wallet,
  Shield,
  Zap,
} from 'lucide-react';

export default function SalesPage() {
  const t = useTranslations('Sales');
  const router = useRouter();

  const features = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: 'Higher Profit Margins',
      description: 'Sell directly to consumers and keep more of your earnings',
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Direct Customer Relationships',
      description: 'Build lasting relationships with your customers',
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: 'Secure Blockchain Payments',
      description: 'Get paid instantly with USDC cryptocurrency',
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Easy to Use Platform',
      description: 'Simple dashboard to manage your products and orders',
    },
  ];

  const stats = [
    { label: 'Average Revenue Increase', value: '40%', icon: <TrendingUp className="h-5 w-5" /> },
    { label: 'Active Farmers', value: '500+', icon: <Users className="h-5 w-5" /> },
    { label: 'Monthly Orders', value: '10K+', icon: <ShoppingCart className="h-5 w-5" /> },
    { label: 'Customer Satisfaction', value: '98%', icon: <BarChart3 className="h-5 w-5" /> },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for small farms getting started',
      features: [
        'Up to 10 product listings',
        'Basic analytics',
        'Email support',
        'Standard payment processing',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29/month',
      description: 'For growing farms with more products',
      features: [
        'Unlimited product listings',
        'Advanced analytics',
        'Priority support',
        'Custom branding',
        'Bulk upload tools',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large operations with special needs',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated account manager',
        'White-label solution',
        'API access',
      ],
      popular: false,
    },
  ];

  const handleGetStarted = () => {
    router.push('/join-farmer');
  };

  return (
    <Bounded>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Start Selling Your Farm Products</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join Revolutionary Farmers and transform your agricultural business with blockchain
            technology. Sell directly to consumers and maximize your profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 text-lg"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/marketplace')}
              className="border-white text-white hover:bg-white/10 font-semibold py-3 px-8 text-lg"
            >
              View Marketplace
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3">
                  <div className="text-green-500">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Why Choose Revolutionary Farmers?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-white/10 backdrop-blur-sm border-white/20 relative ${
                  plan.popular ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-white mb-2">{plan.price}</div>
                  <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={handleGetStarted}
                    className={`w-full font-semibold py-2 ${
                      plan.popular
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
          <Tabs defaultValue="step1" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
              <TabsTrigger value="step1" className="text-white">
                Sign Up
              </TabsTrigger>
              <TabsTrigger value="step2" className="text-white">
                List Products
              </TabsTrigger>
              <TabsTrigger value="step3" className="text-white">
                Receive Orders
              </TabsTrigger>
              <TabsTrigger value="step4" className="text-white">
                Get Paid
              </TabsTrigger>
            </TabsList>
            <TabsContent value="step1" className="mt-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Create Your Account</h3>
                      <p className="text-gray-300">
                        Sign up as a farmer and complete your profile. It takes just a few minutes
                        to get started.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="step2" className="mt-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Add Your Products</h3>
                      <p className="text-gray-300">
                        Upload photos, set prices, and describe your fresh produce. Our tools make
                        it easy to manage your inventory.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="step3" className="mt-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Manage Orders</h3>
                      <p className="text-gray-300">
                        Receive orders from customers and manage them through our intuitive
                        dashboard. Track everything in real-time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="step4" className="mt-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Secure Payments</h3>
                      <p className="text-gray-300">
                        Get paid instantly in USDC cryptocurrency through our secure blockchain
                        payment system.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Selling?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of farmers who are already earning more by selling directly to
                consumers. Start your journey today with our free plan.
              </p>
              <Button
                onClick={handleGetStarted}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 text-lg"
              >
                Get Started Free
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Bounded>
  );
}
