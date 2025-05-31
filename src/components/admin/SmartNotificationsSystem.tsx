
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Settings,
  Filter,
  Users
} from 'lucide-react';

interface NotificationRule {
  id: string;
  name: string;
  type: 'email' | 'push' | 'sms' | 'in_app';
  trigger: string;
  priority: 'high' | 'medium' | 'low';
  enabled: boolean;
  conditions: string[];
}

const SmartNotificationsSystem: React.FC = () => {
  const { toast } = useToast();
  const [notificationRules, setNotificationRules] = useState<NotificationRule[]>([
    {
      id: '1',
      name: 'Urgent Application Review',
      type: 'push',
      trigger: 'High-priority candidate applies',
      priority: 'high',
      enabled: true,
      conditions: ['Candidate score > 90', 'Job priority = High']
    },
    {
      id: '2', 
      name: 'Interview Reminder',
      type: 'email',
      trigger: '24 hours before interview',
      priority: 'medium',
      enabled: true,
      conditions: ['Interview scheduled', 'Auto-reminder enabled']
    },
    {
      id: '3',
      name: 'Pipeline Bottleneck Alert',
      type: 'in_app',
      trigger: 'Stage duration exceeds threshold',
      priority: 'medium',
      enabled: true,
      conditions: ['Stage time > 7 days', 'No activity in 3 days']
    }
  ]);

  const recentNotifications = [
    {
      id: '1',
      title: 'New High-Priority Application',
      message: 'Sarah Johnson applied for Senior Developer position',
      type: 'application',
      priority: 'high',
      time: '5 minutes ago',
      read: false
    },
    {
      id: '2',
      title: 'Interview Reminder',
      message: 'Technical interview with Mike Chen in 1 hour',
      type: 'interview',
      priority: 'medium',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      title: 'Pipeline Alert',
      message: '3 candidates stuck in screening stage for 5+ days',
      type: 'pipeline',
      priority: 'medium',
      time: '2 hours ago',
      read: true
    },
    {
      id: '4',
      title: 'System Update',
      message: 'AI matching algorithm has been updated',
      type: 'system',
      priority: 'low',
      time: '1 day ago',
      read: true
    }
  ];

  const notificationStats = [
    {
      title: 'Unread Notifications',
      value: '12',
      icon: Bell,
      color: 'text-red-600',
      change: '+3 today'
    },
    {
      title: 'Response Rate',
      value: '94%',
      icon: CheckCircle,
      color: 'text-green-600',
      change: '+2% this week'
    },
    {
      title: 'Avg Response Time',
      value: '4.2m',
      icon: Clock,
      color: 'text-blue-600',
      change: '15% faster'
    },
    {
      title: 'Active Rules',
      value: '8',
      icon: Zap,
      color: 'text-purple-600',
      change: '2 new rules'
    }
  ];

  const toggleRule = (ruleId: string) => {
    setNotificationRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
    toast({
      title: "Rule Updated",
      description: "Notification rule has been updated successfully.",
    });
  };

  const markAsRead = (notificationId: string) => {
    toast({
      title: "Marked as Read",
      description: "Notification has been marked as read.",
    });
  };

  const markAllAsRead = () => {
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application': return Users;
      case 'interview': return Calendar;
      case 'pipeline': return AlertTriangle;
      case 'system': return Settings;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'push': return 'bg-purple-100 text-purple-800';
      case 'sms': return 'bg-green-100 text-green-800';
      case 'in_app': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Smart Notifications</h2>
          <p className="text-sm text-gray-600">Intelligent alert management and custom notification rules</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Configure Rules
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {notificationStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Recent Notifications</TabsTrigger>
          <TabsTrigger value="rules">Notification Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Notifications</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="application">Applications</SelectItem>
                      <SelectItem value="interview">Interviews</SelectItem>
                      <SelectItem value="pipeline">Pipeline</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotifications.map((notification) => {
                  const NotificationIcon = getNotificationIcon(notification.type);
                  return (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            notification.priority === 'high' ? 'bg-red-100' : 
                            notification.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                          }`}>
                            <NotificationIcon className={`w-5 h-5 ${
                              notification.priority === 'high' ? 'text-red-600' : 
                              notification.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center space-x-3 mt-2">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationRules.map((rule) => (
                  <div key={rule.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => toggleRule(rule.id)}
                        />
                        <div>
                          <h3 className="font-semibold">{rule.name}</h3>
                          <p className="text-sm text-gray-600">{rule.trigger}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(rule.type)}>
                          {rule.type}
                        </Badge>
                        <Badge className={getPriorityColor(rule.priority)}>
                          {rule.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="ml-11">
                      <p className="text-xs text-gray-500 mb-2">Conditions:</p>
                      <div className="flex flex-wrap gap-2">
                        {rule.conditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email Notifications</span>
                    <div className="text-right">
                      <p className="font-semibold">94% open rate</p>
                      <p className="text-xs text-gray-500">156 sent today</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Push Notifications</span>
                    <div className="text-right">
                      <p className="font-semibold">87% click rate</p>
                      <p className="text-xs text-gray-500">89 sent today</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">In-App Notifications</span>
                    <div className="text-right">
                      <p className="font-semibold">98% view rate</p>
                      <p className="text-xs text-gray-500">234 sent today</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">High Priority</span>
                    <span className="font-semibold text-red-600">2.1 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Medium Priority</span>
                    <span className="font-semibold text-yellow-600">18.5 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Low Priority</span>
                    <span className="font-semibold text-green-600">2.4 hours</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average</span>
                      <span className="font-semibold">4.2 minutes</span>
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
