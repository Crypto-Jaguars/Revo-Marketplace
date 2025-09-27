"use client";

import React, { useState, memo, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface PhotoGalleryProps {
  isOwner?: boolean;
}

// Memoized Photo Item Component
const PhotoItem = memo<{ photo: Photo; index: number }>(({ photo, index }) => (
  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:shadow-md transition-shadow cursor-pointer relative">
    <Image 
      src={photo.url} 
      alt={photo.alt}
      fill
      className="object-cover hover:scale-105 transition-transform duration-200"
      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      loading={index < 4 ? "eager" : "lazy"}
      priority={index < 2}
    />
  </div>
));

PhotoItem.displayName = 'PhotoItem';

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ isOwner = false }) => {
  const photos = useMemo<Photo[]>(() => [
    { id: 1, url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop", alt: "Cultivos de tomate" },
    { id: 2, url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=200&fit=crop", alt: "Invernadero" },
    { id: 3, url: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=300&h=200&fit=crop", alt: "Vista de la granja" },
    { id: 4, url: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=300&h=200&fit=crop", alt: "Cosecha" },
    { id: 5, url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop", alt: "Frutas frescas" },
    { id: 6, url: "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=300&h=200&fit=crop", alt: "Trabajadores" },
    { id: 7, url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop", alt: "Herramientas agrícolas" },
    { id: 8, url: "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=300&h=200&fit=crop", alt: "Plantación en surcos" }
  ], []);

  const handleAddPhotos = useCallback(() => {
    // TODO: Implement photo upload functionality
    console.log('Add photos clicked');
  }, []);

  return (
    <section className="bg-white p-6 mb-8 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Galería de Fotos</h2>
        {isOwner && (
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            onClick={handleAddPhotos}
            aria-label="Agregar fotos a la galería"
          >
            <Camera size={16} />
            Agregar Fotos
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <PhotoItem key={photo.id} photo={photo} index={index} />
        ))}
      </div>
    </section>
  );
};

export default memo(PhotoGallery);