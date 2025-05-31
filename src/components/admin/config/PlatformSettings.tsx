
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings } from 'lucide-react';
import { SystemConfiguration } from '@/types/system';

interface PlatformSettingsProps {
  config: SystemConfiguration;
  onConfigChange: (key: string, value: any) => void;
}

const PlatformSettings: React.FC<PlatformSettingsProps> = ({ config, onConfigChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Platform Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="platformName">Platform Name</Label>
            <Input
              id="platformName"
              value={config.platformName}
              onChange={(e) => onConfigChange('platformName', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="defaultPlan">Default Plan</Label>
            <Select 
              value={config.defaultPlan} 
              onValueChange={(value) => onConfigChange('defaultPlan', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maxUsers">Max Users per Organization</Label>
            <Input
              id="maxUsers"
              type="number"
              value={config.maxUsersPerOrg}
              onChange={(e) => onConfigChange('maxUsersPerOrg', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="maxJobs">Max Jobs per Organization</Label>
            <Input
              id="maxJobs"
              type="number"
              value={config.maxJobsPerOrg}
              onChange={(e) => onConfigChange('maxJobsPerOrg', parseInt(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformSettings;
