import { createContext, useContext, ReactNode } from "react";
import {
  useDeviceDetection,
  useDeviceOptimizations,
  DeviceInfo,
} from "@/hooks/use-device-detection";

interface AdaptiveLayoutContextType {
  deviceInfo: DeviceInfo;
  optimizations: ReturnType<typeof useDeviceOptimizations>;
  getAdaptiveStyles: (baseStyles: string) => string;
  getAdaptiveProps: (component: string) => Record<string, any>;
}

const AdaptiveLayoutContext = createContext<AdaptiveLayoutContextType | null>(
  null,
);

export function AdaptiveLayoutProvider({ children }: { children: ReactNode }) {
  const deviceInfo = useDeviceDetection();
  const optimizations = useDeviceOptimizations(deviceInfo);

  const getAdaptiveStyles = (baseStyles: string): string => {
    let adaptiveStyles = baseStyles;

    // Device-specific style adjustments
    if (deviceInfo.deviceType === "mobile") {
      adaptiveStyles += " mobile-optimized";
    }

    if (deviceInfo.isTouchDevice) {
      adaptiveStyles += " touch-optimized";
    }

    if (!deviceInfo.hasHover) {
      adaptiveStyles += " no-hover";
    }

    if (deviceInfo.prefersReducedMotion) {
      adaptiveStyles += " reduced-motion";
    }

    if (deviceInfo.prefersContrast === "high") {
      adaptiveStyles += " high-contrast";
    }

    // Browser-specific fixes
    if (deviceInfo.browser === "safari") {
      adaptiveStyles += " safari-fix";
    }

    if (deviceInfo.browser === "firefox") {
      adaptiveStyles += " firefox-fix";
    }

    return adaptiveStyles;
  };

  const getAdaptiveProps = (component: string): Record<string, any> => {
    const props: Record<string, any> = {};

    switch (component) {
      case "button":
        props.style = {
          minHeight: optimizations.minTouchTarget,
          minWidth: optimizations.minTouchTarget,
        };
        if (deviceInfo.supportsVibration) {
          props.onTouchStart = () => {
            navigator.vibrate?.(10);
          };
        }
        break;

      case "input":
        props.style = {
          minHeight: optimizations.minTouchTarget,
          fontSize: optimizations.baseFontSize,
        };
        if (deviceInfo.deviceType === "mobile") {
          props.autoComplete = "off";
          props.autoCorrect = "off";
          props.autoCapitalize = "off";
          props.spellCheck = false;
        }
        break;

      case "modal":
        if (deviceInfo.deviceType === "mobile") {
          props.position = "bottom";
          props.maxHeight = "90vh";
        } else {
          props.position = "center";
          props.maxHeight = "80vh";
        }
        break;

      case "tooltip":
        if (deviceInfo.isTouchDevice) {
          props.trigger = "click";
          props.delay = 0;
        } else {
          props.trigger = "hover";
          props.delay = 500;
        }
        break;

      case "navigation":
        if (deviceInfo.deviceType === "mobile") {
          props.variant = "bottom";
          props.collapsible = true;
        } else {
          props.variant = "sidebar";
          props.collapsible = false;
        }
        break;

      case "table":
        if (deviceInfo.deviceType === "mobile") {
          props.responsive = "stack";
        } else {
          props.responsive = "scroll";
        }
        break;
    }

    return props;
  };

  return (
    <AdaptiveLayoutContext.Provider
      value={{
        deviceInfo,
        optimizations,
        getAdaptiveStyles,
        getAdaptiveProps,
      }}
    >
      <div
        className={getAdaptiveStyles("adaptive-layout")}
        data-device-type={deviceInfo.deviceType}
        data-os={deviceInfo.os}
        data-browser={deviceInfo.browser}
        data-screen-size={deviceInfo.screenSize}
        style={
          {
            fontSize: optimizations.baseFontSize,
            "--adaptive-spacing": `${optimizations.baseSpacing}px`,
            "--adaptive-touch-target": `${optimizations.minTouchTarget}px`,
            "--adaptive-animation-duration": `${optimizations.animationDuration}ms`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </AdaptiveLayoutContext.Provider>
  );
}

export function useAdaptiveLayout() {
  const context = useContext(AdaptiveLayoutContext);
  if (!context) {
    throw new Error(
      "useAdaptiveLayout must be used within an AdaptiveLayoutProvider",
    );
  }
  return context;
}

// Utility component for conditional rendering based on device
export function DeviceSpecific({
  mobile,
  tablet,
  desktop,
  children,
}: {
  mobile?: ReactNode;
  tablet?: ReactNode;
  desktop?: ReactNode;
  children?: ReactNode;
}) {
  const { deviceInfo } = useAdaptiveLayout();

  switch (deviceInfo.deviceType) {
    case "mobile":
      return mobile || children;
    case "tablet":
      return tablet || children;
    case "desktop":
      return desktop || children;
    default:
      return children;
  }
}

// Component for browser-specific rendering
export function BrowserSpecific({
  chrome,
  safari,
  firefox,
  edge,
  fallback,
}: {
  chrome?: ReactNode;
  safari?: ReactNode;
  firefox?: ReactNode;
  edge?: ReactNode;
  fallback?: ReactNode;
}) {
  const { deviceInfo } = useAdaptiveLayout();

  switch (deviceInfo.browser) {
    case "chrome":
      return chrome || fallback;
    case "safari":
      return safari || fallback;
    case "firefox":
      return firefox || fallback;
    case "edge":
      return edge || fallback;
    default:
      return fallback;
  }
}

// Hook for adaptive component behavior
export function useAdaptiveComponent(componentType: string) {
  const { getAdaptiveProps, getAdaptiveStyles, deviceInfo } =
    useAdaptiveLayout();

  return {
    props: getAdaptiveProps(componentType),
    styles: getAdaptiveStyles(""),
    deviceInfo,
    isTouch: deviceInfo.isTouchDevice,
    isMobile: deviceInfo.deviceType === "mobile",
    isTablet: deviceInfo.deviceType === "tablet",
    isDesktop: deviceInfo.deviceType === "desktop",
  };
}
