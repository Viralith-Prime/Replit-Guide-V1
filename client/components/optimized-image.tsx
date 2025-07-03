import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder,
  priority = false,
  quality = 85,
  sizes,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || typeof window === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Generate optimized src URLs (this would integrate with your image service)
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [480, 768, 1024, 1280, 1920];
    return sizes
      .map((size) => `${baseSrc}?w=${size}&q=${quality} ${size}w`)
      .join(", ");
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Placeholder while loading
  if (!inView) {
    return (
      <div
        ref={imgRef}
        className={`bg-muted ${className}`}
        style={{ width, height }}
        aria-label={`Loading ${alt}`}
      >
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div
        className={`bg-muted border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground text-sm ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={`Failed to load ${alt}`}
      >
        <span>Image failed to load</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder/blur effect */}
      {placeholder && !isLoaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={generateSrcSet(src)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0">
          <Skeleton className="w-full h-full" />
        </div>
      )}
    </div>
  );
}

// Hook for preloading images
export function useImagePreloader(urls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadPromises = urls.map((url) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
      });
    });

    Promise.allSettled(preloadPromises).then((results) => {
      const loaded = new Set<string>();
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          loaded.add(urls[index]!);
        }
      });
      setLoadedImages(loaded);
    });
  }, [urls]);

  return loadedImages;
}
