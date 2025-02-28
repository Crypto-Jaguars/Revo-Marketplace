'use client'

import Link from 'next/link';
import React from 'react'
import { useLanguageStore } from '../../../store/languageStore';

const FarmsPage = () => {
  const { language } = useLanguageStore();
  return (
    <div className='flex flex-col gap-4 p-4'>
      <Link href={`/${language}/farms/1`}>Farm 1</Link>
      <Link href={`/${language}/farms/2`}>Farm 2</Link>
    </div>
  )
}

export default FarmsPage;
