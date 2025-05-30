
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Users, 
  Briefcase, 
  UserPlus, 
  Settings, 
  Plus,
  TrendingUp,
  Building,
  Search
} from 'lucide-react';

const CustomerAdmin = () => {
  const { user, signOut } = useAuth();

  const stats = [
    { label: 'Team Members', value: '24', icon: Users, color: 'text-blue-600' },
    { label: 'Active Jobs', value: '8', icon: Briefcase, color: 'text-green-600' },
    { label: 'Applications', value: '156', icon: UserPlus, color: 'text-purple-600' },
    { label: 'Hire Rate', value: '18%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const teamMembers = [
    { name: 'Sarah Johnson', role: 'Recruiter', status: 'Active', jobs: 3 },
    { name: 'Mike Chen', role: 'Hiring Manager', status: 'Active', jobs: 2 },
    { name: 'Emily Davis', role: 'Recruiter', status: 'Active', jobs: 3 },
    { name: 'Alex Wilson', role: 'Hiring Manager', status: 'Inactive', jobs: 0 }
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
                <h1 className="text-2xl font-bold text-gray-900">Organization Dashboard</h1>
                <p className="text-sm text-gray-600">Customer Administration Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Search className="w-4 h-4 mr-2" />
                AI Search
              </Button>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
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
            Manage your organization's recruitment activities and team.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                Job Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Create and manage job postings for your organization.
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
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Team Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Invite and manage your recruitment team members.
              </p>
              <Button variant="outline" className="w-full">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2 text-purple-600" />
                AI-Powered Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Find the perfect candidates using our AI search engine.
              </p>
              <Button variant="outline" className="w-full">
                Start Searching
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Members
              </span>
              <Button size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{member.jobs} active jobs</span>
                    <Badge 
                      variant={member.status === 'Active' ? 'default' : 'secondary'}
                      className={member.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {member.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CustomerAdmin;
