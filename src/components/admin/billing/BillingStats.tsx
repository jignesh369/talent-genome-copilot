
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BillingStats as BillingStatsType } from '@/types/billing';
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Building 
} from 'lucide-react';

interface BillingStatsProps {
  stats: BillingStatsType;
}

const BillingStats: React.FC<BillingStatsProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Revenue',
      value: stats.totalRevenue,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Monthly Recurring',
      value: stats.monthlyRecurring,
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      label: 'Active Subs',
      value: stats.activeSubscriptions.toString(),
      icon: CheckCircle,
      color: 'text-purple-600'
    },
    {
      label: 'Churn Rate',
      value: stats.churnRate,
      icon: AlertCircle,
      color: 'text-orange-600'
    },
    {
      label: 'Avg Revenue',
      value: stats.avgRevenuePerUser,
      icon: Users,
      color: 'text-indigo-600'
    },
    {
      label: 'Growth Rate',
      value: stats.growthRate,
      icon: Building,
      color: 'text-cyan-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statItems.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.label === 'Growth Rate' ? 'text-green-600' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BillingStats;
