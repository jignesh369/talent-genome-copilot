
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

interface SystemMetricsProps {
  metrics: any[];
}

const SystemMetrics: React.FC<SystemMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">{metric.name}</h3>
              <div className={`w-3 h-3 rounded-full ${
                metric.status === 'excellent' ? 'bg-green-500' :
                metric.status === 'good' ? 'bg-blue-500' :
                metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-600">{metric.unit}</span>
              </div>
              <Progress 
                value={(metric.value / metric.threshold) * 100} 
                className="h-2"
              />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">0 {metric.unit}</span>
                <div className="flex items-center space-x-1">
                  {metric.trend > 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  ) : (
                    <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />
                  )}
                  <span className={metric.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                    {Math.abs(metric.trend)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SystemMetrics;
