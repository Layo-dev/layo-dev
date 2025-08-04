import { useEffect } from 'react';
import { reportWebVitals } from '@/utils/performance';

export const useWebVitals = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Simple performance tracking without external dependency
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          reportWebVitals({
            name: entry.name,
            value: entry.duration || 0,
            id: Math.random().toString(36).substr(2, 9),
          });
        });
      });

      try {
        observer.observe({ entryTypes: ['paint', 'navigation', 'largest-contentful-paint'] });
      } catch (e) {
        // Gracefully handle unsupported browsers
      }

      return () => observer.disconnect();
    }
  }, []);
};