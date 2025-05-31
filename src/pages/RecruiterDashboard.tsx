
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/components/auth/AuthProvider';
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
import QuickActionsGrid from '@/components/recruiter/QuickActionsGrid';
import AnalyticsCharts from '@/components/recruiter/AnalyticsCharts';
import RecentActivityCard from '@/components/recruiter/RecentActivityCard';
import PipelineOverview from '@/components/recruiter/PipelineOverview';
import TeamManagement from '@/components/recruiter/TeamManagement';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import ConsistentStatsCard from '@/components/recruiter/ConsistentStatsCard';
import { 
  Users,
  Clock,
  TrendingUp,
  Brain
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  // Enhanced stats with consistent format
  const stats = [
    {
      title: "Active Candidates",
      value: "1,247",
      change: "+12%",
      trend: "up" as const,
      icon: Users,
      color: "blue",
      description: "vs last month"
    },
    {
      title: "Time to Hire",
      value: "18 days",
      change: "-30%",
      trend: "down" as const,
      icon: Clock,
      color: "green",
      description: "avg reduction"
    },
    {
      title: "Response Rate",
      value: "42%",
      change: "+8%",
      trend: "up" as const,
      icon: TrendingUp,
      color: "purple",
      description: "outreach success"
    },
    {
      title: "AI Match Score",
      value: "89%",
      change: "+5%",
      trend: "up" as const,
      icon: Brain,
      color: "emerald",
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

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <WelcomeSection 
              userName={user?.user_metadata?.first_name} 
              onCreateJob={() => setShowCreateJobModal(true)} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <ConsistentStatsCard key={stat.title} {...stat} />
              ))}
            </div>
            
            <QuickActionsGrid onCreateJob={() => setShowCreateJobModal(true)} />
            
            <AnalyticsCharts />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivityCard />
              <PipelineOverview />
            </div>
          </div>
        );
      case 'jobs':
        return <JobsManagement />;
      case 'candidates':
        return <CandidatesManagement />;
      case 'pipeline':
        return <CandidatePipeline showCandidates={true} />;
      case 'ai-matching':
        return <AIMatchingEngine />;
      case 'interviews':
        return <EnhancedInterviewManagement />;
      case 'communication':
        return <CommunicationHub />;
      case 'team':
        return <TeamManagement onInviteMember={() => setShowInviteModal(true)} />;
      default:
        return null;
    }
  };

  const getPageTitle = () => {
    const titles = {
      overview: 'Recruiter Platform',
      jobs: 'Jobs Management',
      candidates: 'Talent Pipeline',
      pipeline: 'Pipeline Analytics',
      'ai-matching': 'AI Matching Engine',
      interviews: 'Interview Management',
      communication: 'Communication Hub',
      team: 'Team Management'
    };
    return titles[activeTab as keyof typeof titles] || 'Recruiter Platform';
  };

  const getPageSubtitle = () => {
    const subtitles = {
      overview: 'Your unified recruiting command center',
      jobs: 'Manage your open positions and hiring pipeline',
      candidates: 'Discover and manage your top candidates',
      pipeline: 'Track and optimize your hiring funnel',
      'ai-matching': 'Leverage AI to find the perfect candidates',
      interviews: 'Schedule and manage candidate interviews',
      communication: 'Centralized communication hub',
      team: 'Manage your recruiting team'
    };
    return subtitles[activeTab as keyof typeof subtitles];
  };

  return (
    <RecruiterLayout
      title={getPageTitle()}
      subtitle={getPageSubtitle()}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}

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
    </RecruiterLayout>
  );
};

export default RecruiterDashboard;
