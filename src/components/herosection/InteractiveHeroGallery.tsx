'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface InteractiveHeroGalleryProps {
  className?: string;
}

export default function InteractiveHeroGallery({ className = '' }: InteractiveHeroGalleryProps) {
  const t = useTranslations('Hero');
  const [expandedIndex, setExpandedIndex] = useState(0);

  function handleMouseEnter(index: number) {
    setExpandedIndex(index);
  }

  function handleMouseLeave() {
    setExpandedIndex(0);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const galleryItems = [
    {
      src: '/images/sliderimage1.png',
      alt: 'Processed foods',
      label: t('imageText.processed'),
    },
    {
      src: '/images/sliderimage2.png',
      alt: 'Fresh harvest',
      label: t('imageText.harvest'),
    },
    {
      src: '/images/sliderimage3.png',
      alt: 'Fresh produce',
      label: t('imageText.freshness'),
    },
  ];

  return (
    <motion.div
      onMouseLeave={handleMouseLeave}
      className={`w-full lg:w-auto mt-8 flex items-center justify-start lg:justify-center gap-3 max-w-full overflow-x-auto lg:overflow-visible py-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {galleryItems.map((item, index) => (
        <motion.button
          key={index}
          type="button"
          variants={imageVariants}
          className={`relative h-64 md:h-80 lg:h-96 rounded-lg cursor-pointer transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 ${
            expandedIndex === index ? 'w-72 md:w-96' : 'w-24 md:w-28'
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
          onFocus={() => handleMouseEnter(index)}
          onClick={() => handleMouseEnter(index)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleMouseEnter(index);
            }
          }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
            priority={index === 0}
          />
          {expandedIndex === index && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg">
              <p className="absolute bottom-4 left-4 font-medium text-lg z-10 text-white drop-shadow-md">
                {item.label}
              </p>
            </div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
}