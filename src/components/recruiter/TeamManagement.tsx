
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, Filter, Edit, Trash2 } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  jobs: number;
  department: string;
  lastActive: string;
}

interface TeamManagementProps {
  onInviteMember: () => void;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ onInviteMember }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'recruiter', status: 'Active', jobs: 3, department: 'HR', lastActive: '2 hours ago' },
    { id: '2', name: 'Mike Chen', email: 'mike@company.com', role: 'hiring_manager', status: 'Active', jobs: 2, department: 'Engineering', lastActive: '1 day ago' },
    { id: '3', name: 'Emily Davis', email: 'emily@company.com', role: 'recruiter', status: 'Active', jobs: 3, department: 'HR', lastActive: '30 mins ago' },
    { id: '4', name: 'Alex Wilson', email: 'alex@company.com', role: 'interviewer', status: 'Inactive', jobs: 0, department: 'Product', lastActive: '1 week ago' }
  ]);

  const handleEditMember = (memberId: string) => {
    toast({
      title: "Edit Member",
      description: "Member editing functionality will be implemented.",
    });
  };

  const handleRemoveMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    toast({
      title: "Member Removed",
      description: "Team member has been removed successfully.",
    });
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Team Members ({filteredMembers.length})
          </CardTitle>
          <Button size="sm" onClick={onInviteMember}>
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
            <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  <p className="text-xs text-gray-500">{member.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{member.role.replace('_', ' ')}</p>
                  <p className="text-xs text-gray-600">{member.jobs} active jobs</p>
                </div>
                <Badge 
                  variant={member.status === 'Active' ? 'default' : member.status === 'Pending' ? 'secondary' : 'outline'}
                  className={
                    member.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    member.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''
                  }
                >
                  {member.status}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditMember(member.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamManagement;
