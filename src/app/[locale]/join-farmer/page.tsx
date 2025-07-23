'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Bounded from '@/components/Bounded';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Leaf, Users, Shield, Zap } from 'lucide-react';

export default function JoinFarmerPage() {
  const t = useTranslations('JoinFarmer');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    farmName: '',
    farmAddress: '',
    farmSize: '',
    farmingMethod: '',
    mainCrops: '',
    description: '',
    agreedToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Application submitted successfully! We will contact you soon.');
      router.push('/');
    } catch (error) {
      toast.error('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      title: 'Direct Sales',
      description: 'Sell directly to consumers without intermediaries',
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Growing Community',
      description: 'Join a network of sustainable farmers',
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: 'Secure Payments',
      description: 'Guaranteed payments through blockchain technology',
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Easy Management',
      description: 'Simple tools to manage your listings and orders',
    },
  ];

  return (
    <Bounded>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Join Revolutionary Farmers</h1>
          <p className="text-gray-300 text-lg">
            Become part of the future of agriculture. Connect directly with consumers and grow your
            business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Farmer Application</CardTitle>
            <CardDescription className="text-gray-300">
              Fill out this form to start your journey with Revolutionary Farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-white">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="farmName" className="text-white">
                  Farm Name *
                </Label>
                <Input
                  id="farmName"
                  name="farmName"
                  required
                  value={formData.farmName}
                  onChange={handleInputChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="farmAddress" className="text-white">
                  Farm Address *
                </Label>
                <Input
                  id="farmAddress"
                  name="farmAddress"
                  required
                  value={formData.farmAddress}
                  onChange={handleInputChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="farmSize" className="text-white">
                    Farm Size (acres)
                  </Label>
                  <Input
                    id="farmSize"
                    name="farmSize"
                    type="number"
                    value={formData.farmSize}
                    onChange={handleInputChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="farmingMethod" className="text-white">
                    Farming Method
                  </Label>
                  <Input
                    id="farmingMethod"
                    name="farmingMethod"
                    placeholder="e.g., Organic, Conventional, Sustainable"
                    value={formData.farmingMethod}
                    onChange={handleInputChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mainCrops" className="text-white">
                  Main Crops
                </Label>
                <Input
                  id="mainCrops"
                  name="mainCrops"
                  placeholder="e.g., Tomatoes, Lettuce, Carrots"
                  value={formData.mainCrops}
                  onChange={handleInputChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Tell us about your farm
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Share your farming philosophy, experience, and what makes your farm special..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, agreedToTerms: checked as boolean }))
                  }
                />
                <Label htmlFor="agreedToTerms" className="text-white text-sm">
                  I agree to the{' '}
                  <a href="/terms-of-use" className="text-blue-400 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy-policy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
}
