
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Mail } from 'lucide-react';
import { SystemConfiguration } from '@/types/system';

interface EmailConfigurationProps {
  config: SystemConfiguration;
  onConfigChange: (key: string, value: any) => void;
  onTestEmail: () => void;
}

const EmailConfiguration: React.FC<EmailConfigurationProps> = ({ 
  config, 
  onConfigChange, 
  onTestEmail 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Email Configuration
          </div>
          <Button variant="outline" size="sm" onClick={onTestEmail}>
            Test Email
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={config.emailEnabled}
            onCheckedChange={(checked) => onConfigChange('emailEnabled', checked)}
          />
          <Label>Enable Email Notifications</Label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="smtpHost">SMTP Host</Label>
            <Input
              id="smtpHost"
              value={config.smtpHost}
              onChange={(e) => onConfigChange('smtpHost', e.target.value)}
              disabled={!config.emailEnabled}
            />
          </div>
          <div>
            <Label htmlFor="smtpPort">SMTP Port</Label>
            <Input
              id="smtpPort"
              type="number"
              value={config.smtpPort}
              onChange={(e) => onConfigChange('smtpPort', parseInt(e.target.value))}
              disabled={!config.emailEnabled}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="emailFrom">From Email Address</Label>
          <Input
            id="emailFrom"
            type="email"
            value={config.emailFrom}
            onChange={(e) => onConfigChange('emailFrom', e.target.value)}
            disabled={!config.emailEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailConfiguration;
