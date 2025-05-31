
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, Target, TrendingUp } from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';
import CandidateProfileHeader from './profile/CandidateProfileHeader';
import CandidateMetricsCard from './profile/CandidateMetricsCard';
import CandidateContactInfo from './profile/CandidateContactInfo';
import CandidateEngagementHistory from './profile/CandidateEngagementHistory';

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
      <CandidateProfileHeader 
        candidate={candidate} 
        onScheduleInterview={onScheduleInterview} 
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CandidateMetricsCard candidate={candidate} />
            <CandidateContactInfo candidate={candidate} />
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
          <CandidateEngagementHistory candidate={candidate} />
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
