'use client';

import Bounded from '@/components/Bounded';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Leaf, Shield, Users, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

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
      toast.error(t('application.termsError'));
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(t('application.success'));
      router.push('/');
    } catch (error) {
      toast.error(t('application.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      title: t('benefits.directSales.title'),
      description: t('benefits.directSales.description'),
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: t('benefits.growingCommunity.title'),
      description: t('benefits.growingCommunity.description'),
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: t('benefits.securePayments.title'),
      description: t('benefits.securePayments.description'),
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: t('benefits.easyManagement.title'),
      description: t('benefits.easyManagement.description'),
    },
  ];

  return (
    <Bounded>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-gray-300 text-lg">{t('subtitle')}</p>
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
            <CardTitle className="text-2xl text-white">{t('application.title')}</CardTitle>
            <CardDescription className="text-gray-300">{t('application.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">
                    {t('application.fields.firstName')} *
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
                    {t('application.fields.lastName')} *
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
                    {t('application.fields.email')} *
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
                    {t('application.fields.phone')} *
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
                  {t('application.fields.farmName')} *
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
                  {t('application.fields.farmAddress')} *
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
                    {t('application.fields.farmSize')}
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
                    {t('application.fields.farmingMethod')}
                  </Label>
                  <Input
                    id="farmingMethod"
                    name="farmingMethod"
                    placeholder={t('application.placeholders.farmingMethod')}
                    value={formData.farmingMethod}
                    onChange={handleInputChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mainCrops" className="text-white">
                  {t('application.fields.mainCrops')}
                </Label>
                <Input
                  id="mainCrops"
                  name="mainCrops"
                  placeholder={t('application.placeholders.mainCrops')}
                  value={formData.mainCrops}
                  onChange={handleInputChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  {t('application.fields.description')}
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder={t('application.placeholders.description')}
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
                  {t('application.terms.agree')}{' '}
                  <a href="/terms-of-use" className="text-blue-400 hover:underline">
                    {t('application.terms.termsOfService')}
                  </a>{' '}
                  {t('application.terms.and')}{' '}
                  <a href="/privacy-policy" className="text-blue-400 hover:underline">
                    {t('application.terms.privacyPolicy')}
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
              >
                {isSubmitting ? t('application.submitting') : t('application.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
}
