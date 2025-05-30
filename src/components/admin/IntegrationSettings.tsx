import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Calendar, 
  Mail, 
  Linkedin, 
  Slack, 
  Chrome,
  Link,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const IntegrationSettings: React.FC = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState({
    googleCalendar: {
      enabled: true,
      connected: true,
      email: 'admin@company.com',
      syncEnabled: true
    },
    outlook: {
      enabled: false,
      connected: false,
      email: '',
      syncEnabled: false
    },
    gmail: {
      enabled: true,
      connected: true,
      email: 'admin@company.com',
      templates: 15
    },
    linkedin: {
      enabled: true,
      connected: false,
      recruiterLicense: false
    },
    slack: {
      enabled: true,
      connected: true,
      workspace: 'company-workspace',
      channel: '#hiring'
    },
    ats: {
      enabled: false,
      provider: '',
      apiKey: '',
      connected: false
    }
  });

  const handleToggleIntegration = (integration: string, enabled: boolean) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: { ...prev[integration], enabled }
    }));
    
    toast({
      title: enabled ? "Integration Enabled" : "Integration Disabled",
      description: `${integration} integration has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleConnect = (integration: string) => {
    toast({
      title: "Connecting Integration",
      description: `Redirecting to ${integration} authentication...`,
    });
    // Simulate OAuth flow
    setTimeout(() => {
      setIntegrations(prev => ({
        ...prev,
        [integration]: { ...prev[integration], connected: true }
      }));
      toast({
        title: "Integration Connected",
        description: `${integration} has been successfully connected.`,
      });
    }, 2000);
  };

  const handleDisconnect = (integration: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: { ...prev[integration], connected: false }
    }));
    
    toast({
      title: "Integration Disconnected",
      description: `${integration} has been disconnected.`,
    });
  };

  const handleSync = (integration: string) => {
    toast({
      title: "Syncing Data",
      description: `Syncing data with ${integration}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Sync Complete",
        description: `Successfully synced with ${integration}.`,
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Integration Settings</h2>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync All
        </Button>
      </div>

      {/* Calendar Integrations */}
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
                onCheckedChange={(checked) => handleToggleIntegration('googleCalendar', checked)}
              />
              {integrations.googleCalendar.connected ? (
                <Button variant="outline" size="sm" onClick={() => handleDisconnect('googleCalendar')}>
                  Disconnect
                </Button>
              ) : (
                <Button size="sm" onClick={() => handleConnect('Google Calendar')}>
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
                onCheckedChange={(checked) => handleToggleIntegration('outlook', checked)}
              />
              <Button size="sm" onClick={() => handleConnect('Outlook Calendar')}>
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Integrations */}
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
                onCheckedChange={(checked) => handleToggleIntegration('gmail', checked)}
              />
              <Button variant="outline" size="sm">
                Configure Templates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Networks */}
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
                onCheckedChange={(checked) => handleToggleIntegration('linkedin', checked)}
              />
              <Button size="sm" onClick={() => handleConnect('LinkedIn')}>
                Connect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication Tools */}
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
                onCheckedChange={(checked) => handleToggleIntegration('slack', checked)}
              />
              <Button variant="outline" size="sm">
                Configure Channels
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ATS Integration */}
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
              onCheckedChange={(checked) => handleToggleIntegration('ats', checked)}
            />
            <Label>Enable ATS Sync</Label>
          </div>
          <Button>Test Connection</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
