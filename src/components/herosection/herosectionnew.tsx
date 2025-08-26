import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Headernew from '../header/Headernew';

export default function HeroSectionNew() {
  const t = useTranslations('Hero');
  const [expandedIndex, setExpandedIndex] = useState(0);

  function handleImageClick(index: number) {
    setExpandedIndex(index);
  }
  return (
    <section className="w-full h-screen flex flex-col">
      <Headernew />
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center text-center px-4 md:px-14 gap-8 lg:gap-2 bg-gradient-to-b from-[#D8E8DE] via-[#B8D8C8] to-[#98C8B8]">
        <article className='max-w-xl'>
          <h1 className="text-4xl text-center lg:text-left lg:text-6xl font-bold text-primary_green leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg text-forest-900/90 leading-relaxed mt-4 max-w-xl text-center lg:text-left">
            {t('subtitle')}
          </p>
        </article>
        <div className="mt-8 flex h-56 md:h-72 items-center justify-center gap-3">
          <div className={`relative h-full rounded-lg cursor-pointer transition-all duration-500 ${expandedIndex === 0 ? "w-56 md:w-72" : "w-16 md:w-20"}`} onClick={() => handleImageClick(0)}>
            <Image
              src="/images/sliderimage1.png"
              alt="Description 1"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {expandedIndex === 0 && (
              <p style={{ color: 'white' }} className="absolute bottom-4 left-4 font-medium text-base z-10 drop-shadow-md">
                {t('imageText.processed')}
              </p>
            )}
          </div>
          <div className={`relative h-full rounded-lg cursor-pointer transition-all duration-500 ${expandedIndex === 1 ? "w-56 md:w-72" : "w-16 md:w-20"}`} onClick={() => handleImageClick(1)}>
            <Image
              src="/images/sliderimage2.png"
              alt="Description 2"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {expandedIndex === 1 && (
              <p style={{ color: 'white' }} className="absolute bottom-4 left-4 font-medium text-base z-10 drop-shadow-md">
                {t('imageText.harvest')}
              </p>
            )}
          </div>
          <div className={`relative h-full rounded-lg cursor-pointer transition-all duration-500 ${expandedIndex === 2 ? "w-56 md:w-72" : "w-16 md:w-20"}`} onClick={() => handleImageClick(2)}>
            <Image
              src="/images/sliderimage3.png"
              alt="Description 3"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            {expandedIndex === 2 && (
              <p style={{ color: 'white' }} className="absolute bottom-4 left-4 font-medium text-base z-10 drop-shadow-md">
                {t('imageText.freshness')}
              </p>
            )}
          </div>
        </div>
      </main>
      <main className="flex justify-center items-center py-12 bg-gradient-to-b from-[#98C8B8] to-[#81B8A2]">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <button style={{ color: 'white' }} className="py-3 px-6 bg-gradient-to-b from-green-500 to-green-700 text-white font-semibold rounded-full border-2 border-green-800 shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 active:translate-y-px">
            Explore the Marketplace
          </button>
          <button className="py-3 px-6 bg-gradient-to-b from-gray-100 to-gray-300 text-gray-800 font-semibold rounded-full border-2 border-gray-400 shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 active:translate-y-px">
            Join as a Farmer
          </button>
          <button className="py-3 px-6 bg-gradient-to-b from-yellow-400 to-yellow-600 text-yellow-900 font-semibold rounded-full border-2 border-yellow-700 shadow-lg transition-transform transform hover:scale-105 hover:brightness-95 active:translate-y-px">
            Invest Now
          </button>
        </div>
      </main>
    </section>
  );
}
