'use client';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(label: string): void {
    this.metrics.set(label, performance.now());
  }

  endTiming(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) {
      console.warn(`No start time found for label: ${label}`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    return duration;
  }

  measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(label);
    return fn().finally(() => {
      const duration = this.endTiming(label);
      console.log(`${label} took ${duration.toFixed(2)}ms`);
    });
  }

  measureSync<T>(label: string, fn: () => T): T {
    this.startTiming(label);
    try {
      return fn();
    } finally {
      const duration = this.endTiming(label);
      console.log(`${label} took ${duration.toFixed(2)}ms`);
    }
  }
}

// Web Vitals monitoring
export function measureWebVitals() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEntry & { processingStart?: number };
        if (fidEntry.processingStart) {
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
          clsValue += layoutShiftEntry.value;
        }
      });
      console.log('CLS:', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
}

// Bundle size monitoring
export function logBundleSize() {
  if (typeof window === 'undefined') return;

  const scripts = document.querySelectorAll('script[src]');
  let totalSize = 0;

  scripts.forEach((script) => {
    const src = script.getAttribute('src');
    if (src) {
      fetch(src, { method: 'HEAD' })
        .then((response) => {
          const contentLength = response.headers.get('content-length');
          if (contentLength) {
            totalSize += parseInt(contentLength);
            console.log(`Script ${src}: ${(parseInt(contentLength) / 1024).toFixed(2)}KB`);
          }
        })
        .catch(() => {
          // Ignore errors for external scripts
        });
    }
  });

  setTimeout(() => {
    console.log(`Total bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
  }, 1000);
}

// Memory usage monitoring
export function logMemoryUsage() {
  if (typeof window === 'undefined') return;

  if ('memory' in performance) {
    const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
    if (memory) {
      console.log('Memory usage:', {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`,
      });
    }
  }
}

// Image loading performance
export function measureImageLoading() {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img');
  let loadedImages = 0;
  const totalImages = images.length;

  images.forEach((img) => {
    if (img.complete) {
      loadedImages++;
    } else {
      img.addEventListener('load', () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          console.log('All images loaded');
        }
      });
    }
  });

  if (loadedImages === totalImages) {
    console.log('All images already loaded');
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  measureWebVitals();
  logBundleSize();
  logMemoryUsage();
  measureImageLoading();

  // Log performance metrics every 30 seconds
  setInterval(() => {
    logMemoryUsage();
  }, 30000);
}
