
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flag, CheckCircle, AlertTriangle, Clock, XCircle, Shield } from 'lucide-react';

interface FeatureManagementProps {
  features: any[];
  organizations: any[];
  onFeatureToggle: (featureId: string, orgId?: string) => void;
  onStatusChange: (featureId: string, newStatus: string) => void;
}

const FeatureManagement: React.FC<FeatureManagementProps> = ({
  features,
  organizations,
  onFeatureToggle,
  onStatusChange
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable': return CheckCircle;
      case 'beta': return AlertTriangle;
      case 'alpha': return Clock;
      case 'development': return XCircle;
      default: return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'alpha': return 'bg-orange-100 text-orange-800';
      case 'development': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Flag className="w-5 h-5 mr-2" />
          Feature Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {features.map((feature) => {
            const StatusIcon = getStatusIcon(feature.status);
            return (
              <div key={feature.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <StatusIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.name}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(feature.status)}>
                      {feature.status}
                    </Badge>
                    <Badge variant="outline">
                      {feature.rolloutPercentage}% rollout
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                    <Select 
                      value={feature.status} 
                      onValueChange={(value) => onStatusChange(feature.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="alpha">Alpha</SelectItem>
                        <SelectItem value="beta">Beta</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Global Access</label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={feature.organizations.includes('all')}
                        onCheckedChange={() => onFeatureToggle(feature.id)}
                      />
                      <span className="text-sm text-gray-600">
                        {feature.organizations.includes('all') ? 'Enabled for all' : 'Selective access'}
                      </span>
                    </div>
                  </div>
                </div>

                {!feature.organizations.includes('all') && (
                  <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Organization Access</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {organizations.map((org) => (
                        <div key={org.id} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="text-sm font-medium">{org.name}</p>
                            <p className="text-xs text-gray-500">{org.plan}</p>
                          </div>
                          <Switch
                            checked={feature.organizations.includes(org.id)}
                            onCheckedChange={() => onFeatureToggle(feature.id, org.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureManagement;
