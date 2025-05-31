
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Download } from 'lucide-react';
import { Organization } from '@/types/organization';
import { BillingService } from '@/services/billingService';

interface OrganizationTableProps {
  organizations: Organization[];
  onSuspendAccount: (orgId: string) => void;
  onReactivateAccount: (orgId: string) => void;
  onDownloadInvoice: (orgId: string, invoiceId: string) => void;
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({
  organizations,
  onSuspendAccount,
  onReactivateAccount,
  onDownloadInvoice
}) => {
  return (
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
              <Badge className={BillingService.getPlanColor(org.plan)}>
                {org.plan}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={BillingService.getStatusColor(org.status)}>
                {org.status}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="font-medium">${BillingService.getPlanPricing(org.plan)}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                Jan 15, 2024
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onDownloadInvoice(org.id, 'latest')}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Invoice
                </Button>
                {org.status === 'suspended' ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onReactivateAccount(org.id)}
                    className="text-green-600 hover:text-green-700"
                  >
                    Reactivate
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSuspendAccount(org.id)}
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
  );
};

export default OrganizationTable;
