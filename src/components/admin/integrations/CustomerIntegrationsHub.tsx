
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plug, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Settings, 
  ExternalLink,
  Linkedin,
  Mail,
  Calendar,
  Slack,
  Webhook,
  Database
} from 'lucide-react';

const CustomerIntegrationsHub: React.FC = () => {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'LinkedIn Recruiter', type: 'sourcing', status: 'connected', enabled: true, icon: Linkedin },
    { id: 2, name: 'Google Workspace', type: 'email', status: 'connected', enabled: true, icon: Mail },
    { id: 3, name: 'Calendly', type: 'scheduling', status: 'connected', enabled: false, icon: Calendar },
    { id: 4, name: 'Slack', type: 'communication', status: 'pending', enabled: false, icon: Slack },
    { id: 5, name: 'Workday', type: 'hris', status: 'not_connected', enabled: false, icon: Database },
    { id: 6, name: 'Webhooks', type: 'automation', status: 'connected', enabled: true, icon: Webhook }
  ]);

  const integrationCategories = [
    { id: 'sourcing', name: 'Sourcing & Recruiting', description: 'Job boards, social networks, talent databases' },
    { id: 'ats', name: 'ATS & HRIS', description: 'Applicant tracking systems and HR information systems' },
    { id: 'communication', name: 'Communication', description: 'Email, messaging, and collaboration tools' },
    { id: 'scheduling', name: 'Scheduling', description: 'Calendar and interview scheduling platforms' },
    { id: 'automation', name: 'Automation & APIs', description: 'Webhooks, custom APIs, and workflow automation' }
  ];

  const availableIntegrations = [
    { name: 'Indeed', category: 'sourcing', description: 'Post jobs and source candidates', premium: false },
    { name: 'Greenhouse', category: 'ats', description: 'Sync candidates and job data', premium: true },
    { name: 'BambooHR', category: 'ats', description: 'Employee data synchronization', premium: true },
    { name: 'Microsoft Teams', category: 'communication', description: 'Team collaboration and messaging', premium: false },
    { name: 'Zoom', category: 'scheduling', description: 'Video interview integration', premium: false },
    { name: 'Custom API', category: 'automation', description: 'Build custom integrations', premium: true }
  ];

  const toggleIntegration = (id: number) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'not_connected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'pending': return Clock;
      case 'not_connected': return AlertCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Integrations Hub</h2>
        <p className="text-gray-600 mb-6">Connect your favorite tools and streamline your hiring workflow</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected</p>
                <p className="text-2xl font-bold text-green-600">4</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-blue-600">12+</p>
              </div>
              <Plug className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Sync</p>
                <p className="text-2xl font-bold text-purple-600">Real-time</p>
              </div>
              <Database className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Integrations</TabsTrigger>
          <TabsTrigger value="available">Available Integrations</TabsTrigger>
          <TabsTrigger value="custom">Custom & APIs</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration) => {
              const StatusIcon = getStatusIcon(integration.status);
              return (
                <Card key={integration.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <integration.icon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{integration.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">{integration.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(integration.status)}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {integration.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={integration.enabled}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                          disabled={integration.status !== 'connected'}
                        />
                        <span className="text-sm text-gray-600">
                          {integration.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrationCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {availableIntegrations
                      .filter(integration => integration.category === category.id)
                      .map((integration, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{integration.name}</h4>
                              {integration.premium && (
                                <Badge variant="secondary">Premium</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{integration.description}</p>
                          </div>
                          <Button size="sm">Connect</Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <p className="text-sm text-gray-600">Set up webhooks for real-time data synchronization</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">New Application</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">https://your-app.com/webhooks/applications</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Test</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Interview Scheduled</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">https://your-app.com/webhooks/interviews</p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Test</Button>
                    </div>
                  </div>
                  <Button className="w-full">Add New Webhook</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <p className="text-sm text-gray-600">Manage API keys and custom integrations</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">API Endpoint</h4>
                    <code className="text-sm bg-white px-2 py-1 rounded border">
                      https://api.recruitingplatform.com/v1/
                    </code>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">API Key</h4>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-white px-2 py-1 rounded border flex-1">
                        rp_live_••••••••••••••••••••••••••••
                      </code>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      API Docs
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Rate Limits
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerIntegrationsHub;
