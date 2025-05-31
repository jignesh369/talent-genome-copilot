
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Video, 
  Phone, 
  Mail,
  Send,
  Users,
  Clock,
  Calendar,
  Search,
  Filter,
  Plus,
  Settings,
  Star,
  Archive,
  MoreHorizontal,
  Paperclip,
  Smile,
  Eye,
  CheckCircle2,
  AlertCircle,
  User
} from 'lucide-react';

const AdvancedCommunicationCenter: React.FC = () => {
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState('1');
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: '1',
      type: 'candidate',
      name: 'Sarah Johnson',
      role: 'Senior Frontend Developer',
      lastMessage: 'Thank you for the interview opportunity. I look forward to hearing back.',
      timestamp: '2 hours ago',
      unread: 2,
      status: 'active',
      avatar: 'SJ',
      priority: 'high'
    },
    {
      id: '2',
      type: 'team',
      name: 'Engineering Team',
      role: 'Team Chat',
      lastMessage: 'We need to discuss the technical assessment for the React position.',
      timestamp: '4 hours ago',
      unread: 0,
      status: 'active',
      avatar: 'ET',
      priority: 'normal'
    },
    {
      id: '3',
      type: 'candidate',
      name: 'Mike Chen',
      role: 'Data Scientist',
      lastMessage: 'Could we reschedule the interview to next week?',
      timestamp: '1 day ago',
      unread: 1,
      status: 'pending',
      avatar: 'MC',
      priority: 'normal'
    },
    {
      id: '4',
      type: 'hiring_manager',
      name: 'Alex Wilson',
      role: 'Product Manager',
      lastMessage: 'The candidate feedback looks promising. Let\'s move to the next round.',
      timestamp: '2 days ago',
      unread: 0,
      status: 'active',
      avatar: 'AW',
      priority: 'low'
    }
  ];

  const messages = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      content: 'Hi! Thank you for considering my application for the Senior Frontend Developer position.',
      timestamp: '2:30 PM',
      type: 'received',
      status: 'read'
    },
    {
      id: '2',
      sender: 'You',
      content: 'Hi Sarah! We\'re excited about your background. Would you be available for a technical interview next week?',
      timestamp: '2:45 PM',
      type: 'sent',
      status: 'read'
    },
    {
      id: '3',
      sender: 'Sarah Johnson',
      content: 'Absolutely! I\'m available Monday through Wednesday afternoon. What time works best for your team?',
      timestamp: '3:15 PM',
      type: 'received',
      status: 'read'
    },
    {
      id: '4',
      sender: 'You',
      content: 'Perfect! How about Tuesday at 2 PM? I\'ll send you the meeting details and technical requirements.',
      timestamp: '3:20 PM',
      type: 'sent',
      status: 'delivered'
    },
    {
      id: '5',
      sender: 'Sarah Johnson',
      content: 'Thank you for the interview opportunity. I look forward to hearing back.',
      timestamp: '4:30 PM',
      type: 'received',
      status: 'unread'
    }
  ];

  const communicationStats = [
    {
      title: 'Messages Today',
      value: '47',
      change: '+12%',
      icon: MessageSquare,
      color: 'text-blue-600'
    },
    {
      title: 'Video Calls',
      value: '8',
      change: '+25%',
      icon: Video,
      color: 'text-green-600'
    },
    {
      title: 'Response Rate',
      value: '94%',
      change: '+3%',
      icon: CheckCircle2,
      color: 'text-purple-600'
    },
    {
      title: 'Avg Response Time',
      value: '2.3h',
      change: '-15%',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const scheduledMeetings = [
    {
      id: '1',
      title: 'Technical Interview - Sarah Johnson',
      time: 'Today, 2:00 PM',
      type: 'interview',
      attendees: 3,
      platform: 'zoom'
    },
    {
      id: '2',
      title: 'Team Standup',
      time: 'Tomorrow, 9:00 AM',
      type: 'meeting',
      attendees: 8,
      platform: 'teams'
    },
    {
      id: '3',
      title: 'Final Interview - Mike Chen',
      time: 'Friday, 3:30 PM',
      type: 'interview',
      attendees: 4,
      platform: 'meet'
    }
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    setMessageText('');
  };

  const handleStartVideoCall = () => {
    toast({
      title: "Video Call Started",
      description: "Launching video conference...",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Communication Center</h2>
          <p className="text-sm text-gray-600">Real-time messaging, video calls, and collaboration tools</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Video className="w-4 h-4 mr-2" />
            Start Call
          </Button>
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {communicationStats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Conversations Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {conversation.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm text-gray-900 truncate">{conversation.name}</h4>
                          {conversation.unread > 0 && (
                            <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{conversation.role}</p>
                        <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                          <Badge className={getPriorityColor(conversation.priority)} variant="outline">
                            {conversation.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      SJ
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-gray-600">Senior Frontend Developer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={handleStartVideoCall}>
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'sent' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {message.type === 'received' && (
                      <p className="text-xs font-medium mb-1">{message.sender}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${
                        message.type === 'sent' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </span>
                      {message.type === 'sent' && (
                        <div className="flex items-center ml-2">
                          {message.status === 'read' && <CheckCircle2 className="w-3 h-3 text-blue-100" />}
                          {message.status === 'delivered' && <CheckCircle2 className="w-3 h-3 text-blue-200" />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Textarea
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="resize-none pr-20"
                    rows={2}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                    <Button size="sm" variant="ghost" className="p-1">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-1">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Meetings & Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Scheduled Meetings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheduledMeetings.map((meeting) => (
                <div key={meeting.id} className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{meeting.title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{meeting.time}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{meeting.attendees}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {meeting.platform}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Email Template
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Create Team Chat
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Add to Favorites
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCommunicationCenter;
