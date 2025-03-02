'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Dialog } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FarmGalleryProps, FarmImage } from './types';

// Lazy load the dialog content
const DialogContent = dynamic(
  () => import('@/components/ui/dialog').then(mod => mod.DialogContent),
  { ssr: false }
);

const GALLERY_ITEM_SIZE = 250; // Size of each gallery item in pixels

export default function FarmGallery({ images, onImageClick }: FarmGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<FarmImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [columnCount, setColumnCount] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update column count based on viewport width
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width < 768) setColumnCount(2);
      else if (width < 1024) setColumnCount(3);
      else setColumnCount(4);
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  // Create virtualizer instance
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(images.length / columnCount),
    getScrollElement: () => containerRef.current,
    estimateSize: () => GALLERY_ITEM_SIZE,
    overscan: 5,
  });

  const handleImageClick = (image: FarmImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    onImageClick?.(image);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage) {
      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          setSelectedImage(null);
          break;
      }
    }
  };

  // Memoize the virtualized items
  const virtualItems = useMemo(() => {
    return rowVirtualizer.getVirtualItems().map(virtualRow => {
      const startIndex = virtualRow.index * columnCount;
      const rowImages = images.slice(startIndex, startIndex + columnCount);
      return { virtualRow, rowImages };
    });
  }, [rowVirtualizer, images, columnCount]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-[600px] overflow-auto"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
        role="region"
        aria-label="Farm image gallery"
      >
        {virtualItems.map(({ virtualRow, rowImages }) => (
          <div
            key={virtualRow.index}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {rowImages.map((image, index) => (
              <Card
                key={image.id}
                className="group relative aspect-square cursor-pointer overflow-hidden"
                onClick={() => handleImageClick(image, index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${image.alt}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleImageClick(image, index);
                  }
                }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  quality={75}
                />
                {image.caption && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="p-4 text-sm text-white">{image.caption}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ))}
      </div>

      <Dialog 
        open={!!selectedImage} 
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent 
          className="max-w-4xl"
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-label={selectedImage?.alt || 'Image viewer'}
        >
          <div className="relative aspect-video">
            {selectedImage && (
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1536px) 100vw, 1536px"
                quality={90}
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-white"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image viewer"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
          {selectedImage?.caption && (
            <p 
              className="mt-2 text-center text-sm text-muted-foreground"
              role="complementary"
            >
              {selectedImage.caption}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 