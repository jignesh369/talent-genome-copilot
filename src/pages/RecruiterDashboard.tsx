
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/components/auth/AuthProvider';
import UserProfileDropdown from '@/components/navigation/UserProfileDropdown';
import NotificationDropdown from '@/components/navigation/NotificationDropdown';
import InviteMemberModal from '@/components/modals/InviteMemberModal';
import CreateJobForm from '@/components/forms/CreateJobForm';
import { useToast } from '@/hooks/use-toast';
import CandidatePipeline from '@/components/admin/CandidatePipeline';
import JobsManagement from '@/components/recruiter/JobsManagement';
import CandidatesManagement from '@/components/recruiter/CandidatesManagement';
import AIMatchingEngine from '@/components/recruiter/AIMatchingEngine';
import EnhancedInterviewManagement from '@/components/recruiter/EnhancedInterviewManagement';
import CommunicationHub from '@/components/recruiter/CommunicationHub';
import WelcomeSection from '@/components/recruiter/WelcomeSection';
import EnhancedStatsGrid from '@/components/recruiter/EnhancedStatsGrid';
import QuickActionsGrid from '@/components/recruiter/QuickActionsGrid';
import AnalyticsCharts from '@/components/recruiter/AnalyticsCharts';
import RecentActivityCard from '@/components/recruiter/RecentActivityCard';
import PipelineOverview from '@/components/recruiter/PipelineOverview';
import TeamManagement from '@/components/recruiter/TeamManagement';
import { Button } from '@/components/ui/button';
import { 
  Building,
  Search,
  BarChart3,
  Briefcase,
  Users,
  TrendingUp,
  Brain,
  Calendar,
  MessageSquare,
  UserPlus,
  Clock
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  // Enhanced stats with trend indicators
  const stats = [
    {
      title: "Active Candidates",
      value: "1,247",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "vs last month"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-30%",
      trend: "down" as const,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "avg reduction"
    },
    {
      title: "Response Rate",
      value: "42%",
      change: "+8%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "outreach success"
    },
    {
      title: "AI Match Score",
      value: "89%",
      change: "+5%",
      trend: "up" as const,
      icon: Brain,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "accuracy improved"
    }
  ];

  const handleInviteMember = (memberData: any) => {
    toast({
      title: "Member Invited",
      description: `Invitation sent to ${memberData.email}`,
    });
    setShowInviteModal(false);
  };

  const handleCreateJob = (jobData: any) => {
    toast({
      title: "Job Created",
      description: `${jobData.title} has been posted successfully.`,
    });
    setShowCreateJobModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with gradient */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Recruiter Platform</h1>
                <p className="text-sm text-gray-600">Your unified recruiting command center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => window.location.href = '/search'}>
                <Search className="w-4 h-4 mr-2" />
                AI Search
              </Button>
              <NotificationDropdown />
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Candidates</span>
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Pipeline</span>
            </TabsTrigger>
            <TabsTrigger value="ai-matching" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>AI Matching</span>
            </TabsTrigger>
            <TabsTrigger value="interviews" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Interviews</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Communications</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Team</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <WelcomeSection 
              userName={user?.user_metadata?.first_name} 
              onCreateJob={() => setShowCreateJobModal(true)} 
            />
            
            <EnhancedStatsGrid stats={stats} />
            
            <QuickActionsGrid onCreateJob={() => setShowCreateJobModal(true)} />
            
            <AnalyticsCharts />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivityCard />
              <div className="lg:col-span-1">
                <PipelineOverview />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <JobsManagement />
          </TabsContent>

          <TabsContent value="candidates">
            <CandidatesManagement />
          </TabsContent>

          <TabsContent value="pipeline">
            <CandidatePipeline showCandidates={true} />
          </TabsContent>

          <TabsContent value="ai-matching">
            <AIMatchingEngine />
          </TabsContent>

          <TabsContent value="interviews">
            <EnhancedInterviewManagement />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationHub />
          </TabsContent>

          <TabsContent value="team">
            <TeamManagement onInviteMember={() => setShowInviteModal(true)} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteMember}
      />

      <Dialog open={showCreateJobModal} onOpenChange={setShowCreateJobModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
          </DialogHeader>
          <CreateJobForm
            onSubmit={handleCreateJob}
            onCancel={() => setShowCreateJobModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecruiterDashboard;
