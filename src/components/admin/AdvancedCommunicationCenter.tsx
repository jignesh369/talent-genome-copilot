
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useRealTimeCommunication } from '@/hooks/useRealTimeCommunication';
import { 
  MessageSquare, 
  Video, 
  Mail, 
  Calendar,
  Users,
  Send,
  Phone,
  Clock,
  CheckCircle,
  Eye,
  Zap
} from 'lucide-react';

const AdvancedCommunicationCenter: React.FC = () => {
  const { toast } = useToast();
  const { channels, unreadCount, sendMessage } = useRealTimeCommunication();
  const [newMessage, setNewMessage] = useState('');

  const communicationStats = [
    {
      title: 'Active Conversations',
      value: '23',
      icon: MessageSquare,
      color: 'text-blue-600',
      change: '+5 today'
    },
    {
      title: 'Response Rate',
      value: '94%',
      icon: CheckCircle,
      color: 'text-green-600',
      change: '+3% this week'
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      icon: Clock,
      color: 'text-purple-600',
      change: '-0.6h improvement'
    },
    {
      title: 'Video Interviews',
      value: '12',
      icon: Video,
      color: 'text-orange-600',
      change: '8 scheduled'
    }
  ];

  const recentActivities = [
    {
      type: 'message',
      candidate: 'Sarah Johnson',
      action: 'sent a message',
      time: '5 minutes ago',
      status: 'unread'
    },
    {
      type: 'video',
      candidate: 'Mike Chen',
      action: 'joined video interview',
      time: '15 minutes ago',
      status: 'completed'
    },
    {
      type: 'email',
      candidate: 'Emily Davis',
      action: 'opened email',
      time: '1 hour ago',
      status: 'read'
    },
    {
      type: 'calendar',
      candidate: 'Alex Wilson',
      action: 'scheduled interview',
      time: '2 hours ago',
      status: 'confirmed'
    }
  ];

  const automatedCampaigns = [
    {
      name: 'Welcome Sequence',
      type: 'Email',
      recipients: 45,
      openRate: 87,
      status: 'active'
    },
    {
      name: 'Interview Reminder',
      type: 'SMS',
      recipients: 12,
      openRate: 100,
      status: 'active'
    },
    {
      name: 'Follow-up Survey',
      type: 'Email',
      recipients: 23,
      openRate: 65,
      status: 'paused'
    }
  ];

  const handleSendMessage = (channelId: string) => {
    if (newMessage.trim()) {
      sendMessage(channelId, newMessage, 'text');
      setNewMessage('');
      toast({
        title: "Message Sent",
        description: "Your message has been delivered successfully.",
      });
    }
  };

  const handleStartVideoCall = (candidateName: string) => {
    toast({
      title: "Video Call Started",
      description: `Starting video call with ${candidateName}...`,
    });
  };

  const handleScheduleInterview = (candidateName: string) => {
    toast({
      title: "Interview Scheduled",
      description: `Interview with ${candidateName} has been scheduled.`,
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'video': return Video;
      case 'email': return Mail;
      case 'calendar': return Calendar;
      default: return MessageSquare;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Communication Center</h2>
          <p className="text-sm text-gray-600">Manage all candidate communications in real-time</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
          <Button>
            <Video className="w-4 h-4 mr-2" />
            Start Video Call
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {communicationStats.map((stat, index) => (
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

      <Tabs defaultValue="conversations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Conversations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Conversations</span>
                  <Badge variant="secondary">{unreadCount} unread</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channels.slice(0, 5).map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{channel.name}</h3>
                          <p className="text-sm text-gray-600">
                            {channel.last_message?.content || 'No messages yet'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Video className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const ActivityIcon = getActivityIcon(activity.type);
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <ActivityIcon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.candidate}</span> {activity.action}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Message */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Message</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-3">
                <Input 
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage(channels[0]?.id || '')}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Automated Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automatedCampaigns.map((campaign, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">{campaign.type} campaign</p>
                      </div>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Recipients</p>
                        <p className="font-semibold">{campaign.recipients}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Open Rate</p>
                        <p className="font-semibold">{campaign.openRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900">Email Open Rate</h3>
                  <p className="text-2xl font-bold text-blue-900">78%</p>
                  <p className="text-sm text-blue-700">+5% vs last month</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-900">Response Rate</h3>
                  <p className="text-2xl font-bold text-green-900">94%</p>
                  <p className="text-sm text-green-700">+3% vs last month</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-purple-900">Avg Response Time</h3>
                  <p className="text-2xl font-bold text-purple-900">2.4h</p>
                  <p className="text-sm text-purple-700">30% faster</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Auto-Response Settings</h3>
                  <p className="text-sm text-gray-600 mb-3">Configure automatic responses for common scenarios</p>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Notification Preferences</h3>
                  <p className="text-sm text-gray-600 mb-3">Manage how and when you receive notifications</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Integration Settings</h3>
                  <p className="text-sm text-gray-600 mb-3">Connect with external communication tools</p>
                  <Button variant="outline" size="sm">Setup</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedCommunicationCenter;
