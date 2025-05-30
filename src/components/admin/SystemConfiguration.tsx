
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
  Database, 
  Mail, 
  Shield, 
  Zap, 
  Globe,
  Bell,
  Lock,
  Save
} from 'lucide-react';

const SystemConfiguration: React.FC = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
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
    // Simulate email test
    setTimeout(() => {
      toast({
        title: "Email Test Complete",
        description: "Test email sent successfully!",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Platform Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={config.platformName}
                onChange={(e) => handleConfigChange('platformName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="defaultPlan">Default Plan</Label>
              <Select 
                value={config.defaultPlan} 
                onValueChange={(value) => handleConfigChange('defaultPlan', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxUsers">Max Users per Organization</Label>
              <Input
                id="maxUsers"
                type="number"
                value={config.maxUsersPerOrg}
                onChange={(e) => handleConfigChange('maxUsersPerOrg', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="maxJobs">Max Jobs per Organization</Label>
              <Input
                id="maxJobs"
                type="number"
                value={config.maxJobsPerOrg}
                onChange={(e) => handleConfigChange('maxJobsPerOrg', parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Email Configuration
            </div>
            <Button variant="outline" size="sm" onClick={handleTestEmailConfig}>
              Test Email
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.emailEnabled}
              onCheckedChange={(checked) => handleConfigChange('emailEnabled', checked)}
            />
            <Label>Enable Email Notifications</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={config.smtpHost}
                onChange={(e) => handleConfigChange('smtpHost', e.target.value)}
                disabled={!config.emailEnabled}
              />
            </div>
            <div>
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                type="number"
                value={config.smtpPort}
                onChange={(e) => handleConfigChange('smtpPort', parseInt(e.target.value))}
                disabled={!config.emailEnabled}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="emailFrom">From Email Address</Label>
            <Input
              id="emailFrom"
              type="email"
              value={config.emailFrom}
              onChange={(e) => handleConfigChange('emailFrom', e.target.value)}
              disabled={!config.emailEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="passwordLength">Min Password Length</Label>
              <Input
                id="passwordLength"
                type="number"
                value={config.passwordMinLength}
                onChange={(e) => handleConfigChange('passwordMinLength', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={config.sessionTimeout}
                onChange={(e) => handleConfigChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Switch
                checked={config.requireMFA}
                onCheckedChange={(checked) => handleConfigChange('requireMFA', checked)}
              />
              <Label>Require MFA</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Feature Flags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.aiSearchEnabled}
                onCheckedChange={(checked) => handleConfigChange('aiSearchEnabled', checked)}
              />
              <Label>AI-Powered Search</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.videoInterviewsEnabled}
                onCheckedChange={(checked) => handleConfigChange('videoInterviewsEnabled', checked)}
              />
              <Label>Video Interviews</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.assessmentsEnabled}
                onCheckedChange={(checked) => handleConfigChange('assessmentsEnabled', checked)}
              />
              <Label>Candidate Assessments</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={config.candidatePortalEnabled}
                onCheckedChange={(checked) => handleConfigChange('candidatePortalEnabled', checked)}
              />
              <Label>Candidate Portal</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
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
