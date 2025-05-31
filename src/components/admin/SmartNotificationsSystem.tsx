
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Settings, 
  Users, 
  MessageSquare,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Mail,
  Smartphone,
  Monitor,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  BarChart3,
  Zap,
  Target
} from 'lucide-react';

const SmartNotificationsSystem: React.FC = () => {
  const { toast } = useToast();
  const [selectedRule, setSelectedRule] = useState('');

  const notificationStats = [
    {
      title: 'Notifications Sent Today',
      value: '234',
      change: '+18%',
      icon: Bell,
      color: 'text-blue-600'
    },
    {
      title: 'Open Rate',
      value: '87%',
      change: '+5%',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Response Rate',
      value: '42%',
      change: '+12%',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'Avg Response Time',
      value: '1.2h',
      change: '-23%',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const notificationRules = [
    {
      id: '1',
      name: 'New Application Alert',
      trigger: 'application_received',
      recipients: ['recruiters', 'hiring_managers'],
      priority: 'high',
      channels: ['email', 'push', 'in-app'],
      enabled: true,
      frequency: 'immediate'
    },
    {
      id: '2',
      name: 'Interview Reminder',
      trigger: 'interview_24h_before',
      recipients: ['candidate', 'interviewer'],
      priority: 'medium',
      channels: ['email', 'sms'],
      enabled: true,
      frequency: 'once'
    },
    {
      id: '3',
      name: 'Candidate Follow-up',
      trigger: 'no_response_7_days',
      recipients: ['recruiters'],
      priority: 'low',
      channels: ['in-app', 'email'],
      enabled: false,
      frequency: 'weekly'
    },
    {
      id: '4',
      name: 'Team Performance Digest',
      trigger: 'weekly_summary',
      recipients: ['admins', 'managers'],
      priority: 'medium',
      channels: ['email'],
      enabled: true,
      frequency: 'weekly'
    }
  ];

  const recentNotifications = [
    {
      id: '1',
      type: 'application',
      title: 'New application for Senior Frontend Developer',
      content: 'Sarah Johnson submitted an application',
      recipients: 3,
      sent: '2 minutes ago',
      status: 'sent',
      priority: 'high'
    },
    {
      id: '2',
      type: 'interview',
      title: 'Interview reminder: Mike Chen',
      content: 'Technical interview scheduled for tomorrow at 2 PM',
      recipients: 2,
      sent: '1 hour ago',
      status: 'delivered',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'system',
      title: 'Weekly team performance report',
      content: 'Your team completed 12 interviews this week',
      recipients: 5,
      sent: '3 hours ago',
      status: 'read',
      priority: 'low'
    },
    {
      id: '4',
      type: 'urgent',
      title: 'Interview cancellation',
      content: 'Candidate requested to reschedule Friday interview',
      recipients: 4,
      sent: '5 hours ago',
      status: 'read',
      priority: 'high'
    }
  ];

  const userPreferences = [
    {
      category: 'Applications',
      settings: [
        { name: 'New application received', email: true, push: true, inApp: true },
        { name: 'Application status changed', email: true, push: false, inApp: true },
        { name: 'Application deadline approaching', email: false, push: true, inApp: true }
      ]
    },
    {
      category: 'Interviews',
      settings: [
        { name: 'Interview scheduled', email: true, push: true, inApp: true },
        { name: 'Interview reminder (24h)', email: true, push: true, inApp: false },
        { name: 'Interview feedback requested', email: true, push: false, inApp: true }
      ]
    },
    {
      category: 'Team Updates',
      settings: [
        { name: 'Team member assigned to job', email: false, push: false, inApp: true },
        { name: 'Team performance updates', email: true, push: false, inApp: true },
        { name: 'New team member joined', email: true, push: false, inApp: true }
      ]
    }
  ];

  const handleCreateRule = () => {
    toast({
      title: "Rule Created",
      description: "New notification rule has been created successfully.",
    });
  };

  const handleTestNotification = (ruleId: string) => {
    toast({
      title: "Test Notification Sent",
      description: "A test notification has been sent to verify the rule.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'read': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'application': return <Users className="w-4 h-4" />;
      case 'interview': return <Calendar className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Notifications System</h2>
          <p className="text-sm text-gray-600">Intelligent notification management and automation</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Global Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {notificationStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Notification Rules</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="preferences">User Preferences</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Notification Rules</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input placeholder="Search rules..." className="pl-10 w-64" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationRules.map((rule) => (
                  <div key={rule.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{rule.name}</h3>
                        <Badge className={getPriorityColor(rule.priority)}>
                          {rule.priority}
                        </Badge>
                        <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                          {rule.enabled ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={rule.enabled} />
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleTestNotification(rule.id)}
                        >
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 font-medium">Trigger</p>
                        <p className="capitalize">{rule.trigger.replace(/_/g, ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Recipients</p>
                        <p className="capitalize">{rule.recipients.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Channels</p>
                        <div className="flex items-center space-x-1">
                          {rule.channels.includes('email') && <Mail className="w-4 h-4 text-blue-600" />}
                          {rule.channels.includes('push') && <Smartphone className="w-4 h-4 text-green-600" />}
                          {rule.channels.includes('in-app') && <Monitor className="w-4 h-4 text-purple-600" />}
                          {rule.channels.includes('sms') && <MessageSquare className="w-4 h-4 text-orange-600" />}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Frequency</p>
                        <p className="capitalize">{rule.frequency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notification Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                      notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          <Badge className={getStatusColor(notification.status)}>
                            {notification.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.content}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Sent to {notification.recipients} recipients</span>
                        <span>{notification.sent}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userPreferences.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.category} Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.settings.map((setting, settingIndex) => (
                      <div key={settingIndex} className="space-y-3">
                        <h4 className="font-medium text-sm">{setting.name}</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch checked={setting.email} />
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">Email</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch checked={setting.push} />
                            <Smartphone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">Push</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch checked={setting.inApp} />
                            <Monitor className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">In-App</span>
                          </div>
                        </div>
                        {settingIndex < category.settings.length - 1 && <hr />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-sm text-gray-600">1,847 sent</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">89%</p>
                      <p className="text-sm text-gray-600">Open rate</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-gray-600">923 sent</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">67%</p>
                      <p className="text-sm text-gray-600">Click rate</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Monitor className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">In-App</h4>
                        <p className="text-sm text-gray-600">2,156 sent</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">94%</p>
                      <p className="text-sm text-gray-600">View rate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Average Response Time</h4>
                      <Badge className="bg-green-100 text-green-800">Improved</Badge>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">1.2 hours</p>
                    <p className="text-sm text-green-600">-23% from last week</p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-2">Response Time by Priority</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">High Priority</span>
                        <span className="font-medium">18 min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Medium Priority</span>
                        <span className="font-medium">1.2 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Low Priority</span>
                        <span className="font-medium">4.8 hours</span>
                      </div>
                    </div>
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

export default SmartNotificationsSystem;
