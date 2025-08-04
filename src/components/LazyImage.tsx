import { forwardRef } from 'react';
import { useLazyImage } from '@/hooks/useLazyImage';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  sizes?: string;
  quality?: number;
}

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, alt, placeholder, threshold = 0.1, className, sizes, quality = 75, ...props }, ref) => {
    const { imageSrc, isLoaded, imgRef, handleLoad } = useLazyImage({ 
      src: optimizeImageUrl(src, quality), 
      placeholder, 
      threshold 
    });

    return (
      <img
        ref={ref || imgRef}
        src={imageSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={handleLoad}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        {...props}
      />
    );
  }
);

// Optimize external image URLs (Unsplash, etc.)
const optimizeImageUrl = (url: string, quality: number): string => {
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=800&q=${quality}`;
  }
  return url;
};

LazyImage.displayName = 'LazyImage';

export { LazyImage };