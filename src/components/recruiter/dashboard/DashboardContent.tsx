
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './OverviewTab';
import CandidatesManagement from '../CandidatesManagement';
import JobsManagement from '../JobsManagement';
import TeamManagement from '../TeamManagement';
import EnhancedAnalyticsDashboard from '@/components/analytics/EnhancedAnalyticsDashboard';

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
  return (
    <Tabs value={activeTab} className="space-y-6">
      <TabsContent value="overview">
        <OverviewTab 
          userName={userName}
          onCreateJob={onCreateJob}
          onInviteMember={onInviteMember}
        />
      </TabsContent>

      <TabsContent value="candidates">
        <CandidatesManagement />
      </TabsContent>

      <TabsContent value="jobs">
        <JobsManagement />
      </TabsContent>

      <TabsContent value="analytics">
        <EnhancedAnalyticsDashboard />
      </TabsContent>

      <TabsContent value="team">
        <TeamManagement />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardContent;
