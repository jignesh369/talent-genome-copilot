
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users } from 'lucide-react';

interface UserActivityMetricsProps {
  activityData: any[];
}

const UserActivityMetrics: React.FC<UserActivityMetricsProps> = ({ activityData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full overflow-hidden">
      {activityData.map((item, index) => (
        <Card key={index} className="min-w-0">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">{item.metric}</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 mt-1 truncate">{item.value}</p>
                <div className="flex items-center mt-2">
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-600 mr-1 flex-shrink-0" />
                  ) : (
                    <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-red-600 mr-1 rotate-180 flex-shrink-0" />
                  )}
                  <span className={`text-xs lg:text-sm truncate ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
              <Users className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserActivityMetrics;
