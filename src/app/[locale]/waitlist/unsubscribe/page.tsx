'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useLanguageStore } from '@/store';

export default function UnsubscribePage() {
  const t = useTranslations('Unsubscribe');
  const searchParams = useSearchParams();
  const { language } = useLanguageStore();
  
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const emailParam = searchParams?.get('email');
  const tokenParam = searchParams?.get('token');
  const errorParam = searchParams?.get('error');

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
    if (errorParam === 'invalid_token') {
      setError(t('errors.invalidToken'));
    }
  }, [emailParam, errorParam, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('errors.invalidEmail'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          token: tokenParam,
          reason,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || t('errors.generic'));
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      setError(t('errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-surface-0 to-brand-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-revolutionary_green" />
          </div>
          <h1 className="text-2xl font-semibold text-forest-900 mb-2">
            {t('success.title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('success.message')}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            {t('success.resubscribe')}
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href={`/${language}`}>
                {t('success.backToHome')}
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/${language}/waitlist`}>
                {t('success.rejoin')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-0 to-brand-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-forest-900" />
          <h1 className="text-2xl font-semibold text-forest-900">
            {t('title')}
          </h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          {t('description')}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-forest-900">
              {t('fields.email.label')}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('fields.email.placeholder')}
              disabled={!!emailParam && !!tokenParam}
              className="mt-1"
              required
            />
            {emailParam && tokenParam && (
              <p className="text-xs text-gray-500 mt-1">
                {t('fields.email.verified')}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="reason" className="text-forest-900">
              {t('fields.reason.label')}
              <span className="text-gray-400 text-sm ml-1">{t('optional')}</span>
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t('fields.reason.placeholder')}
              rows={3}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('fields.reason.help')}
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full',
                'bg-gradient-to-r from-red-500 to-red-600',
                'hover:from-red-600 hover:to-red-700',
                'text-white font-medium',
                'shadow-md hover:shadow-lg',
                'transition-all duration-200'
              )}
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => window.history.back()}
            >
              {t('cancel')}
            </Button>
          </div>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          {t('privacy')}
        </p>
      </div>
    </div>
  );
}