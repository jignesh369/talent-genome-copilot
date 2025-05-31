
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OptimizationRecommendationsProps {
  recommendations: any[];
  onApplyRecommendation: (title: string) => void;
}

const OptimizationRecommendations: React.FC<OptimizationRecommendationsProps> = ({
  recommendations,
  onApplyRecommendation
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimization Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">{rec.title}</h3>
                    <Badge className={getPriorityColor(rec.priority)}>
                      {rec.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <p className="text-sm font-medium text-green-600">{rec.estimatedImprovement}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onApplyRecommendation(rec.title)}
                >
                  Apply
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Impact: {rec.impact}</span>
                <span>Effort: {rec.effort}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimizationRecommendations;
