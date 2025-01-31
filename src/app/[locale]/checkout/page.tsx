'use client';

import Bounded from '@/components/Bounded';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cartMock } from '@/mocks/products';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

const createBillingSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().min(1, t('form.errors.firstName')),
    companyName: z.string().optional(),
    streetAddress: z.string().min(1, t('form.errors.streetAddress')),
    apartment: z.string().optional(),
    town: z.string().min(1, t('form.errors.town')),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, t('form.errors.phoneNumberFormat')),
    email: z.string().email(t('form.errors.email')),
  });

type BillingDetails = z.infer<ReturnType<typeof createBillingSchema>>;

export default function CheckoutPage() {
  const t = useTranslations('Checkout');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingDetails>({
    resolver: zodResolver(createBillingSchema(t)),
  });

  const getTotalAmount = () => {
    return cartMock.reduce((sum, item) => sum + item.price.amount, 0);
  };

  const onSubmit = (data: BillingDetails) => {
    console.log('Form submitted:', data);
  };

  return (
    <Bounded>
      <div className="w-full max-w-6xl px-4 xl:px-0">
        <div className="flex flex-wrap gap-2 text-sm mb-20">
          <span className="min-w-max text-black/50">Account</span>
          <span className="min-w-max text-black/50">/</span>
          <span className="min-w-max text-black/50">My Account</span>
          <span className="min-w-max text-black/50">/</span>
          <span className="min-w-max text-black/50">Product</span>
          <span className="min-w-max text-black/50">/</span>
          <span className="min-w-max text-black/50">View Cart</span>
          <span className="min-w-max text-black/50">/</span>
          <span>CheckOut</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-10">
            <div className="flex flex-col w-full max-w-[470px]">
              <h1 className="text-[36px]/[30px] font-medium tracking-[4%]">
                {t('billingDetails')}
              </h1>
              <div className="space-y-8 mt-6 w-full">
                <div className="space-y-2 w-full">
                  <label className="text-sm font-medium text-black">
                    {t('form.firstName')}
                    <span className="text-[#DB4444]/40">*</span>
                  </label>
                  <Input
                    {...register('firstName')}
                    className="w-full bg-[#F5F5F5] border rounded h-[50px]"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">{errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-sm font-medium text-black">{t('form.companyName')}</label>
                  <Input
                    {...register('companyName')}
                    className="w-full bg-[#F5F5F5] border rounded h-[50px]"
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-sm font-medium text-black">
                    {t('form.streetAddress')}
                    <span className="text-[#DB4444]/40">*</span>
                  </label>
                  <Input
                    {...register('streetAddress')}
                    className="w-full bg-[#F5F5F5] border rounded h-[50px]"
                  />
                  {errors.streetAddress && (
                    <p className="text-red-500 text-xs">{errors.streetAddress.message}</p>
                  )}
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-sm font-medium text-black">{t('form.apartment')}</label>
                  <Input
                    {...register('apartment')}
                    className="w-full bg-[#F5F5F5] border rounded h-[50px]"
                  />
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-sm font-medium text-black">
                    {t('form.town')}
                    <span className="text-[#DB4444]/40">*</span>
                  </label>
                  <Input
                    {...register('town')}
                    className="w-full bg-[#F5F5F5] border rounded h-[50px]"
                  />
                  {errors.town && <p className="text-red-500 text-xs">{errors.town.message}</p>}
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-sm font-medium text-black">
                    {t('form.phoneNumber')}
                    <span className="text-[#DB4444]/40">*</span>
                  </label>
                  <Input
                    {...register('phoneNumber')}
                    className="w-full bg-[#F5F5F5] border rounded h-[50px]"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2 w-full">
                  <label className="text-sm font-medium text-black">
                    {t('form.email')}
                    <span className="text-[#DB4444]/40">*</span>
                  </label>
                  <Input
                    {...register('email')}
                    className="w-full bg-[#F5F5F5] border rounded h-[50px]"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Save this information for faster check-out next time
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full max-w-[426px] mt-20">
              <div className="flex flex-col gap-8">
                {cartMock.map((product, index) => (
                  <div key={index} className="flex items-center justify-between pr-[60px]">
                    <div className="flex items-center gap-6">
                      <Image
                        src={`/images/${product.images[0]}`}
                        alt={product.name}
                        width={54}
                        height={54}
                        className=""
                      />
                      <span className="tracking-[0.32px]">{product.name}</span>
                    </div>
                    <span className="tracking-[0.32px]">${product.price.amount}</span>
                  </div>
                ))}
                <div className="mt-8 flex flex-col gap-4">
                  <div className="w-full flex justify-between pb-4 border-b border-black/40">
                    <span className="tracking-[0.32px]">{t('subTotal')}</span>
                    <span className="tracking-[0.32px]">${getTotalAmount()}</span>
                  </div>
                  <div className="w-full flex justify-between pb-4 border-b border-black/40">
                    <span className="tracking-[0.32px]">{t('shipping')}</span>
                    <span className="tracking-[0.32px]">{t('free')}</span>
                  </div>
                  <div className="w-full flex justify-between pb-4">
                    <span className="tracking-[0.32px]">{t('total')}</span>
                    <span className="tracking-[0.32px]">${getTotalAmount()}</span>
                  </div>
                </div>
                <div className="mt-8">
                  <RadioGroup defaultValue="wallet2" className="gap-8">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1" className="text-base tracking-[0.32px]">
                        Stellar Wallet 1
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wallet2" id="r2" />
                      <Label htmlFor="r2" className="text-base tracking-[0.32px]">
                        Stellar Wallet 2
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="">
                  <Image src={'/images/qr-code.png'} alt={'QR Code'} width={76} height={76} />
                </div>
                <div className="">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#375B42] hover:bg-[#245842] px-12 py-4 rounded-lg h-14 text-base font-medium"
                  >
                    {isSubmitting ? t('processing') : t('placeOrder')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Bounded>
  );
}
