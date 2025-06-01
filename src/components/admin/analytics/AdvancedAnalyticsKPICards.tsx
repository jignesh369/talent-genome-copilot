
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUsageAnalytics } from '@/hooks/useUsageAnalytics';
import { Users, Search, FileText, Brain } from 'lucide-react';

const AdvancedAnalyticsKPICards: React.FC = () => {
  const { metrics, loading } = useUsageAnalytics();

  const usageMetrics = [
    { 
      title: 'Active Users', 
      value: metrics.activeUsers.toString(), 
      change: metrics.userGrowth, 
      icon: Users, 
      color: 'text-blue-600' 
    },
    { 
      title: 'AI Searches', 
      value: metrics.aiSearches.toString(), 
      change: metrics.searchGrowth, 
      icon: Search, 
      color: 'text-green-600' 
    },
    { 
      title: 'Resume Parses', 
      value: metrics.resumeParses.toString(), 
      change: metrics.parseGrowth, 
      icon: FileText, 
      color: 'text-purple-600' 
    },
    { 
      title: 'AI Insights', 
      value: metrics.aiInsights.toString(), 
      change: metrics.insightGrowth, 
      icon: Brain, 
      color: 'text-orange-600' 
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {usageMetrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-sm text-green-600 mt-1">{metric.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${metric.color}`}>
                <metric.icon className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdvancedAnalyticsKPICards;
