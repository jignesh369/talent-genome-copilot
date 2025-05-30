import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import OrganizationModal from '@/components/modals/OrganizationModal';
import BillingManagement from '@/components/admin/BillingManagement';
import SystemConfiguration from '@/components/admin/SystemConfiguration';
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
  Cog
} from 'lucide-react';

const StartupAdmin = () => {
  const { user, signOut } = useAuth();
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const [organizations, setOrganizations] = useState([
    { 
      id: '1', 
      name: 'TechCorp Inc.', 
      domain: 'techcorp.com', 
      industry: 'technology',
      size: '51-200',
      plan: 'professional',
      status: 'active',
      contactEmail: 'admin@techcorp.com',
      contactName: 'John Smith',
      userLimit: 50,
      jobLimit: 20,
      monthlyAmount: 299,
      billingStatus: 'active',
      nextBilling: 'Jan 15, 2024'
    },
    { 
      id: '2', 
      name: 'StartupXYZ', 
      domain: 'startupxyz.com', 
      industry: 'finance',
      size: '11-50',
      plan: 'starter',
      status: 'active',
      contactEmail: 'founder@startupxyz.com',
      contactName: 'Sarah Johnson',
      userLimit: 10,
      jobLimit: 5,
      monthlyAmount: 99,
      billingStatus: 'active',
      nextBilling: 'Jan 20, 2024'
    }
  ]);

  const stats = [
    { label: 'Customer Organizations', value: '12', icon: Building, color: 'text-blue-600' },
    { label: 'Total Users', value: '347', icon: Users, color: 'text-green-600' },
    { label: 'Active Jobs', value: '89', icon: Briefcase, color: 'text-purple-600' },
    { label: 'Monthly Revenue', value: '$24.5k', icon: TrendingUp, color: 'text-orange-600' }
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
      const newOrg = { ...data, id: Date.now().toString() };
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
                <h1 className="text-2xl font-bold text-gray-900">TalentGenome Admin</h1>
                <p className="text-sm text-gray-600">Startup Administration Panel</p>
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

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.first_name || 'Admin'}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your platform today.
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
      </main>

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
