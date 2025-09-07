'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface WaitlistCompactProps {
  className?: string;
  buttonText?: string;
}

export function WaitlistCompact({ className, buttonText }: WaitlistCompactProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('Waitlist');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          consent: true,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast({
            title: 'Already registered',
            description: 'This email is already on the waitlist',
            variant: 'destructive',
          });
        } else {
          throw new Error(result.message);
        }
        return;
      }

      setIsSuccess(true);
      setEmail('');
      toast({
        title: 'Success!',
        description: 'You have been added to the waitlist',
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to join waitlist. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      <Input
        type="email"
        placeholder={t('fields.email.placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting || isSuccess}
        className="flex-1"
      />
      <Button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className={cn(
          'min-w-[120px]',
          isSuccess && 'bg-green-600 hover:bg-green-700'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('submitting')}
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Added!
          </>
        ) : (
          buttonText || t('submit')
        )}
      </Button>
    </form>
  );
}