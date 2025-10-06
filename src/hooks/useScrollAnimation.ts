import { useEffect, useRef, useState } from 'react';

type UseScrollAnimationOptions = {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
};

type UseScrollAnimationReturn<T extends HTMLElement> = {
  ref: React.RefObject<T>;
  isVisible: boolean;
};

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn<T> {
  const { threshold = 0.1, root = null, rootMargin = '0px' } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin]);

  return { ref, isVisible };
}
