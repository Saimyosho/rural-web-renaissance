import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import SkipToContent from "./components/SkipToContent";
import GeminiChatbot from "./components/GeminiChatbot";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load secondary pages for better performance
const Pricing = lazy(() => import("./pages/Pricing"));
const Trust = lazy(() => import("./pages/Trust"));
const Services = lazy(() => import("./pages/Services"));
const Expertise = lazy(() => import("./pages/Expertise"));
const Process = lazy(() => import("./pages/Process"));
const AIAgents = lazy(() => import("./pages/AIAgents"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ForBusinessOwners = lazy(() => import("./pages/ForBusinessOwners"));
const Restaurants = lazy(() => import("./pages/industries/Restaurants"));
const Salons = lazy(() => import("./pages/industries/Salons"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SkipToContent />
      <GeminiChatbot />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/trust" element={<Trust />} />
            <Route path="/services" element={<Services />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/process" element={<Process />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/for-business-owners" element={<ForBusinessOwners />} />
            <Route path="/industries/restaurants" element={<Restaurants />} />
            <Route path="/industries/salons" element={<Salons />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
