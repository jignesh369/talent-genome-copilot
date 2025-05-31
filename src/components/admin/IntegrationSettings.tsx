
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw } from 'lucide-react';
import CalendarIntegrations from './integration/CalendarIntegrations';
import EmailIntegrations from './integration/EmailIntegrations';
import ProfessionalNetworkIntegrations from './integration/ProfessionalNetworkIntegrations';
import CommunicationIntegrations from './integration/CommunicationIntegrations';
import ATSIntegration from './integration/ATSIntegration';

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
      const key = integration.toLowerCase().replace(' ', '');
      setIntegrations(prev => ({
        ...prev,
        [key]: { ...prev[key], connected: true }
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

      <CalendarIntegrations 
        integrations={integrations}
        onToggleIntegration={handleToggleIntegration}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <EmailIntegrations 
        integrations={integrations}
        onToggleIntegration={handleToggleIntegration}
      />

      <ProfessionalNetworkIntegrations 
        integrations={integrations}
        onToggleIntegration={handleToggleIntegration}
        onConnect={handleConnect}
      />

      <CommunicationIntegrations 
        integrations={integrations}
        onToggleIntegration={handleToggleIntegration}
      />

      <ATSIntegration 
        integrations={integrations}
        onToggleIntegration={handleToggleIntegration}
      />
    </div>
  );
};

export default IntegrationSettings;
