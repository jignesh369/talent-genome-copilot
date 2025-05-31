
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Linkedin, 
  Github, 
  Slack, 
  Mail, 
  Calendar,
  Settings,
  CheckCircle,
  AlertCircle,
  Zap,
  Workflow
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  connected: boolean;
  enabled: boolean;
  features: string[];
  status: 'connected' | 'disconnected' | 'error';
}

const IntegrationHub: React.FC = () => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      description: 'Connect to LinkedIn for talent sourcing and profile enrichment',
      connected: true,
      enabled: true,
      features: ['Profile Import', 'Talent Sourcing', 'InMail Integration'],
      status: 'connected'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      description: 'Access developer profiles and code contributions',
      connected: true,
      enabled: true,
      features: ['Repository Analysis', 'Contribution Tracking', 'Technical Assessment'],
      status: 'connected'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: Slack,
      description: 'Team notifications and collaboration workflows',
      connected: false,
      enabled: false,
      features: ['Team Notifications', 'Interview Scheduling', 'Status Updates'],
      status: 'disconnected'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      icon: Mail,
      description: 'Email automation and template management',
      connected: true,
      enabled: false,
      features: ['Email Templates', 'Auto-follow up', 'Response Tracking'],
      status: 'connected'
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      icon: Calendar,
      description: 'Interview scheduling and availability management',
      connected: true,
      enabled: true,
      features: ['Auto Scheduling', 'Availability Sync', 'Meeting Links'],
      status: 'connected'
    }
  ]);

  const handleToggleIntegration = (id: string, enabled: boolean) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, enabled }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: enabled ? "Integration Enabled" : "Integration Disabled",
      description: `${integration?.name} integration has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleConnect = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: true, status: 'connected' as const }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${integration?.name}.`,
    });
  };

  const handleDisconnect = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: false, enabled: false, status: 'disconnected' as const }
          : integration
      )
    );
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: "Integration Disconnected",
      description: `Disconnected from ${integration?.name}.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integration Hub</h2>
          <p className="text-gray-600">Connect and manage external platform integrations</p>
        </div>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Configure All
        </Button>
      </div>

      <Tabs defaultValue="platforms" className="space-y-6">
        <TabsList>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusIcon(integration.status)}
                            <Badge className={getStatusColor(integration.status)}>
                              {integration.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={integration.enabled}
                        onCheckedChange={(checked) => handleToggleIntegration(integration.id, checked)}
                        disabled={!integration.connected}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      {integration.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {integration.connected ? (
                          <>
                            <Button size="sm" variant="outline">Configure</Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDisconnect(integration.id)}
                            >
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleConnect(integration.id)}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Automation Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Set up intelligent automation rules to streamline your recruiting process.
              </p>
              <Button>
                <Zap className="h-4 w-4 mr-2" />
                Create New Rule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Workflow className="h-5 w-5 mr-2" />
                Workflow Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Create and manage automated workflows for common recruiting tasks.
              </p>
              <Button>
                <Workflow className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationHub;
