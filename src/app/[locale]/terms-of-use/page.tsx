'use client';

import { useTranslations } from 'next-intl';
import Bounded from '@/components/Bounded';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, FileText, Shield, AlertTriangle } from 'lucide-react';

export default function TermsOfUsePage() {
  const t = useTranslations('Terms');

  const lastUpdated = 'December 15, 2024';

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      content: [
        'By accessing and using Revolutionary Farmers marketplace, you accept and agree to be bound by these Terms of Use',
        'If you do not agree to these terms, please do not use our platform',
        'We reserve the right to modify these terms at any time with notice',
        'Continued use of the platform constitutes acceptance of modified terms'
      ]
    },
    {
      title: 'User Accounts',
      icon: <FileText className="h-5 w-5 text-green-500" />,
      content: [
        'You must be at least 18 years old to create an account',
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You must provide accurate and complete information when creating your account',
        'You are responsible for all activities that occur under your account',
        'You must notify us immediately of any unauthorized use of your account'
      ]
    },
    {
      title: 'Marketplace Rules',
      icon: <Shield className="h-5 w-5 text-purple-500" />,
      content: [
        'All products must be accurately described and legally compliant',
        'Farmers must have proper licenses and certifications to sell their products',
        'Product listings must include accurate pricing, availability, and shipping information',
        'Prohibited items include illegal substances, counterfeit goods, and unsafe products',
        'We reserve the right to remove listings that violate our policies'
      ]
    },
    {
      title: 'Payments and Transactions',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      content: [
        'All transactions are conducted in USDC cryptocurrency through the Stellar blockchain',
        'Payment processing fees may apply as outlined in our fee schedule',
        'Refunds are subject to our refund policy and may require farmer approval',
        'We use escrow services to protect both buyers and sellers',
        'You are responsible for any applicable taxes on your transactions'
      ]
    }
  ];

  return (
    <Bounded>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Use</h1>
          <p className="text-gray-300 text-lg mb-2">
            Please read these terms carefully before using Revolutionary Farmers
          </p>
          <p className="text-gray-400 text-sm">
            Last updated: {lastUpdated}
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Scale className="h-6 w-6 text-green-500 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Welcome to Revolutionary Farmers</h2>
                <p className="text-gray-300 leading-relaxed">
                  These Terms of Use govern your use of the Revolutionary Farmers marketplace platform. 
                  By using our services, you agree to comply with these terms and all applicable laws and regulations.
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
            <CardTitle className="text-white">Prohibited Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              You agree not to engage in any of the following activities:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Violating any applicable laws or regulations</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Posting false, misleading, or deceptive information</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Interfering with or disrupting the platform&apos;s operation</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Attempting to gain unauthorized access to user accounts</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Uploading viruses, malware, or other harmful content</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-300">Harassing, threatening, or intimidating other users</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300">
                Revolutionary Farmers and its licensors own all intellectual property rights in the platform, including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Software, source code, and technical systems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Trademarks, logos, and brand materials</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Content, design, and user interface</span>
                </li>
              </ul>
              <p className="text-gray-300 text-sm">
                You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Disclaimer of Warranties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300">
                Revolutionary Farmers is provided &quot;as is&quot; without warranties of any kind. We disclaim all warranties, including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Merchantability and fitness for a particular purpose</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Uninterrupted or error-free operation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Accuracy or completeness of information</span>
                </li>
              </ul>
              <p className="text-gray-300 text-sm">
                Use of the platform is at your own risk. We are not responsible for the quality, safety, or legality of products sold by farmers.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300">
                To the maximum extent permitted by law, Revolutionary Farmers shall not be liable for:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Indirect, incidental, or consequential damages</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Loss of profits, data, or business opportunities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Damages resulting from third-party actions</span>
                </li>
              </ul>
              <p className="text-gray-300 text-sm">
                Our total liability for any claim shall not exceed the amount you paid to us in the 12 months prior to the claim.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300">
                We may terminate or suspend your account at any time for:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Violation of these Terms of Use</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Fraudulent or illegal activities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Extended periods of inactivity</span>
                </li>
              </ul>
              <p className="text-gray-300 text-sm">
                Upon termination, your right to use the platform ceases immediately. Some provisions of these terms survive termination.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              These Terms of Use are governed by and construed in accordance with the laws of the State of California, 
              without regard to its conflict of law provisions.
            </p>
            <p className="text-gray-300 text-sm">
              Any disputes arising from these terms shall be resolved through binding arbitration in accordance with 
              the Commercial Arbitration Rules of the American Arbitration Association.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-8 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              If you have questions about these Terms of Use, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                <strong>Email:</strong> legal@revolutionaryfarmers.com
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
            onClick={() => window.location.href = '/privacy-policy'}
          >
            View Privacy Policy
          </Button>
        </div>
      </div>
    </Bounded>
  );
}