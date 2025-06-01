
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, Shield, Search, Filter } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  jobs: number;
  department: string;
  lastActive: string;
}

interface UserRoleAssignmentProps {
  users: User[];
  onUpdateRole: (userId: string, newRole: UserRole) => void;
}

const UserRoleAssignment: React.FC<UserRoleAssignmentProps> = ({ users, onUpdateRole }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const roleColors = {
    customer_admin: 'bg-red-100 text-red-800',
    startup_admin: 'bg-red-100 text-red-800',
    recruiter: 'bg-blue-100 text-blue-800',
    hiring_manager: 'bg-green-100 text-green-800',
    candidate: 'bg-gray-100 text-gray-800'
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId: string, newRole: string) => {
    onUpdateRole(userId, newRole as UserRole);
    toast({
      title: "Role Updated",
      description: "User role has been updated successfully.",
    });
  };

  const handleBulkRoleUpdate = (newRole: string) => {
    selectedUsers.forEach(userId => {
      onUpdateRole(userId, newRole as UserRole);
    });
    setSelectedUsers([]);
    toast({
      title: "Bulk Update Complete",
      description: `Updated roles for ${selectedUsers.length} users.`,
    });
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case 'customer_admin':
        return 'Customer Admin';
      case 'startup_admin':
        return 'Startup Admin';
      case 'hiring_manager':
        return 'Hiring Manager';
      default:
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            User Role Management ({filteredUsers.length})
          </div>
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedUsers.length} selected
              </span>
              <Select onValueChange={handleBulkRoleUpdate}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Bulk assign role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer_admin">Customer Admin</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                  <SelectItem value="candidate">Candidate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardTitle>
        
        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="customer_admin">Customer Admin</SelectItem>
              <SelectItem value="recruiter">Recruiter</SelectItem>
              <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
              <SelectItem value="candidate">Candidate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No team members found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(user => user.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{user.department}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{user.lastActive}</span>
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={user.role} 
                      onValueChange={(newRole) => handleRoleChange(user.id, newRole)}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer_admin">Customer Admin</SelectItem>
                        <SelectItem value="recruiter">Recruiter</SelectItem>
                        <SelectItem value="hiring_manager">Hiring Manager</SelectItem>
                        <SelectItem value="candidate">Candidate</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UserRoleAssignment;
