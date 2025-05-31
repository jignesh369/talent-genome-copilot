
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import CustomerIntegrationsHub from '@/components/admin/integrations/CustomerIntegrationsHub';
import CustomerAIConfiguration from '@/components/admin/config/CustomerAIConfiguration';
import BillingPaymentsMangement from '@/components/admin/billing/BillingPaymentsManagement';
import AuditLogsViewer from '@/components/admin/logs/AuditLogsViewer';
import OrganizationSettingsPanel from '@/components/admin/settings/OrganizationSettingsPanel';
import { Organization } from '@/types/organization';

interface IntegrationTabsWrapperProps {
  currentOrganization: Organization;
}

const IntegrationTabsWrapper: React.FC<IntegrationTabsWrapperProps> = ({ currentOrganization }) => {
  return (
    <>
      <TabsContent value="integrations" className="mt-0">
        <CustomerIntegrationsHub />
      </TabsContent>

      <TabsContent value="ai-config" className="mt-0">
        <CustomerAIConfiguration />
      </TabsContent>

      <TabsContent value="billing-payments" className="mt-0">
        <BillingPaymentsMangement organization={currentOrganization} />
      </TabsContent>

      <TabsContent value="audit-logs" className="mt-0">
        <AuditLogsViewer />
      </TabsContent>

      <TabsContent value="organization-settings" className="mt-0">
        <OrganizationSettingsPanel organization={currentOrganization} />
      </TabsContent>
    </>
  );
};

export default IntegrationTabsWrapper;
