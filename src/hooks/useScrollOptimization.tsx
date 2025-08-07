import { useState, useEffect } from 'react';

// Simple throttle implementation to avoid circular dependencies
const throttle = <T extends (...args: any[]) => any>(
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

export const useScrollOptimization = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [shouldPause, setShouldPause] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = throttle(() => {
      setIsScrolling(true);
      setShouldPause(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        setShouldPause(false);
      }, 150);
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return { isScrolling, shouldPause };
};