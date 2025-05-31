
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const RecruitingHealthScore = () => {
  const healthScore = 87;
  const factors = [
    {
      name: "Pipeline Flow",
      score: 92,
      status: "excellent",
      icon: TrendingUp,
      description: "Healthy candidate progression"
    },
    {
      name: "Response Rate",
      score: 78,
      status: "good",
      icon: CheckCircle,
      description: "Above industry average"
    },
    {
      name: "Time to Fill",
      score: 65,
      status: "warning",
      icon: AlertTriangle,
      description: "Slightly above target"
    },
    {
      name: "Quality Score",
      score: 94,
      status: "excellent",
      icon: Activity,
      description: "High-quality placements"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-600" />
            <span>Recruiting Health Score</span>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(healthScore)}`}>
              {healthScore}
            </div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={healthScore} className="h-3" />
        
        <div className="space-y-3">
          {factors.map((factor) => (
            <div key={factor.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <factor.icon className="h-4 w-4 text-gray-600" />
                <div>
                  <div className="font-medium">{factor.name}</div>
                  <div className="text-sm text-gray-600">{factor.description}</div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className={`font-medium ${getScoreColor(factor.score)}`}>
                  {factor.score}
                </div>
                <Badge className={getStatusColor(factor.status)} variant="outline">
                  {factor.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecruitingHealthScore;
