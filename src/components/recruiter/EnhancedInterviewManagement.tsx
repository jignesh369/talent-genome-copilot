
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  MapPin,
  Plus,
  Edit,
  Trash2,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  Star,
  TrendingUp,
  BarChart3,
  Eye
} from 'lucide-react';

interface InterviewPanel {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
}

interface InterviewFeedback {
  id: string;
  panelMemberId: string;
  candidateId: string;
  interviewId: string;
  technicalScore: number;
  communicationScore: number;
  culturalFitScore: number;
  overallRecommendation: 'strong-hire' | 'hire' | 'no-hire' | 'strong-no-hire';
  strengths: string[];
  concerns: string[];
  notes: string;
  submitted: boolean;
}

interface QuestionBank {
  id: string;
  category: string;
  questions: Array<{
    id: string;
    question: string;
    type: 'technical' | 'behavioral' | 'situational';
    difficulty: 'junior' | 'mid' | 'senior';
    expectedAnswer?: string;
  }>;
}

const EnhancedInterviewManagement: React.FC = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('schedule');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showQuestionBankModal, setShowQuestionBankModal] = useState(false);

  const [panelMembers] = useState<InterviewPanel[]>([
    { id: '1', name: 'Sarah Johnson', role: 'Engineering Manager', department: 'Engineering', email: 'sarah@company.com' },
    { id: '2', name: 'Mike Chen', role: 'Senior Developer', department: 'Engineering', email: 'mike@company.com' },
    { id: '3', name: 'Emily Davis', role: 'Product Manager', department: 'Product', email: 'emily@company.com' }
  ]);

  const [feedbackData] = useState<InterviewFeedback[]>([
    {
      id: '1',
      panelMemberId: '1',
      candidateId: '1',
      interviewId: '1',
      technicalScore: 8,
      communicationScore: 9,
      culturalFitScore: 8,
      overallRecommendation: 'hire',
      strengths: ['Strong technical skills', 'Great communication', 'Problem-solving approach'],
      concerns: ['Limited experience with specific framework'],
      notes: 'Candidate showed excellent problem-solving skills and would be a great addition to the team.',
      submitted: true
    }
  ]);

  const [questionBanks] = useState<QuestionBank[]>([
    {
      id: '1',
      category: 'Frontend Development',
      questions: [
        {
          id: '1',
          question: 'Explain the difference between let, const, and var in JavaScript.',
          type: 'technical',
          difficulty: 'junior',
          expectedAnswer: 'var is function-scoped, let and const are block-scoped...'
        },
        {
          id: '2',
          question: 'How do you handle state management in large React applications?',
          type: 'technical',
          difficulty: 'senior'
        }
      ]
    }
  ]);

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'strong-hire': return 'bg-green-100 text-green-800';
      case 'hire': return 'bg-blue-100 text-blue-800';
      case 'no-hire': return 'bg-orange-100 text-orange-800';
      case 'strong-no-hire': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendFeedbackRequest = () => {
    toast({
      title: "Feedback Requests Sent",
      description: "Interview feedback forms have been sent to all panel members.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-600" />
            Enhanced Interview Management
          </h2>
          <p className="text-gray-600 mt-1">
            Comprehensive interview coordination with panel management and feedback aggregation
          </p>
        </div>
        <Button onClick={() => setShowQuestionBankModal(true)}>
          <FileText className="w-4 h-4 mr-2" />
          Question Banks
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule & Panels</TabsTrigger>
          <TabsTrigger value="feedback">Feedback Collection</TabsTrigger>
          <TabsTrigger value="analytics">Interview Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates & Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          {/* Panel Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Interview Panel Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {panelMembers.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>{member.department}</p>
                      <p>{member.email}</p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Coordination Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Interview Coordination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold">Panel Scheduling</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Coordinate schedules across multiple interviewers
                  </p>
                  <Button variant="outline" size="sm">
                    Find Available Slots
                  </Button>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Send className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold">Auto Invitations</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Send interview invites to all participants
                  </p>
                  <Button variant="outline" size="sm">
                    Send Invites
                  </Button>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FileText className="w-5 h-5 text-purple-600 mr-2" />
                    <h3 className="font-semibold">Interview Packets</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Generate interview guides and scorecards
                  </p>
                  <Button variant="outline" size="sm">
                    Generate Packet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          {/* Feedback Collection */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Feedback Collection & Aggregation
                </CardTitle>
                <Button onClick={handleSendFeedbackRequest}>
                  <Send className="w-4 h-4 mr-2" />
                  Request Feedback
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbackData.map((feedback) => {
                  const panelMember = panelMembers.find(m => m.id === feedback.panelMemberId);
                  
                  return (
                    <div key={feedback.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {panelMember?.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold">{panelMember?.name}</h3>
                            <p className="text-sm text-gray-600">{panelMember?.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRecommendationColor(feedback.overallRecommendation)}>
                            {feedback.overallRecommendation.replace('-', ' ')}
                          </Badge>
                          {feedback.submitted ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{feedback.technicalScore}/10</div>
                          <div className="text-sm text-gray-600">Technical</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{feedback.communicationScore}/10</div>
                          <div className="text-sm text-gray-600">Communication</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{feedback.culturalFitScore}/10</div>
                          <div className="text-sm text-gray-600">Cultural Fit</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium text-green-700 mb-1">Strengths:</h4>
                          <div className="flex flex-wrap gap-1">
                            {feedback.strengths.map((strength, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-green-700">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-orange-700 mb-1">Concerns:</h4>
                          <div className="flex flex-wrap gap-1">
                            {feedback.concerns.map((concern, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-orange-700">
                                {concern}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                        <strong>Notes:</strong> {feedback.notes}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Interview Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-green-600">+25% vs last week</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                    <p className="text-2xl font-bold text-gray-900">8.2/10</p>
                    <p className="text-xs text-green-600">+0.3 improvement</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                    <p className="text-2xl font-bold text-gray-900">78%</p>
                    <p className="text-xs text-red-600">-5% vs last month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Feedback Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                    <p className="text-xs text-green-600">Excellent</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          {/* Interview Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Interview Templates & Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold mb-2">Technical Interview</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Structured technical assessment with coding challenges
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold mb-2">Behavioral Interview</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    STAR method questions for cultural fit assessment
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:bg-gray-50">
                  <h3 className="font-semibold mb-2">System Design</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Architecture and scalability discussion framework
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Question Bank Modal */}
      <Dialog open={showQuestionBankModal} onOpenChange={setShowQuestionBankModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Interview Question Banks</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {questionBanks.map((bank) => (
              <Card key={bank.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{bank.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bank.questions.map((question) => (
                      <div key={question.id} className="p-3 border rounded">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{question.question}</h4>
                          <div className="flex space-x-2">
                            <Badge variant="outline">{question.type}</Badge>
                            <Badge variant="outline">{question.difficulty}</Badge>
                          </div>
                        </div>
                        {question.expectedAnswer && (
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Expected Answer:</strong> {question.expectedAnswer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedInterviewManagement;
