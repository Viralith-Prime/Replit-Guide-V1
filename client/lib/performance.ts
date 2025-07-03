import { useCallback, useEffect, useRef, RefObject } from "react";

// Utility for managing intersection observer with cleanup
export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): RefObject<Element> => {
  const targetRef = useRef<Element>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(callback, options);
    observerRef.current = observer;
    observer.observe(targetRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [callback, options]);

  return targetRef;
};

// Utility for debouncing with cleanup
export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
};

// Utility for throttling with cleanup
export const useThrottle = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastExecRef = useRef<number>(0);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastExecRef.current >= delay) {
        lastExecRef.current = now;
        callback(...args);
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(
          () => {
            lastExecRef.current = Date.now();
            callback(...args);
            timeoutRef.current = undefined;
          },
          delay - (now - lastExecRef.current),
        );
      }
    },
    [callback, delay],
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
};

// Builder.IO environment detection
export const isBuilderIOEnvironment = (): boolean => {
  if (typeof window === "undefined") return false;

  return !!(
    // Check for Builder.IO specific properties
    (
      window.parent !== window ||
      window.top !== window ||
      // Check user agent
      navigator.userAgent.includes("Builder.io") ||
      // Check for Builder.IO frame indicators
      window.location !== window.parent?.location ||
      // Check for Builder.IO specific globals
      (window as any).builderIO ||
      (window as any).Builder ||
      // Check for iframe context
      window.frameElement ||
      // Check for Builder.IO specific URL patterns
      window.location.href.includes("builder.io") ||
      window.location.href.includes("builder-") ||
      // Check document referrer
      document.referrer.includes("builder.io")
    )
  );
};

// Performance monitoring utility
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasure(name: string): void {
    if (typeof performance !== "undefined") {
      performance.mark(`${name}-start`);
    }
    this.metrics.set(`${name}-start`, Date.now());
  }

  endMeasure(name: string): number {
    const endTime = Date.now();
    const startTime = this.metrics.get(`${name}-start`);

    if (typeof performance !== "undefined") {
      try {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
      } catch (e) {
        // Fallback if performance API fails
      }
    }

    if (startTime) {
      const duration = endTime - startTime;
      this.metrics.set(name, duration);
      return duration;
    }
    return 0;
  }

  getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  clearMetrics(): void {
    this.metrics.clear();
    if (typeof performance !== "undefined") {
      try {
        performance.clearMarks();
        performance.clearMeasures();
      } catch (e) {
        // Ignore if performance API fails
      }
    }
  }

  initializeObservers(): void {
    if (
      typeof PerformanceObserver === "undefined" ||
      isBuilderIOEnvironment()
    ) {
      return;
    }

    try {
      // Observe navigation timing
      const navObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming;
            this.metrics.set("navigation-start", navEntry.navigationStart);
            this.metrics.set(
              "dom-content-loaded",
              navEntry.domContentLoadedEventEnd,
            );
            this.metrics.set("load-complete", navEntry.loadEventEnd);
          }
        });
      });

      navObserver.observe({ entryTypes: ["navigation"] });
      this.observers.push(navObserver);

      // Observe paint timing
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.set(entry.name, entry.startTime);
        });
      });

      paintObserver.observe({ entryTypes: ["paint"] });
      this.observers.push(paintObserver);
    } catch (e) {
      // Silently fail if observers aren't supported
    }
  }

  cleanup(): void {
    this.observers.forEach((observer) => {
      try {
        observer.disconnect();
      } catch (e) {
        // Ignore cleanup errors
      }
    });
    this.observers = [];
    this.clearMetrics();
  }
}

// Memory leak detection utility
export const useMemoryLeakDetection = (componentName: string) => {
  const mountTimeRef = useRef<number>(Date.now());
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);

  const addCleanupFunction = useCallback((fn: () => void) => {
    cleanupFunctionsRef.current.push(fn);
  }, []);

  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    monitor.startMeasure(`${componentName}-mount`);

    return () => {
      // Execute all cleanup functions
      cleanupFunctionsRef.current.forEach((fn) => {
        try {
          fn();
        } catch (e) {
          console.warn(`Cleanup function failed for ${componentName}:`, e);
        }
      });

      monitor.endMeasure(`${componentName}-mount`);

      // Log long-lived components in development
      if (process.env.NODE_ENV === "development") {
        const lifetime = Date.now() - mountTimeRef.current;
        if (lifetime > 60000) {
          // Warn for components alive > 1 minute
          console.warn(
            `Component ${componentName} was mounted for ${lifetime}ms`,
          );
        }
      }
    };
  }, [componentName]);

  return { addCleanupFunction };
};

// Resource preloading with cleanup
export const useResourcePreloader = () => {
  const preloadedResourcesRef = useRef<Set<string>>(new Set());

  const preloadResource = useCallback(
    (url: string, type: "image" | "script" | "style" = "image") => {
      if (preloadedResourcesRef.current.has(url) || isBuilderIOEnvironment()) {
        return;
      }

      const link = document.createElement("link");
      link.rel = "preload";
      link.href = url;

      switch (type) {
        case "image":
          link.as = "image";
          break;
        case "script":
          link.as = "script";
          break;
        case "style":
          link.as = "style";
          break;
      }

      document.head.appendChild(link);
      preloadedResourcesRef.current.add(url);

      return () => {
        try {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
          preloadedResourcesRef.current.delete(url);
        } catch (e) {
          // Ignore cleanup errors
        }
      };
    },
    [],
  );

  useEffect(() => {
    return () => {
      // Clean up all preloaded resources
      const links = document.querySelectorAll('link[rel="preload"]');
      links.forEach((link) => {
        if (
          preloadedResourcesRef.current.has(link.getAttribute("href") || "")
        ) {
          try {
            link.remove();
          } catch (e) {
            // Ignore cleanup errors
          }
        }
      });
      preloadedResourcesRef.current.clear();
    };
  }, []);

  return { preloadResource };
};
