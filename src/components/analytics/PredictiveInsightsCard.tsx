
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  BarChart3,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { PredictiveInsight } from '@/types/predictive-analytics';

interface PredictiveInsightsCardProps {
  insights: PredictiveInsight[];
}

const PredictiveInsightsCard: React.FC<PredictiveInsightsCardProps> = ({ insights }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'hiring_forecast': return Target;
      case 'candidate_trajectory': return TrendingUp;
      case 'market_trend': return BarChart3;
      case 'pipeline_bottleneck': return AlertTriangle;
      default: return Brain;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Predictive Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => {
            const IconComponent = getInsightIcon(insight.type);
            return (
              <div key={insight.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-sm">{insight.title}</h3>
                  </div>
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact} impact
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Confidence: {Math.round(insight.confidence * 100)}%</span>
                  <span>{insight.timeframe}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveInsightsCard;
