
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Calendar, 
  Plus, 
  Settings, 
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Edit,
  Trash2,
  Send,
  Eye,
  BarChart3
} from 'lucide-react';

const EmailCalendarIntegration: React.FC = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [newTemplate, setNewTemplate] = useState({ name: '', subject: '', content: '' });

  const integrationStatus = [
    {
      name: 'Office 365',
      type: 'email',
      status: 'connected',
      lastSync: '2 minutes ago',
      account: 'admin@techcorp.com'
    },
    {
      name: 'Google Workspace',
      type: 'both',
      status: 'connected',
      lastSync: '5 minutes ago',
      account: 'admin@company.com'
    },
    {
      name: 'Outlook Calendar',
      type: 'calendar',
      status: 'connected',
      lastSync: '1 minute ago',
      account: 'calendar@techcorp.com'
    },
    {
      name: 'Zoom',
      type: 'video',
      status: 'pending',
      lastSync: 'Never',
      account: 'Not configured'
    }
  ];

  const emailTemplates = [
    {
      id: '1',
      name: 'Interview Invitation',
      subject: 'Interview Invitation - {{job_title}} Position',
      type: 'interview',
      lastModified: '2 days ago',
      usageCount: 45
    },
    {
      id: '2',
      name: 'Application Received',
      subject: 'We received your application for {{job_title}}',
      type: 'confirmation',
      lastModified: '1 week ago',
      usageCount: 123
    },
    {
      id: '3',
      name: 'Follow-up Reminder',
      subject: 'Following up on your {{job_title}} application',
      type: 'followup',
      lastModified: '3 days ago',
      usageCount: 67
    },
    {
      id: '4',
      name: 'Offer Letter',
      subject: 'Job Offer - {{job_title}} at {{company_name}}',
      type: 'offer',
      lastModified: '5 days ago',
      usageCount: 12
    }
  ];

  const calendarSettings = [
    { key: 'autoSync', label: 'Auto-sync interviews to calendar', enabled: true },
    { key: 'conflictDetection', label: 'Detect scheduling conflicts', enabled: true },
    { key: 'teamAvailability', label: 'Share availability with team', enabled: false },
    { key: 'bufferTime', label: 'Add buffer time between meetings', enabled: true },
    { key: 'weekendBooking', label: 'Allow weekend interview booking', enabled: false }
  ];

  const availableVariables = [
    { name: 'candidate_name', description: "Candidate's full name" },
    { name: 'job_title', description: 'Position title' },
    { name: 'company_name', description: 'Your company name' },
    { name: 'interview_date', description: 'Scheduled interview date' },
    { name: 'interview_time', description: 'Scheduled interview time' }
  ];

  const handleConnect = (service: string) => {
    toast({
      title: "Integration Initiated",
      description: `Connecting to ${service}. Please complete the authorization process.`,
    });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "Email template has been saved successfully.",
    });
  };

  const handleTestEmail = (templateId: string) => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to your account.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="outline">Not Connected</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'calendar':
        return <Calendar className="w-4 h-4" />;
      case 'both':
        return <Settings className="w-4 h-4" />;
      case 'video':
        return <Users className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email & Calendar Integration</h2>
          <p className="text-sm text-gray-600">Connect and manage your email and calendar services</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="calendar">Calendar Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrationStatus.map((integration, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(integration.type)}
                      <h3 className="font-semibold">{integration.name}</h3>
                    </div>
                    {getStatusBadge(integration.status)}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Account: {integration.account}</p>
                    <p>Last sync: {integration.lastSync}</p>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    {integration.status === 'connected' ? (
                      <>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          Sync Now
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => handleConnect(integration.name)}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Template List */}
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Used {template.usageCount} times</span>
                        <span>{template.lastModified}</span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTestEmail(template.id)}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Create/Edit Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Template Name</label>
                  <Input 
                    placeholder="Enter template name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject Line</label>
                  <Input 
                    placeholder="Email subject with {{variables}}"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Content</label>
                  <Textarea 
                    placeholder="Write your email content here. Use {{candidate_name}}, {{job_title}}, {{company_name}} as variables."
                    rows={8}
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleSaveTemplate}>
                    Save Template
                  </Button>
                  <Button variant="outline">
                    Preview
                  </Button>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Available Variables:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    {availableVariables.map((variable) => (
                      <p key={variable.name}>
                        {`{{${variable.name}}}`} - {variable.description}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar Synchronization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {calendarSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{setting.label}</h4>
                    </div>
                    <Switch checked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meeting Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Default Meeting Duration</label>
                  <Select defaultValue="60">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Buffer Time Between Meetings</label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No buffer</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Working Hours</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600">Start Time</label>
                      <Input type="time" defaultValue="09:00" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">End Time</label>
                      <Input type="time" defaultValue="17:00" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Time Zone</label>
                  <Select defaultValue="pst">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Emails Sent This Month</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Meetings Scheduled</p>
                    <p className="text-2xl font-bold text-gray-900">89</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <p className="text-2xl font-bold text-gray-900">74%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Template Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-sm text-gray-600">Used {template.usageCount} times</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">85% Response Rate</p>
                      <p className="text-sm text-gray-600">Above average</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailCalendarIntegration;
