// Performance monitoring utilities
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(metric);
    // Send to analytics service in production
  }
};

// Debounce utility for form inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), delay);
    }
  };
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize animations based on device capabilities
export const getOptimizedAnimationProps = () => {
  const hasReducedMotion = prefersReducedMotion();
  const isLowEndDevice = navigator.hardwareConcurrency <= 2;
  
  return {
    shouldAnimate: !hasReducedMotion && !isLowEndDevice,
    animationDuration: isLowEndDevice ? 150 : 300,
  };
};