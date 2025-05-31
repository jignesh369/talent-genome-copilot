
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap,
  Star,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface PredictiveScore {
  candidateId: string;
  candidateName: string;
  overallScore: number;
  fitScore: number;
  skillsScore: number;
  experienceScore: number;
  culturalFitScore: number;
  likelihood: {
    acceptance: number;
    success: number;
    retention: number;
  };
  recommendations: Recommendation[];
  riskFactors: RiskFactor[];
}

interface Recommendation {
  id: string;
  type: 'action' | 'caution' | 'opportunity';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
}

interface RiskFactor {
  id: string;
  severity: 'high' | 'medium' | 'low';
  factor: string;
  description: string;
  mitigation: string;
}

const PredictiveScoringEngine: React.FC = () => {
  const { toast } = useToast();
  
  const [scores, setScores] = useState<PredictiveScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading predictive scores
    setTimeout(() => {
      setScores([
        {
          candidateId: '1',
          candidateName: 'Sarah Chen',
          overallScore: 92,
          fitScore: 89,
          skillsScore: 95,
          experienceScore: 88,
          culturalFitScore: 91,
          likelihood: {
            acceptance: 85,
            success: 92,
            retention: 78
          },
          recommendations: [
            {
              id: '1',
              type: 'action',
              priority: 'high',
              title: 'Fast-track Interview',
              description: 'Exceptional technical skills and cultural fit',
              impact: 'High likelihood of successful hire'
            },
            {
              id: '2',
              type: 'opportunity',
              priority: 'medium',
              title: 'Competitive Offer',
              description: 'Market data suggests competitive salary expectations',
              impact: 'Increase acceptance probability by 15%'
            }
          ],
          riskFactors: [
            {
              id: '1',
              severity: 'low',
              factor: 'Remote Work Preference',
              description: 'Candidate prefers remote work arrangements',
              mitigation: 'Discuss flexible work options early'
            }
          ]
        },
        {
          candidateId: '2',
          candidateName: 'Marcus Rodriguez',
          overallScore: 76,
          fitScore: 82,
          skillsScore: 71,
          experienceScore: 78,
          culturalFitScore: 74,
          likelihood: {
            acceptance: 68,
            success: 75,
            retention: 82
          },
          recommendations: [
            {
              id: '3',
              type: 'caution',
              priority: 'medium',
              title: 'Skill Gap Assessment',
              description: 'Some technical skills may need development',
              impact: 'Consider additional training program'
            }
          ],
          riskFactors: [
            {
              id: '2',
              severity: 'medium',
              factor: 'Career Transition',
              description: 'Transitioning from different industry',
              mitigation: 'Provide structured onboarding and mentorship'
            }
          ]
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'action':
        return <Zap className="h-4 w-4 text-blue-600" />;
      case 'caution':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'opportunity':
        return <Lightbulb className="h-4 w-4 text-green-600" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRecalculateScores = () => {
    setLoading(true);
    toast({
      title: "Recalculating Scores",
      description: "AI is analyzing updated candidate data...",
    });
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Scores Updated",
        description: "Predictive scores have been recalculated with latest data.",
      });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">AI is analyzing candidate data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Predictive Scoring Engine</h2>
          <p className="text-gray-600">AI-powered candidate assessment and recommendations</p>
        </div>
        <Button onClick={handleRecalculateScores}>
          <Brain className="h-4 w-4 mr-2" />
          Recalculate Scores
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Overall Score</p>
                <p className="text-2xl font-bold text-gray-900">84%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Success Likelihood</p>
                <p className="text-2xl font-bold text-gray-900">83%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Candidates Scored</p>
                <p className="text-2xl font-bold text-gray-900">{scores.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scores" className="space-y-6">
        <TabsList>
          <TabsTrigger value="scores">Candidate Scores</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="insights">Predictive Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="space-y-4">
          {scores.map((score) => (
            <Card key={score.candidateId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{score.candidateName}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        Overall: {score.overallScore}%
                      </Badge>
                      <span className={`font-semibold ${getScoreColor(score.overallScore)}`}>
                        {score.overallScore >= 85 ? 'Excellent Fit' : 
                         score.overallScore >= 70 ? 'Good Fit' : 'Needs Review'}
                      </span>
                    </div>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div>
                    <Label className="text-sm text-gray-600">Skills Match</Label>
                    <div className="mt-2">
                      <Progress value={score.skillsScore} className="h-2" />
                      <span className="text-sm font-medium">{score.skillsScore}%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Experience</Label>
                    <div className="mt-2">
                      <Progress value={score.experienceScore} className="h-2" />
                      <span className="text-sm font-medium">{score.experienceScore}%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Cultural Fit</Label>
                    <div className="mt-2">
                      <Progress value={score.culturalFitScore} className="h-2" />
                      <span className="text-sm font-medium">{score.culturalFitScore}%</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Role Fit</Label>
                    <div className="mt-2">
                      <Progress value={score.fitScore} className="h-2" />
                      <span className="text-sm font-medium">{score.fitScore}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Acceptance Likelihood</p>
                    <p className="text-lg font-semibold text-green-600">{score.likelihood.acceptance}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Success Probability</p>
                    <p className="text-lg font-semibold text-blue-600">{score.likelihood.success}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Retention Score</p>
                    <p className="text-lg font-semibold text-purple-600">{score.likelihood.retention}%</p>
                  </div>
                </div>

                {score.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Key Recommendations</h4>
                    <div className="space-y-2">
                      {score.recommendations.slice(0, 2).map((rec) => (
                        <div key={rec.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          {getRecommendationIcon(rec.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h5 className="font-medium text-sm">{rec.title}</h5>
                              <Badge className={getPriorityColor(rec.priority)}>
                                {rec.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scores.flatMap(score => score.recommendations).map((rec) => (
                  <div key={rec.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    {getRecommendationIcon(rec.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{rec.description}</p>
                      <p className="text-sm text-blue-600 font-medium">Impact: {rec.impact}</p>
                    </div>
                    <Button size="sm" variant="outline">Apply</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                      Hiring Trends
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Candidates with similar profiles have a 87% success rate in this role
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-600" />
                      Time to Hire
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Average time to hire for similar candidates: 18 days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveScoringEngine;
