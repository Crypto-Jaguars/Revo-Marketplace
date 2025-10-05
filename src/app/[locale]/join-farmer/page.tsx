'use client';

import Bounded from '@/components/Bounded';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Leaf, Shield, Users, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';
import { toast } from 'sonner';
import LoadingJoinFarmer from './loading';

export default function JoinFarmerPage() {
  const t = useTranslations('JoinFarmer');
  const breadcrumb = useTranslations('common.breadcrumb');
  const router = useRouter();
  const params = useParams() as Record<string, string> | undefined;
  const locale = (params && params.locale) || 'en';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    farmName: '',
    farmLocation: '',
    farmSize: '',
    farmingMethod: '',
    products: [] as string[],
    description: '',
    agreedToTerms: false,
  });

  const products = [
    'Arroz',
    'Maíz',
    'Frijoles',
    'Quinoa',
    'Banano',
    'Mango',
    'Piña',
    'Fresas',
    'Tomate',
    'Lechuga',
    'Brócoli',
    'Zanahoria',
    'Café Arábica',
    'Café Robusta',
    'Albahaca',
    'Orégano',
    'Cilantro',
    'Oliva',
    'Coco',
    'Aguacate',
    'Miel de Flores',
    'Miel Orgánica',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      toast.error('Debe aceptar los Términos de Servicio y la Política de Privacidad.');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Application submitted successfully!');
      router.push('/');
    } catch (error) {
      toast.error('There was an error submitting your application.');
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
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-gray-300 text-lg">{t('subtitle')}</p>
        </div>

        <div className="w-full mb-8">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-md px-4 py-3">
            <div className="flex items-center text-sm text-gray-700 flex-wrap gap-2">
              <Link
                href={`/${locale}/`}
                className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7035] rounded"
                aria-label={breadcrumb('home')}
              >
                <ArrowLeft className="w-4 h-4 mr-2 text-[#2a7035]" />
                <span className="font-medium text-[#2a7035] group-hover:underline">
                  {breadcrumb('home')}
                </span>
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium" aria-current="page">
                {t('title')}
              </span>
            </div>
          </div>
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

        <Suspense fallback={<LoadingJoinFarmer />}>
          <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl mb-16">
            <div className="text-center pt-8 pb-4">
              <h1 className="text-2xl font-bold text-gray-800">Farmer Application</h1>
            </div>
            <CardContent className="p-8 pt-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      className="border-gray-300 text-gray-800"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Tu apellido"
                      className="border-gray-300 text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      className="border-gray-300 text-gray-800"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+506 1234 5678"
                      className="border-gray-300 text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="farmName" className="text-sm font-semibold text-gray-700">
                    Farm Name *
                  </Label>
                  <Input
                    id="farmName"
                    name="farmName"
                    required
                    value={formData.farmName}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu finca o negocio agrícola"
                    className="border-gray-300 text-gray-800"
                  />
                </div>

                <div>
                  <Label htmlFor="farmLocation" className="text-sm font-semibold text-gray-700">
                    Farm Location *
                  </Label>
                  <Input
                    id="farmLocation"
                    name="farmLocation"
                    required
                    value={formData.farmLocation}
                    onChange={handleInputChange}
                    placeholder="Provincia, cantón, distrito"
                    className="border-gray-300 text-gray-800"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="farmSize" className="text-sm font-semibold text-gray-700">
                      Farm Size
                    </Label>
                    <Select
                      value={formData.farmSize}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, farmSize: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-300 text-gray-800">
                        <SelectValue placeholder="Select farm size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (0-5 hectares)</SelectItem>
                        <SelectItem value="medium">Medium (5-20 hectares)</SelectItem>
                        <SelectItem value="large">Large (20+ hectares)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="farmingMethod" className="text-sm font-semibold text-gray-700">
                      Farming Method
                    </Label>
                    <Select
                      value={formData.farmingMethod}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, farmingMethod: value }))
                      }
                    >
                      <SelectTrigger className="border-gray-300 text-gray-800">
                        <SelectValue placeholder="Select farming method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="conventional">Conventional</SelectItem>
                        <SelectItem value="sustainable">Sustainable</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Products You Grow *
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {products.map((product) => (
                      <div
                        key={product}
                        className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all"
                      >
                        <Checkbox
                          id={product}
                          checked={formData.products.includes(product)}
                          onCheckedChange={() => handleProductChange(product)}
                          className="w-4 h-4 rounded text-green-600 border-gray-400 focus:ring-green-500"
                        />
                        <Label
                          htmlFor={product}
                          className="text-sm text-gray-700 cursor-pointer select-none"
                        >
                          {product}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                    Tell us about your farm
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Describe your experience, farming methods, certifications, and any additional information you consider important..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border-gray-300 text-gray-800"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onCheckedChange={(checked: boolean) =>
                      setFormData((prev) => ({ ...prev, agreedToTerms: checked }))
                    }
                    className="border-gray-400 text-green-600 focus:ring-green-500"
                  />
                  <Label htmlFor="agreedToTerms" className="text-sm text-gray-700">
                    I accept the{' '}
                    <a href="/terms-of-use" className="text-green-600 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy-policy" className="text-green-600 hover:underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mt-4"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Suspense>
      </div>
    </Bounded>
  );
}
