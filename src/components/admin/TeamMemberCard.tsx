
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

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

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (memberId: string) => void;
  onRemove: (memberId: string) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, onEdit, onRemove }) => {
  const getStatusBadgeProps = (status: string) => {
    switch (status) {
      case 'Active':
        return { variant: 'default' as const, className: 'bg-green-100 text-green-800' };
      case 'Pending':
        return { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' };
      default:
        return { variant: 'outline' as const, className: '' };
    }
  };

  const statusProps = getStatusBadgeProps(member.status);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
          variant={statusProps.variant}
          className={statusProps.className}
        >
          {member.status}
        </Badge>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onEdit(member.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onRemove(member.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
