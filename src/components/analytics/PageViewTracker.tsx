'use client';

import { useEffect } from 'react';

function generateSecureSessionId(): string {
  // Use crypto.randomUUID() if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback using crypto.getRandomValues for high-entropy
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);

    // Convert to hex string and format as UUID-like
    const hex = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  }

  // Final fallback (should rarely be needed in modern environments)
  // Combine multiple entropy sources
  const timestamp = Date.now().toString(36);
  const randomPart = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join('');
  const performanceNow =
    typeof performance !== 'undefined' && performance.now
      ? Math.floor(performance.now() * 1000).toString(36)
      : '';

  return `fallback-${timestamp}-${randomPart}-${performanceNow}`;
}

interface PageViewTrackerProps {
  page: string;
}

export function PageViewTracker({ page }: PageViewTrackerProps) {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        let sessionId = sessionStorage.getItem('analytics-session');
        if (!sessionId) {
          sessionId = generateSecureSessionId();
          sessionStorage.setItem('analytics-session', sessionId);
        }

        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'page_view',
            source: document.referrer || 'direct',
            page,
            sessionId,
          }),
        });
      } catch (error) {
        console.error('Page view tracking failed:', error);
      }
    };

    // Track page view after a short delay to ensure the page is fully loaded
    const timer = setTimeout(trackPageView, 500);
    return () => clearTimeout(timer);
  }, [page]);

  return null;
}
