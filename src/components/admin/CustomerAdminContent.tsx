
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import QuickActionsGrid from '@/components/admin/QuickActionsGrid';
import CandidatePipeline from '@/components/admin/CandidatePipeline';
import UserRoleAssignment from '@/components/admin/UserRoleAssignment';
import TeamMembersTab from '@/components/admin/content/TeamMembersTab';
import AnalyticsTabsWrapper from '@/components/admin/content/AnalyticsTabsWrapper';
import IntegrationTabsWrapper from '@/components/admin/content/IntegrationTabsWrapper';
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

      <AnalyticsTabsWrapper />

      <TabsContent value="team-members" className="mt-0">
        <TeamMembersTab
          filteredMembers={filteredMembers}
          searchTerm={searchTerm}
          filterRole={filterRole}
          setSearchTerm={setSearchTerm}
          setFilterRole={setFilterRole}
          setShowInviteModal={setShowInviteModal}
          handleEditMember={handleEditMember}
          handleRemoveMember={handleRemoveMember}
        />
      </TabsContent>

      <TabsContent value="roles-permissions" className="mt-0">
        <UserRoleAssignment 
          users={teamMembers}
          onUpdateRole={handleUpdateRole}
        />
      </TabsContent>

      <IntegrationTabsWrapper currentOrganization={currentOrganization} />
    </div>
  );
};

export default CustomerAdminContent;
