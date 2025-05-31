
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, DollarSign, Clock, Target } from 'lucide-react';

const AdvancedAnalyticsKPICards: React.FC = () => {
  const kpiData = [
    {
      title: 'Hiring Velocity',
      value: '18.5 days',
      change: '-2.3 days',
      trend: 'up',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Cost per Hire',
      value: '$3,247',
      change: '-12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Quality of Hire',
      value: '87%',
      change: '+3.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">{kpi.change}</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdvancedAnalyticsKPICards;
