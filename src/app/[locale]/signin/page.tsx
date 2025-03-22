'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { useLanguageStore } from '@/store/languageStore/store';


export default function SignInPage() {
  const t = useTranslations('SignIn')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { language } = useLanguageStore();

  const signInSchema = z.object({
    email: z.string().email({
      message: t('emailValidation'),
    }),
    password: z
      .string()
      .min(8, {
        message: t('passwordLength'),
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: t('passwordPattern'),
      }),
  })
  
  type SignInFormValues = z.infer<typeof signInSchema>

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: SignInFormValues) {
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: t('successTitle'),
        description: t('successMessage'),
      })
      
      router.push(`/${language}/products`)
    } catch (error) {
      toast({
        title: t('errorTitle'),
        description: t('errorMessage'),
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
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
                    <FormLabel className="text-gray-500 font-normal">{t('passwordLabel')}</FormLabel>
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


              <div className='flex flex row'>
                <Button 
                  type="submit" 
                  className="w-[40%] bg-green-800 hover:bg-green-700 rounded-full py-6 text-lg" 
                  disabled={isLoading}
                >
                  {isLoading ? t('submitting') : t('submit')}
                </Button>

                <div className="text-center mt-4 ml-auto">
                  <a href={`/${language}/forgetPassword`} className="text-green-800 hover:underline font-medium">{t('forgetPassword')}</a>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
