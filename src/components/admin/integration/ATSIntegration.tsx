
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'lucide-react';

interface ATSIntegrationProps {
  integrations: any;
  onToggleIntegration: (integration: string, enabled: boolean) => void;
}

const ATSIntegration: React.FC<ATSIntegrationProps> = ({
  integrations,
  onToggleIntegration
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Link className="w-5 h-5 mr-2" />
          ATS Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="atsProvider">ATS Provider</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select ATS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workday">Workday</SelectItem>
                <SelectItem value="greenhouse">Greenhouse</SelectItem>
                <SelectItem value="lever">Lever</SelectItem>
                <SelectItem value="bamboohr">BambooHR</SelectItem>
                <SelectItem value="successfactors">SuccessFactors</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter API key"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={integrations.ats.enabled}
            onCheckedChange={(checked) => onToggleIntegration('ats', checked)}
          />
          <Label>Enable ATS Sync</Label>
        </div>
        <Button>Test Connection</Button>
      </CardContent>
    </Card>
  );
};

export default ATSIntegration;
