import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import OrganizationModal from '@/components/modals/OrganizationModal';
import BillingManagement from '@/components/admin/BillingManagement';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
import AdvancedAnalytics from '@/components/admin/AdvancedAnalytics';
import TeamAnalytics from '@/components/admin/TeamAnalytics';
import SystemHealth from '@/components/admin/SystemHealth';
import AuditLogs from '@/components/admin/AuditLogs';
import AIModelManagement from '@/components/admin/AIModelManagement';
import FeatureReleaseControl from '@/components/admin/FeatureReleaseControl';
import GlobalPerformanceMonitor from '@/components/admin/GlobalPerformanceMonitor';
import AdvancedRevenueAnalytics from '@/components/admin/AdvancedRevenueAnalytics';
import { 
  Building, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Settings, 
  Plus,
  BarChart3,
  UserCheck,
  FileText,
  CreditCard,
  Cog,
  Activity,
  Shield,
  Edit,
  Search,
  Brain,
  Flag,
  Globe,
  DollarSign,
  Zap,
  Monitor
} from 'lucide-react';

const StartupAdmin = () => {
  const { user, signOut } = useAuth();
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [dateRange, setDateRange] = useState('30d');

  // Standardized organization data
  const [organizations, setOrganizations] = useState([
    { 
      id: '1', 
      name: 'TechCorp Inc.', 
      domain: 'techcorp.com', 
      industry: 'technology',
      size: '51-200',
      plan: 'professional' as const,
      status: 'active' as const,
      contactEmail: 'admin@techcorp.com',
      contactName: 'John Smith',
      userLimit: 50,
      jobLimit: 20,
      currentUsers: 32,
      currentJobs: 12,
      monthlyAmount: 299,
      billingStatus: 'active',
      nextBilling: 'Jan 15, 2024',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { 
      id: '2', 
      name: 'StartupXYZ', 
      domain: 'startupxyz.com', 
      industry: 'finance',
      size: '11-50',
      plan: 'starter' as const,
      status: 'active' as const,
      contactEmail: 'founder@startupxyz.com',
      contactName: 'Sarah Johnson',
      userLimit: 10,
      jobLimit: 5,
      currentUsers: 7,
      currentJobs: 3,
      monthlyAmount: 99,
      billingStatus: 'active',
      nextBilling: 'Jan 20, 2024',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { 
      id: '3', 
      name: 'GrowthCo Enterprise', 
      domain: 'growthco.io', 
      industry: 'healthcare',
      size: '201-1000',
      plan: 'enterprise' as const,
      status: 'active' as const,
      contactEmail: 'admin@growthco.io',
      contactName: 'Mike Chen',
      userLimit: 100,
      jobLimit: 50,
      currentUsers: 85,
      currentJobs: 28,
      monthlyAmount: 599,
      billingStatus: 'active',
      nextBilling: 'Jan 25, 2024',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);

  // Platform-wide stats for Startup Admin
  const platformStats = [
    { label: 'Total Organizations', value: organizations.length.toString(), icon: Building, color: 'text-blue-600' },
    { label: 'Platform Users', value: '347', icon: Users, color: 'text-green-600' },
    { label: 'Active Jobs', value: '89', icon: Briefcase, color: 'text-purple-600' },
    { label: 'Monthly Revenue', value: '$47.3k', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const recentActivities = [
    { action: 'New organization registered', organization: 'TechCorp Inc.', time: '2 hours ago' },
    { action: 'Subscription upgraded', organization: 'StartupXYZ', time: '4 hours ago' },
    { action: 'New job posted', organization: 'DesignStudio', time: '6 hours ago' },
    { action: 'User limit increased', organization: 'InnovateLab', time: '1 day ago' }
  ];

  const handleCreateOrganization = () => {
    setSelectedOrg(null);
    setModalMode('create');
    setShowOrgModal(true);
  };

  const handleEditOrganization = (org: any) => {
    setSelectedOrg(org);
    setModalMode('edit');
    setShowOrgModal(true);
  };

  const handleViewOrganization = (org: any) => {
    setSelectedOrg(org);
    setModalMode('view');
    setShowOrgModal(true);
  };

  const handleSaveOrganization = (data: any) => {
    if (modalMode === 'create') {
      const newOrg = { 
        ...data, 
        id: Date.now().toString(),
        monthlyAmount: data.plan === 'enterprise' ? 599 : data.plan === 'professional' ? 299 : 99,
        billingStatus: 'active',
        nextBilling: 'Jan 30, 2024'
      };
      setOrganizations(prev => [...prev, newOrg]);
    } else {
      setOrganizations(prev => 
        prev.map(org => org.id === selectedOrg?.id ? { ...org, ...data } : org)
      );
    }
  };

  const handleUpdateBilling = (orgId: string, data: any) => {
    setOrganizations(prev =>
      prev.map(org => org.id === orgId ? { ...org, ...data } : org)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TalentGenome Platform Admin</h1>
                <p className="text-sm text-gray-600">Platform-wide Administration & AI Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Platform Healthy
              </Badge>
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
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
            Monitor platform performance, manage AI models, control feature releases, and oversee customer organizations.
          </p>
        </div>

        {/* Platform Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {platformStats.map((stat, index) => (
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

        {/* Main Content Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar Navigation */}
          <div className="col-span-3">
            <Tabs defaultValue="overview" orientation="vertical" className="w-full">
              <TabsList className="flex flex-col h-auto w-full p-1 bg-white border shadow-sm space-y-1">
                {/* Dashboard Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    Dashboard
                  </div>
                  <TabsTrigger value="overview" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Overview
                  </TabsTrigger>
                </div>

                {/* Performance & Analytics Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    Performance & Analytics
                  </div>
                  <TabsTrigger value="performance" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Globe className="w-4 h-4 mr-3" />
                    Global Performance
                  </TabsTrigger>
                  <TabsTrigger value="revenue" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <DollarSign className="w-4 h-4 mr-3" />
                    Revenue Analytics
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Advanced Analytics
                  </TabsTrigger>
                  <TabsTrigger value="team" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Users className="w-4 h-4 mr-3" />
                    Team Analytics
                  </TabsTrigger>
                </div>

                {/* System Management Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    System Management
                  </div>
                  <TabsTrigger value="health" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Activity className="w-4 h-4 mr-3" />
                    System Health
                  </TabsTrigger>
                  <TabsTrigger value="ai-models" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Brain className="w-4 h-4 mr-3" />
                    AI Models
                  </TabsTrigger>
                  <TabsTrigger value="features" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Flag className="w-4 h-4 mr-3" />
                    Feature Control
                  </TabsTrigger>
                </div>

                {/* Customer Management Section */}
                <div className="w-full">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                    Customer Management
                  </div>
                  <TabsTrigger value="organizations" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <Building className="w-4 h-4 mr-3" />
                    Organizations
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="w-full justify-start data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900">
                    <CreditCard className="w-4 h-4 mr-3" />
                    Billing Management
                  </TabsTrigger>
                </div>
              </TabsList>
            </Tabs>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            <Tabs defaultValue="overview" orientation="vertical" className="w-full">
              <TabsContent value="overview" className="mt-0">
                <div className="space-y-6">
                  {/* Action Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleCreateOrganization}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Building className="w-5 h-5 mr-2 text-blue-600" />
                          Manage Organizations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          View, create, and manage customer organizations on the platform.
                        </p>
                        <Button className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Organization
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                          Platform Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Monitor usage, performance, and revenue across all customers.
                        </p>
                        <Button variant="outline" className="w-full">
                          View Reports
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Settings className="w-5 h-5 mr-2 text-purple-600" />
                          System Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Configure platform settings, pricing, and feature flags.
                        </p>
                        <Button variant="outline" className="w-full">
                          Configure
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Recent Platform Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <UserCheck className="w-4 h-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{activity.action}</p>
                                <p className="text-sm text-gray-600">{activity.organization}</p>
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="mt-0">
                <GlobalPerformanceMonitor />
              </TabsContent>

              <TabsContent value="revenue" className="mt-0">
                <AdvancedRevenueAnalytics />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <AdvancedAnalytics 
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                />
              </TabsContent>

              <TabsContent value="team" className="mt-0">
                <TeamAnalytics />
              </TabsContent>

              <TabsContent value="health" className="mt-0">
                <SystemHealth />
              </TabsContent>

              <TabsContent value="organizations" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Customer Organizations ({organizations.length})
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

              <TabsContent value="ai-models" className="mt-0">
                <AIModelManagement />
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <FeatureReleaseControl />
              </TabsContent>

              <TabsContent value="billing" className="mt-0">
                <BillingManagement 
                  organizations={organizations}
                  onUpdateBilling={handleUpdateBilling}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Organization Modal */}
      <OrganizationModal
        isOpen={showOrgModal}
        onClose={() => setShowOrgModal(false)}
        organization={selectedOrg}
        onSave={handleSaveOrganization}
        mode={modalMode}
      />
    </div>
  );
};

export default StartupAdmin;
