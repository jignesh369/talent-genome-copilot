
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Filter } from 'lucide-react';
import QuickActionsGrid from '@/components/admin/QuickActionsGrid';
import CandidatePipeline from '@/components/admin/CandidatePipeline';
import OrganizationBilling from '@/components/admin/OrganizationBilling';
import UserRoleAssignment from '@/components/admin/UserRoleAssignment';
import TeamMemberCard from '@/components/admin/TeamMemberCard';
import UsageAnalyticsDashboard from '@/components/admin/analytics/UsageAnalyticsDashboard';
import ROIPerformanceDashboard from '@/components/admin/analytics/ROIPerformanceDashboard';
import ForecastingInsights from '@/components/admin/analytics/ForecastingInsights';
import CustomerIntegrationsHub from '@/components/admin/integrations/CustomerIntegrationsHub';
import CustomerAIConfiguration from '@/components/admin/config/CustomerAIConfiguration';
import BillingPaymentsMangement from '@/components/admin/billing/BillingPaymentsManagement';
import AuditLogsViewer from '@/components/admin/logs/AuditLogsViewer';
import OrganizationSettingsPanel from '@/components/admin/settings/OrganizationSettingsPanel';
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
        <UsageAnalyticsDashboard />
      </TabsContent>

      <TabsContent value="performance" className="mt-0">
        <ROIPerformanceDashboard />
      </TabsContent>

      <TabsContent value="forecasting" className="mt-0">
        <ForecastingInsights />
      </TabsContent>

      <TabsContent value="team-members" className="mt-0">
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

      <TabsContent value="roles-permissions" className="mt-0">
        <UserRoleAssignment 
          users={teamMembers}
          onUpdateRole={handleUpdateRole}
        />
      </TabsContent>

      <TabsContent value="integrations" className="mt-0">
        <CustomerIntegrationsHub />
      </TabsContent>

      <TabsContent value="ai-config" className="mt-0">
        <CustomerAIConfiguration />
      </TabsContent>

      <TabsContent value="billing-payments" className="mt-0">
        <BillingPaymentsMangement organization={currentOrganization} />
      </TabsContent>

      <TabsContent value="audit-logs" className="mt-0">
        <AuditLogsViewer />
      </TabsContent>

      <TabsContent value="organization-settings" className="mt-0">
        <OrganizationSettingsPanel organization={currentOrganization} />
      </TabsContent>
    </div>
  );
};

export default CustomerAdminContent;
