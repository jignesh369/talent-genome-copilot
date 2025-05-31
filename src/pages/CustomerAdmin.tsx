
import React, { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import InviteMemberModal from '@/components/modals/InviteMemberModal';
import CreateJobForm from '@/components/forms/CreateJobForm';
import StatCard from '@/components/shared/StatCard';
import CustomerAdminHeader from '@/components/admin/CustomerAdminHeader';
import CustomerAdminWelcome from '@/components/admin/CustomerAdminWelcome';
import CustomerAdminSidebar from '@/components/admin/CustomerAdminSidebar';
import CustomerAdminContent from '@/components/admin/CustomerAdminContent';
import { Users } from 'lucide-react';

const CustomerAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Organization-specific stats for Customer Admin
  const organizationStats = [
    { label: 'Team Members', value: '12', icon: Users, color: 'text-blue-600', change: '+2 this month' },
    { label: 'Active Jobs', value: '8', icon: Users, color: 'text-green-600', change: '+3 this week' },
    { label: 'Monthly Usage', value: '87%', icon: Users, color: 'text-purple-600', change: 'Within limits' },
    { label: 'Account Health', value: '98%', icon: Users, color: 'text-orange-600', change: 'All systems operational' }
  ];

  // Current organization data
  const currentOrganization = {
    id: '1',
    name: 'TechCorp Solutions',
    plan: 'professional' as const,
    status: 'active' as const,
    monthlyAmount: 299,
    nextBilling: 'Jan 15, 2024',
    userLimit: 25,
    jobLimit: 15,
    currentUsers: 12,
    currentJobs: 8,
    domain: 'techcorp.com',
    industry: 'technology',
    size: '51-200',
    contactEmail: 'admin@techcorp.com',
    contactName: 'John Smith',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'recruiter', status: 'active', jobs: 3, department: 'HR', lastActive: '2 hours ago' },
    { id: '2', name: 'Mike Chen', email: 'mike@company.com', role: 'hiring_manager', status: 'active', jobs: 2, department: 'Engineering', lastActive: '1 day ago' },
    { id: '3', name: 'Emily Davis', email: 'emily@company.com', role: 'recruiter', status: 'active', jobs: 3, department: 'HR', lastActive: '30 mins ago' },
    { id: '4', name: 'Alex Wilson', email: 'alex@company.com', role: 'hiring_manager', status: 'inactive', jobs: 0, department: 'Product', lastActive: '1 week ago' }
  ]);

  const handleInviteMember = (memberData: any) => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: `${memberData.firstName} ${memberData.lastName}`,
      email: memberData.email,
      role: memberData.role as UserRole,
      status: 'pending',
      jobs: 0,
      department: memberData.department || 'Unassigned',
      lastActive: 'Never'
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const handleUpdateRole = (userId: string, newRole: string) => {
    setTeamMembers(prev =>
      prev.map(member => 
        member.id === userId ? { ...member, role: newRole as UserRole } : member
      )
    );
  };

  const handleCreateJob = (jobData: any) => {
    toast({
      title: "Job Created",
      description: `${jobData.title} has been posted successfully.`,
    });
    console.log('Creating job:', jobData);
    setShowCreateJobModal(false);
  };

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
    <div className="min-h-screen bg-gray-50">
      <CustomerAdminHeader organizationName={currentOrganization.name} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <CustomerAdminWelcome userName={user?.user_metadata?.first_name} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {organizationStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content with Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="grid grid-cols-12 gap-6">
            <CustomerAdminSidebar />
            <CustomerAdminContent
              currentOrganization={currentOrganization}
              teamMembers={teamMembers}
              filteredMembers={filteredMembers}
              searchTerm={searchTerm}
              filterRole={filterRole}
              setSearchTerm={setSearchTerm}
              setFilterRole={setFilterRole}
              setShowInviteModal={setShowInviteModal}
              handleEditMember={handleEditMember}
              handleRemoveMember={handleRemoveMember}
              handleUpdateRole={handleUpdateRole}
            />
          </div>
        </Tabs>
      </div>

      {/* Modals */}
      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteMember}
      />

      <Dialog open={showCreateJobModal} onOpenChange={setShowCreateJobModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
          </DialogHeader>
          <CreateJobForm
            onSubmit={handleCreateJob}
            onCancel={() => setShowCreateJobModal(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );

  function handleCreateJob(jobData: any) {
    toast({
      title: "Job Created",
      description: `${jobData.title} has been posted successfully.`,
    });
    console.log('Creating job:', jobData);
    setShowCreateJobModal(false);
  }

  function handleEditMember(memberId: string) {
    toast({
      title: "Edit Member",
      description: "Member editing functionality will be implemented.",
    });
  }

  function handleRemoveMember(memberId: string) {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    toast({
      title: "Member Removed",
      description: "Team member has been removed successfully.",
    });
  }
};

export default CustomerAdmin;
