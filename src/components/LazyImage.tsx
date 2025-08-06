import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
}

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(
  ({ src, alt, className, sizes, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn('transition-opacity duration-300', className)}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        {...props}
      />
    );
  }
);

LazyImage.displayName = 'LazyImage';

export { LazyImage };