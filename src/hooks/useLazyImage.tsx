import { useState, useEffect, useRef } from 'react';

interface UseLazyImageProps {
  src: string;
  placeholder?: string;
  threshold?: number;
}

export const useLazyImage = ({ src, placeholder, threshold = 0.1 }: UseLazyImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (src && !imageSrc) {
            setImageSrc(src);
          }
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, threshold, imageSrc]);

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