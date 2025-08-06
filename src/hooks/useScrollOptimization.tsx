import { useEffect, useState, useCallback } from 'react';
import { throttle } from '@/utils/performance';

interface ScrollOptimizationOptions {
  enableDuringScroll?: boolean;
  scrollThrottleMs?: number;
  scrollEndDelayMs?: number;
}

export const useScrollOptimization = ({
  enableDuringScroll = false,
  scrollThrottleMs = 16,
  scrollEndDelayMs = 150
}: ScrollOptimizationOptions = {}) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldLoadContent, setShouldLoadContent] = useState(true);

  const handleScrollEnd = useCallback(() => {
    setIsScrolling(false);
    if (!enableDuringScroll) {
      setShouldLoadContent(true);
    }
  }, [enableDuringScroll]);

  const throttledScrollEnd = useCallback(
    throttle(handleScrollEnd, scrollEndDelayMs),
    [handleScrollEnd, scrollEndDelayMs]
  );

  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
      if (!enableDuringScroll) {
        setShouldLoadContent(false);
      }
    }
    throttledScrollEnd();
  }, [isScrolling, enableDuringScroll, throttledScrollEnd]);

  const throttledScroll = useCallback(
    throttle(handleScroll, scrollThrottleMs),
    [handleScroll, scrollThrottleMs]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  return {
    isScrolling,
    shouldLoadContent: enableDuringScroll ? true : shouldLoadContent,
    canOptimize: !isScrolling
  };
};