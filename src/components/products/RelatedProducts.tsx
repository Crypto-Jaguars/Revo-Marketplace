'use client';

import type { Product } from '@/types/product';
import { EyeOpenIcon, HeartIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useState } from 'react';
import { Rating } from '../ui/rating';
import { useTranslations } from 'next-intl';
import { products } from '@/mocks/relatedProducts';
import { AddToCartButton } from '../cart/AddToCartButton';
import Link from 'next/link';

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [isHoveredHeart, setIsHoveredHeart] = useState(false);
  const [isHoveredEye, setIsHoveredEye] = useState(false);
  const t = useTranslations('Products');

  const ICONS = [
    {
      id: 'like',
      icon: (
        <HeartIcon
          className={`
        w-[16px] h-[16px] transition-colors duration-300
        ${
          isLiked
            ? isHoveredHeart
              ? 'text-[#375B42]' // Activo + hover
              : 'text-white-dark' // Activo sin hover
            : isHoveredHeart
              ? 'text-white-dark' // No activo + hover
              : 'text-black' // No activo sin hover
        }
      `}
        />
      ),
      isActive: isLiked,
      isHovered: isHoveredHeart,
      onClick: () => setIsLiked(!isLiked),
      onMouseEnter: () => setIsHoveredHeart(true),
      onMouseLeave: () => setIsHoveredHeart(false),
      ariaLabel: isLiked ? 'Remove from favorites' : 'Add to favorites',
    },
    {
      id: 'view',
      icon: (
        <EyeOpenIcon
          className={`
        w-[16px] h-[16px] transition-colors duration-300
        ${
          isViewed
            ? isHoveredEye
              ? 'text-[#375B42]' // Activo + hover
              : 'text-white-dark' // Activo sin hover
            : isHoveredEye
              ? 'text-white-dark' // No activo + hover
              : 'text-black' // No activo sin hover
        }
      `}
        />
      ),
      isActive: isViewed,
      isHovered: isHoveredEye,
      onClick: () => setIsViewed(!isViewed),
      onMouseEnter: () => setIsHoveredEye(true),
      onMouseLeave: () => setIsHoveredEye(false),
      ariaLabel: isViewed ? 'Hide product details' : 'View product details',
    },
  ];

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10 w-[56px] h-[26px] bg-[#375B42] flex justify-center items-center rounded">
          <p className="text-white-dark text-xs font-normal px-2 py-1 rounded">
            -{product.discount}%
          </p>
        </div>
      )}

      <div className="absolute top-3 right-2 z-10 flex flex-col gap-2">
        {ICONS.map((icon) => (
          <button
            key={icon.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              icon.onClick();
            }}
            onMouseEnter={icon.onMouseEnter}
            onMouseLeave={icon.onMouseLeave}
            aria-label={icon.ariaLabel}
            className={`
              flex justify-center items-center rounded-full shadow-md
              w-[34px] h-[34px] transition-all duration-300
              ${
                icon.isActive
                  ? 'bg-[#375B42] border-[#375B42] hover:bg-white hover:border-[#375B42] border'
                  : 'bg-white border-gray-300 hover:bg-[#375B42] hover:border-[#375B42] border'
              }
            `}
          >
            {icon.icon}
          </button>
        ))}
      </div>

      <div
        className="relative flex flex-col justify-center items-center 
          w-full h-[250px] sm:h-[220px] md:h-[250px] 
          bg-[#F5F5F5] rounded overflow-hidden"
      >
        <div className="relative w-full h-[152px] max-w-[172px]">
          <Image
            src={
              product.images && product.images.length > 0
                ? product.images[0].startsWith('/') || product.images[0].startsWith('http')
                  ? product.images[0]
                  : `/images/${product.images[0]}`
                : '/images/cart-small.png'
            }
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        <div
          className={`
          absolute bottom-0 left-0 right-0
          transform transition-all duration-300 ease-in-out
          ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        `}
        >
          <AddToCartButton
            product={product}
            className="w-full bg-[#375B42] text-white-dark py-2 hover:bg-[#375B42]/80 transition-colors duration-200"
            showIcon={false}
          />
        </div>
      </div>

      <div className="py-4">
        <h3 className="text-base font-medium text-black">{product.name}</h3>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-medium text-[#375B42]">${product.price.amount}</span>
          {product.discount > 0 && (
            <span className="opacity-50 line-through text-base font-medium text-[#000000]">
              ${(product.price.amount * (1 + product.discount / 100)).toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          <div className="flex text-yellow-400">
            <Rating
              value={product.rating as number & { __brand: 'ValidRating' }}
              max={5}
              readOnly
              aria-label={`Product rated ${product.rating} out of 5 stars`}
            />
          </div>
          <span className="opacity-50 text-black text-sm font-semibold">({product.rating})</span>
        </div>
      </div>
    </div>
  );
};

const RelatedProducts = () => {
  const t = useTranslations('Products');
  return (
    <>
      <div className="flex justify-start items-center gap-4 mb-8 lg:mb-[4rem]">
        <div className="w-[12px] lg:w-[20px] h-[30px] lg:h-[40px] rounded bg-[#375B42]"></div>
        <h2 className="text-base font-semibold text-[#375B42]">{t('buttons.relatedItems')}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default RelatedProducts;
