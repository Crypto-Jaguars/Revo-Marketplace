'use client';

import { useEffect } from 'react';

interface PageViewTrackerProps {
  page: string;
}

export function PageViewTracker({ page }: PageViewTrackerProps) {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = sessionStorage.getItem('analytics-session') || 
          Math.random().toString(36).substring(2) + Date.now().toString(36);
        sessionStorage.setItem('analytics-session', sessionId);

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