
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { SystemConfiguration as SystemConfigType } from '@/types/system';
import PlatformSettings from './config/PlatformSettings';
import EmailConfiguration from './config/EmailConfiguration';
import SecurityConfiguration from './config/SecurityConfiguration';
import FeatureFlags from './config/FeatureFlags';

const SystemConfiguration: React.FC = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<SystemConfigType>({
    // Platform Settings
    platformName: 'TalentGenome',
    defaultPlan: 'starter',
    maxUsersPerOrg: 100,
    maxJobsPerOrg: 50,
    
    // Email Settings
    emailEnabled: true,
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    emailFrom: 'noreply@talentgenome.com',
    
    // Security Settings
    passwordMinLength: 8,
    requireMFA: false,
    sessionTimeout: 24,
    
    // Feature Flags
    aiSearchEnabled: true,
    videoInterviewsEnabled: true,
    assessmentsEnabled: true,
    candidatePortalEnabled: true,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    slackIntegration: false
  });

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveConfig = () => {
    console.log('Saving configuration:', config);
    toast({
      title: "Configuration Saved",
      description: "System configuration has been updated successfully.",
    });
  };

  const handleTestEmailConfig = () => {
    toast({
      title: "Testing Email Configuration",
      description: "Sending test email...",
    });
    setTimeout(() => {
      toast({
        title: "Email Test Complete",
        description: "Test email sent successfully!",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PlatformSettings config={config} onConfigChange={handleConfigChange} />
      <EmailConfiguration 
        config={config} 
        onConfigChange={handleConfigChange}
        onTestEmail={handleTestEmailConfig}
      />
      <SecurityConfiguration config={config} onConfigChange={handleConfigChange} />
      <FeatureFlags config={config} onConfigChange={handleConfigChange} />

      <div className="flex justify-end">
        <Button onClick={handleSaveConfig} className="flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default SystemConfiguration;
