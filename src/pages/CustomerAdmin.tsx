
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import UserProfileDropdown from '@/components/navigation/UserProfileDropdown';
import NotificationDropdown from '@/components/navigation/NotificationDropdown';
import InviteMemberModal from '@/components/modals/InviteMemberModal';
import CreateJobForm from '@/components/forms/CreateJobForm';
import UserRoleAssignment from '@/components/admin/UserRoleAssignment';
import OrganizationModal from '@/components/modals/OrganizationModal';
import BillingManagement from '@/components/admin/BillingManagement';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Briefcase, 
  UserPlus, 
  Settings, 
  Plus,
  TrendingUp,
  Building,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  CreditCard,
  Activity,
  Database,
  PieChart
} from 'lucide-react';
import TeamAnalytics from '@/components/admin/TeamAnalytics';
import CandidatePipeline from '@/components/admin/CandidatePipeline';
import IntegrationSettings from '@/components/admin/IntegrationSettings';
import SystemConfiguration from '@/components/admin/SystemConfiguration';

const CustomerAdmin = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [orgModalMode, setOrgModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const stats = [
    { label: 'Organizations', value: '47', icon: Building, color: 'text-blue-600', change: '+3 this month' },
    { label: 'Monthly Revenue', value: '$24.5K', icon: CreditCard, color: 'text-green-600', change: '+12% vs last month' },
    { label: 'System Health', value: '99.8%', icon: Shield, color: 'text-purple-600', change: 'All systems operational' },
    { label: 'Active Users', value: '1,247', icon: Users, color: 'text-orange-600', change: '+85 this week' }
  ];

  const [organizations, setOrganizations] = useState([
    { 
      id: '1', 
      name: 'TechCorp Solutions', 
      domain: 'techcorp.com', 
      plan: 'enterprise', 
      status: 'active', 
      contactEmail: 'admin@techcorp.com',
      contactName: 'John Smith',
      userLimit: 100,
      jobLimit: 50,
      monthlyAmount: 599,
      nextBilling: 'Jan 15, 2024',
      billingStatus: 'active'
    },
    { 
      id: '2', 
      name: 'StartupXYZ', 
      domain: 'startupxyz.com', 
      plan: 'professional', 
      status: 'active', 
      contactEmail: 'founder@startupxyz.com',
      contactName: 'Sarah Johnson',
      userLimit: 25,
      jobLimit: 15,
      monthlyAmount: 199,
      nextBilling: 'Jan 20, 2024',
      billingStatus: 'active'
    },
    { 
      id: '3', 
      name: 'GrowthCo', 
      domain: 'growthco.io', 
      plan: 'starter', 
      status: 'trial', 
      contactEmail: 'team@growthco.io',
      contactName: 'Mike Chen',
      userLimit: 10,
      jobLimit: 5,
      monthlyAmount: 99,
      nextBilling: 'Jan 25, 2024',
      billingStatus: 'trial'
    }
  ]);

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

  const handleCreateOrganization = () => {
    setSelectedOrg(null);
    setOrgModalMode('create');
    setShowOrgModal(true);
  };

  const handleEditOrganization = (org: any) => {
    setSelectedOrg(org);
    setOrgModalMode('edit');
    setShowOrgModal(true);
  };

  const handleViewOrganization = (org: any) => {
    setSelectedOrg(org);
    setOrgModalMode('view');
    setShowOrgModal(true);
  };

  const handleSaveOrganization = (orgData: any) => {
    if (orgModalMode === 'create') {
      const newOrg = {
        ...orgData,
        id: Date.now().toString(),
        monthlyAmount: orgData.plan === 'enterprise' ? 599 : orgData.plan === 'professional' ? 199 : 99,
        nextBilling: 'Jan 30, 2024',
        billingStatus: 'active'
      };
      setOrganizations(prev => [...prev, newOrg]);
    } else {
      setOrganizations(prev =>
        prev.map(org => org.id === selectedOrg?.id ? { ...org, ...orgData } : org)
      );
    }
  };

  const handleUpdateBilling = (orgId: string, billingData: any) => {
    setOrganizations(prev =>
      prev.map(org => 
        org.id === orgId ? { ...org, ...billingData } : org
      )
    );
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role.toLowerCase().includes(filterRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const quickActions = [
    {
      title: 'System Configuration',
      description: 'Configure platform settings, security, and feature flags.',
      icon: Settings,
      color: 'text-blue-600',
      action: () => {}
    },
    {
      title: 'Integration Management', 
      description: 'Manage calendar, email, and ATS integrations.',
      icon: Database,
      color: 'text-green-600',
      action: () => {}
    },
    {
      title: 'Usage Analytics',
      description: 'Monitor platform usage, costs, and performance metrics.',
      icon: PieChart,
      color: 'text-purple-600',
      action: () => {}
    }
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">Customer Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Technical Configuration & Organization Management</p>
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.first_name || 'Admin'}! 👋
          </h2>
          <p className="text-gray-600">
            Manage your organization's technical integrations, monitor usage, and configure platform settings.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <action.icon className={`w-5 h-5 mr-2 ${action.color}`} />
                      {action.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{action.description}</p>
                    <Button className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pipeline Overview - No individual candidates */}
            <CandidatePipeline showCandidates={false} />
          </TabsContent>

          <TabsContent value="organizations">
            {/* Organizations Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Organizations ({organizations.length})
                  </CardTitle>
                  <Button size="sm" onClick={handleCreateOrganization}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Organization
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizations.map((org) => (
                    <div key={org.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {org.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{org.name}</h4>
                          <p className="text-sm text-gray-600">{org.contactEmail}</p>
                          <p className="text-xs text-gray-500">{org.domain}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <Badge className={
                            org.plan === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                            org.plan === 'professional' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }>
                            {org.plan}
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">{org.userLimit} users</p>
                        </div>
                        
                        <Badge 
                          variant={org.status === 'active' ? 'default' : org.status === 'trial' ? 'secondary' : 'outline'}
                          className={
                            org.status === 'active' ? 'bg-green-100 text-green-800' : 
                            org.status === 'trial' ? 'bg-blue-100 text-blue-800' : ''
                          }
                        >
                          {org.status}
                        </Badge>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewOrganization(org)}
                          >
                            <Search className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditOrganization(org)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <BillingManagement 
              organizations={organizations}
              onUpdateBilling={handleUpdateBilling}
            />
          </TabsContent>

          <TabsContent value="team">
            {/* Team Members */}
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
                
                {/* Filters and Search */}
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
          </TabsContent>

          <TabsContent value="roles">
            <UserRoleAssignment 
              users={teamMembers}
              onUpdateRole={handleUpdateRole}
            />
          </TabsContent>

          <TabsContent value="system">
            <SystemConfiguration />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationSettings />
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteMember}
      />

      <OrganizationModal
        isOpen={showOrgModal}
        onClose={() => setShowOrgModal(false)}
        organization={selectedOrg}
        onSave={handleSaveOrganization}
        mode={orgModalMode}
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
