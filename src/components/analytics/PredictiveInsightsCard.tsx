
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PredictiveInsight } from '@/types/predictive-analytics';
import { Brain, TrendingUp, AlertCircle, Clock } from 'lucide-react';

interface PredictiveInsightsCardProps {
  insights: PredictiveInsight[];
}

const PredictiveInsightsCard: React.FC<PredictiveInsightsCardProps> = ({ insights }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'hiring_forecast': return TrendingUp;
      case 'candidate_trajectory': return Brain;
      case 'market_trend': return TrendingUp;
      case 'pipeline_bottleneck': return AlertCircle;
      default: return Brain;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI-Powered Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insights.length > 0 ? (
          <div className="space-y-4">
            {insights.slice(0, 3).map((insight) => {
              const IconComponent = getInsightIcon(insight.type);
              return (
                <div key={insight.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium">{insight.title}</h4>
                    </div>
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Confidence: {insight.confidence}%</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{insight.timeframe}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Brain className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>Generating AI insights...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictiveInsightsCard;
