"use client";

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { basicInfoSchema, farmDetailsSchema, accountSetupSchema, farmerSubscriptionSchema, type FarmerSubscriptionData } from './schema';
import { useFarmerSubscriptionStore } from '@/store/slices/farmerSubscription';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

type FormValues = FarmerSubscriptionData;

interface FarmerSubscriptionFormProps {
  onSuccess?: () => void;
}

const stepSchemas = [basicInfoSchema, farmDetailsSchema, accountSetupSchema] as const;

export default function FarmerSubscriptionForm({ onSuccess }: FarmerSubscriptionFormProps) {
  const t = useTranslations('FarmerSubscription');
  const [isPending, startTransition] = useTransition();
  const { currentStep, data, setStep, nextStep, prevStep, updateData, setSaving, markSaved, reset } = useFarmerSubscriptionStore();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(farmerSubscriptionSchema),
    defaultValues: data as FormValues,
    mode: 'onChange',
  });

  // Sync form values to store for auto-save with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const subscription = form.watch((values) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (values && Object.keys(values).length > 0) {
          updateData(values as Partial<FormValues>);
          setSaving(true);
          setTimeout(() => {
            markSaved();
            setSaving(false);
          }, 300);
        }
      }, 500); // Debounce for 500ms
    });
    
    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [form, updateData, markSaved, setSaving]);

  useEffect(() => {
    form.reset(data as FormValues);
  }, [data]);

  const progress = useMemo(() => (currentStep / 3) * 100, [currentStep]);

  const handleNext = async () => {
    try {
      const schema = stepSchemas[currentStep - 1];
      const values = form.getValues();
      const currentData = { ...values } as unknown as Record<string, unknown>;
      const parsed = schema.parse(currentStep === 2 ? { ...currentData } : currentData);
      if (parsed) nextStep();
    } catch (err) {
      const zerr = err as z.ZodError;
      zerr.issues.forEach((issue) => toast.error(issue.message));
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      try {
        // honeypot must be empty
        if (values.website && values.website.trim().length > 0) {
          toast.error(t('errors.spamDetected'));
          return;
        }
        const res = await fetch('/api/farmers/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || 'Request failed');
        }
        setSubmitted(true);
        toast.success(t('success.title'));
        reset();
        onSuccess?.();
      } catch (e) {
        toast.error(t('errors.submitFailed'));
      }
    });
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{t('success.title')}</h3>
        <p className="text-sm text-muted-foreground">{t('success.message')}</p>
        <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">{t('success.nextSteps')}</div>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
             <Progress value={progress} className="h-2 [&>div]:bg-[#375B42]" />

      {currentStep === 1 && (
        <div className="space-y-4">
                     <div>
             <Label htmlFor="fullName">{t('fields.fullName')}</Label>
             <Input 
               id="fullName" 
               {...form.register('fullName')} 
               placeholder={t('placeholders.fullName')}
               className="focus:ring-[#375B42] focus:border-[#375B42]"
             />
           </div>
           <div>
             <Label htmlFor="email">{t('fields.email')}</Label>
             <Input 
               id="email" 
               type="email" 
               {...form.register('email')} 
               placeholder={t('placeholders.email')}
               className="focus:ring-[#375B42] focus:border-[#375B42]"
             />
           </div>
           <div>
             <Label htmlFor="phone">{t('fields.phone')}</Label>
             <Input 
               id="phone" 
               type="tel" 
               {...form.register('phone')} 
               placeholder={t('placeholders.phone')}
               className="focus:ring-[#375B42] focus:border-[#375B42]"
             />
           </div>
           <div>
             <Label htmlFor="farmName">{t('fields.farmName')}</Label>
             <Input 
               id="farmName" 
               {...form.register('farmName')} 
               placeholder={t('placeholders.farmName')}
               className="focus:ring-[#375B42] focus:border-[#375B42]"
             />
           </div>
          {/* Honeypot field (hidden) */}
          <input aria-hidden="true" tabIndex={-1} className="hidden" {...form.register('website')} />
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
             <div>
               <Label htmlFor="location.city">{t('fields.city')}</Label>
               <Input 
                 id="location.city" 
                 {...form.register('location.city')} 
                 placeholder={t('placeholders.city')}
                 className="focus:ring-[#375B42] focus:border-[#375B42]"
               />
             </div>
             <div>
               <Label htmlFor="location.state">{t('fields.state')}</Label>
               <Input 
                 id="location.state" 
                 {...form.register('location.state')} 
                 placeholder={t('placeholders.state')}
                 className="focus:ring-[#375B42] focus:border-[#375B42]"
               />
             </div>
             <div>
               <Label htmlFor="location.country">{t('fields.country')}</Label>
               <Input 
                 id="location.country" 
                 {...form.register('location.country')} 
                 placeholder={t('placeholders.country')}
                 className="focus:ring-[#375B42] focus:border-[#375B42]"
               />
             </div>
           </div>

          <div>
            <Label>{t('fields.productTypes')}</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {['vegetables', 'fruits', 'grains', 'dairy', 'meat', 'herbs'].map((type) => (
                <label key={type} className="flex items-center space-x-2 text-sm">
                                   <Checkbox
                   checked={form.getValues('productTypes')?.includes(type)}
                   onCheckedChange={(checked) => {
                     const list = new Set(form.getValues('productTypes'));
                     if (checked) list.add(type);
                     else list.delete(type);
                     form.setValue('productTypes', Array.from(list));
                   }}
                   className="data-[state=checked]:bg-[#375B42] data-[state=checked]:border-[#375B42]"
                 />
                  <span className="capitalize">{t(`productTypes.${type}`)}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label>{t('fields.farmingMethod')}</Label>
                         <Select
               value={form.getValues('farmingMethod')}
               onValueChange={(val) => form.setValue('farmingMethod', val as FormValues['farmingMethod'])}
             >
               <SelectTrigger className="focus:ring-[#375B42] focus:border-[#375B42]">
                 <SelectValue placeholder={t('placeholders.farmingMethod')} />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="organic">{t('farmingMethods.organic')}</SelectItem>
                 <SelectItem value="conventional">{t('farmingMethods.conventional')}</SelectItem>
                 <SelectItem value="hydroponic">{t('farmingMethods.hydroponic')}</SelectItem>
                 <SelectItem value="other">{t('farmingMethods.other')}</SelectItem>
               </SelectContent>
             </Select>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
                     <div>
             <Label htmlFor="password">{t('fields.password')}</Label>
             <Input 
               id="password" 
               type="password" 
               {...form.register('password')} 
               placeholder={t('placeholders.password')}
               className="focus:ring-[#375B42] focus:border-[#375B42]"
             />
           </div>
          <div className="flex items-center space-x-2">
                         <Checkbox 
               id="agreeToTerms" 
               checked={form.getValues('agreeToTerms')} 
               onCheckedChange={(c) => form.setValue('agreeToTerms', Boolean(c))}
               className="data-[state=checked]:bg-[#375B42] data-[state=checked]:border-[#375B42]"
             />
            <Label htmlFor="agreeToTerms" className="text-sm">
              {t('agreePrefix')}{' '}
              <a href="/terms-of-use" className="underline" target="_blank" rel="noreferrer">{t('terms')}</a>{' '}
              {t('and')}{' '}
              <a href="/privacy-policy" className="underline" target="_blank" rel="noreferrer">{t('privacy')}</a>
            </Label>
          </div>
        </div>
      )}

             <div className="flex items-center justify-between">
         <Button 
           type="button" 
           variant="outline" 
           onClick={handlePrev} 
           disabled={currentStep === 1 || isPending}
           className="border-[#375B42] text-[#375B42] hover:bg-[#375B42] hover:text-white"
         >
           {t('buttons.back')}
         </Button>
         {currentStep < 3 ? (
           <Button 
             type="button" 
             onClick={handleNext} 
             disabled={isPending}
             className="bg-[#375B42] hover:bg-[#2A4632] text-white"
           >
             {t('buttons.next')}
           </Button>
         ) : (
           <Button 
             type="submit" 
             disabled={isPending}
             className="bg-[#375B42] hover:bg-[#2A4632] text-white"
           >
             {isPending ? t('buttons.submitting') : t('buttons.submit')}
           </Button>
         )}
       </div>
    </form>
  );
}


