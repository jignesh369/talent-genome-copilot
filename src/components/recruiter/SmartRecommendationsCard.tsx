
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Users, Clock, Target } from 'lucide-react';

const SmartRecommendationsCard = () => {
  const recommendations = [
    {
      id: 1,
      title: "Follow up with high-engagement candidates",
      description: "5 candidates haven't been contacted in 3+ days",
      priority: "high",
      action: "Review Pipeline",
      icon: Users,
      estimated_impact: "85% conversion rate"
    },
    {
      id: 2,
      title: "Schedule interviews for qualified candidates",
      description: "12 candidates ready for next stage",
      priority: "medium",
      action: "Schedule",
      icon: Clock,
      estimated_impact: "Reduce time-to-hire by 2 days"
    },
    {
      id: 3,
      title: "Optimize job posting for Frontend role",
      description: "Low application rate detected",
      priority: "low",
      action: "Edit Job",
      icon: Target,
      estimated_impact: "30% more applications"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>Smart Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <rec.icon className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              </div>
              <Badge className={getPriorityColor(rec.priority)}>
                {rec.priority}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Impact: {rec.estimated_impact}
              </span>
              <Button size="sm" variant="outline">
                {rec.action}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SmartRecommendationsCard;
