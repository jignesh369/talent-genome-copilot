
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CreditCard } from 'lucide-react';
import { Organization } from '@/types/organization';
import { BillingStats as BillingStatsType } from '@/types/billing';
import BillingStats from './billing/BillingStats';
import OrganizationTable from './billing/OrganizationTable';

interface BillingManagementProps {
  organizations: Organization[];
  onUpdateBilling: (orgId: string, data: any) => void;
}

const BillingManagement: React.FC<BillingManagementProps> = ({ organizations, onUpdateBilling }) => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Platform-wide billing stats for Startup Admin
  const platformBillingStats: BillingStatsType = {
    totalRevenue: '$47,350',
    monthlyRecurring: '$38,200',
    activeSubscriptions: 47,
    churnRate: '2.1%',
    avgRevenuePerUser: '$812',
    growthRate: '+15.3%'
  };

  const handleSuspendAccount = (orgId: string) => {
    onUpdateBilling(orgId, { billingStatus: 'suspended' });
    toast({
      title: "Account Suspended",
      description: "Organization billing has been suspended.",
    });
  };

  const handleReactivateAccount = (orgId: string) => {
    onUpdateBilling(orgId, { billingStatus: 'active' });
    toast({
      title: "Account Reactivated",
      description: "Organization billing has been reactivated.",
    });
  };

  const handleDownloadInvoice = (orgId: string, invoiceId: string) => {
    toast({
      title: "Download Started",
      description: "Invoice download will begin shortly.",
    });
    console.log(`Downloading invoice ${invoiceId} for organization ${orgId}`);
  };

  return (
    <div className="space-y-6">
      <BillingStats stats={platformBillingStats} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Platform Billing Management
            </CardTitle>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="last">Last Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <OrganizationTable
            organizations={organizations}
            onSuspendAccount={handleSuspendAccount}
            onReactivateAccount={handleReactivateAccount}
            onDownloadInvoice={handleDownloadInvoice}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingManagement;
