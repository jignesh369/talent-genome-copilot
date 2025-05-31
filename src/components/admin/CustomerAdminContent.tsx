
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Filter } from 'lucide-react';
import QuickActionsGrid from '@/components/admin/QuickActionsGrid';
import CandidatePipeline from '@/components/admin/CandidatePipeline';
import AdvancedAnalyticsDashboard from '@/components/admin/AdvancedAnalyticsDashboard';
import PerformanceOptimizationHub from '@/components/admin/PerformanceOptimizationHub';
import AdvancedCommunicationCenter from '@/components/admin/AdvancedCommunicationCenter';
import SmartNotificationsSystem from '@/components/admin/SmartNotificationsSystem';
import EmailCalendarIntegration from '@/components/admin/EmailCalendarIntegration';
import OrganizationBilling from '@/components/admin/OrganizationBilling';
import UserRoleAssignment from '@/components/admin/UserRoleAssignment';
import PlatformIntegrationHub from '@/components/admin/PlatformIntegrationHub';
import AutomationWorkflows from '@/components/admin/AutomationWorkflows';
import AIConfiguration from '@/components/admin/AIConfiguration';
import CustomizationThemes from '@/components/admin/CustomizationThemes';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
import TeamMemberCard from '@/components/admin/TeamMemberCard';
import { TeamMember, Organization } from '@/types/organization';

interface CustomerAdminContentProps {
  currentOrganization: Organization;
  teamMembers: TeamMember[];
  filteredMembers: TeamMember[];
  searchTerm: string;
  filterRole: string;
  setSearchTerm: (value: string) => void;
  setFilterRole: (value: string) => void;
  setShowInviteModal: (value: boolean) => void;
  handleEditMember: (memberId: string) => void;
  handleRemoveMember: (memberId: string) => void;
  handleUpdateRole: (userId: string, newRole: string) => void;
}

const CustomerAdminContent: React.FC<CustomerAdminContentProps> = ({
  currentOrganization,
  teamMembers,
  filteredMembers,
  searchTerm,
  filterRole,
  setSearchTerm,
  setFilterRole,
  setShowInviteModal,
  handleEditMember,
  handleRemoveMember,
  handleUpdateRole
}) => {
  return (
    <div className="col-span-9">
      <TabsContent value="overview" className="mt-0 space-y-6">
        <QuickActionsGrid />
        <CandidatePipeline showCandidates={false} />
      </TabsContent>

      <TabsContent value="analytics" className="mt-0">
        <AdvancedAnalyticsDashboard />
      </TabsContent>

      <TabsContent value="performance" className="mt-0">
        <PerformanceOptimizationHub />
      </TabsContent>

      <TabsContent value="communication" className="mt-0">
        <AdvancedCommunicationCenter />
      </TabsContent>

      <TabsContent value="notifications" className="mt-0">
        <SmartNotificationsSystem />
      </TabsContent>

      <TabsContent value="email-calendar" className="mt-0">
        <EmailCalendarIntegration />
      </TabsContent>

      <TabsContent value="billing" className="mt-0">
        <OrganizationBilling organization={currentOrganization} />
      </TabsContent>

      <TabsContent value="team" className="mt-0">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Members ({filteredMembers.length})
              </CardTitle>
              <Button size="sm" onClick={() => setShowInviteModal(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-1">
                <Input
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="recruiter">Recruiters</SelectItem>
                  <SelectItem value="hiring">Hiring Managers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onEdit={handleEditMember}
                  onRemove={handleRemoveMember}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="roles" className="mt-0">
        <UserRoleAssignment 
          users={teamMembers}
          onUpdateRole={handleUpdateRole}
        />
      </TabsContent>

      <TabsContent value="integrations" className="mt-0">
        <PlatformIntegrationHub />
      </TabsContent>

      <TabsContent value="automation" className="mt-0">
        <AutomationWorkflows />
      </TabsContent>

      <TabsContent value="ai-config" className="mt-0">
        <AIConfiguration />
      </TabsContent>

      <TabsContent value="themes" className="mt-0">
        <CustomizationThemes />
      </TabsContent>

      <TabsContent value="system" className="mt-0">
        <SystemConfiguration />
      </TabsContent>
    </div>
  );
};

export default CustomerAdminContent;
