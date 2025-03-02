'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { ReviewGalleryProps } from '../../types/review';

export default function ReviewGallery({ media, alt = 'Review image' }: ReviewGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const isDialogOpen = selectedImageIndex !== null;

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (selectedImageIndex === null) return;

    if (direction === 'next') {
      setSelectedImageIndex((selectedImageIndex + 1) % media.length);
    } else {
      setSelectedImageIndex((selectedImageIndex - 1 + media.length) % media.length);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {media.map((src, index) => (
          <div
            key={index}
            className="relative w-20 h-20 cursor-pointer overflow-hidden rounded-md"
            onClick={() => openImage(index)}
          >
            <Image
              src={src || '/placeholder.svg'}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeImage()}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative w-full h-[80vh] bg-black flex items-center justify-center">
            {selectedImageIndex !== null && (
              <Image
                src={media[selectedImageIndex] || '/placeholder.svg'}
                alt={`${alt} ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70"
              onClick={closeImage}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              <Button
                variant="outline"
                className="bg-black/50 hover:bg-black/70 text-white border-white/20"
                onClick={() => navigateImage('prev')}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="bg-black/50 hover:bg-black/70 text-white border-white/20"
                onClick={() => navigateImage('next')}
              >
                Next
              </Button>
            </div>

            {selectedImageIndex !== null && (
              <div className="absolute bottom-12 left-0 right-0 text-center text-white text-sm">
                {selectedImageIndex + 1} of {media.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
