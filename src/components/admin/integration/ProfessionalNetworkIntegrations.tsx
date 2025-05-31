
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Linkedin } from 'lucide-react';

interface ProfessionalNetworkIntegrationsProps {
  integrations: any;
  onToggleIntegration: (integration: string, enabled: boolean) => void;
  onConnect: (integration: string) => void;
}

const ProfessionalNetworkIntegrations: React.FC<ProfessionalNetworkIntegrationsProps> = ({
  integrations,
  onToggleIntegration,
  onConnect
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Linkedin className="w-5 h-5 mr-2" />
          Professional Networks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* LinkedIn */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">LinkedIn Recruiter</h3>
              <p className="text-sm text-gray-600">
                {integrations.linkedin.connected 
                  ? 'Connected - Premium recruiting features enabled'
                  : 'Connect to access talent pool and messaging'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!integrations.linkedin.connected && (
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600">Not Connected</span>
              </div>
            )}
            <Switch
              checked={integrations.linkedin.enabled}
              onCheckedChange={(checked) => onToggleIntegration('linkedin', checked)}
            />
            <Button size="sm" onClick={() => onConnect('LinkedIn')}>
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalNetworkIntegrations;
