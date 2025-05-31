
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Slack } from 'lucide-react';

interface CommunicationIntegrationsProps {
  integrations: any;
  onToggleIntegration: (integration: string, enabled: boolean) => void;
}

const CommunicationIntegrations: React.FC<CommunicationIntegrationsProps> = ({
  integrations,
  onToggleIntegration
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Slack className="w-5 h-5 mr-2" />
          Communication Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Slack */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Slack className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Slack</h3>
              <p className="text-sm text-gray-600">
                {integrations.slack.connected 
                  ? `Connected to ${integrations.slack.workspace}`
                  : 'Not connected'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {integrations.slack.connected && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Connected</span>
              </div>
            )}
            <Switch
              checked={integrations.slack.enabled}
              onCheckedChange={(checked) => onToggleIntegration('slack', checked)}
            />
            <Button variant="outline" size="sm">
              Configure Channels
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationIntegrations;
