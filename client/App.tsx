import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GettingStarted from "./pages/GettingStarted";
import CoreFeatures from "./pages/CoreFeatures";
import AITools from "./pages/AITools";
import Community from "./pages/Community";
import Pricing from "./pages/Pricing";
import Advanced from "./pages/Advanced";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="replit-guide-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/core-features" element={<CoreFeatures />} />
            <Route path="/ai-tools" element={<AITools />} />
            <Route path="/community" element={<Community />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/advanced" element={<Advanced />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
