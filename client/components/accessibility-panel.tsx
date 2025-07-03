import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Accessibility,
  Type,
  Eye,
  Keyboard,
  Minus,
  Plus,
  Info,
} from "lucide-react";
import { useAccessibility } from "./accessibility-provider";

export function AccessibilityPanel() {
  const {
    options,
    updateOption,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
  } = useAccessibility();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Accessibility options">
          <Accessibility className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-sm mb-2 flex items-center space-x-2">
              <Accessibility className="h-4 w-4" />
              <span>Accessibility Options</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Customize your learning experience
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <div>
                  <div className="text-sm font-medium">High Contrast</div>
                  <div className="text-xs text-muted-foreground">
                    Improve text visibility
                  </div>
                </div>
              </div>
              <Switch
                checked={options.highContrast}
                onCheckedChange={toggleHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Keyboard className="h-4 w-4" />
                <div>
                  <div className="text-sm font-medium">Keyboard Navigation</div>
                  <div className="text-xs text-muted-foreground">
                    Enhanced keyboard shortcuts
                  </div>
                </div>
              </div>
              <Switch
                checked={options.keyboardNavigation}
                onCheckedChange={(value) =>
                  updateOption("keyboardNavigation", value)
                }
                aria-label="Toggle keyboard navigation enhancements"
              />
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Type className="h-4 w-4" />
                <div className="text-sm font-medium">Font Size</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={decreaseFontSize}
                  disabled={options.fontSize === "normal"}
                  aria-label="Decrease font size"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm px-3 py-1 bg-muted rounded">
                  {options.fontSize === "normal"
                    ? "Normal"
                    : options.fontSize === "large"
                      ? "Large"
                      : "Extra Large"}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={increaseFontSize}
                  disabled={options.fontSize === "extra-large"}
                  aria-label="Increase font size"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-sm font-medium">Reduced Motion</div>
                  <div className="text-xs text-muted-foreground">
                    Minimize animations
                  </div>
                </div>
              </div>
              <Switch
                checked={options.reducedMotion}
                onCheckedChange={(value) =>
                  updateOption("reducedMotion", value)
                }
                aria-label="Toggle reduced motion"
              />
            </div>
          </div>

          <Separator />

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                <div className="font-medium text-blue-700 dark:text-blue-300 mb-1">
                  Keyboard Shortcuts:
                </div>
                <ul className="space-y-1 text-blue-600 dark:text-blue-400">
                  <li>Alt + M: Skip to main content</li>
                  <li>Alt + N: Skip to navigation</li>
                  <li>Alt + Shift + C: Toggle high contrast</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
