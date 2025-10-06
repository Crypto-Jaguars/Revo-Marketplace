'use client';

import type React from 'react';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon, User, TractorIcon as Farm } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function ProfileForm() {
  const t = useTranslations('ProfileForm');
  
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Farm Lane',
    city: 'Ruralville',
    state: 'CA',
    zip: '90210',
    country: 'USA',
    farmName: 'Green Acres Farm',
    farmSize: '100 acres',
    farmType: 'Organic Vegetables',
    establishedDate: new Date('2000-01-01'),
    website: 'https://www.greenacresfarm.com',
    bio: 'Passionate organic farmer dedicated to sustainable practices.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setProfile((prev) => ({ ...prev, establishedDate: date }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the profile data to a backend API
    console.log('Profile updated:', profile);
    toast.success(t('toast.success'));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#375B42]">
              <User className="h-5 w-5" /> {t('personalInfo.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">{t('personalInfo.firstName')}</Label>
                <Input id="firstName" value={profile.firstName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="lastName">{t('personalInfo.lastName')}</Label>
                <Input id="lastName" value={profile.lastName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">{t('personalInfo.email')}</Label>
                <Input id="email" type="email" value={profile.email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="phone">{t('personalInfo.phone')}</Label>
                <Input id="phone" type="tel" value={profile.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="address">{t('personalInfo.address')}</Label>
                <Input id="address" value={profile.address} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="city">{t('personalInfo.city')}</Label>
                <Input id="city" value={profile.city} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="state">{t('personalInfo.state')}</Label>
                <Input id="state" value={profile.state} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="zip">{t('personalInfo.zip')}</Label>
                <Input id="zip" value={profile.zip} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="country">{t('personalInfo.country')}</Label>
              <Input id="country" value={profile.country} onChange={handleChange} />
            </div>
          </div>

          {/* Farm Information */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#375B42]">
              <Farm className="h-5 w-5" /> {t('farmInfo.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmName">{t('farmInfo.farmName')}</Label>
                <Input id="farmName" value={profile.farmName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="farmSize">{t('farmInfo.farmSize')}</Label>
                <Input id="farmSize" value={profile.farmSize} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="farmType">{t('farmInfo.farmType')}</Label>
                <Select
                  value={profile.farmType}
                  onValueChange={(value) => handleSelectChange('farmType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('farmInfo.farmTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Organic Vegetables">{t('farmInfo.farmTypes.Organic Vegetables')}</SelectItem>
                    <SelectItem value="Dairy Farm">{t('farmInfo.farmTypes.Dairy Farm')}</SelectItem>
                    <SelectItem value="Grain Crops">{t('farmInfo.farmTypes.Grain Crops')}</SelectItem>
                    <SelectItem value="Fruit Orchard">{t('farmInfo.farmTypes.Fruit Orchard')}</SelectItem>
                    <SelectItem value="Livestock">{t('farmInfo.farmTypes.Livestock')}</SelectItem>
                    <SelectItem value="Mixed Farming">{t('farmInfo.farmTypes.Mixed Farming')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="establishedDate">{t('farmInfo.establishedDate')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !profile.establishedDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {profile.establishedDate ? (
                        format(profile.establishedDate, 'PPP')
                      ) : (
                        <span>{t('farmInfo.datePlaceholder')}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={profile.establishedDate}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <Label htmlFor="website">{t('farmInfo.website')}</Label>
              <Input id="website" type="url" value={profile.website} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="bio">{t('farmInfo.bio')}</Label>
              <Textarea id="bio" value={profile.bio} onChange={handleChange} rows={4} />
            </div>
          </div>

          <Button type="submit" className="bg-[#375B42] hover:bg-[#2A4632] text-white">
            {t('saveButton')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
