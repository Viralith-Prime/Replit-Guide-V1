import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoadingProps {
  variant?: "page" | "card" | "list" | "minimal";
  className?: string;
}

export function Loading({ variant = "minimal", className }: LoadingProps) {
  if (variant === "minimal") {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse" />
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse [animation-delay:0.2s]" />
          <div className="w-4 h-4 bg-primary rounded-full animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "list") {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // page variant
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Header skeleton */}
      <div className="border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-px" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar skeleton */}
        <div className="w-80 border-r border-border p-6 bg-muted/20 min-h-screen">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-3 rounded-lg">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <main className="flex-1 p-8 max-w-5xl">
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-4 w-3/4 mb-8" />

          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Loading key={i} variant="card" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// Loading overlay component
export function LoadingOverlay({
  show,
  message = "Loading...",
  className,
}: {
  show: boolean;
  message?: string;
  className?: string;
}) {
  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <Loading variant="minimal" />
        <p className="text-sm text-muted-foreground mt-4">{message}</p>
      </div>
    </div>
  );
}

// Spinner component for inline loading
export function Spinner({
  size = "sm",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-2 border-muted border-t-primary rounded-full animate-spin" />
    </div>
  );
}
