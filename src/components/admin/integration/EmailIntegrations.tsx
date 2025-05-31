
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Mail } from 'lucide-react';

interface EmailIntegrationsProps {
  integrations: any;
  onToggleIntegration: (integration: string, enabled: boolean) => void;
}

const EmailIntegrations: React.FC<EmailIntegrationsProps> = ({
  integrations,
  onToggleIntegration
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          Email Integrations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gmail */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold">Gmail</h3>
              <p className="text-sm text-gray-600">
                {integrations.gmail.connected 
                  ? `${integrations.gmail.templates} email templates configured`
                  : 'Not connected'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {integrations.gmail.connected && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Connected</span>
              </div>
            )}
            <Switch
              checked={integrations.gmail.enabled}
              onCheckedChange={(checked) => onToggleIntegration('gmail', checked)}
            />
            <Button variant="outline" size="sm">
              Configure Templates
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailIntegrations;
