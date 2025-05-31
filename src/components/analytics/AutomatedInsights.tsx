
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye, ArrowRight } from 'lucide-react';

interface Insight {
  id: string;
  type: 'positive' | 'negative' | 'warning' | 'neutral';
  title: string;
  description: string;
  metric: string;
  value: string;
  change: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

const AutomatedInsights: React.FC = () => {
  const insights: Insight[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Application Rate Surge',
      description: 'Frontend developer positions showing 45% increase in qualified applications',
      metric: 'Application Quality',
      value: '89%',
      change: '+12%',
      recommendation: 'Consider expanding frontend team capacity',
      priority: 'high'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Interview No-Show Rate',
      description: 'Remote interviews have 23% higher no-show rate than in-person',
      metric: 'Interview Attendance',
      value: '77%',
      change: '-8%',
      recommendation: 'Implement reminder system and pre-interview engagement',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'negative',
      title: 'Time-to-Hire Increase',
      description: 'Senior positions taking 40% longer to fill than target',
      metric: 'Time to Hire',
      value: '35 days',
      change: '+40%',
      recommendation: 'Streamline senior-level interview process',
      priority: 'high'
    },
    {
      id: '4',
      type: 'positive',
      title: 'Source Performance',
      description: 'LinkedIn referrals showing highest conversion rate',
      metric: 'Conversion Rate',
      value: '34%',
      change: '+15%',
      recommendation: 'Increase LinkedIn sourcing budget allocation',
      priority: 'medium'
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'negative': return <TrendingDown className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default: return <Brain className="h-5 w-5 text-blue-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-l-green-500 bg-green-50';
      case 'negative': return 'border-l-red-500 bg-red-50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

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
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span>AI-Powered Insights</span>
          <Badge variant="secondary">Auto-Generated</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className={`p-4 border-l-4 rounded-lg ${getInsightColor(insight.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getInsightIcon(insight.type)}
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{insight.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Metric:</span>
                      <p className="font-medium">{insight.metric}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Current Value:</span>
                      <p className="font-medium">{insight.value}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Change:</span>
                      <p className={`font-medium ${insight.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {insight.change}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <span className="text-sm text-gray-500">Recommendation:</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{insight.recommendation}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomatedInsights;
