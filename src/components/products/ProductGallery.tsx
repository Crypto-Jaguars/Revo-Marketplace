'use client';

import type React from 'react';

import Image from 'next/image';
import { useState, useCallback } from 'react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images = ['/images/placeholder.svg'] }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleImageChange = useCallback(
    (index: number) => {
      if (index === selectedImage) return;

      setIsChanging(true);
      const timeoutId = setTimeout(() => {
        setSelectedImage(index);
        setIsChanging(false);
      }, 150); // Mitad de la duración de la transición
      return () => clearTimeout(timeoutId);
    },
    [selectedImage]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePosition({ x, y });
    },
    [isZoomed]
  );

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-8">
      {/* Thumbnails - Horizontal en móvil, vertical en desktop */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`
              flex-shrink-0 flex justify-center items-center bg-[#F5F5F5]
              relative w-[100px] h-[80px] md:w-[173px] md:h-[141px] 
              border rounded overflow-hidden
              ${selectedImage === index ? 'border-[#375B42]' : 'border-[#E0E0E0]'}
              hover:border-[#375B42] transition-colors
            `}
          >
            <div className="relative w-[80px] h-[60px] md:w-[133px] md:h-[91px]">
              <Image
                src={
                  image && (image.startsWith('/') || image.startsWith('http'))
                    ? image
                    : image
                      ? `/images/${image}`
                      : '/images/cart-small.png'
                }
                alt={`Product view ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 173px"
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.svg';
                }}
                placeholder="blur"
                blurDataURL="/images/placeholder.svg"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div
        className="flex flex-1 justify-center items-center relative bg-[#F5F5F5] rounded-lg overflow-hidden
           aspect-square w-full h-auto max-h-[600px]"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          className={`
          relative w-full h-full max-w-[400px] max-h-[500px] aspect-square
          transition-all duration-300 ease-in-out
          ${isChanging ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}
        >
          <Image
            src={
              images[selectedImage].startsWith('/') || images[selectedImage].startsWith('http')
                ? images[selectedImage]
                : `/images/${images[selectedImage]}`
            }
            alt="Product main view"
            fill
            sizes="(max-width: 768px) 100vw, 173px"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.svg';
            }}
            placeholder="blur"
            blurDataURL="/images/placeholder.svg"
            className={`
              object-contain transition-transform duration-200
              ${isZoomed ? 'scale-150' : 'scale-100'}
            `}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }
                : undefined
            }
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
