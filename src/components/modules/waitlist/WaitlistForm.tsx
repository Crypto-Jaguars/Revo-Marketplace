'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useWaitlistForm } from './hooks/useWaitlistForm';
import { useTranslations } from 'next-intl';
import { Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { cn, generateId } from '@/lib/utils';
import { SocialShareButtons } from './SocialShareButtons';

interface WaitlistFormProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function WaitlistForm({ className, variant = 'default' }: WaitlistFormProps) {
  const { form, onSubmit, isSubmitting, isSuccess, submittedEmail, resetSuccess } = useWaitlistForm();
  const t = useTranslations('Waitlist');

  const trackFormStart = async () => {
    const tracked = sessionStorage.getItem('form-start-tracked');
    if (tracked) return;

    try {
      const sessionId = sessionStorage.getItem('analytics-session') || generateId();
      sessionStorage.setItem('analytics-session', sessionId);
      sessionStorage.setItem('form-start-tracked', 'true');

      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'form_start',
          source: document.referrer || 'direct',
          page: window.location.pathname,
          sessionId,
        }),
      });
    } catch (error) {
      console.log('Tracking failed:', error);
    }
  };

  if (isSuccess && variant === 'default') {
    return (
      <div className={cn(
        'w-full max-w-md mx-auto p-6 sm:p-8 rounded-lg shadow-lg',
        'bg-surface-0 border border-brand-200/60',
        className
      )}>
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-revolutionary_green" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-forest-900">{t('success.title')}</h3>
          <p className="text-sm sm:text-base text-gray-600">{t('success.message')}</p>
          <p className="text-xs sm:text-sm text-gray-500">{t('success.emailSent', { email: submittedEmail })}</p>
          
          <div className="w-full pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-700 mb-4">{t('success.sharePrompt')}</p>
            <SocialShareButtons />
          </div>
          
          <Button
            variant="outline"
            onClick={resetSuccess}
            className="mt-4 h-10 sm:h-11 text-sm sm:text-base"
          >
            {t('success.addAnother')}
          </Button>
        </div>
      </div>
    );
  }

  const roleOptions = [
    { value: 'farmer', label: t('roles.farmer') },
    { value: 'investor', label: t('roles.investor') },
    { value: 'consumer', label: t('roles.consumer') },
    { value: 'partner', label: t('roles.partner') },
    { value: 'other', label: t('roles.other') },
  ];

  return (
    <div className={cn(
      'w-full max-w-md mx-auto p-6 sm:p-8 rounded-lg shadow-lg',
      'bg-surface-0 border border-brand-200/60',
      variant === 'compact' && 'p-4 sm:p-6',
      className
    )}>
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-revolutionary_green" />
          <h2 className="text-xl sm:text-2xl font-semibold text-forest-900">{t('title')}</h2>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">{t('subtitle')}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-forest-900">
                  {t('fields.name.label')}
                  <span className="text-gray-400 text-xs ml-1">{t('optional')}</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('fields.name.placeholder')}
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-200 h-11 sm:h-12 text-base"
                    onFocus={trackFormStart}
                    {...field}
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
                <FormLabel className="text-forest-900">
                  {t('fields.email.label')}
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('fields.email.placeholder')}
                    className="border-gray-300 focus:border-brand-500 focus:ring-brand-200 h-11 sm:h-12 text-base"
                    onFocus={trackFormStart}
                    {...field}
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
                <FormLabel className="text-forest-900">
                  {t('fields.role.label')}
                  <span className="text-gray-400 text-xs ml-1">{t('optional')}</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger 
                      className="bg-surface-0 border-gray-300 text-forest-900 h-11 sm:h-12 text-base"
                      onFocus={trackFormStart}
                    >
                      <SelectValue placeholder={t('fields.role.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1 w-5 h-5"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm sm:text-base text-forest-900 font-normal">
                    {t('fields.consent.label')}
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-xs sm:text-sm text-gray-500">
                    {t('fields.consent.description')}
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full h-11 sm:h-12 text-base sm:text-lg',
              'bg-gradient-to-r from-brand-400 to-brand-600',
              'hover:from-brand-500 hover:to-brand-700',
              'text-white font-medium',
              'shadow-md hover:shadow-lg',
              'transition-all duration-200'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('submitting')}
              </>
            ) : (
              t('submit')
            )}
          </Button>

          <p className="text-xs sm:text-sm text-center text-gray-500">
            {t('privacy')}
          </p>
        </form>
      </Form>
    </div>
  );
}