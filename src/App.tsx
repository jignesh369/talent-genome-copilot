
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SmartLanding from "./components/smart-landing/SmartLanding";
import AuthPage from "./components/auth/AuthPage";
import StartupAdmin from "./pages/StartupAdmin";
import CustomerAdmin from "./pages/CustomerAdmin";
import RecruiterLayout from "./components/recruiter/RecruiterLayout";
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
import CandidateInterviews from "./pages/CandidateInterviews";
import CandidateMessages from "./pages/CandidateMessages";
import CandidateOffers from "./pages/CandidateOffers";
import CandidateProfile from "./pages/CandidateProfile";
import CandidateAssessments from "./pages/CandidateAssessments";
import CandidateAssessment from "./pages/CandidateAssessment";
import HiringManagerDashboard from "./pages/HiringManagerDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ResumeParser from "./pages/ResumeParser";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<SmartLanding />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/candidate-portal" element={<CandidatePortal />} />
            <Route path="/resume-parser" element={<ResumeParser />} />
            
            {/* Admin Routes */}
            <Route path="/startup-admin" element={
              <ProtectedRoute allowedRoles={['startup_admin']}>
                <StartupAdmin />
              </ProtectedRoute>
            } />
            <Route path="/customer-admin" element={
              <ProtectedRoute allowedRoles={['customer_admin']}>
                <CustomerAdmin />
              </ProtectedRoute>
            } />
            
            {/* Candidate Portal Routes */}
            <Route path="/candidate-dashboard" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateDashboard />
              </ProtectedRoute>
            } />
            <Route path="/candidate-jobs" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateJobs />
              </ProtectedRoute>
            } />
            <Route path="/candidate-assessments" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateAssessments />
              </ProtectedRoute>
            } />
            <Route path="/candidate-interviews" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateInterviews />
              </ProtectedRoute>
            } />
            <Route path="/candidate-messages" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateMessages />
              </ProtectedRoute>
            } />
            <Route path="/candidate-offers" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateOffers />
              </ProtectedRoute>
            } />
            <Route path="/candidate-profile" element={
              <ProtectedRoute allowedRoles={['candidate']}>
                <CandidateProfile />
              </ProtectedRoute>
            } />
            <Route path="/apply/:jobId" element={<CandidateApplication />} />
            
            {/* Assessment Routes - Updated to match navigation calls */}
            <Route path="/assessment/demo" element={<CandidateAssessment />} />
            <Route path="/assessment/:assessmentId" element={<CandidateAssessment />} />
            
            {/* Hiring Manager Routes */}
            <Route path="/hiring-manager" element={
              <ProtectedRoute allowedRoles={['hiring_manager']}>
                <HiringManagerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Unified Recruiter Dashboard Route */}
            <Route path="/recruiter-dashboard" element={
              <ProtectedRoute allowedRoles={['recruiter', 'hiring_manager']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            } />
            
            {/* Main Dashboard - Redirects to RecruiterDashboard for recruiters/hiring managers */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['recruiter', 'hiring_manager']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            } />
            
            {/* Individual Pages with Unified Layout */}
            <Route path="/candidates" element={
              <ProtectedRoute allowedRoles={['recruiter', 'hiring_manager']}>
                <RecruiterLayout>
                  <Candidates />
                </RecruiterLayout>
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute allowedRoles={['recruiter', 'hiring_manager']}>
                <RecruiterLayout>
                  <Jobs />
                </RecruiterLayout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute allowedRoles={['recruiter', 'hiring_manager']}>
                <RecruiterLayout>
                  <Analytics />
                </RecruiterLayout>
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute allowedRoles={['recruiter', 'hiring_manager']}>
                <RecruiterLayout>
                  <Search />
                </RecruiterLayout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <RecruiterLayout>
                  <Settings />
                </RecruiterLayout>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
