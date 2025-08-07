import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useLazyImage } from '@/hooks/useLazyImage';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  placeholder?: string;
  shouldPause?: boolean;
}

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, alt, className, sizes, placeholder, shouldPause, ...props }, ref) => {
    const { imageSrc, isLoaded, isInView, imgRef, handleLoad, handleError } = useLazyImage({
      src,
      placeholder,
      threshold: 0.1,
      shouldPause
    });

    return (
      <div className="relative overflow-hidden">
        {/* Skeleton placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        
        <img
          ref={ref || imgRef}
          src={imageSrc}
          alt={alt}
          className={cn(
            'transition-all duration-500 ease-out',
            isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
            className
          )}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </div>
    );
  }
);

LazyImage.displayName = 'LazyImage';

export { LazyImage };