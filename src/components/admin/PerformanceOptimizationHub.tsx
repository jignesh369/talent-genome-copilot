
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Cpu, 
  Database, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Activity,
  Settings,
  RefreshCw
} from 'lucide-react';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
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

          {/* System Health Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                System Health Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-900">Excellent</h3>
                  <p className="text-sm text-green-700">System performing optimally</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Cpu className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900">98.7%</h3>
                  <p className="text-sm text-blue-700">Overall performance score</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-purple-900">99.9%</h3>
                  <p className="text-sm text-purple-700">Uptime this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <Badge className={getPriorityColor(rec.priority)}>
                            {rec.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <p className="text-sm font-medium text-green-600">{rec.estimatedImprovement}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRecommendationApply(rec.title)}
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Impact: {rec.impact}</span>
                      <span>Effort: {rec.effort}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userActivityData.map((item, index) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceOptimizationHub;
