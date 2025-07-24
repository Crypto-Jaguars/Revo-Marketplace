/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useWalletStore } from '@/store';

export default function WithAuthProtect(Component: any) {
  return function WithAuthProtect(props: any) {
    const { address } = useWalletStore();
    const isDevelopment = process.env.NODE_ENV === 'development';

    useEffect(() => {
      if (!address && !isDevelopment) {
        redirect('/');
      }
    }, [address, isDevelopment]);

    if (!address && !isDevelopment) {
      return null;
    }

    return <Component {...props} />;
  };
}
