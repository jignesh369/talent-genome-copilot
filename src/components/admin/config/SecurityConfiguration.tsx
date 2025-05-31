
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Shield } from 'lucide-react';
import { SystemConfiguration } from '@/types/system';

interface SecurityConfigurationProps {
  config: SystemConfiguration;
  onConfigChange: (key: string, value: any) => void;
}

const SecurityConfiguration: React.FC<SecurityConfigurationProps> = ({ 
  config, 
  onConfigChange 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="passwordLength">Min Password Length</Label>
            <Input
              id="passwordLength"
              type="number"
              value={config.passwordMinLength}
              onChange={(e) => onConfigChange('passwordMinLength', parseInt(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={config.sessionTimeout}
              onChange={(e) => onConfigChange('sessionTimeout', parseInt(e.target.value))}
            />
          </div>
          <div className="flex items-center space-x-2 mt-6">
            <Switch
              checked={config.requireMFA}
              onCheckedChange={(checked) => onConfigChange('requireMFA', checked)}
            />
            <Label>Require MFA</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityConfiguration;
