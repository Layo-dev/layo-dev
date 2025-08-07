import { useState, useEffect } from 'react';
import { throttle } from '@/utils/performance';

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