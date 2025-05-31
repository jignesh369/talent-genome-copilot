
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Filter } from 'lucide-react';
import TeamMemberCard from '@/components/admin/TeamMemberCard';
import { TeamMember } from '@/types/organization';

interface TeamMembersTabProps {
  filteredMembers: TeamMember[];
  searchTerm: string;
  filterRole: string;
  setSearchTerm: (value: string) => void;
  setFilterRole: (value: string) => void;
  setShowInviteModal: (value: boolean) => void;
  handleEditMember: (memberId: string) => void;
  handleRemoveMember: (memberId: string) => void;
}

const TeamMembersTab: React.FC<TeamMembersTabProps> = ({
  filteredMembers,
  searchTerm,
  filterRole,
  setSearchTerm,
  setFilterRole,
  setShowInviteModal,
  handleEditMember,
  handleRemoveMember
}) => {
  return (
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
  );
};

export default TeamMembersTab;
