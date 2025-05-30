
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import Analytics from "./pages/Analytics";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import CandidatePortal from "./pages/CandidatePortal";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateApplication from "./pages/CandidateApplication";
import CandidateJobs from "./pages/CandidateJobs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Candidate Portal Routes */}
          <Route path="/candidate-portal" element={<CandidatePortal />} />
          <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
          <Route path="/candidate-jobs" element={<CandidateJobs />} />
          <Route path="/apply/:jobId" element={<CandidateApplication />} />
          
          {/* Main App Routes */}
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="max-w-7xl mx-auto px-6 py-8">
                <Dashboard />
              </main>
            </div>
          } />
          <Route path="/candidates" element={
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="max-w-7xl mx-auto px-6 py-8">
                <Candidates />
              </main>
            </div>
          } />
          <Route path="/jobs" element={
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="max-w-7xl mx-auto px-6 py-8">
                <Jobs />
              </main>
            </div>
          } />
          <Route path="/analytics" element={
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="max-w-7xl mx-auto px-6 py-8">
                <Analytics />
              </main>
            </div>
          } />
          <Route path="/search" element={
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="max-w-7xl mx-auto px-6 py-8">
                <Search />
              </main>
            </div>
          } />
          <Route path="/settings" element={
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="max-w-7xl mx-auto px-6 py-8">
                <Settings />
              </main>
            </div>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
