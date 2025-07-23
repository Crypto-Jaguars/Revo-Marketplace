'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Bounded from '@/components/Bounded';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const t = useTranslations('FAQ');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I create an account?',
      answer:
        'You can create an account by clicking the "Sign Up" button and filling out the registration form. You\'ll need to provide your email, create a password, and verify your email address.',
      category: 'account',
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer:
        'We accept USDC cryptocurrency payments through the Stellar blockchain. You can pay using MoonPay, connect your Stellar wallet, or use QR codes for quick payments.',
      category: 'payment',
    },
    {
      id: '3',
      question: 'How does the escrow system work?',
      answer:
        'Our escrow system holds payments securely until you confirm receipt of your order. This protects both buyers and sellers, ensuring fair transactions for everyone.',
      category: 'payment',
    },
    {
      id: '4',
      question: 'Can I track my order?',
      answer:
        "Yes! Once your order is confirmed, you'll receive tracking information and can monitor your order status in real-time through your account dashboard.",
      category: 'orders',
    },
    {
      id: '5',
      question: 'What if I receive damaged products?',
      answer:
        "If you receive damaged products, please contact us within 24 hours with photos. We'll work with the farmer to resolve the issue and may offer a refund or replacement.",
      category: 'orders',
    },
    {
      id: '6',
      question: 'How do I become a farmer on the platform?',
      answer:
        'To become a farmer, visit our "Join as Farmer" page and complete the application form. We\'ll review your application and contact you with next steps.',
      category: 'selling',
    },
    {
      id: '7',
      question: 'What commission do you charge farmers?',
      answer:
        'We charge a small commission on each sale to maintain the platform. The exact percentage depends on your seller plan. Check our pricing page for details.',
      category: 'selling',
    },
    {
      id: '8',
      question: 'How long does delivery take?',
      answer:
        "Delivery times vary by location and farmer. Most orders are delivered within 1-3 business days. You'll see estimated delivery times before completing your purchase.",
      category: 'delivery',
    },
    {
      id: '9',
      question: 'Do you offer pickup options?',
      answer:
        'Yes! Many farmers offer pickup options. You can filter for pickup-available products when browsing and select pickup during checkout.',
      category: 'delivery',
    },
    {
      id: '10',
      question: 'Is my personal information secure?',
      answer:
        'Yes, we take security seriously. We use encryption for all data transmission and follow industry best practices for data protection. We never share your personal information with third parties.',
      category: 'security',
    },
    {
      id: '11',
      question: 'How do I reset my password?',
      answer:
        'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.',
      category: 'account',
    },
    {
      id: '12',
      question: 'Can I cancel my order?',
      answer:
        "You can cancel your order within 1 hour of placing it, provided the farmer hasn't started preparing it. After that, you'll need to contact the farmer directly.",
      category: 'orders',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'account', label: 'Account' },
    { id: 'payment', label: 'Payment' },
    { id: 'orders', label: 'Orders' },
    { id: 'selling', label: 'Selling' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'security', label: 'Security' },
  ];

  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <Bounded>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-lg">
            Find answers to common questions about Revolutionary Farmers
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => (
              <Card key={item.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full p-6 justify-between hover:bg-white/10 text-left"
                    onClick={() => toggleExpanded(item.id)}
                  >
                    <span className="text-white font-medium">{item.question}</span>
                    {expandedItems.has(item.id) ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                  {expandedItems.has(item.id) && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-12 text-center">
                <HelpCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-white mb-2">No questions found</h2>
                <p className="text-gray-300 mb-6">
                  Try adjusting your search terms or category filter
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Support */}
        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Still need help?</h2>
            <p className="text-gray-300 mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => (window.location.href = '/contact')}
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => (window.location.href = 'mailto:support@revolutionaryfarmers.com')}
              >
                Email Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
}
