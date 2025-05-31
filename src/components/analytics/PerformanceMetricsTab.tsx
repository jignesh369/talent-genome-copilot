
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Target, TrendingUp, Clock } from 'lucide-react';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';

const PerformanceMetricsTab = () => {
  const { enhancedCandidates } = useRecruitingIntelligence();

  const getPipelineMetrics = () => {
    const stages = ['sourced', 'qualified', 'interviewing', 'offer_stage', 'hired'];
    return stages.map(stage => ({
      stage: stage.replace('_', ' ').toUpperCase(),
      count: enhancedCandidates.filter(c => c.pipeline_stage === stage).length
    }));
  };

  const getConversionRates = () => {
    const total = enhancedCandidates.length;
    if (total === 0) return [];

    return [
      {
        metric: 'Sourced to Qualified',
        rate: (enhancedCandidates.filter(c => c.pipeline_stage !== 'sourced').length / total) * 100
      },
      {
        metric: 'Qualified to Interview',
        rate: (enhancedCandidates.filter(c => ['interviewing', 'offer_stage', 'hired'].includes(c.pipeline_stage)).length / total) * 100
      },
      {
        metric: 'Interview to Offer',
        rate: (enhancedCandidates.filter(c => ['offer_stage', 'hired'].includes(c.pipeline_stage)).length / total) * 100
      },
      {
        metric: 'Offer to Hire',
        rate: (enhancedCandidates.filter(c => c.pipeline_stage === 'hired').length / total) * 100
      }
    ];
  };

  const getTimeToHire = () => {
    const hiredCandidates = enhancedCandidates.filter(c => c.pipeline_stage === 'hired');
    if (hiredCandidates.length === 0) return 0;

    const avgDays = hiredCandidates.reduce((sum, candidate) => {
      const totalDays = candidate.stage_history.reduce((stageSum, stage) => 
        stageSum + (stage.duration_days || 0), 0
      );
      return sum + totalDays;
    }, 0) / hiredCandidates.length;

    return avgDays;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-500" />
              Total Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enhancedCandidates.length}</div>
            <p className="text-sm text-gray-600">In pipeline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="h-4 w-4 mr-2 text-green-500" />
              Active Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enhancedCandidates.filter(c => c.pipeline_stage !== 'rejected').length}
            </div>
            <p className="text-sm text-gray-600">Progressing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enhancedCandidates.length > 0 
                ? ((enhancedCandidates.filter(c => c.pipeline_stage === 'hired').length / enhancedCandidates.length) * 100).toFixed(1)
                : 0}%
            </div>
            <p className="text-sm text-gray-600">To hire</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-orange-500" />
              Avg Time to Hire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTimeToHire().toFixed(0)} days</div>
            <p className="text-sm text-gray-600">Pipeline duration</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getPipelineMetrics()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {getConversionRates().map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <Badge variant="default">{item.rate.toFixed(1)}%</Badge>
                </div>
                <Progress value={item.rate} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetricsTab;
