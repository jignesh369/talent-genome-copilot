
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Zap, RefreshCw } from 'lucide-react';
import SystemMetrics from './optimization/SystemMetrics';
import OptimizationRecommendations from './optimization/OptimizationRecommendations';
import SystemHealthOverview from './optimization/SystemHealthOverview';
import UserActivityMetrics from './optimization/UserActivityMetrics';

const PerformanceOptimizationHub: React.FC = () => {
  const { toast } = useToast();
  const [isOptimizing, setIsOptimizing] = useState(false);

  const systemMetrics = [
    {
      name: 'API Response Time',
      value: 245,
      threshold: 500,
      unit: 'ms',
      status: 'good',
      trend: -15
    },
    {
      name: 'Database Query Time',
      value: 89,
      threshold: 200,
      unit: 'ms',
      status: 'excellent',
      trend: -8
    },
    {
      name: 'Search Latency',
      value: 156,
      threshold: 300,
      unit: 'ms',
      status: 'good',
      trend: +5
    },
    {
      name: 'User Session Duration',
      value: 1247,
      threshold: 1000,
      unit: 'sec',
      status: 'excellent',
      trend: +23
    }
  ];

  const optimizationRecommendations = [
    {
      title: 'Database Index Optimization',
      impact: 'High',
      effort: 'Medium',
      description: 'Add composite indexes on frequently queried candidate fields',
      estimatedImprovement: '25% faster search queries',
      priority: 'high'
    },
    {
      title: 'API Response Caching',
      impact: 'Medium',
      effort: 'Low',
      description: 'Implement Redis caching for job listings and candidate profiles',
      estimatedImprovement: '40% reduction in API response time',
      priority: 'medium'
    },
    {
      title: 'Image Compression',
      impact: 'Medium',
      effort: 'Low',
      description: 'Optimize candidate profile images and resume thumbnails',
      estimatedImprovement: '30% faster page load times',
      priority: 'medium'
    },
    {
      title: 'Bundle Size Optimization',
      impact: 'High',
      effort: 'High',
      description: 'Implement code splitting and lazy loading for admin panels',
      estimatedImprovement: '50% faster initial load',
      priority: 'high'
    }
  ];

  const userActivityData = [
    { metric: 'Daily Active Users', value: 247, change: '+12%', trend: 'up' },
    { metric: 'Page Views per Session', value: 8.4, change: '+5%', trend: 'up' },
    { metric: 'Session Duration', value: '12m 34s', change: '+18%', trend: 'up' },
    { metric: 'Bounce Rate', value: '15.2%', change: '-8%', trend: 'down' }
  ];

  const handleOptimize = async () => {
    setIsOptimizing(true);
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsOptimizing(false);
    toast({
      title: "Optimization Complete",
      description: "System performance has been optimized successfully.",
    });
  };

  const handleRecommendationApply = (title: string) => {
    toast({
      title: "Optimization Applied",
      description: `${title} has been implemented successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Optimization</h2>
          <p className="text-sm text-gray-600">Monitor and optimize system performance</p>
        </div>
        <Button 
          onClick={handleOptimize}
          disabled={isOptimizing}
        >
          {isOptimizing ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Zap className="w-4 h-4 mr-2" />
          )}
          {isOptimizing ? 'Optimizing...' : 'Auto-Optimize'}
        </Button>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <SystemMetrics metrics={systemMetrics} />
          <SystemHealthOverview />
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <OptimizationRecommendations 
            recommendations={optimizationRecommendations}
            onApplyRecommendation={handleRecommendationApply}
          />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <UserActivityMetrics activityData={userActivityData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceOptimizationHub;
