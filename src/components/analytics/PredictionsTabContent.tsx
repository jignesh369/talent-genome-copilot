
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Clock, Target, AlertTriangle, CheckCircle } from 'lucide-react';

const PredictionsTabContent = () => {
  const hiringPredictions = [
    {
      candidate: "Sarah Johnson",
      role: "Frontend Developer",
      probability: 89,
      timeToHire: 12,
      confidence: 92,
      status: "high"
    },
    {
      candidate: "Michael Chen",
      role: "Data Scientist", 
      probability: 76,
      timeToHire: 18,
      confidence: 85,
      status: "medium"
    },
    {
      candidate: "Emma Wilson",
      role: "UX Designer",
      probability: 94,
      timeToHire: 8,
      confidence: 96,
      status: "high"
    },
    {
      candidate: "David Rodriguez",
      role: "Backend Developer",
      probability: 62,
      timeToHire: 25,
      confidence: 78,
      status: "medium"
    }
  ];

  const marketForecasts = [
    {
      skill: "React Development",
      demand: "increasing",
      growth: 23,
      recommendation: "High priority skill to source"
    },
    {
      skill: "Machine Learning",
      demand: "stable", 
      growth: 8,
      recommendation: "Steady demand, consistent sourcing"
    },
    {
      skill: "DevOps Engineering",
      demand: "increasing",
      growth: 31,
      recommendation: "Critical shortage predicted"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandIcon = (demand: string) => {
    switch (demand) {
      case 'increasing': return TrendingUp;
      case 'stable': return CheckCircle;
      case 'decreasing': return AlertTriangle;
      default: return TrendingUp;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hiring Success Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-600" />
            <span>Hiring Success Predictions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hiringPredictions.map((prediction, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{prediction.candidate}</h4>
                    <p className="text-sm text-gray-600">{prediction.role}</p>
                  </div>
                  <Badge className={getStatusColor(prediction.status)}>
                    {prediction.probability}% likely to hire
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hiring Probability</span>
                    <span>{prediction.probability}%</span>
                  </div>
                  <Progress value={prediction.probability} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Est. {prediction.timeToHire} days to hire</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <span>{prediction.confidence}% confidence</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Demand Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Market Demand Forecasts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketForecasts.map((forecast, index) => {
              const IconComponent = getDemandIcon(forecast.demand);
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{forecast.skill}</h4>
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      <span className="text-sm capitalize">{forecast.demand}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Projected Growth</span>
                      <span>+{forecast.growth}%</span>
                    </div>
                    <Progress value={forecast.growth} className="h-2" />
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      <strong>Recommendation:</strong> {forecast.recommendation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Focus on High-Probability Candidates</h4>
                  <p className="text-sm text-blue-700">Emma Wilson and Sarah Johnson show 89%+ hiring probability. Prioritize these candidates for faster placement.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Skill Gap Alert</h4>
                  <p className="text-sm text-yellow-700">DevOps Engineering shows 31% growth but limited candidate pool. Consider expanding search criteria or training programs.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Market Opportunity</h4>
                  <p className="text-sm text-green-700">React Development demand is increasing 23%. Excellent time to source and place React developers.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionsTabContent;
