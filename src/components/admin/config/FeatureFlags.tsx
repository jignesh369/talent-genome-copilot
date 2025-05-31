
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Zap } from 'lucide-react';
import { SystemConfiguration } from '@/types/system';

interface FeatureFlagsProps {
  config: SystemConfiguration;
  onConfigChange: (key: string, value: any) => void;
}

const FeatureFlags: React.FC<FeatureFlagsProps> = ({ config, onConfigChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Feature Flags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.aiSearchEnabled}
              onCheckedChange={(checked) => onConfigChange('aiSearchEnabled', checked)}
            />
            <Label>AI-Powered Search</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.videoInterviewsEnabled}
              onCheckedChange={(checked) => onConfigChange('videoInterviewsEnabled', checked)}
            />
            <Label>Video Interviews</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.assessmentsEnabled}
              onCheckedChange={(checked) => onConfigChange('assessmentsEnabled', checked)}
            />
            <Label>Candidate Assessments</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.candidatePortalEnabled}
              onCheckedChange={(checked) => onConfigChange('candidatePortalEnabled', checked)}
            />
            <Label>Candidate Portal</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureFlags;
