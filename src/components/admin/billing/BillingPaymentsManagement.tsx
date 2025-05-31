
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  CreditCard, 
  Plus, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Download,
  Settings,
  Shield
} from 'lucide-react';
import { Organization } from '@/types/organization';

interface BillingPaymentsManagementProps {
  organization: Organization;
}

const BillingPaymentsManagement: React.FC<BillingPaymentsManagementProps> = ({ organization }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '08/26', isDefault: false }
  ]);

  const [autoRenewal, setAutoRenewal] = useState(true);

  const billingHistory = [
    { id: 1, date: '2024-01-01', amount: 299, status: 'paid', description: 'Monthly subscription - Professional Plan' },
    { id: 2, date: '2023-12-01', amount: 299, status: 'paid', description: 'Monthly subscription - Professional Plan' },
    { id: 3, date: '2023-11-01', amount: 299, status: 'paid', description: 'Monthly subscription - Professional Plan' },
    { id: 4, date: '2023-10-01', amount: 299, status: 'paid', description: 'Monthly subscription - Professional Plan' }
  ];

  const usageBreakdown = [
    { feature: 'Team Members', current: organization.currentUsers, limit: organization.userLimit, cost: 150 },
    { feature: 'Active Jobs', current: organization.currentJobs, limit: organization.jobLimit, cost: 99 },
    { feature: 'AI Search Credits', current: 2847, limit: 5000, cost: 50 },
    { feature: 'Premium Support', current: 1, limit: 1, cost: 0 }
  ];

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage > 80) return 'text-red-600';
    if (percentage > 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Billing & Payments</h2>
        <p className="text-gray-600 mb-6">Manage your subscription, payment methods, and billing history</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Plan</p>
                <p className="text-xl font-bold text-blue-600 capitalize">{organization.plan}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                <p className="text-xl font-bold text-green-600">${organization.monthlyAmount}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Billing</p>
                <p className="text-xl font-bold text-purple-600">{organization.nextBilling}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-xl font-bold text-green-600 capitalize">{organization.status}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Usage Overview</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
          <TabsTrigger value="settings">Billing Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Usage & Limits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {usageBreakdown.map((item, index) => {
                  const percentage = getUsagePercentage(item.current, item.limit);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.feature}</span>
                        <div className="text-right">
                          <span className={`font-semibold ${getUsageColor(percentage)}`}>
                            {item.current} / {item.limit}
                          </span>
                          <p className="text-sm text-gray-600">${item.cost}/month</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            percentage > 80 ? 'bg-red-500' : 
                            percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg text-center">
                    <h3 className="font-semibold mb-2">Enterprise Plan</h3>
                    <p className="text-sm text-gray-600 mb-4">Unlimited users, advanced AI features, priority support</p>
                    <Button>Upgrade to Enterprise</Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Add-on: Extra AI Credits</h4>
                    <p className="text-sm text-green-700">+5,000 AI search credits for $25/month</p>
                    <Button variant="outline" size="sm" className="mt-2">Add to Plan</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-green-400 bg-green-50 rounded-r-lg">
                    <p className="font-medium text-green-900">Optimize Team Size</p>
                    <p className="text-sm text-green-700">Remove 2 inactive users to save $30/month</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                    <p className="font-medium text-blue-900">Annual Billing</p>
                    <p className="text-sm text-blue-700">Switch to annual billing and save 20% ($718/year)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Payment Methods</CardTitle>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <CreditCard className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium capitalize">{method.type}</span>
                            <span className="text-gray-600">•••• {method.last4}</span>
                            {method.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        {!method.isDefault && (
                          <Button variant="outline" size="sm">Remove</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">PCI DSS Compliant</p>
                    <p className="text-sm text-green-700">Your payment data is securely encrypted</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">256-bit SSL Encryption</p>
                    <p className="text-sm text-blue-700">Bank-level security for all transactions</p>
                  </div>
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Billing History</CardTitle>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((bill) => (
                  <div key={bill.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{bill.description}</p>
                        <p className="text-sm text-gray-600">{bill.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${bill.amount}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {bill.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-renewal</p>
                  <p className="text-sm text-gray-600">Automatically renew subscription</p>
                </div>
                <Switch 
                  checked={autoRenewal} 
                  onCheckedChange={setAutoRenewal}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-gray-600">Receive billing and payment updates</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Usage alerts</p>
                  <p className="text-sm text-gray-600">Get notified when approaching limits</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Billing Contact</h4>
                <div className="space-y-2">
                  <p className="text-sm"><strong>Email:</strong> {organization.contactEmail}</p>
                  <p className="text-sm"><strong>Name:</strong> {organization.contactName}</p>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingPaymentsManagement;
