
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Github, 
  Linkedin, 
  Slack, 
  Database, 
  Link, 
  CheckCircle, 
  XCircle,
  Settings,
  Plus
} from 'lucide-react';

const PlatformIntegrationHub = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState([
    {
      id: 'linkedin',
      name: 'LinkedIn Recruiter',
      icon: Linkedin,
      connected: true,
      status: 'active',
      description: 'Import candidate profiles and job postings',
      lastSync: '2 hours ago'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      connected: false,
      status: 'inactive',
      description: 'Analyze developer profiles and repositories',
      lastSync: 'Never'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: Slack,
      connected: true,
      status: 'active',
      description: 'Team notifications and collaboration',
      lastSync: '1 hour ago'
    },
    {
      id: 'ats',
      name: 'ATS Integration',
      icon: Database,
      connected: false,
      status: 'inactive',
      description: 'Connect with existing ATS systems',
      lastSync: 'Never'
    }
  ]);

  const handleToggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, connected: !integration.connected, status: integration.connected ? 'inactive' : 'active' }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: integration?.connected ? "Integration Disconnected" : "Integration Connected",
      description: `${integration?.name} has been ${integration?.connected ? 'disconnected' : 'connected'} successfully.`,
    });
  };

  const handleConfigureIntegration = (name: string) => {
    toast({
      title: "Configuration",
      description: `Opening configuration for ${name}...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Platform Integrations</h3>
          <p className="text-sm text-gray-600">Connect with external platforms to enhance your recruiting workflow</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <integration.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>
                </div>
                <Switch
                  checked={integration.connected}
                  onCheckedChange={() => handleToggleIntegration(integration.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant={integration.status === 'active' ? 'default' : 'secondary'}>
                    {integration.connected ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {integration.status}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Last sync: {integration.lastSync}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConfigureIntegration(integration.name)}
                  disabled={!integration.connected}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Link className="w-5 h-5 mr-2" />
            Integration Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium">API Rate Limits</span>
              <Badge variant="outline" className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Data Sync Status</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium">Authentication</span>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Needs Refresh</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformIntegrationHub;
