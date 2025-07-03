import { createContext, useContext, useEffect, useState } from "react";

type AccessibilityOptions = {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: "normal" | "large" | "extra-large";
  keyboardNavigation: boolean;
};

type AccessibilityProviderState = {
  options: AccessibilityOptions;
  updateOption: (key: keyof AccessibilityOptions, value: any) => void;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

const initialOptions: AccessibilityOptions = {
  highContrast: false,
  reducedMotion: false,
  fontSize: "normal",
  keyboardNavigation: true,
};

const AccessibilityContext = createContext<AccessibilityProviderState>({
  options: initialOptions,
  updateOption: () => null,
  toggleHighContrast: () => null,
  increaseFontSize: () => null,
  decreaseFontSize: () => null,
});

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [options, setOptions] = useState<AccessibilityOptions>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("replit-guide-accessibility");
      if (saved) {
        return { ...initialOptions, ...JSON.parse(saved) };
      }
      // Check for system preferences
      return {
        ...initialOptions,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches,
      };
    }
    return initialOptions;
  });

  useEffect(() => {
    localStorage.setItem("replit-guide-accessibility", JSON.stringify(options));

    // Apply CSS classes based on options
    const root = document.documentElement;

    // High contrast
    if (options.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Font size
    root.classList.remove("font-large", "font-extra-large");
    if (options.fontSize === "large") {
      root.classList.add("font-large");
    } else if (options.fontSize === "extra-large") {
      root.classList.add("font-extra-large");
    }

    // Reduced motion
    if (options.reducedMotion) {
      root.classList.add("reduce-motion");
    } else {
      root.classList.remove("reduce-motion");
    }
  }, [options]);

  useEffect(() => {
    // Keyboard navigation enhancements
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!options.keyboardNavigation) return;

      // Skip to main content (Alt + M)
      if (e.altKey && e.key === "m") {
        e.preventDefault();
        const main = document.querySelector("main");
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: "smooth" });
        }
      }

      // Skip to navigation (Alt + N)
      if (e.altKey && e.key === "n") {
        e.preventDefault();
        const nav = document.querySelector("nav");
        if (nav) {
          const firstLink = nav.querySelector("a, button");
          if (firstLink) {
            (firstLink as HTMLElement).focus();
          }
        }
      }

      // Toggle high contrast (Alt + Shift + C)
      if (e.altKey && e.shiftKey && e.key === "C") {
        e.preventDefault();
        toggleHighContrast();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [options.keyboardNavigation]);

  const updateOption = (key: keyof AccessibilityOptions, value: any) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const toggleHighContrast = () => {
    setOptions((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const increaseFontSize = () => {
    setOptions((prev) => ({
      ...prev,
      fontSize:
        prev.fontSize === "normal"
          ? "large"
          : prev.fontSize === "large"
            ? "extra-large"
            : "extra-large",
    }));
  };

  const decreaseFontSize = () => {
    setOptions((prev) => ({
      ...prev,
      fontSize:
        prev.fontSize === "extra-large"
          ? "large"
          : prev.fontSize === "large"
            ? "normal"
            : "normal",
    }));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        options,
        updateOption,
        toggleHighContrast,
        increaseFontSize,
        decreaseFontSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
};
