
import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import DashboardContent from '@/components/recruiter/dashboard/DashboardContent';
import DashboardModals from '@/components/recruiter/dashboard/DashboardModals';
import { getPageTitle, getPageSubtitle } from '@/utils/dashboardHelpers';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

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

  const handleTabChange = (newTab: string) => {
    console.log('Tab changed to:', newTab);
    setActiveTab(newTab);
  };

  return (
    <RecruiterLayout
      title={getPageTitle(activeTab)}
      subtitle={getPageSubtitle(activeTab)}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      <DashboardContent
        activeTab={activeTab}
        userName={user?.user_metadata?.first_name}
        onCreateJob={() => setShowCreateJobModal(true)}
        onInviteMember={() => setShowInviteModal(true)}
      />

      <DashboardModals
        showInviteModal={showInviteModal}
        showCreateJobModal={showCreateJobModal}
        onInviteModalClose={() => setShowInviteModal(false)}
        onCreateJobModalClose={() => setShowCreateJobModal(false)}
        onInviteMember={handleInviteMember}
        onCreateJob={handleCreateJob}
      />
    </RecruiterLayout>
  );
};

export default RecruiterDashboard;
