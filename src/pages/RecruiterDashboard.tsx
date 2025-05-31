import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import UserProfileDropdown from '@/components/navigation/UserProfileDropdown';
import NotificationDropdown from '@/components/navigation/NotificationDropdown';
import InviteMemberModal from '@/components/modals/InviteMemberModal';
import CreateJobForm from '@/components/forms/CreateJobForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import CandidatePipeline from '@/components/admin/CandidatePipeline';
import JobsManagement from '@/components/recruiter/JobsManagement';
import CandidatesManagement from '@/components/recruiter/CandidatesManagement';
import AIMatchingEngine from '@/components/recruiter/AIMatchingEngine';
import EnhancedInterviewManagement from '@/components/recruiter/EnhancedInterviewManagement';
import CommunicationHub from '@/components/recruiter/CommunicationHub';
import { 
  Users, 
  Briefcase, 
  UserPlus, 
  Plus,
  TrendingUp,
  Building,
  Search,
  Calendar,
  Target,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Filter, MoreHorizontal } from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);

  const stats = [
    { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-blue-600', change: '+3 this month' },
    { label: 'Candidates', value: '156', icon: Users, color: 'text-green-600', change: '+23 this week' },
    { label: 'Interviews', value: '8', icon: Calendar, color: 'text-purple-600', change: '4 scheduled today' },
    { label: 'Placement Rate', value: '85%', icon: Target, color: 'text-orange-600', change: '+5% vs last month' }
  ];

  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com', role: 'recruiter', status: 'Active', jobs: 3, department: 'HR', lastActive: '2 hours ago' },
    { id: '2', name: 'Mike Chen', email: 'mike@company.com', role: 'hiring_manager', status: 'Active', jobs: 2, department: 'Engineering', lastActive: '1 day ago' },
    { id: '3', name: 'Emily Davis', email: 'emily@company.com', role: 'recruiter', status: 'Active', jobs: 3, department: 'HR', lastActive: '30 mins ago' },
    { id: '4', name: 'Alex Wilson', email: 'alex@company.com', role: 'interviewer', status: 'Inactive', jobs: 0, department: 'Product', lastActive: '1 week ago' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

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

  const handleCreateJob = (jobData: any) => {
    toast({
      title: "Job Created",
      description: `${jobData.title} has been posted successfully.`,
    });
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
                <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
                <p className="text-sm text-gray-600">Manage jobs, candidates, and hiring pipeline</p>
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
            Welcome back, {user?.user_metadata?.first_name || 'Recruiter'}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your recruitment activities today.
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
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="candidates" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Candidates</span>
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Pipeline</span>
            </TabsTrigger>
            <TabsTrigger value="ai-matching" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>AI Matching</span>
            </TabsTrigger>
            <TabsTrigger value="interviews" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Interviews</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Communications</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Team</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowCreateJobModal(true)}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-blue-600" />
                    Create New Job
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Post a new job opening and start attracting candidates.
                  </p>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Job
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="w-5 h-5 mr-2 text-green-600" />
                    AI Candidate Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Use AI to find the perfect candidates for your roles.
                  </p>
                  <Button variant="outline" className="w-full">
                    Search Candidates
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                    Interview Scheduling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Schedule and manage interviews with candidates.
                  </p>
                  <Button variant="outline" className="w-full">
                    Schedule Interview
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Candidate Pipeline */}
            <CandidatePipeline showCandidates={true} />
          </TabsContent>

          <TabsContent value="jobs">
            <JobsManagement />
          </TabsContent>

          <TabsContent value="candidates">
            <CandidatesManagement />
          </TabsContent>

          <TabsContent value="pipeline">
            <CandidatePipeline showCandidates={true} />
          </TabsContent>

          <TabsContent value="ai-matching">
            <AIMatchingEngine />
          </TabsContent>

          <TabsContent value="interviews">
            <EnhancedInterviewManagement />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationHub />
          </TabsContent>

          <TabsContent value="team">
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
        </Tabs>
      </main>

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

export default RecruiterDashboard;
