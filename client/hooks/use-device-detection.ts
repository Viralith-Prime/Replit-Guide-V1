import { useState, useEffect } from "react";

export interface DeviceInfo {
  // Device type
  deviceType: "desktop" | "tablet" | "mobile";

  // Operating system
  os: "windows" | "macos" | "linux" | "ios" | "android" | "unknown";
  osVersion?: string;

  // Browser
  browser: "chrome" | "safari" | "firefox" | "edge" | "unknown";
  browserVersion?: string;

  // Capabilities
  isTouchDevice: boolean;
  hasHover: boolean;
  hasKeyboard: boolean;
  hasPointer: boolean;
  supportsVibration: boolean;

  // Screen
  screenSize: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  pixelRatio: number;
  orientation: "portrait" | "landscape";

  // Performance indicators
  connectionType?: "slow-2g" | "2g" | "3g" | "4g" | "unknown";
  deviceMemory?: number;
  hardwareConcurrency: number;

  // Accessibility
  prefersReducedMotion: boolean;
  prefersColorScheme: "light" | "dark" | "no-preference";
  prefersContrast: "high" | "low" | "no-preference";
}

function parseUserAgent(): Partial<DeviceInfo> {
  const ua = navigator.userAgent.toLowerCase();
  const info: Partial<DeviceInfo> = {};

  // Detect OS
  if (ua.includes("windows")) {
    info.os = "windows";
    const match = ua.match(/windows nt ([\d.]+)/);
    info.osVersion = match ? match[1] : undefined;
  } else if (ua.includes("mac os x") || ua.includes("macos")) {
    info.os = "macos";
    const match = ua.match(/mac os x ([\d_]+)/);
    info.osVersion = match ? match[1].replace(/_/g, ".") : undefined;
  } else if (ua.includes("linux")) {
    info.os = "linux";
  } else if (ua.includes("iphone") || ua.includes("ipad")) {
    info.os = "ios";
    const match = ua.match(/os ([\d_]+)/);
    info.osVersion = match ? match[1].replace(/_/g, ".") : undefined;
  } else if (ua.includes("android")) {
    info.os = "android";
    const match = ua.match(/android ([\d.]+)/);
    info.osVersion = match ? match[1] : undefined;
  } else {
    info.os = "unknown";
  }

  // Detect browser
  if (ua.includes("edg/")) {
    info.browser = "edge";
    const match = ua.match(/edg\/([\d.]+)/);
    info.browserVersion = match ? match[1] : undefined;
  } else if (ua.includes("chrome/")) {
    info.browser = "chrome";
    const match = ua.match(/chrome\/([\d.]+)/);
    info.browserVersion = match ? match[1] : undefined;
  } else if (ua.includes("safari/") && !ua.includes("chrome")) {
    info.browser = "safari";
    const match = ua.match(/version\/([\d.]+)/);
    info.browserVersion = match ? match[1] : undefined;
  } else if (ua.includes("firefox/")) {
    info.browser = "firefox";
    const match = ua.match(/firefox\/([\d.]+)/);
    info.browserVersion = match ? match[1] : undefined;
  } else {
    info.browser = "unknown";
  }

  return info;
}

function getScreenSize(width: number): DeviceInfo["screenSize"] {
  if (width < 640) return "xs";
  if (width < 768) return "sm";
  if (width < 1024) return "md";
  if (width < 1280) return "lg";
  if (width < 1536) return "xl";
  return "2xl";
}

function getDeviceType(
  width: number,
  isTouchDevice: boolean,
): DeviceInfo["deviceType"] {
  if (width < 768) return "mobile";
  if (width < 1024 && isTouchDevice) return "tablet";
  return "desktop";
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    // Server-side or initial client-side defaults
    return {
      deviceType: "desktop",
      os: "unknown",
      browser: "unknown",
      isTouchDevice: false,
      hasHover: true,
      hasKeyboard: true,
      hasPointer: true,
      supportsVibration: false,
      screenSize: "lg",
      pixelRatio: 1,
      orientation: "landscape",
      hardwareConcurrency: 1,
      prefersReducedMotion: false,
      prefersColorScheme: "no-preference",
      prefersContrast: "no-preference",
    };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Parse user agent
      const uaInfo = parseUserAgent();

      // Touch detection
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        ((window as any).DocumentTouch &&
          document instanceof (window as any).DocumentTouch);

      // Hover capability
      const hasHover = window.matchMedia("(hover: hover)").matches;

      // Pointer type
      const hasPointer = window.matchMedia("(pointer: fine)").matches;

      // Vibration support
      const supportsVibration = "vibrate" in navigator;

      // Screen info
      const screenSize = getScreenSize(width);
      const deviceType = getDeviceType(width, isTouchDevice);
      const pixelRatio = window.devicePixelRatio || 1;
      const orientation = width > height ? "landscape" : "portrait";

      // Performance hints
      const connection = (navigator as any).connection;
      const connectionType = connection?.effectiveType || "unknown";
      const deviceMemory = (navigator as any).deviceMemory;
      const hardwareConcurrency = navigator.hardwareConcurrency || 1;

      // Accessibility preferences
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const prefersColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches
        ? "dark"
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "no-preference";
      const prefersContrast = window.matchMedia("(prefers-contrast: high)")
        .matches
        ? "high"
        : window.matchMedia("(prefers-contrast: low)").matches
          ? "low"
          : "no-preference";

      const newDeviceInfo: DeviceInfo = {
        ...uaInfo,
        deviceType,
        isTouchDevice,
        hasHover,
        hasKeyboard: deviceType === "desktop" || !isTouchDevice,
        hasPointer,
        supportsVibration,
        screenSize,
        pixelRatio,
        orientation,
        connectionType,
        deviceMemory,
        hardwareConcurrency,
        prefersReducedMotion,
        prefersColorScheme,
        prefersContrast,
      } as DeviceInfo;

      setDeviceInfo(newDeviceInfo);
    };

    // Initial detection
    updateDeviceInfo();

    // Listen for changes
    const handleResize = () => updateDeviceInfo();
    const handleOrientationChange = () => updateDeviceInfo();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    // Listen for preference changes
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const colorQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const contrastQuery = window.matchMedia("(prefers-contrast: high)");

    const handleMediaChange = () => updateDeviceInfo();

    motionQuery.addEventListener("change", handleMediaChange);
    colorQuery.addEventListener("change", handleMediaChange);
    contrastQuery.addEventListener("change", handleMediaChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      motionQuery.removeEventListener("change", handleMediaChange);
      colorQuery.removeEventListener("change", handleMediaChange);
      contrastQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return deviceInfo;
}

// Hook for device-specific optimizations
export function useDeviceOptimizations(deviceInfo: DeviceInfo) {
  return {
    // Touch targets
    minTouchTarget: deviceInfo.isTouchDevice ? 44 : 32,

    // Font sizes
    baseFontSize: deviceInfo.screenSize === "xs" ? 14 : 16,

    // Spacing
    baseSpacing: deviceInfo.deviceType === "mobile" ? 12 : 16,

    // Animation preferences
    enableAnimations: !deviceInfo.prefersReducedMotion,
    animationDuration: deviceInfo.prefersReducedMotion ? 0 : 300,

    // Interaction optimizations
    hoverEnabled: deviceInfo.hasHover,
    keyboardNavigation: deviceInfo.hasKeyboard,

    // Performance optimizations
    enableLazyLoading:
      deviceInfo.connectionType === "slow-2g" ||
      deviceInfo.connectionType === "2g",
    imageQuality: deviceInfo.connectionType === "4g" ? 85 : 70,

    // Layout adjustments
    sidebarCollapsed: deviceInfo.deviceType === "mobile",
    compactMode:
      deviceInfo.screenSize === "xs" || deviceInfo.screenSize === "sm",
  };
}
