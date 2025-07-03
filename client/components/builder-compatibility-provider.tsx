import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import { isBuilderIOEnvironment, PerformanceMonitor } from "@/lib/performance";

interface BuilderCompatibilityState {
  isBuilderEnvironment: boolean;
  deviceType: "desktop" | "tablet" | "mobile";
  orientation: "portrait" | "landscape";
  isLiveEditing: boolean;
  previewMode: boolean;
  environmentReady: boolean;
}

interface BuilderCompatibilityContextType extends BuilderCompatibilityState {
  updateDeviceType: (type: "desktop" | "tablet" | "mobile") => void;
  updateOrientation: (orientation: "portrait" | "landscape") => void;
  setLiveEditing: (editing: boolean) => void;
  setPreviewMode: (preview: boolean) => void;
  handleEnvironmentError: (error: Error, errorInfo?: any) => void;
  isOptimizedForBuilder: boolean;
}

const BuilderCompatibilityContext = createContext<
  BuilderCompatibilityContextType | undefined
>(undefined);

// Error boundary specifically for Builder.IO environment
class BuilderEnvironmentErrorBoundary extends React.Component<
  { children: ReactNode; onError: (error: Error, errorInfo: any) => void },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.props.onError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20">
          <h3 className="font-semibold text-red-800 dark:text-red-200">
            Builder.IO Environment Error
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300 mt-1">
            An error occurred in the Builder.IO preview environment. The app is
            recovering...
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function BuilderCompatibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<BuilderCompatibilityState>({
    isBuilderEnvironment: false,
    deviceType: "desktop",
    orientation: "portrait",
    isLiveEditing: false,
    previewMode: false,
    environmentReady: false,
  });

  const performanceMonitorRef = useRef<PerformanceMonitor>();
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const orientationTimeoutRef = useRef<NodeJS.Timeout>();
  const errorCountRef = useRef<number>(0);
  const lastErrorTimeRef = useRef<number>(0);

  // Detect device type based on viewport for Builder.IO compatibility
  const detectDeviceType = useCallback((): "desktop" | "tablet" | "mobile" => {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }, []);

  // Detect orientation
  const detectOrientation = useCallback((): "portrait" | "landscape" => {
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
  }, []);

  // Handle environment errors with recovery
  const handleEnvironmentError = useCallback(
    (error: Error, errorInfo?: any) => {
      const now = Date.now();

      // Prevent error spam
      if (now - lastErrorTimeRef.current < 1000) {
        return;
      }

      lastErrorTimeRef.current = now;
      errorCountRef.current += 1;

      console.error("Builder.IO Environment Error:", error, errorInfo);

      // Reset error count after 30 seconds
      setTimeout(() => {
        errorCountRef.current = 0;
      }, 30000);

      // If too many errors, temporarily disable some features
      if (errorCountRef.current > 5) {
        setState((prev) => ({
          ...prev,
          isLiveEditing: false,
          previewMode: true,
        }));
      }
    },
    [],
  );

  // Optimized resize handler for Builder.IO environment
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(
      () => {
        const newDeviceType = detectDeviceType();
        const newOrientation = detectOrientation();

        setState((prev) => {
          if (
            prev.deviceType !== newDeviceType ||
            prev.orientation !== newOrientation
          ) {
            return {
              ...prev,
              deviceType: newDeviceType,
              orientation: newOrientation,
            };
          }
          return prev;
        });
      },
      state.isBuilderEnvironment ? 50 : 150,
    ); // Faster response in Builder.IO
  }, [detectDeviceType, detectOrientation, state.isBuilderEnvironment]);

  // Handle orientation change with stability measures
  const handleOrientationChange = useCallback(() => {
    if (orientationTimeoutRef.current) {
      clearTimeout(orientationTimeoutRef.current);
    }

    orientationTimeoutRef.current = setTimeout(() => {
      handleResize();
    }, 100);
  }, [handleResize]);

  // Initialize environment detection
  useEffect(() => {
    const isBuilder = isBuilderIOEnvironment();
    const monitor = PerformanceMonitor.getInstance();
    performanceMonitorRef.current = monitor;

    if (isBuilder) {
      monitor.clearMetrics(); // Clean slate for Builder.IO environment
    } else {
      monitor.initializeObservers();
    }

    setState((prev) => ({
      ...prev,
      isBuilderEnvironment: isBuilder,
      deviceType: detectDeviceType(),
      orientation: detectOrientation(),
      previewMode: isBuilder,
      environmentReady: true,
    }));

    // Add event listeners with proper cleanup
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleOrientationChange, {
      passive: true,
    });

    // Builder.IO specific event listeners
    if (isBuilder) {
      const handleBuilderMessage = (event: MessageEvent) => {
        try {
          if (event.data?.type === "builder.deviceChange") {
            setState((prev) => ({
              ...prev,
              deviceType: event.data.device || prev.deviceType,
            }));
          } else if (event.data?.type === "builder.editingChange") {
            setState((prev) => ({
              ...prev,
              isLiveEditing: event.data.editing || false,
            }));
          }
        } catch (error) {
          handleEnvironmentError(error as Error);
        }
      };

      window.addEventListener("message", handleBuilderMessage);

      return () => {
        window.removeEventListener("message", handleBuilderMessage);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange,
        );
        monitor.cleanup();

        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        if (orientationTimeoutRef.current) {
          clearTimeout(orientationTimeoutRef.current);
        }
      };
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      monitor.cleanup();

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (orientationTimeoutRef.current) {
        clearTimeout(orientationTimeoutRef.current);
      }
    };
  }, [
    detectDeviceType,
    detectOrientation,
    handleResize,
    handleOrientationChange,
    handleEnvironmentError,
  ]);

  // Context value with memoization for performance
  const contextValue = useMemo<BuilderCompatibilityContextType>(
    () => ({
      ...state,
      updateDeviceType: (type: "desktop" | "tablet" | "mobile") => {
        setState((prev) => ({ ...prev, deviceType: type }));
      },
      updateOrientation: (orientation: "portrait" | "landscape") => {
        setState((prev) => ({ ...prev, orientation }));
      },
      setLiveEditing: (editing: boolean) => {
        setState((prev) => ({ ...prev, isLiveEditing: editing }));
      },
      setPreviewMode: (preview: boolean) => {
        setState((prev) => ({ ...prev, previewMode: preview }));
      },
      handleEnvironmentError,
      isOptimizedForBuilder: state.isBuilderEnvironment,
    }),
    [state, handleEnvironmentError],
  );

  return (
    <BuilderCompatibilityContext.Provider value={contextValue}>
      <BuilderEnvironmentErrorBoundary onError={handleEnvironmentError}>
        {children}
      </BuilderEnvironmentErrorBoundary>
    </BuilderCompatibilityContext.Provider>
  );
}

export function useBuilderCompatibility() {
  const context = useContext(BuilderCompatibilityContext);
  if (context === undefined) {
    throw new Error(
      "useBuilderCompatibility must be used within a BuilderCompatibilityProvider",
    );
  }
  return context;
}

// HOC for Builder.IO optimized components
export function withBuilderOptimization<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    skipInBuilder?: boolean;
    fallbackComponent?: React.ComponentType<P>;
  } = {},
) {
  const OptimizedComponent = React.memo((props: P) => {
    const { isBuilderEnvironment, environmentReady } =
      useBuilderCompatibility();

    if (!environmentReady) {
      return <div className="animate-pulse bg-muted h-20 rounded" />;
    }

    if (isBuilderEnvironment && options.skipInBuilder) {
      return options.fallbackComponent ? (
        <options.fallbackComponent {...props} />
      ) : (
        <div className="p-4 bg-muted/50 rounded border-2 border-dashed border-muted-foreground/20 text-center text-sm text-muted-foreground">
          Component optimized for production view
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  });

  OptimizedComponent.displayName = `withBuilderOptimization(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return OptimizedComponent;
}
