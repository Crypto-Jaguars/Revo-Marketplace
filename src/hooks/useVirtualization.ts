'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

interface UseVirtualizationOptions {
  itemHeight: number;
  containerHeight: number;
  itemCount: number;
  overscan?: number;
}

interface UseVirtualizationReturn {
  virtualItems: Array<{
    index: number;
    start: number;
    end: number;
    size: number;
  }>;
  totalSize: number;
  scrollToIndex: (index: number) => void;
  scrollToOffset: (offset: number) => void;
}

export function useVirtualization({
  itemHeight,
  containerHeight,
  itemCount,
  overscan = 5,
}: UseVirtualizationOptions): UseVirtualizationReturn {
  const [scrollOffset, setScrollOffset] = useState(0);

  const totalSize = useMemo(() => itemCount * itemHeight, [itemCount, itemHeight]);

  const virtualItems = useMemo(() => {
    const startIndex = Math.floor(scrollOffset / itemHeight);
    const endIndex = Math.min(
      itemCount - 1,
      Math.ceil((scrollOffset + containerHeight) / itemHeight)
    );

    const start = Math.max(0, startIndex - overscan);
    const end = Math.min(itemCount - 1, endIndex + overscan);

    const items = [];
    for (let i = start; i <= end; i++) {
      items.push({
        index: i,
        start: i * itemHeight,
        end: (i + 1) * itemHeight,
        size: itemHeight,
      });
    }

    return items;
  }, [scrollOffset, itemHeight, containerHeight, itemCount, overscan]);

  const scrollToIndex = useCallback((index: number) => {
    const offset = Math.max(0, index * itemHeight);
    setScrollOffset(offset);
  }, [itemHeight]);

  const scrollToOffset = useCallback((offset: number) => {
    setScrollOffset(Math.max(0, Math.min(offset, totalSize - containerHeight)));
  }, [totalSize, containerHeight]);

  return {
    virtualItems,
    totalSize,
    scrollToIndex,
    scrollToOffset,
  };
}
