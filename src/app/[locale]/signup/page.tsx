'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { usePasskey } from '@/hooks/usePasskey';
import { UserRole } from '@/types/waitlist';
import { getRoleBasedRedirect } from '@/lib/auth-redirects';

const signUpSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: 'Password must contain uppercase, lowercase and numbers.',
    }),
  role: z
    .enum(['consumer', 'farmer', 'investor', 'partner', 'other'])
    .optional()
    .default('consumer'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage({ params }: { params: { locale: string } }) {
  const t = useTranslations('SignUp');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { registerUser, createPasskey, isRegistering, isCreating, error, clearError } =
    usePasskey();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'consumer',
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    try {
      setIsLoading(true);
      clearError();

      // Paso 1: Registrar usuario en localStorage
      const userResult = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      if (!userResult.success) {
        toast({
          title: 'Registration Failed',
          description: userResult.error || 'Failed to create account',
          variant: 'destructive',
        });
        return;
      }

      // Paso 2: Crear passkey y asociarlo con el usuario
      const passkeyResult = await createPasskey({
        name: data.name,
        email: data.email,
        role: data.role,
      });

      if (!passkeyResult.success) {
        toast({
          title: 'Passkey Creation Failed',
          description: passkeyResult.error || 'Failed to create passkey',
          variant: 'destructive',
        });
        return;
      }

      // Éxito completo
      toast({
        title: 'Account Created Successfully!',
        description:
          'Your account has been created with passkey authentication. Welcome to Revo Marketplace!',
      });

      // Redirigir basado en el rol del usuario
      const redirectUrl = getRoleBasedRedirect(data.role, params.locale);
      router.push(redirectUrl);
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Registration Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 p-4 flex items-center md:items-start justify-center pt-8 md:pt-20 md:pr-20">
        <div className="bg-slate-100 p-6 md:p-8 lg:p-16 rounded-2xl">
          <div className="w-40 h-40 md:w-48 md:h-48 lg:w-80 lg:h-80">
            <Image
              src="/logo.svg"
              alt="Revolutionary Farmers Logo"
              className="w-full h-full object-contain"
              width={320}
              height={320}
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center md:items-start justify-center md:justify-start p-4 pt-8 md:pt-20 md:pl-32">
        <div className="w-full max-w-sm">
          <h1 className="text-xl md:text-2xl font-semibold mb-2">{t('title')}</h1>
          <p className="text-gray-600 mb-6">{t('subtitle')}</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-normal">{t('nameLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="!border-0 !border-b !border-gray-300 !rounded-none focus:!border-b-2 focus:!border-green-800 !ring-0 !ring-offset-0 !px-0 focus:!ring-0 focus:!ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-normal">{t('emailLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        disabled={isLoading}
                        className="!border-0 !border-b !border-gray-300 !rounded-none focus:!border-b-2 focus:!border-green-800 !ring-0 !ring-offset-0 !px-0 focus:!ring-0 focus:!ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-normal">
                      {t('passwordLabel')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        disabled={isLoading}
                        className="!border-0 !border-b !border-gray-300 !rounded-none focus:!border-b-2 focus:!border-green-800 !ring-0 !ring-offset-0 !px-0 focus:!ring-0 focus:!ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-normal">Account Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="!border-0 !border-b !border-gray-300 !rounded-none focus:!border-b-2 focus:!border-green-800 !ring-0 !ring-offset-0 !px-0 focus:!ring-0 focus:!ring-offset-0">
                          <SelectValue placeholder="Select your account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="consumer">
                          🛒 Consumer - Purchase fresh products
                        </SelectItem>
                        <SelectItem value="farmer">👨‍🌾 Farmer - Sell your products</SelectItem>
                        <SelectItem value="investor">
                          💰 Investor - Fund agricultural projects
                        </SelectItem>
                        <SelectItem value="partner">🤝 Partner - Business partnerships</SelectItem>
                        <SelectItem value="other">🔧 Other - Other roles</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-green-800 hover:bg-green-700 rounded-full py-6 text-lg"
                disabled={isLoading || isRegistering || isCreating}
              >
                {isLoading || isRegistering || isCreating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isRegistering
                      ? 'Creating Account...'
                      : isCreating
                        ? 'Setting up Passkey...'
                        : 'Processing...'}
                  </div>
                ) : (
                  t('submit')
                )}
              </Button>

              {/* Mostrar errores del passkey si existen */}
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="text-center mt-4">
                <span className="text-gray-600">{t('alreadyHaveAccount')} </span>
                <a href="/login" className="text-green-800 hover:underline font-medium">
                  {t('login')}
                </a>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
