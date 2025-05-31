
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Star,
  MessageSquare,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Target,
  Activity
} from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface EnhancedCandidateProfileProps {
  candidate: EnhancedCandidate;
  onUpdateStage: (newStage: string) => void;
  onAddNote: (note: string) => void;
  onScheduleInterview: () => void;
}

const EnhancedCandidateProfile: React.FC<EnhancedCandidateProfileProps> = ({
  candidate,
  onUpdateStage,
  onAddNote,
  onScheduleInterview
}) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {candidate.first_name[0]}{candidate.last_name[0]}
              </div>
              
              <div>
                <h1 className="text-2xl font-bold">{candidate.first_name} {candidate.last_name}</h1>
                <p className="text-gray-600">{candidate.current_title}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {candidate.experience_years}+ years
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Badge className="bg-green-100 text-green-800">
                {Math.round(candidate.placement_probability_score)}% Placement Probability
              </Badge>
              <Badge variant="outline">
                Stage: {candidate.pipeline_stage}
              </Badge>
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            <Button size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button size="sm" variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
            <Button size="sm" variant="outline" onClick={onScheduleInterview}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Engagement Score</span>
                    <span className="text-sm font-medium">{candidate.engagement_score}%</span>
                  </div>
                  <Progress value={candidate.engagement_score} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Cultural Fit</span>
                    <span className="text-sm font-medium">{candidate.cultural_fit_score}/100</span>
                  </div>
                  <Progress value={candidate.cultural_fit_score} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Portal Activity</span>
                    <span className="text-sm font-medium">{candidate.portal_activity_score}%</span>
                  </div>
                  <Progress value={candidate.portal_activity_score} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-sm">{candidate.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{candidate.ai_summary || 'No AI summary available'}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Professional Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-200 pl-4">
                  <h4 className="font-semibold">{candidate.current_title}</h4>
                  <p className="text-sm text-gray-600">Current Position</p>
                  <p className="text-sm text-gray-500 mt-1">{candidate.experience_years}+ years of experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Technical Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Engagement History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {candidate.interaction_timeline.slice(0, 5).map((interaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{interaction.type}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(interaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {interaction.response_received ? 'Responded' : 'No Response'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                AI-Generated Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900">Availability Signals</h4>
                  <div className="mt-2 space-y-2">
                    {candidate.availability_signals.map((signal, index) => (
                      <div key={index} className="text-sm">
                        <Badge variant="secondary" className="mr-2">
                          {signal.signal_type}
                        </Badge>
                        <span className="text-blue-800">
                          Confidence: {Math.round(signal.confidence * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900">Placement Probability</h4>
                  <p className="text-sm text-green-800 mt-1">
                    {candidate.placement_probability_score}% likelihood of successful placement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedCandidateProfile;
