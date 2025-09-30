'use client';

import React, { memo, useRef, useEffect, useCallback } from 'react';
import { useVirtualization } from '@/hooks/useVirtualization';
import { cn } from '@/lib/utils';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
  onScroll?: (scrollTop: number) => void;
}

const VirtualizedList = memo(<T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  overscan = 5,
  onScroll,
}: VirtualizedListProps<T>) => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  
  const { virtualItems, totalSize, scrollToOffset } = useVirtualization({
    itemHeight,
    containerHeight,
    itemCount: items.length,
    overscan,
  });

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    scrollToOffset(scrollTop);
    onScroll?.(scrollTop);
  }, [scrollToOffset, onScroll]);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = 0;
    }
  }, [items]);

  return (
    <div
      ref={scrollElementRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalSize, position: 'relative' }}>
        {virtualItems.map(({ index, start }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: start,
              left: 0,
              right: 0,
              height: itemHeight,
            }}
          >
            {renderItem(items[index], index)}
          </div>
        ))}
      </div>
    </div>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

export { VirtualizedList };
