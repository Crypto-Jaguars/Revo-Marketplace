'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useWallet } from '@/wallet/hooks/useWallet.hook';
import { useWalletStore } from '@/store';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const t = useTranslations('Account');
  const { connectWallet, disconnectWallet } = useWallet();
  const { address, name } = useWalletStore();

  const profileSchema = z
    .object({
      firstName: z
        .string()
        .min(2, {
          message: t('validation.firstName.min'),
        })
        .max(50, {
          message: t('validation.firstName.max'),
        }),
      lastName: z
        .string()
        .min(2, {
          message: t('validation.lastName.min'),
        })
        .max(50, {
          message: t('validation.lastName.max'),
        }),
      email: z.string().email({
        message: t('validation.email'),
      }),
      address: z
        .string()
        .min(5, {
          message: t('validation.address.min'),
        })
        .max(200, {
          message: t('validation.address.max'),
        }),
      currentPassword: z.string().optional(),
      newPassword: z
        .string()
        .regex(PASSWORD_REGEX, {
          message: t('validation.password.requirements'),
        })
        .optional(),
      confirmNewPassword: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.newPassword || data.confirmNewPassword) {
          if (!data.currentPassword) {
            return false;
          }
          return data.newPassword === data.confirmNewPassword;
        }
        return true;
      },
      {
        message: t('validation.password.match'),
        path: ['confirmNewPassword'],
      }
    );

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onChange',
  });

  const handleWalletConnection = async () => {
    try {
      setWalletLoading(true);
      if (address) {
        await disconnectWallet();
      } else {
        await connectWallet();
      }
    } catch (error) {
      console.error('Error managing wallet connection:', error);
    } finally {
      setWalletLoading(false);
    }
  };

  async function onSubmit(data: z.infer<typeof profileSchema>) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 border p-3 border-gray-200 rounded-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">{t('labels.firstName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="mt-1 h-10 bg-gray-50 border border-gray-200 rounded-md"
                      placeholder={t('placeholders.firstName')}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">{t('labels.lastName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="mt-1 h-10 bg-gray-50 border border-gray-200 rounded-md"
                      placeholder={t('placeholders.lastName')}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-600">{t('labels.stellarWallet')}</label>
            <div className="mt-2 space-y-2">
              <Button
                type="button"
                data-testid="wallet-button"
                variant={address ? 'destructive' : 'outline'}
                onClick={handleWalletConnection}
                disabled={walletLoading}
                className={`h-10 px-4 ${
                  address
                    ? 'bg-[#375B42] hover:bg-[#2A4632] !text-white'
                    : 'border border-gray-200 hover:bg-gray-50'
                } rounded-md transition-colors`}
              >
                {walletLoading
                  ? t('wallet.processing')
                  : address
                    ? t('wallet.disconnect')
                    : t('wallet.connect')}
              </Button>

              {address && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{t('wallet.connected')}</p>
                  <p className="text-sm font-medium break-all">{address}</p>
                  {name && (
                    <p className="text-sm text-gray-500">
                      {t('wallet.via')} {name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600">{t('labels.email')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="mt-1 h-10 bg-gray-50 border border-gray-200 rounded-md"
                        placeholder={t('placeholders.email')}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600">{t('labels.address')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="mt-1 h-10 bg-gray-50 border border-gray-200 rounded-md"
                        placeholder={t('placeholders.address')}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-medium">{t('labels.passwordChanges')}</h3>

          <div>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">
                    {t('labels.currentPassword')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="mt-1 h-10 bg-gray-50 border border-gray-200 rounded-md w-full"
                      placeholder={t('placeholders.currentPassword')}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">{t('labels.newPassword')}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="mt-1 h-10 bg-gray-50 border border-gray-200 rounded-md w-full"
                      placeholder={t('placeholders.newPassword')}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">
                    {t('labels.confirmPassword')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="mt-1 h-10 bg-gray-50 border border-gray-200 rounded-md w-full"
                      placeholder={t('placeholders.confirmPassword')}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            variant="ghost"
            onClick={() => form.reset()}
            disabled={isLoading}
            className="px-6 py-2 text-sm"
          >
            {t('buttons.cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 text-sm bg-[#375B42] hover:bg-[#2A4632] !text-white rounded-md"
          >
            {isLoading ? t('buttons.saving') : t('buttons.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
