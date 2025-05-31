
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, DollarSign, Clock, Users, Award } from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  icon: any;
  color: string;
}

const PerformanceTracker: React.FC = () => {
  const metrics: PerformanceMetric[] = [
    {
      id: '1',
      name: 'Monthly Hires',
      current: 12,
      target: 15,
      unit: 'hires',
      trend: 'up',
      change: '+20%',
      icon: Users,
      color: 'blue'
    },
    {
      id: '2',
      name: 'Time to Hire',
      current: 18,
      target: 14,
      unit: 'days',
      trend: 'down',
      change: '-15%',
      icon: Clock,
      color: 'green'
    },
    {
      id: '3',
      name: 'Cost per Hire',
      current: 3200,
      target: 2800,
      unit: '$',
      trend: 'up',
      change: '+8%',
      icon: DollarSign,
      color: 'orange'
    },
    {
      id: '4',
      name: 'Quality Score',
      current: 87,
      target: 90,
      unit: '%',
      trend: 'up',
      change: '+5%',
      icon: Award,
      color: 'purple'
    }
  ];

  const getProgressColor = (current: number, target: number, trend: string) => {
    const percentage = (current / target) * 100;
    if (trend === 'down' && current < target) return 'bg-green-500'; // Good for metrics where lower is better
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-green-600" />
          <span>Performance Tracking</span>
          <Badge variant="secondary">Real-time</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric) => {
            const IconComponent = metric.icon;
            const progress = Math.min((metric.current / metric.target) * 100, 100);
            const isOnTrack = metric.name === 'Time to Hire' || metric.name === 'Cost per Hire' 
              ? metric.current <= metric.target 
              : metric.current >= metric.target * 0.8;

            return (
              <div key={metric.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`h-5 w-5 text-${metric.color}-600`} />
                    <h3 className="font-medium text-gray-900">{metric.name}</h3>
                  </div>
                  <Badge variant={isOnTrack ? "default" : "destructive"}>
                    {isOnTrack ? 'On Track' : 'Behind'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {metric.unit === '$' ? '$' : ''}{metric.current.toLocaleString()}{metric.unit !== '$' ? ` ${metric.unit}` : ''}
                    </span>
                    <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                      {metric.change}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Target: {metric.unit === '$' ? '$' : ''}{metric.target.toLocaleString()}{metric.unit !== '$' ? ` ${metric.unit}` : ''}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress 
                      value={progress} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>
                      {metric.current >= metric.target ? 'Target exceeded' : 
                       progress >= 80 ? 'Close to target' : 'Needs improvement'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Performance Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Monthly Performance Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">75%</p>
              <p className="text-gray-600">Goals Met</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">$48k</p>
              <p className="text-gray-600">ROI Generated</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">A-</p>
              <p className="text-gray-600">Overall Grade</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceTracker;
