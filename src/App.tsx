import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAPS_CONFIG } from "./config/maps";
import Index from "./pages/Index";
import FindMeetup from "./pages/FindMeetup";
import About from "./pages/About";
import VotingRoom from "./pages/VotingRoom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_CONFIG.apiKey}
        libraries={libraries}
        loadingElement={
          <div className="fixed inset-0 flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium">Loading maps...</p>
            </div>
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/find-meetup" element={<FindMeetup />} />
            <Route path="/about" element={<About />} />
            <Route path="/voting/:sessionId" element={<VotingRoom />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LoadScript>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
