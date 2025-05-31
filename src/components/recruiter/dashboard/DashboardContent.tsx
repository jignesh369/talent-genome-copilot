
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
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="candidates">Pipeline</TabsTrigger>
        <TabsTrigger value="jobs">AI Matching</TabsTrigger>
        <TabsTrigger value="analytics">Interviews</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>

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
        <div className="space-y-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Matching & Job Management</h3>
            <p className="text-gray-600">Intelligent candidate matching and job posting management</p>
          </div>
          <JobsManagement />
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <div className="space-y-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Management</h3>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
          <EnhancedAnalyticsDashboard />
        </div>
      </TabsContent>

      <TabsContent value="team">
        <TeamManagement onInviteMember={onInviteMember} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardContent;
