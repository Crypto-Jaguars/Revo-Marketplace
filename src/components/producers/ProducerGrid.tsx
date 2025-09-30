'use client';

import React from 'react';
import { Producer } from '@/types/producer';
import { ProducerCard } from './ProducerCard';
import { cn } from '@/lib/utils';

interface ProducerGridProps {
  producers: Producer[];
  onProducerClick?: (producer: Producer) => void;
  className?: string;
  title?: string;
  description?: string;
}

export function ProducerGrid({ 
  producers, 
  onProducerClick, 
  className, 
  title = "Featured Producers",
  description = "Meet our trusted local farmers and producers"
}: ProducerGridProps) {
  return (
    <section className={cn('w-full max-w-7xl mx-auto', className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Grid */}
      <div className={cn(
        'grid gap-6 w-full',
        'grid-cols-1',        // 1 column on mobile
        'sm:grid-cols-2',     // 2 columns on small screens
        'lg:grid-cols-3',     // 3 columns on large screens
        'place-items-center'   // Center items in their grid cells
      )}>
        {producers.map((producer) => (
          <ProducerCard
            key={producer.id}
            producer={producer}
            onClick={onProducerClick}
            className="w-full max-w-sm"
          />
        ))}
      </div>

      {/* Empty State */}
      {producers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Producers Found
          </h3>
          <p className="text-gray-500">
            We couldn&apos;t find any producers matching your criteria.
          </p>
        </div>
      )}
    </section>
  );
}