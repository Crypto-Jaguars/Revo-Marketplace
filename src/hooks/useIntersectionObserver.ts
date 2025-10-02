'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<Element>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | undefined;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
  const ref = useRef<Element>(null);

  const frozen = useRef(false);

  const updateEntry = useCallback(
    ([entry]: IntersectionObserverEntry[]): void => {
      setEntry(entry);
      setIsIntersecting(entry.isIntersecting);

      if (freezeOnceVisible && entry.isIntersecting && !frozen.current) {
        frozen.current = true;
      }
    },
    [freezeOnceVisible]
  );

  useEffect(() => {
    const node = ref?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen.current || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin, updateEntry]);

  return { ref, isIntersecting, entry };
}
