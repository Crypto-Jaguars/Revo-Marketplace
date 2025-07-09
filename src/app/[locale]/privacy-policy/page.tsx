'use client';

import { useTranslations } from 'next-intl';
import Bounded from '@/components/Bounded';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const t = useTranslations('Privacy');

  const lastUpdated = 'December 15, 2024';

  const sections = [
    {
      title: 'Information We Collect',
      icon: <Eye className="h-5 w-5 text-blue-500" />,
      content: [
        'Personal information you provide when creating an account (name, email, phone number)',
        'Payment information processed through our secure blockchain payment system',
        'Farm information for sellers (farm name, location, certifications)',
        'Order history and transaction records',
        'Communication preferences and settings',
        'Technical information about your device and browsing behavior'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: <UserCheck className="h-5 w-5 text-green-500" />,
      content: [
        'To provide and improve our marketplace services',
        'To process payments and manage transactions',
        'To communicate with you about orders and account updates',
        'To provide customer support and respond to inquiries',
        'To ensure platform security and prevent fraud',
        'To analyze usage patterns and improve user experience',
        'To comply with legal obligations and regulatory requirements'
      ]
    },
    {
      title: 'Information Sharing',
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'We may share information with farmers to fulfill your orders',
        'We may share data with service providers who help us operate the platform',
        'We may disclose information if required by law or to protect our rights',
        'We may share aggregated, anonymous data for research and analytics',
        'In case of business transfer, your information may be transferred to new owners'
      ]
    },
    {
      title: 'Data Security',
      icon: <Lock className="h-5 w-5 text-yellow-500" />,
      content: [
        'We use industry-standard encryption to protect your data',
        'All payments are processed through secure blockchain technology',
        'We implement regular security audits and monitoring',
        'Access to personal information is restricted to authorized personnel',
        'We use secure servers and follow best practices for data protection',
        'We regularly update our security measures to address new threats'
      ]
    }
  ];

  return (
    <Bounded>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-300 text-lg mb-2">
            Revolutionary Farmers is committed to protecting your privacy
          </p>
          <p className="text-gray-400 text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-green-500 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Our Commitment</h2>
                <p className="text-gray-300 leading-relaxed">
                  At Revolutionary Farmers, we respect your privacy and are committed to protecting your personal information. 
                  This Privacy Policy explains how we collect, use, and safeguard your data when you use our marketplace platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  {section.icon}
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300">
                You have the right to:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Access and review your personal information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Request corrections to inaccurate information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Request deletion of your account and data</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Opt out of marketing communications</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Export your data in a portable format</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              We use cookies and similar technologies to enhance your experience on our platform:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Essential cookies for platform functionality</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Analytics cookies to understand user behavior</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Preference cookies to remember your settings</span>
              </li>
            </ul>
            <p className="text-gray-300 text-sm">
              You can manage your cookie preferences through your browser settings.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Account information: Until you delete your account</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Transaction records: 7 years for tax and legal purposes</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Communications: 3 years for support and legal purposes</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              If you have questions about this Privacy Policy or want to exercise your rights, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Email:</strong> privacy@revolutionaryfarmers.com
              </p>
              <p className="text-gray-300">
                <strong>Address:</strong> 123 Farm Street, Agriculture City, AC 12345
              </p>
              <p className="text-gray-300">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. When we do, we will:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Post the updated policy on this page</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Update the &quot;Last updated&quot; date</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Notify you of significant changes via email</span>
              </li>
            </ul>
            <p className="text-gray-300 text-sm">
              Your continued use of our platform after changes are posted constitutes acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white mr-4"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
          <Button 
            variant="outline"
            className="border-white text-white hover:bg-white/10"
            onClick={() => window.location.href = '/terms-of-use'}
          >
            View Terms of Use
          </Button>
        </div>
      </div>
    </Bounded>
  );
}