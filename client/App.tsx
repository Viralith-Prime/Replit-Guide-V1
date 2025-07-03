import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { ProgressProvider } from "@/components/progress-provider";
import { AccessibilityProvider } from "@/components/accessibility-provider";
import { AdaptiveLayoutProvider } from "@/components/adaptive-layout-provider";
import { AuthProvider } from "@/components/auth-provider";
import { AuthModal } from "@/components/auth-modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Loading } from "@/components/loading";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GettingStarted = lazy(() => import("./pages/GettingStarted"));
const CoreFeatures = lazy(() => import("./pages/CoreFeatures"));
const AITools = lazy(() => import("./pages/AITools"));
const Community = lazy(() => import("./pages/Community"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Advanced = lazy(() => import("./pages/Advanced"));

const queryClient = new QueryClient();

const App = () => (
  <AccessibilityProvider>
    <AdaptiveLayoutProvider>
      <ThemeProvider defaultTheme="dark" storageKey="replit-guide-theme">
        <ProgressProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ErrorBoundary>
                    <Suspense fallback={<Loading variant="page" />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route
                          path="/getting-started"
                          element={<GettingStarted />}
                        />
                        <Route
                          path="/core-features"
                          element={<CoreFeatures />}
                        />
                        <Route path="/ai-tools" element={<AITools />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/advanced" element={<Advanced />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                    <AuthModal />
                  </ErrorBoundary>
                </BrowserRouter>
              </TooltipProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ProgressProvider>
      </ThemeProvider>
    </AdaptiveLayoutProvider>
  </AccessibilityProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
