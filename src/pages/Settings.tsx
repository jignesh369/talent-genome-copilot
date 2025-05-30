
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  CreditCard
} from "lucide-react";
import ProfileForm from "@/components/settings/ProfileForm";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import OrganizationSettings from "@/components/settings/OrganizationSettings";
import OrganizationBilling from "@/components/admin/OrganizationBilling";

const Settings = () => {
  const { userRole } = useAuth();

  // Helper function to determine visible tabs based on user role
  const getVisibleTabs = (userRole: string | null) => {
    const baseTabs = [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'security', label: 'Security', icon: Shield }
    ];

    // Only customer_admin and startup_admin get access to organization and billing tabs
    if (userRole === 'customer_admin' || userRole === 'startup_admin') {
      return [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'organization', label: 'Organization', icon: Building },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard }
      ];
    }

    // All other roles (candidate, recruiter, hiring_manager) get base tabs only
    return baseTabs;
  };

  const visibleTabs = getVisibleTabs(userRole);
  const gridCols = `grid-cols-${visibleTabs.length}`;

  // Sample organization data for billing component
  const currentOrganization = {
    id: '1',
    name: 'TechCorp Inc.',
    plan: 'professional',
    status: 'active',
    monthlyAmount: 299,
    nextBilling: 'Jan 15, 2024',
    userLimit: 25,
    jobLimit: 15,
    currentUsers: 12,
    currentJobs: 8
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className={`grid w-full ${gridCols}`}>
          {visibleTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm />
        </TabsContent>

        {visibleTabs.some(tab => tab.id === 'organization') && (
          <TabsContent value="organization" className="space-y-6">
            <OrganizationSettings />
          </TabsContent>
        )}

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>

        {visibleTabs.some(tab => tab.id === 'billing') && (
          <TabsContent value="billing" className="space-y-6">
            <OrganizationBilling organization={currentOrganization} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;
