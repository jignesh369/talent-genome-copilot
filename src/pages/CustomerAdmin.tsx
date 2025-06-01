
import React, { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useOrganizationStats } from '@/hooks/useOrganizationStats';
import { useTeamMembers } from '@/hooks/useTeamMembers';
import InviteMemberModal from '@/components/modals/InviteMemberModal';
import CreateJobForm from '@/components/forms/CreateJobForm';
import StatCard from '@/components/shared/StatCard';
import CustomerAdminHeader from '@/components/admin/CustomerAdminHeader';
import CustomerAdminWelcome from '@/components/admin/CustomerAdminWelcome';
import CustomerAdminSidebar from '@/components/admin/CustomerAdminSidebar';
import CustomerAdminContent from '@/components/admin/CustomerAdminContent';
import { Organization } from '@/types/organization';
import { Users, Briefcase, CheckCircle } from 'lucide-react';

const CustomerAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { stats, loading: statsLoading } = useOrganizationStats();
  const { teamMembers, loading: membersLoading, updateMemberRole, removeMember } = useTeamMembers();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Organization stats for display
  const organizationStats = [
    { 
      label: 'Team Members', 
      value: stats.totalMembers.toString(), 
      icon: Users, 
      color: 'text-blue-600', 
      change: stats.memberGrowth 
    },
    { 
      label: 'Active Jobs', 
      value: stats.activeJobs.toString(), 
      icon: Briefcase, 
      color: 'text-green-600', 
      change: stats.jobGrowth 
    },
    { 
      label: 'Account Health', 
      value: `${stats.accountHealth}%`, 
      icon: CheckCircle, 
      color: 'text-emerald-600', 
      change: 'Excellent' 
    }
  ];

  // Current organization data (this could also come from a hook)
  const currentOrganization: Organization = {
    id: '1',
    name: 'TechCorp Solutions',
    plan: 'professional' as const,
    status: 'active' as const,
    monthlyAmount: 299,
    nextBilling: 'Jan 15, 2024',
    userLimit: 25,
    jobLimit: 15,
    currentUsers: stats.totalMembers,
    currentJobs: stats.activeJobs,
    domain: 'techcorp.com',
    industry: 'technology',
    size: '51-200',
    contactEmail: 'admin@techcorp.com',
    contactName: 'John Smith',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const handleInviteMember = (memberData: any) => {
    // This would typically create a new user invitation
    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${memberData.email}`,
    });
    console.log('Inviting member:', memberData);
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    await updateMemberRole(userId, newRole);
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

  const handleRemoveMember = async (memberId: string) => {
    await removeMember(memberId);
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const isLoading = statsLoading || membersLoading;

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <CustomerAdminHeader organizationName={currentOrganization.name} />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-8">
        <div className="mb-6 lg:mb-8">
          <CustomerAdminWelcome userName={user?.user_metadata?.first_name} />
        </div>

        {/* Stats Grid with real data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 mb-6 lg:mb-10">
          {organizationStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <div className="lg:col-span-3">
              <CustomerAdminSidebar />
            </div>
            <div className="lg:col-span-9 min-w-0 overflow-hidden">
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
};

export default CustomerAdmin;
