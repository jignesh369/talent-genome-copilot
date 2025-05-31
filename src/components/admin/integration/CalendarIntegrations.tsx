
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CalendarIntegrationsProps {
  integrations: any;
  onToggleIntegration: (integration: string, enabled: boolean) => void;
  onConnect: (integration: string) => void;
  onDisconnect: (integration: string) => void;
}

const CalendarIntegrations: React.FC<CalendarIntegrationsProps> = ({
  integrations,
  onToggleIntegration,
  onConnect,
  onDisconnect
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Calendar Integrations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Google Calendar */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold">Google Calendar</h3>
              <p className="text-sm text-gray-600">
                {integrations.googleCalendar.connected 
                  ? `Connected: ${integrations.googleCalendar.email}`
                  : 'Not connected'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {integrations.googleCalendar.connected && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Connected</span>
              </div>
            )}
            <Switch
              checked={integrations.googleCalendar.enabled}
              onCheckedChange={(checked) => onToggleIntegration('googleCalendar', checked)}
            />
            {integrations.googleCalendar.connected ? (
              <Button variant="outline" size="sm" onClick={() => onDisconnect('googleCalendar')}>
                Disconnect
              </Button>
            ) : (
              <Button size="sm" onClick={() => onConnect('Google Calendar')}>
                Connect
              </Button>
            )}
          </div>
        </div>

        {/* Outlook Calendar */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Outlook Calendar</h3>
              <p className="text-sm text-gray-600">
                {integrations.outlook.connected 
                  ? `Connected: ${integrations.outlook.email}`
                  : 'Not connected'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {integrations.outlook.connected && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Connected</span>
              </div>
            )}
            <Switch
              checked={integrations.outlook.enabled}
              onCheckedChange={(checked) => onToggleIntegration('outlook', checked)}
            />
            <Button size="sm" onClick={() => onConnect('Outlook Calendar')}>
              Connect
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarIntegrations;
