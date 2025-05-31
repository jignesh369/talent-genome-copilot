import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/components/auth/AuthProvider';
import OrganizationModal from '@/components/modals/OrganizationModal';
import BillingManagement from '@/components/admin/BillingManagement';
import AdvancedAnalytics from '@/components/admin/AdvancedAnalytics';
import TeamAnalytics from '@/components/admin/TeamAnalytics';
import SystemHealth from '@/components/admin/SystemHealth';
import AIModelManagement from '@/components/admin/AIModelManagement';
import FeatureReleaseControl from '@/components/admin/FeatureReleaseControl';
import GlobalPerformanceMonitor from '@/components/admin/GlobalPerformanceMonitor';
import AdvancedRevenueAnalytics from '@/components/admin/AdvancedRevenueAnalytics';
import StartupAdminHeader from '@/components/admin/StartupAdminHeader';
import StartupAdminWelcome from '@/components/admin/StartupAdminWelcome';
import StartupAdminSidebar from '@/components/admin/StartupAdminSidebar';
import StartupAdminStats from '@/components/admin/StartupAdminStats';
import StartupAdminOverview from '@/components/admin/StartupAdminOverview';
import StartupAdminOrganizations from '@/components/admin/StartupAdminOrganizations';
import { Organization } from '@/types/organization';
import { 
  Building, 
  Users, 
  Briefcase, 
  TrendingUp
} from 'lucide-react';

const StartupAdmin = () => {
  const { user, signOut } = useAuth();
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [dateRange, setDateRange] = useState('30d');

  // Standardized organization data
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

  return (
    <div className="min-h-screen bg-gray-50">
      <StartupAdminHeader onSignOut={signOut} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <StartupAdminWelcome userName={user?.user_metadata?.first_name} />
        <StartupAdminStats stats={platformStats} />

        {/* Main Content with Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="grid grid-cols-12 gap-6">
            <StartupAdminSidebar />

            {/* Main Content Area */}
            <div className="col-span-9">
              <TabsContent value="overview" className="mt-0">
                <StartupAdminOverview 
                  recentActivities={recentActivities}
                  onCreateOrganization={handleCreateOrganization}
                />
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
                <StartupAdminOrganizations
                  organizations={organizations}
                  onCreateOrganization={handleCreateOrganization}
                  onViewOrganization={handleViewOrganization}
                  onEditOrganization={handleEditOrganization}
                />
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
