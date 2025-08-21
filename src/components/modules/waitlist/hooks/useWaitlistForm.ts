'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { waitlistFormSchema, type WaitlistFormValues } from '../schema';
import type { WaitlistResponse } from '@/types/waitlist';
import { useToast } from '@/hooks/use-toast';
import { generateId } from '@/lib/utils';

export function useWaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const { toast } = useToast();

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: undefined,
      consent: false,
    },
  });

  const trackAnalyticsEvent = async (type: string) => {
    try {
      const sessionId = sessionStorage.getItem('analytics-session') || generateId();
      sessionStorage.setItem('analytics-session', sessionId);

      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          source: document.referrer || 'direct',
          page: window.location.pathname,
          sessionId,
        }),
      });
    } catch (error) {
      console.log('Analytics error:', error);
    }
  };

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);
    
    trackAnalyticsEvent('form_submit');
    
    try {
      const params = new URLSearchParams(window.location.search);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      
      const response = await fetch(`/api/waitlist${queryString}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        trackAnalyticsEvent('form_error');
        
        if (response.status === 429) {
          toast({
            title: 'Too many attempts',
            description: 'Please wait a while before trying again.',
            variant: 'destructive',
          });
        } else if (response.status === 409) {
          form.setError('email', {
            type: 'manual',
            message: 'This email is already registered',
          });
        } else {
          toast({
            title: 'Error',
            description: result.message || 'Something went wrong',
            variant: 'destructive',
          });
        }
        return;
      }

      trackAnalyticsEvent('form_success');

      setSubmittedEmail(data.email);
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: 'Success!',
        description: 'Added to waitlist. Check your email.',
      });

      // Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag('event', 'waitlist_signup', {
          event_category: 'engagement',
          event_label: data.role || 'no_role',
          value: 1,
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      trackAnalyticsEvent('form_error');
      toast({
        title: 'Error',
        description: 'Failed to submit. Try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSuccess = () => {
    setIsSuccess(false);
    setSubmittedEmail('');
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    isSuccess,
    submittedEmail,
    resetSuccess,
  };
}