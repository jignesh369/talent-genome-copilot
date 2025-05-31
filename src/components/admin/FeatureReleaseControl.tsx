
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Rocket } from 'lucide-react';
import ReleaseStatistics from './features/ReleaseStatistics';
import FeatureManagement from './features/FeatureManagement';
import RolloutSchedule from './features/RolloutSchedule';

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

      <ReleaseStatistics features={features} organizations={organizations} />

      <FeatureManagement 
        features={features}
        organizations={organizations}
        onFeatureToggle={handleFeatureToggle}
        onStatusChange={handleStatusChange}
      />

      <RolloutSchedule />
    </div>
  );
};

export default FeatureReleaseControl;
