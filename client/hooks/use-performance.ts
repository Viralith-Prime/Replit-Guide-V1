import { useEffect, useRef, useState } from "react";

// Hook to measure component render performance
export function usePerformanceMonitor(componentName: string) {
  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  useEffect(() => {
    renderStartTime.current = performance.now();
    renderCount.current += 1;
  });

  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;

    // Log slow renders (>16ms is 1 frame at 60fps)
    if (renderTime > 16) {
      console.warn(
        `Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms (render #${renderCount.current})`,
      );
    }

    // In production, you might send this to an analytics service
    if (process.env.NODE_ENV === "production" && renderTime > 100) {
      // sendToAnalytics("slow_render", { component: componentName, time: renderTime });
    }
  });
}

// Hook to monitor page load performance
export function usePagePerformance() {
  const [metrics, setMetrics] = useState<{
    loadTime?: number;
    domContentLoaded?: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
  }>({});

  useEffect(() => {
    // Wait for page to fully load
    const handleLoad = () => {
      const navigation = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        setMetrics({
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded:
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart,
        });
      }

      // Get paint metrics
      const paintEntries = performance.getEntriesByType("paint");
      const fcpEntry = paintEntries.find(
        (entry) => entry.name === "first-contentful-paint",
      );

      if (fcpEntry) {
        setMetrics((prev) => ({
          ...prev,
          firstContentfulPaint: fcpEntry.startTime,
        }));
      }

      // Largest Contentful Paint
      if ("LargestContentfulPaint" in window) {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics((prev) => ({
            ...prev,
            largestContentfulPaint: lastEntry.startTime,
          }));
        }).observe({ entryTypes: ["largest-contentful-paint"] });
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return metrics;
}

// Hook to measure user interaction performance
export function useInteractionPerformance() {
  const [interactions, setInteractions] = useState<
    Array<{
      type: string;
      duration: number;
      timestamp: number;
    }>
  >([]);

  useEffect(() => {
    const measureInteraction = (type: string) => (event: Event) => {
      const startTime = performance.now();

      // Use requestIdleCallback to measure after interaction is complete
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          const duration = performance.now() - startTime;
          setInteractions((prev) => [
            ...prev.slice(-9),
            {
              // Keep last 10 interactions
              type,
              duration,
              timestamp: Date.now(),
            },
          ]);
        });
      }
    };

    const clickHandler = measureInteraction("click");
    const scrollHandler = measureInteraction("scroll");
    const keypressHandler = measureInteraction("keypress");

    document.addEventListener("click", clickHandler);
    document.addEventListener("scroll", scrollHandler, { passive: true });
    document.addEventListener("keypress", keypressHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("scroll", scrollHandler);
      document.removeEventListener("keypress", keypressHandler);
    };
  }, []);

  return interactions;
}

// Hook to track memory usage
export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<{
    used?: number;
    total?: number;
    limit?: number;
  }>({});

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        setMemoryInfo({
          used: memory.usedJSHeapSize,
          total: memory.totalJSHeapSize,
          limit: memory.jsHeapSizeLimit,
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}

// Utility function to format bytes
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
