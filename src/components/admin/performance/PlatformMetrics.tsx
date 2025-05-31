
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PlatformMetricsProps {
  metrics: any[];
}

const PlatformMetrics: React.FC<PlatformMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full overflow-hidden">
      {metrics.map((metric, index) => (
        <Card key={index} className="min-w-0">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">{metric.title}</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 mt-1 truncate">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-600 mr-1 flex-shrink-0" />
                  ) : (
                    <TrendingDown className="w-3 h-3 lg:w-4 lg:h-4 text-red-600 mr-1 flex-shrink-0" />
                  )}
                  <span className={`text-xs lg:text-sm truncate ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${metric.color}`}>
                <metric.icon className="w-4 h-4 lg:w-6 lg:h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlatformMetrics;
