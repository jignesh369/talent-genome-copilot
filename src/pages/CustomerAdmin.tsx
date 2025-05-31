import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import UserProfileDropdown from '@/components/navigation/UserProfileDropdown';
import NotificationDropdown from '@/components/navigation/NotificationDropdown';
import InviteMemberModal from '@/components/modals/InviteMemberModal';
import CreateJobForm from '@/components/forms/CreateJobForm';
import UserRoleAssignment from '@/components/admin/UserRoleAssignment';
import OrganizationBilling from '@/components/admin/OrganizationBilling';
import PlatformIntegrationHub from '@/components/admin/PlatformIntegrationHub';
import AutomationWorkflows from '@/components/admin/AutomationWorkflows';
import AIConfiguration from '@/components/admin/AIConfiguration';
import CustomizationThemes from '@/components/admin/CustomizationThemes';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  UserPlus, 
  Building,
  Search,
  Filter,
  Zap,
  Link,
  Brain,
  Palette,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  CreditCard,
  Shield,
  Calendar,
  Mail
} from 'lucide-react';
import TeamAnalytics from '@/components/admin/TeamAnalytics';
import CandidatePipeline from '@/components/admin/CandidatePipeline';
import IntegrationSettings from '@/components/admin/IntegrationSettings';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
import StatCard from '@/components/shared/StatCard';
import TeamMemberCard from '@/components/admin/TeamMemberCard';
import QuickActionsGrid from '@/components/admin/QuickActionsGrid';
import AdvancedAnalyticsDashboard from '@/components/admin/AdvancedAnalyticsDashboard';
import PerformanceOptimizationHub from '@/components/admin/PerformanceOptimizationHub';
import AdvancedCommunicationCenter from '@/components/admin/AdvancedCommunicationCenter';
import SmartNotificationsSystem from '@/components/admin/SmartNotificationsSystem';
import EmailCalendarIntegration from '@/components/admin/EmailCalendarIntegration';

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
    plan: 'professional',
    status: 'active',
    monthlyAmount: 299,
    nextBilling: 'Jan 15, 2024',
    userLimit: 25,
    jobLimit: 15,
    currentUsers: 12,
    currentJobs: 8
  };

  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'recruiter', status: 'Active', jobs: 3, department: 'HR', lastActive: '2 hours ago' },
    { id: '2', name: 'Mike Chen', email: 'mike@company.com', role: 'hiring_manager', status: 'Active', jobs: 2, department: 'Engineering', lastActive: '1 day ago' },
    { id: '3', name: 'Emily Davis', email: 'emily@company.com', role: 'recruiter', status: 'Active', jobs: 3, department: 'HR', lastActive: '30 mins ago' },
    { id: '4', name: 'Alex Wilson', email: 'alex@company.com', role: 'interviewer', status: 'Inactive', jobs: 0, department: 'Product', lastActive: '1 week ago' }
  ]);

  const handleInviteMember = (memberData: any) => {
    const newMember = {
      id: Date.now().toString(),
      name: `${memberData.firstName} ${memberData.lastName}`,
      email: memberData.email,
      role: memberData.role,
      status: 'Pending',
      jobs: 0,
      department: memberData.department || 'Unassigned',
      lastActive: 'Never'
    };
    setTeamMembers(prev => [...prev, newMember]);
  };

  const handleUpdateRole = (userId: string, newRole: string) => {
    setTeamMembers(prev =>
      prev.map(member => 
        member.id === userId ? { ...member, role: newRole } : member
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Organization Admin</h1>
                <p className="text-sm text-gray-600">{currentOrganization.name} - Advanced Platform Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => window.location.href = '/search'}>
                <Search className="w-4 h-4 mr-2" />
                AI Search
              </Button>
              <NotificationDropdown />
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.first_name || 'Admin'}! 👋
          </h2>
          <p className="text-gray-600">
            Manage your organization's advanced features, integrations, automation, and AI configuration.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {organizationStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar Navigation */}
          <div className="col-span-3">
            <Tabs defaultValue="overview" orientation="vertical" className="w-full">
              <TabsList className="flex flex-col h-auto w-full p-1 bg-white border shadow-sm space-y-1">
                {/* Dashboard Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
                    Dashboard
                  </div>
                  <TabsTrigger value="overview" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Overview
                  </TabsTrigger>
                </div>

                {/* Analytics Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
                    Analytics
                  </div>
                  <TabsTrigger value="analytics" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Advanced Analytics
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Zap className="w-4 h-4 mr-3" />
                    Performance
                  </TabsTrigger>
                </div>

                {/* Team Management Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
                    Team Management
                  </div>
                  <TabsTrigger value="team" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Users className="w-4 h-4 mr-3" />
                    Team Members
                  </TabsTrigger>
                  <TabsTrigger value="roles" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Shield className="w-4 h-4 mr-3" />
                    Roles & Permissions
                  </TabsTrigger>
                </div>

                {/* Communications Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
                    Communications
                  </div>
                  <TabsTrigger value="communication" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <MessageSquare className="w-4 h-4 mr-3" />
                    Communication Hub
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Bell className="w-4 h-4 mr-3" />
                    Smart Notifications
                  </TabsTrigger>
                </div>

                {/* Integrations & Automation Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
                    Integrations & Automation
                  </div>
                  <TabsTrigger value="email-calendar" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Mail className="w-4 h-4 mr-3" />
                    Email & Calendar
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Link className="w-4 h-4 mr-3" />
                    Platform Integrations
                  </TabsTrigger>
                  <TabsTrigger value="automation" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Zap className="w-4 h-4 mr-3" />
                    Automation
                  </TabsTrigger>
                  <TabsTrigger value="ai-config" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Brain className="w-4 h-4 mr-3" />
                    AI Configuration
                  </TabsTrigger>
                </div>

                {/* System Settings Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 border-b">
                    System Settings
                  </div>
                  <TabsTrigger value="billing" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <CreditCard className="w-4 h-4 mr-3" />
                    Billing & Plans
                  </TabsTrigger>
                  <TabsTrigger value="themes" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Palette className="w-4 h-4 mr-3" />
                    Themes & Branding
                  </TabsTrigger>
                  <TabsTrigger value="system" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Settings className="w-4 h-4 mr-3" />
                    System Configuration
                  </TabsTrigger>
                </div>
              </TabsList>
            </Tabs>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            <Tabs defaultValue="overview" orientation="vertical" className="w-full">
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
            </Tabs>
          </div>
        </div>
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
