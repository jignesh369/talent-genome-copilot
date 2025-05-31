
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Clock,
  Activity,
  BarChart3
} from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';
import { candidateAnalyticsService } from '@/services/candidateAnalyticsService';

interface CandidateAnalyticsDashboardProps {
  candidates: EnhancedCandidate[];
}

const CandidateAnalyticsDashboard: React.FC<CandidateAnalyticsDashboardProps> = ({ candidates }) => {
  const totalCandidates = candidateAnalyticsService.calculateTotalCandidates(candidates);
  const highEngagementCandidates = candidateAnalyticsService.calculateHighEngagementCandidates(candidates);
  const activelySeeking = candidateAnalyticsService.calculateActivelySeeking(candidates);
  const averageEngagement = candidateAnalyticsService.calculateAverageEngagement(candidates);
  const averagePlacementProbability = candidateAnalyticsService.calculateAveragePlacementProbability(candidates);
  const pipelineStats = candidateAnalyticsService.calculatePipelineDistribution(candidates);
  const topSkills = candidateAnalyticsService.calculateTopSkills(candidates, 10);
  const conversionRate = candidateAnalyticsService.calculateConversionRate(candidates, pipelineStats);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold">{totalCandidates}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Engagement</p>
                <p className="text-2xl font-bold">{highEngagementCandidates}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actively Seeking</p>
                <p className="text-2xl font-bold">{activelySeeking}</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Engagement</p>
                <p className="text-2xl font-bold">{averageEngagement}%</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Pipeline Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(pipelineStats).map(([stage, count]) => (
              <div key={stage} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm capitalize">{stage.replace('_', ' ')}</span>
                  <span className="text-sm font-medium">{count} candidates</span>
                </div>
                <Progress value={(count / totalCandidates) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Top Skills in Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSkills.map(([skill, count], index) => (
                <div key={skill} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="text-sm">{skill}</span>
                  </div>
                  <Badge variant="secondary">
                    {count} candidates
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 border rounded-lg">
                <p className="text-sm font-medium">Conversion Rate</p>
                <p className="text-xs text-gray-600 mt-1">
                  {conversionRate}% of candidates reach hiring stage
                </p>
              </div>
              
              <div className="p-3 border rounded-lg">
                <p className="text-sm font-medium">Quality Score</p>
                <p className="text-xs text-gray-600 mt-1">
                  Based on engagement and placement probability metrics
                </p>
                <div className="flex items-center mt-2">
                  <Progress value={averageEngagement} className="h-2 flex-1" />
                  <span className="ml-2 text-xs font-medium">{averageEngagement}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Engagement Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Average Engagement Score</span>
                <span className="text-sm font-medium">{averageEngagement}%</span>
              </div>
              <Progress value={averageEngagement} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Average Placement Probability</span>
                <span className="text-sm font-medium">{averagePlacementProbability}%</span>
              </div>
              <Progress value={averagePlacementProbability} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-bold text-green-700">{highEngagementCandidates}</p>
                <p className="text-xs text-green-600">High Engagement (70%+)</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-lg font-bold text-orange-700">{activelySeeking}</p>
                <p className="text-xs text-orange-600">Actively Seeking</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateAnalyticsDashboard;
