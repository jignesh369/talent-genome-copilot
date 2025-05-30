
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Download, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface BillingManagementProps {
  organizations: any[];
  onUpdateBilling: (orgId: string, data: any) => void;
}

const BillingManagement: React.FC<BillingManagementProps> = ({ organizations, onUpdateBilling }) => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const billingStats = {
    totalRevenue: '$124,850',
    monthlyRecurring: '$24,500',
    activeSubscriptions: 47,
    churnRate: '2.1%'
  };

  const handleSuspendAccount = (orgId: string) => {
    onUpdateBilling(orgId, { status: 'suspended' });
    toast({
      title: "Account Suspended",
      description: "Organization billing has been suspended.",
    });
  };

  const handleReactivateAccount = (orgId: string) => {
    onUpdateBilling(orgId, { status: 'active' });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'past_due': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'starter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{billingStats.totalRevenue}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Recurring</p>
                <p className="text-2xl font-bold text-gray-900">{billingStats.monthlyRecurring}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{billingStats.activeSubscriptions}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                <p className="text-2xl font-bold text-gray-900">{billingStats.churnRate}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Billing Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Monthly Amount</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{org.name}</p>
                      <p className="text-sm text-gray-600">{org.contactEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPlanColor(org.plan)}>
                      {org.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(org.billingStatus || 'active')}>
                      {org.billingStatus || 'active'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${org.monthlyAmount || '99'}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {org.nextBilling || 'Jan 15, 2024'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadInvoice(org.id, 'latest')}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Invoice
                      </Button>
                      {org.billingStatus === 'suspended' ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReactivateAccount(org.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          Reactivate
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSuspendAccount(org.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Suspend
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingManagement;
