import { useState, useEffect, useRef } from 'react';

interface UseLazyImageProps {
  src: string;
  placeholder?: string;
  threshold?: number;
  shouldPause?: boolean;
}

export const useLazyImage = ({ src, placeholder, threshold = 0.1, shouldPause = false }: UseLazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (shouldPause) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldPause) {
          setIsInView(true);
          if (src && !imageSrc && !shouldPause) {
            setImageSrc(src);
          }
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px' }
    );

    if (imgRef.current && !shouldPause) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, threshold, imageSrc, shouldPause]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setImageSrc(placeholder || '');
    setIsLoaded(false);
  };

  return { 
    imageSrc: imageSrc || src, 
    isLoaded, 
    isInView,
    imgRef, 
    handleLoad, 
    handleError 
  };
};