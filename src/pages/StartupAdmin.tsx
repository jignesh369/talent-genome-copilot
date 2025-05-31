import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import OrganizationModal from '@/components/modals/OrganizationModal';
import BillingManagement from '@/components/admin/BillingManagement';
import AdvancedAnalytics from '@/components/admin/AdvancedAnalytics';
import SystemHealth from '@/components/admin/SystemHealth';
import AIModelManagement from '@/components/admin/AIModelManagement';
import FeatureReleaseControl from '@/components/admin/FeatureReleaseControl';
import GlobalPerformanceMonitor from '@/components/admin/GlobalPerformanceMonitor';
import AuditLogs from '@/components/admin/AuditLogs';
import StartupAdminHeader from '@/components/admin/StartupAdminHeader';
import StartupAdminWelcome from '@/components/admin/StartupAdminWelcome';
import StartupAdminSidebar from '@/components/admin/StartupAdminSidebar';
import StartupAdminOverview from '@/components/admin/StartupAdminOverview';
import StartupAdminOrganizations from '@/components/admin/StartupAdminOrganizations';
import { Organization } from '@/types/organization';
import { 
  Building, 
  Users, 
  DollarSign,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

const StartupAdmin = () => {
  const { user, userRole, loading, signOut } = useAuth();
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [dateRange, setDateRange] = useState('30d');

  // Enhanced organization data with more realistic metrics
  const [organizations, setOrganizations] = useState<Organization[]>([
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
      nextBilling: 'Jan 25, 2024',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);

  // Enhanced platform stats with more impressive metrics
  const platformStats = [
    { 
      label: 'Organizations', 
      value: organizations.length.toString(), 
      icon: Building, 
      color: 'text-blue-600',
      change: '+12% this month',
      trend: 'up'
    },
    { 
      label: 'Platform Users', 
      value: '2,347', 
      icon: Users, 
      color: 'text-emerald-600',
      change: '+18% this month',
      trend: 'up'
    },
    { 
      label: 'Monthly ARR', 
      value: '$284k', 
      icon: TrendingUp, 
      color: 'text-purple-600',
      change: '+24% this month',
      trend: 'up'
    },
    {
      label: 'System Health',
      value: '99.9%',
      icon: Shield,
      color: 'text-green-600',
      change: 'All systems operational',
      trend: 'stable'
    },
    {
      label: 'AI Accuracy',
      value: '94.2%',
      icon: Zap,
      color: 'text-indigo-600',
      change: '+2.1% this week',
      trend: 'up'
    }
  ];

  const recentActivities = [
    { action: 'Enterprise upgrade', organization: 'TechCorp Inc.', time: '15 mins ago', type: 'revenue' },
    { action: 'New organization registered', organization: 'AI Innovations Ltd.', time: '1 hour ago', type: 'growth' },
    { action: 'Feature flag enabled', organization: 'Global rollout', time: '2 hours ago', type: 'feature' },
    { action: 'Security scan completed', organization: 'Platform-wide', time: '3 hours ago', type: 'security' },
    { action: 'Performance optimization', organization: 'Infrastructure', time: '4 hours ago', type: 'performance' }
  ];

  const handleCreateOrganization = () => {
    setSelectedOrg(null);
    setModalMode('create');
    setShowOrgModal(true);
  };

  const handleEditOrganization = (org: Organization) => {
    setSelectedOrg(org);
    setModalMode('edit');
    setShowOrgModal(true);
  };

  const handleViewOrganization = (org: Organization) => {
    setSelectedOrg(org);
    setModalMode('view');
    setShowOrgModal(true);
  };

  const handleSaveOrganization = (data: any) => {
    if (modalMode === 'create') {
      const newOrg: Organization = { 
        ...data, 
        id: Date.now().toString(),
        monthlyAmount: data.plan === 'enterprise' ? 599 : data.plan === 'professional' ? 299 : 99,
        nextBilling: 'Jan 30, 2024',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setOrganizations(prev => [...prev, newOrg]);
    } else {
      setOrganizations(prev => 
        prev.map(org => org.id === selectedOrg?.id ? { ...org, ...data } : org)
      );
    }
    setShowOrgModal(false);
  };

  const handleUpdateBilling = (orgId: string, data: any) => {
    setOrganizations(prev =>
      prev.map(org => org.id === orgId ? { ...org, ...data } : org)
    );
  };

  // Add debugging and loading state
  useEffect(() => {
    console.log('StartupAdmin mounted, user:', user?.email, 'role:', userRole, 'loading:', loading);
  }, [user, userRole, loading]);

  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Admin Dashboard</h2>
          <p className="text-gray-600">Please wait while we set up your workspace...</p>
        </div>
      </div>
    );
  }

  // Show error state if user doesn't have the right role
  if (user && userRole && userRole !== 'startup_admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need startup admin privileges to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Current role: {userRole}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 w-full overflow-x-hidden">
      <StartupAdminHeader onSignOut={signOut} />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-8 w-full">
        <div className="mb-6 lg:mb-8">
          <StartupAdminWelcome userName={user?.user_metadata?.first_name} />
        </div>

        {/* Enhanced Stats Grid - Better responsive design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-10 w-full overflow-hidden">
          {platformStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 min-w-0">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 lg:p-3 rounded-lg bg-gray-50 flex-shrink-0">
                  <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color}`} />
                </div>
                {stat.trend === 'up' && (
                  <div className="flex items-center text-emerald-600 text-xs flex-shrink-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>Up</span>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">{stat.label}</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 mb-1 truncate">{stat.value}</p>
                <p className="text-xs text-emerald-600 truncate">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content with improved layout */}
        <Tabs defaultValue="overview" className="w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 w-full overflow-hidden">
            <StartupAdminSidebar />

            {/* Main Content Area */}
            <div className="lg:col-span-9 min-w-0 overflow-hidden">
              <TabsContent value="overview" className="mt-0">
                <StartupAdminOverview 
                  recentActivities={recentActivities}
                  onCreateOrganization={handleCreateOrganization}
                />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <AdvancedAnalytics 
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                />
              </TabsContent>

              <TabsContent value="performance" className="mt-0">
                <GlobalPerformanceMonitor />
              </TabsContent>

              <TabsContent value="predictive" className="mt-0">
                <div className="space-y-6 w-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 lg:p-8 border min-w-0">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">AI Predictions</h2>
                    <p className="text-gray-600 mb-6">Advanced predictive analytics powered by machine learning</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-hidden">
                      <div className="bg-white rounded-lg p-4 shadow-sm min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">Revenue Forecast</h3>
                        <p className="text-xl lg:text-2xl font-bold text-emerald-600 truncate">$425k</p>
                        <p className="text-sm text-gray-600 truncate">Predicted next month</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">Churn Risk</h3>
                        <p className="text-xl lg:text-2xl font-bold text-orange-600 truncate">2.1%</p>
                        <p className="text-sm text-gray-600 truncate">Organizations at risk</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">Growth Rate</h3>
                        <p className="text-xl lg:text-2xl font-bold text-blue-600 truncate">+18%</p>
                        <p className="text-sm text-gray-600 truncate">Projected monthly</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="health" className="mt-0">
                <SystemHealth />
              </TabsContent>

              <TabsContent value="organizations" className="mt-0">
                <StartupAdminOrganizations
                  organizations={organizations}
                  onCreateOrganization={handleCreateOrganization}
                  onViewOrganization={handleViewOrganization}
                  onEditOrganization={handleEditOrganization}
                />
              </TabsContent>

              <TabsContent value="billing" className="mt-0">
                <BillingManagement 
                  organizations={organizations}
                  onUpdateBilling={handleUpdateBilling}
                />
              </TabsContent>

              <TabsContent value="logs" className="mt-0">
                <AuditLogs />
              </TabsContent>

              <TabsContent value="ai-models" className="mt-0">
                <AIModelManagement />
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <FeatureReleaseControl />
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <div className="space-y-6 w-full overflow-hidden">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 lg:p-8 border min-w-0">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Security Center</h2>
                    <p className="text-gray-600 mb-6">Platform security monitoring and threat detection</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full overflow-hidden">
                      <div className="bg-white rounded-lg p-4 shadow-sm min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">Security Score</h3>
                        <p className="text-xl lg:text-2xl font-bold text-green-600 truncate">98/100</p>
                        <p className="text-sm text-gray-600 truncate">Excellent security</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">Threats Blocked</h3>
                        <p className="text-xl lg:text-2xl font-bold text-red-600 truncate">247</p>
                        <p className="text-sm text-gray-600 truncate">Last 24 hours</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">Compliance</h3>
                        <p className="text-xl lg:text-2xl font-bold text-blue-600 truncate">100%</p>
                        <p className="text-sm text-gray-600 truncate">GDPR, SOC2 compliant</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">Last Scan</h3>
                        <p className="text-xl lg:text-2xl font-bold text-gray-600 truncate">2m</p>
                        <p className="text-sm text-gray-600 truncate">ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
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
