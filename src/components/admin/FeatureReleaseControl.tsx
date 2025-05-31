
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Flag, 
  Users, 
  Rocket, 
  Shield, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings
} from 'lucide-react';

const FeatureReleaseControl = () => {
  const { toast } = useToast();
  const [features, setFeatures] = useState([
    {
      id: 'ai-scoring',
      name: 'AI Candidate Scoring',
      description: 'Advanced AI-powered candidate evaluation',
      status: 'stable',
      rolloutPercentage: 100,
      organizations: ['all'],
      category: 'ai'
    },
    {
      id: 'automation-workflows',
      name: 'Automation Workflows',
      description: 'Intelligent workflow automation system',
      status: 'beta',
      rolloutPercentage: 75,
      organizations: ['techcorp', 'growthco'],
      category: 'automation'
    },
    {
      id: 'predictive-analytics',
      name: 'Predictive Analytics',
      description: 'Advanced hiring predictions and insights',
      status: 'alpha',
      rolloutPercentage: 25,
      organizations: ['techcorp'],
      category: 'analytics'
    },
    {
      id: 'integration-hub',
      name: 'Platform Integration Hub',
      description: 'External platform integrations',
      status: 'development',
      rolloutPercentage: 0,
      organizations: [],
      category: 'integration'
    }
  ]);

  const [organizations] = useState([
    { id: 'techcorp', name: 'TechCorp Inc.', plan: 'enterprise' },
    { id: 'startupxyz', name: 'StartupXYZ', plan: 'professional' },
    { id: 'growthco', name: 'GrowthCo Enterprise', plan: 'enterprise' }
  ]);

  const handleFeatureToggle = (featureId: string, orgId?: string) => {
    if (orgId) {
      setFeatures(prev =>
        prev.map(feature =>
          feature.id === featureId
            ? {
                ...feature,
                organizations: feature.organizations.includes(orgId)
                  ? feature.organizations.filter(id => id !== orgId)
                  : [...feature.organizations, orgId]
              }
            : feature
        )
      );
    } else {
      setFeatures(prev =>
        prev.map(feature =>
          feature.id === featureId
            ? {
                ...feature,
                organizations: feature.organizations.includes('all') ? [] : ['all']
              }
            : feature
        )
      );
    }
    
    toast({
      title: "Feature Access Updated",
      description: "Feature availability has been modified successfully.",
    });
  };

  const handleStatusChange = (featureId: string, newStatus: string) => {
    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId ? { ...feature, status: newStatus } : feature
      )
    );
    
    toast({
      title: "Feature Status Updated",
      description: `Feature status changed to ${newStatus}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable':
        return CheckCircle;
      case 'beta':
        return AlertTriangle;
      case 'alpha':
        return Clock;
      case 'development':
        return XCircle;
      default:
        return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'beta':
        return 'bg-yellow-100 text-yellow-800';
      case 'alpha':
        return 'bg-orange-100 text-orange-800';
      case 'development':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Feature Release Control</h3>
          <p className="text-sm text-gray-600">Manage feature rollouts and organization access</p>
        </div>
        <Button>
          <Rocket className="w-4 h-4 mr-2" />
          Deploy Feature
        </Button>
      </div>

      {/* Release Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stable Features</p>
                <p className="text-3xl font-bold text-gray-900">
                  {features.filter(f => f.status === 'stable').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Beta Features</p>
                <p className="text-3xl font-bold text-gray-900">
                  {features.filter(f => f.status === 'beta').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Development</p>
                <p className="text-3xl font-bold text-gray-900">
                  {features.filter(f => f.status === 'development').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Organizations</p>
                <p className="text-3xl font-bold text-gray-900">{organizations.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Management */}
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
                        onValueChange={(value) => handleStatusChange(feature.id, value)}
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
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
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
                              onCheckedChange={() => handleFeatureToggle(feature.id, org.id)}
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

      {/* Rollout Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Scheduled Rollouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Predictive Analytics Beta</p>
                <p className="text-sm text-blue-700">Scheduled for rollout to Enterprise customers</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-900">Tomorrow, 10:00 AM</p>
                <Badge variant="outline" className="bg-blue-100 text-blue-800">Pending</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-green-900">Integration Hub Stable</p>
                <p className="text-sm text-green-700">Full release to all customers</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-900">Next Week</p>
                <Badge variant="outline" className="bg-green-100 text-green-800">Scheduled</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureReleaseControl;
