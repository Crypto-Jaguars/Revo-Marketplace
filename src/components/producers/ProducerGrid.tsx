'use client';

import { useState } from 'react';
import { Producer } from '@/types/producer';
import { ProducerCard } from './ProducerCard';
import { Button } from '@/components/ui/button';
import { Grid3X3, List } from 'lucide-react';

interface ProducerGridProps {
  producers: Producer[];
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onProducerClick: (producer: Producer) => void;
}

export function ProducerGrid({ 
  producers, 
  viewMode, 
  onViewModeChange,
  onProducerClick 
}: ProducerGridProps) {
  const [displayedCount, setDisplayedCount] = useState(12);

  const handleLoadMore = () => {
    setDisplayedCount(prev => Math.min(prev + 12, producers.length));
  };

  const displayedProducers = producers.slice(0, displayedCount);
  const hasMore = displayedCount < producers.length;

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex justify-end">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-none border-0"
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            className="rounded-none border-0"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Producers Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducers.map((producer) => (
            <ProducerCard
              key={producer.id}
              producer={producer}
              viewMode="grid"
              onClick={() => onProducerClick(producer)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedProducers.map((producer) => (
            <ProducerCard
              key={producer.id}
              producer={producer}
              viewMode="list"
              onClick={() => onProducerClick(producer)}
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="px-8 py-3 text-lg font-medium border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-200"
          >
            Load More Producers
          </Button>
        </div>
      )}
    </div>
  );
}