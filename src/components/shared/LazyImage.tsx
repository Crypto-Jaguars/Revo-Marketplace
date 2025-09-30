'use client';

import React, { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = memo<LazyImageProps>(({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  sizes,
  priority = false,
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
  quality = 75,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gray-200 flex items-center justify-center',
          fill ? 'w-full h-full' : '',
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {!isLoaded && (
        <div 
          className={cn(
            'absolute inset-0 bg-gray-200 animate-pulse',
            'flex items-center justify-center'
          )}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export { LazyImage };
