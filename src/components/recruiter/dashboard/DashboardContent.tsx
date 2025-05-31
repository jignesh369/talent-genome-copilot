
import React from 'react';
import CandidatePipeline from '@/components/admin/CandidatePipeline';
import AIMatchingEngine from '@/components/recruiter/AIMatchingEngine';
import EnhancedInterviewManagement from '@/components/recruiter/EnhancedInterviewManagement';
import EnhancedCommunicationHub from '@/components/recruiter/EnhancedCommunicationHub';
import TeamManagement from '@/components/recruiter/TeamManagement';
import OverviewTab from './OverviewTab';

interface DashboardContentProps {
  activeTab: string;
  userName?: string;
  onCreateJob: () => void;
  onInviteMember: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  activeTab,
  userName,
  onCreateJob,
  onInviteMember
}) => {
  switch (activeTab) {
    case 'overview':
      return <OverviewTab userName={userName} onCreateJob={onCreateJob} />;
    case 'pipeline':
      return <CandidatePipeline showCandidates={true} />;
    case 'ai-matching':
      return <AIMatchingEngine />;
    case 'interviews':
      return <EnhancedInterviewManagement />;
    case 'communication':
      return <EnhancedCommunicationHub />;
    case 'team':
      return <TeamManagement onInviteMember={onInviteMember} />;
    default:
      return <OverviewTab userName={userName} onCreateJob={onCreateJob} />;
  }
};

export default DashboardContent;
