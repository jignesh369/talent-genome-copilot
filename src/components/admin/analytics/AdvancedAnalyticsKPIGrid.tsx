
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity } from 'lucide-react';

const AdvancedAnalyticsKPIGrid: React.FC = () => {
  const kpiData = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$74,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Customer Growth Rate',
      value: '15.2%',
      change: '+3.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.8%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      title: 'Customer Lifetime Value',
      value: '$4,250',
      change: '+8.3%',
      trend: 'up',
      icon: Activity,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
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

export default AdvancedAnalyticsKPIGrid;
