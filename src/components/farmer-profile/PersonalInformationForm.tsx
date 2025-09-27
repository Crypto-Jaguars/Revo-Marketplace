"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { User, Mail, Phone, Save } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Schema factory for personal information validation with localized messages
const createPersonalInfoSchema = (t: (key: string) => string) => z.object({
  name: z
    .string()
    .min(2, t('validation.nameMin'))
    .max(50, t('validation.nameMax')),
  surname: z
    .string()
    .min(2, t('validation.surnameMin'))
    .max(50, t('validation.surnameMax')),
  email: z
    .string()
    .email(t('validation.emailInvalid')),
  phone: z
    .string()
    .min(7, t('validation.phoneMin'))
    .max(20, t('validation.phoneMax'))
    .regex(/^[+]?[0-9\s\-()]+$/, t('validation.phoneFormat')),
});

type PersonalInfoFormData = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};

interface PersonalInformationFormProps {
  initialData?: Partial<PersonalInfoFormData>;
  onSubmit?: (data: PersonalInfoFormData) => void;
  isOwner?: boolean;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  initialData = {},
  onSubmit,
  isOwner = false,
}) => {
  const t = useTranslations('farmerProfile.personalInfo');
  
  // Create schema with localized messages
  const personalInfoSchema = createPersonalInfoSchema(t);

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: initialData.name || '',
      surname: initialData.surname || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
    },
  });

  // Reset form when initialData changes
  React.useEffect(() => {
    form.reset({
      name: initialData.name ?? '',
      surname: initialData.surname ?? '',
      email: initialData.email ?? '',
      phone: initialData.phone ?? '',
    });
  }, [initialData, form]);

  const handleSubmit = (data: PersonalInfoFormData) => {
    console.log('Personal information submitted:', data);
    onSubmit?.(data);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <User className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {t('title')}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t('name')} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('namePlaceholder')}
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      disabled={!isOwner}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Surname Field */}
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t('surname')} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('surnamePlaceholder')}
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      disabled={!isOwner}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('email')} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t('emailPlaceholder')}
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      disabled={!isOwner}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t('phone')} <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder={t('phonePlaceholder')}
                      className="rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                      disabled={!isOwner}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          {isOwner && (
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                disabled={form.formState.isSubmitting}
              >
                <Save className="w-4 h-4" />
                {form.formState.isSubmitting ? t('saving') : t('save')}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </section>
  );
};

export default PersonalInformationForm;
