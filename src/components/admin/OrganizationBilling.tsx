
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  Download, 
  DollarSign, 
  Users, 
  Briefcase,
  Calendar,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface OrganizationBillingProps {
  organization: {
    id: string;
    name: string;
    plan: string;
    status: string;
    monthlyAmount: number;
    nextBilling: string;
    userLimit: number;
    jobLimit: number;
    currentUsers: number;
    currentJobs: number;
  };
}

const OrganizationBilling: React.FC<OrganizationBillingProps> = ({ organization }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadInvoice = () => {
    setIsLoading(true);
    toast({
      title: "Download Started",
      description: "Your invoice download will begin shortly.",
    });
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleUpgradePlan = () => {
    toast({
      title: "Upgrade Plan",
      description: "Contact your account manager to upgrade your plan.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'past_due': return 'bg-red-100 text-red-800';
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

  const usagePercentage = {
    users: (organization.currentUsers / organization.userLimit) * 100,
    jobs: (organization.currentJobs / organization.jobLimit) * 100
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Badge className={`${getPlanColor(organization.plan)} px-3 py-1 text-sm`}>
                {organization.plan.charAt(0).toUpperCase() + organization.plan.slice(1)}
              </Badge>
              <p className="text-2xl font-bold mt-2">${organization.monthlyAmount}/month</p>
              <p className="text-sm text-gray-600">Billed monthly</p>
            </div>
            
            <div className="text-center">
              <Badge className={getStatusColor(organization.status)}>
                {organization.status.charAt(0).toUpperCase() + organization.status.slice(1)}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">Account Status</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">{organization.nextBilling}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Next billing date</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button onClick={handleUpgradePlan}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2" />
              User Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Users</span>
                <span>{organization.currentUsers} / {organization.userLimit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${usagePercentage.users > 80 ? 'bg-red-500' : usagePercentage.users > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(usagePercentage.users, 100)}%` }}
                ></div>
              </div>
              {usagePercentage.users > 80 && (
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Approaching limit
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Briefcase className="w-4 h-4 mr-2" />
              Job Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Jobs</span>
                <span>{organization.currentJobs} / {organization.jobLimit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${usagePercentage.jobs > 80 ? 'bg-red-500' : usagePercentage.jobs > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(usagePercentage.jobs, 100)}%` }}
                ></div>
              </div>
              {usagePercentage.jobs > 80 && (
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Approaching limit
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Billing & Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={handleDownloadInvoice}
              disabled={isLoading}
            >
              <Download className="w-4 h-4 mr-2" />
              {isLoading ? 'Downloading...' : 'Download Latest Invoice'}
            </Button>
            <Button variant="outline">
              <DollarSign className="w-4 h-4 mr-2" />
              View Billing History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationBilling;
