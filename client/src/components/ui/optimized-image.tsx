import { useState, useRef, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  fallback?: string;
  width?: number;
  height?: number;
  quality?: number;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNiAxNkMyMC40MTgzIDE2IDI0IDE5LjU4MTcgMjQgMjRTMjAuNDE4MyAzMiAxNiAzMlMxNiAyOC40MTgzIDE2IDI0UzE5LjU4MTcgMTYgMTYgMTZaIiBmaWxsPSIjRDFENUNCIi8+Cjwvc3ZnPgo=",
  fallback = "/api/placeholder/400/300",
  width,
  height,
  quality = 85,
  lazy = true,
  onLoad,
  onError,
  priority = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [currentSrc, setCurrentSrc] = useState(lazy && !priority ? placeholder : src);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setCurrentSrc(src);
            if (observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before the image comes into view
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy, priority, isInView, src]);

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    } else {
      onError?.();
    }
  };

  // Generate optimized image URL
  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc === placeholder || originalSrc === fallback) {
      return originalSrc;
    }

    // If it's a local image or already optimized, return as is
    if (originalSrc.startsWith('/') || originalSrc.includes('w_') || originalSrc.includes('q_')) {
      return originalSrc;
    }

    // For external images (like Unsplash), add optimization parameters
    if (originalSrc.includes('unsplash.com')) {
      const url = new URL(originalSrc);
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('fm', 'webp');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    }

    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(currentSrc);

  return (
    <div className={`relative overflow-hidden ${className}`} data-testid="optimized-image-container">
      {/* Loading State */}
      {isLoading && currentSrc !== placeholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}

      {/* Error State */}
      {hasError && currentSrc === fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'
        } ${hasError && currentSrc === fallback ? 'opacity-50' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={lazy && !priority ? "lazy" : "eager"}
        decoding="async"
        data-testid="optimized-image"
        style={{
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
        }}
      />

      {/* Progressive Enhancement with WebP support */}
      {isInView && !hasError && (
        <picture style={{ display: 'none' }}>
          <source
            srcSet={getOptimizedSrc(src).replace(/\.(jpg|jpeg|png)/, '.webp')}
            type="image/webp"
          />
          <source
            srcSet={getOptimizedSrc(src)}
            type="image/jpeg"
          />
        </picture>
      )}
    </div>
  );
}

// Utility component for hero images with blur-up effect
export function HeroImage({
  src,
  alt,
  className,
  children,
  ...props
}: OptimizedImageProps & { children?: React.ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full"
        priority={true}
        lazy={false}
        {...props}
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Utility component for gallery images with lazy loading
export function GalleryImage({
  src,
  alt,
  className,
  onClick,
  ...props
}: OptimizedImageProps & { onClick?: () => void }) {
  return (
    <div
      className={`relative group cursor-pointer overflow-hidden ${className}`}
      onClick={onClick}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
        lazy={true}
        {...props}
      />
      {onClick && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-medium">
            View Image
          </div>
        </div>
      )}
    </div>
  );
}