
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users } from 'lucide-react';

interface UserActivityMetricsProps {
  activityData: any[];
}

const UserActivityMetrics: React.FC<UserActivityMetricsProps> = ({ activityData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {activityData.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{item.metric}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                <div className="flex items-center mt-2">
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-600 mr-1 rotate-180" />
                  )}
                  <span className={`text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
              <Users className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserActivityMetrics;
