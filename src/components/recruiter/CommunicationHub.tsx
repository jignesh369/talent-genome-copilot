
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Mail, 
  Calendar, 
  Users, 
  Send,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Video,
  FileText,
  Star,
  Archive
} from 'lucide-react';

interface Message {
  id: string;
  candidateId: string;
  candidateName: string;
  subject: string;
  type: 'email' | 'sms' | 'system';
  status: 'sent' | 'delivered' | 'read' | 'replied';
  content: string;
  timestamp: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms';
  category: 'screening' | 'interview' | 'offer' | 'rejection' | 'follow-up';
  subject: string;
  content: string;
  variables: string[];
}

interface TeamMessage {
  id: string;
  from: string;
  to: string[];
  subject: string;
  content: string;
  timestamp: string;
  candidateId?: string;
  jobId?: string;
  attachments?: string[];
}

const CommunicationHub: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      candidateId: '1',
      candidateName: 'John Smith',
      subject: 'Interview Confirmation Required',
      type: 'email',
      status: 'sent',
      content: 'Thank you for your application. We would like to schedule an interview...',
      timestamp: '2025-01-01T10:00:00Z',
      priority: 'high'
    },
    {
      id: '2',
      candidateId: '2',
      candidateName: 'Sarah Johnson',
      subject: 'Application Update',
      type: 'email',
      status: 'read',
      content: 'We have reviewed your application and would like to move forward...',
      timestamp: '2025-01-01T09:00:00Z',
      priority: 'normal'
    }
  ]);

  const [templates] = useState<Template[]>([
    {
      id: '1',
      name: 'Interview Invitation',
      type: 'email',
      category: 'interview',
      subject: 'Interview Invitation - {{position}} at {{company}}',
      content: 'Dear {{candidate_name}},\n\nThank you for your interest in the {{position}} role at {{company}}...',
      variables: ['candidate_name', 'position', 'company', 'interview_date', 'interview_time']
    },
    {
      id: '2',
      name: 'Application Received',
      type: 'email',
      category: 'screening',
      subject: 'Application Received - {{position}}',
      content: 'Dear {{candidate_name}},\n\nWe have received your application for the {{position}} role...',
      variables: ['candidate_name', 'position']
    }
  ]);

  const [teamMessages] = useState<TeamMessage[]>([
    {
      id: '1',
      from: 'Sarah Johnson',
      to: ['Mike Chen', 'Emily Davis'],
      subject: 'Candidate Review: John Smith',
      content: 'I completed the technical interview with John Smith. Strong candidate with excellent React skills...',
      timestamp: '2025-01-01T11:00:00Z',
      candidateId: '1',
      attachments: ['interview_notes.pdf']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-blue-600 bg-blue-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'read': return 'text-purple-600 bg-purple-50';
      case 'replied': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'normal': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    setShowComposeModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
            Communication & Collaboration Hub
          </h2>
          <p className="text-gray-600 mt-1">
            Unified messaging, templates, and team collaboration
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowTemplateModal(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button onClick={() => setShowComposeModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inbox">Candidate Messages</TabsTrigger>
          <TabsTrigger value="team">Team Collaboration</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Messages</TabsTrigger>
          <TabsTrigger value="analytics">Communication Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-6">
          {/* Candidate Messages */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Candidate Communications ({messages.length})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search messages..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {messages.map((message) => (
                  <div key={message.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {message.candidateName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold">{message.candidateName}</h3>
                          <p className="text-sm font-medium text-gray-900">{message.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(message.priority)}>
                          {message.priority}
                        </Badge>
                        <Badge className={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {message.content}
                    </p>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <Archive className="w-4 h-4 mr-1" />
                        Archive
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          {/* Team Collaboration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Team Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMessages.map((message) => (
                  <div key={message.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold">{message.from}</span>
                          <span className="text-sm text-gray-500">to</span>
                          <span className="text-sm text-gray-700">{message.to.join(', ')}</span>
                        </div>
                        <h3 className="font-medium">{message.subject}</h3>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{message.content}</p>
                    
                    {message.attachments && (
                      <div className="flex items-center space-x-2 mb-3">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {message.attachments.join(', ')}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-1" />
                        Add Participants
                      </Button>
                      {message.candidateId && (
                        <Button variant="outline" size="sm">
                          <Star className="w-4 h-4 mr-1" />
                          View Candidate
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          {/* Scheduled Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Scheduled & Automated Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Scheduled Messages</h3>
                <p className="text-gray-600 mb-4">
                  Set up automated follow-ups and scheduled communications.
                </p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Communication Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Messages Today</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-xs text-green-600">+12% vs yesterday</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <p className="text-2xl font-bold text-gray-900">68%</p>
                    <p className="text-xs text-green-600">+5% improvement</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">2.4h</p>
                    <p className="text-xs text-red-600">+0.3h slower</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Template Usage</p>
                    <p className="text-2xl font-bold text-gray-900">89%</p>
                    <p className="text-xs text-green-600">High efficiency</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Template Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Message Templates</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{template.type}</Badge>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Subject: </span>
                      <span className="text-sm text-gray-600">{template.subject}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Content: </span>
                      <p className="text-sm text-gray-600 mt-1">{template.content.substring(0, 150)}...</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Variables: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.variables.map((variable, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {variable}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Compose Modal */}
      <Dialog open={showComposeModal} onOpenChange={setShowComposeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Recipient Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Candidate</option>
                  <option>Team Member</option>
                  <option>Hiring Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message Type</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Email</option>
                  <option>SMS</option>
                  <option>Internal Message</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <Input placeholder="Select recipient..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input placeholder="Message subject..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                className="w-full p-3 border rounded-md"
                rows={6}
                placeholder="Type your message..."
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline">Save as Template</Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowComposeModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunicationHub;
