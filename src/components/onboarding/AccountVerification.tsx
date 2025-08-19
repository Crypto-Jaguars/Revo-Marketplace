'use client';

import React, { useState } from 'react';
import { useOnboardingStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Upload, Shield, User, MapPin, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AccountVerification: React.FC = () => {
  const { nextStep, previousStep, preferences } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    bio: '',
    acceptTerms: false,
    acceptPrivacy: false,
    marketingConsent: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setVerificationError(null);

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always succeed
      nextStep();
    } catch (error) {
      setVerificationError('Verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode', 'country'];
    const hasRequiredFields = requiredFields.every(field => formData[field as keyof typeof formData]);
    const hasAcceptedTerms = formData.acceptTerms && formData.acceptPrivacy;
    
    return hasRequiredFields && hasAcceptedTerms;
  };

  const verificationSteps = [
    {
      title: 'Basic Information',
      description: 'Provide your personal details',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      completed: formData.firstName && formData.lastName && formData.email,
    },
    {
      title: 'Contact Details',
      description: 'Add your phone and address',
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      completed: formData.phone && formData.address && formData.city && formData.state && formData.zipCode,
    },
    {
      title: 'Profile Completion',
      description: 'Tell us about yourself',
      icon: User,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      completed: formData.bio && formData.country,
    },
    {
      title: 'Terms & Privacy',
      description: 'Accept our terms and conditions',
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      completed: formData.acceptTerms && formData.acceptPrivacy,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Complete Your Profile
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Help us verify your account and personalize your experience. This information helps ensure a safe and trusted marketplace.
        </p>
      </div>

      {/* Verification Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {verificationSteps.map((step, index) => (
          <Card key={index} className={`text-center ${step.completed ? 'ring-2 ring-green-500' : ''}`}>
            <CardContent className="pt-6">
              <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                {step.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                )}
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{step.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              {step.completed && (
                <Badge className="mt-2 bg-green-100 text-green-800 text-xs">
                  Complete
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Verification Form */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Please provide accurate information to help us verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Contact Details</h4>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your street address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="ZIP Code"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Profile Information</h4>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio/Description</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us a bit about yourself..."
                rows={3}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Terms and Conditions</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  I accept the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> *
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) => handleInputChange('acceptPrivacy', checked as boolean)}
                />
                <Label htmlFor="acceptPrivacy" className="text-sm">
                  I accept the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> *
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onCheckedChange={(checked) => handleInputChange('marketingConsent', checked as boolean)}
                />
                <Label htmlFor="marketingConsent" className="text-sm">
                  I agree to receive marketing communications (optional)
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {verificationError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{verificationError}</AlertDescription>
        </Alert>
      )}

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900">Your data is secure</h3>
              <p className="text-sm text-blue-800 mt-1">
                We use industry-standard encryption to protect your personal information. Your data is never shared with third parties without your explicit consent.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={previousStep}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid() || isSubmitting}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          {isSubmitting ? 'Verifying...' : 'Complete Verification'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Help Text */}
      <div className="text-center text-sm text-gray-500">
        <p>This information helps us create a safe and trusted marketplace for everyone.</p>
      </div>
    </div>
  );
}; 