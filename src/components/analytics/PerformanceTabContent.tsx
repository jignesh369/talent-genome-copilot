
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Clock, Target, Award, Activity } from 'lucide-react';

const PerformanceTabContent = () => {
  const performanceMetrics = [
    {
      title: "Overall Hiring Success Rate",
      value: 73,
      change: "+8%",
      trend: "up",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: "Candidate Engagement Rate", 
      value: 84,
      change: "+12%",
      trend: "up",
      icon: Activity,
      color: "text-blue-600"
    },
    {
      title: "Time to Fill Improvement",
      value: 67,
      change: "-15%",
      trend: "up",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Quality of Hire Score",
      value: 91,
      change: "+5%",
      trend: "up", 
      icon: Award,
      color: "text-orange-600"
    }
  ];

  const pipelineMetrics = [
    { stage: "Sourced", count: 234, conversion: 68 },
    { stage: "Qualified", count: 159, conversion: 45 },
    { stage: "Interviewing", count: 71, conversion: 72 },
    { stage: "Offer Stage", count: 51, conversion: 89 },
    { stage: "Hired", count: 45, conversion: 100 }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{metric.value}%</span>
                    <span className="text-sm text-green-600">{metric.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Pipeline Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineMetrics.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{stage.stage}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{stage.count} candidates</span>
                    <span className="text-sm font-medium">{stage.conversion}% conversion</span>
                  </div>
                </div>
                <Progress value={stage.conversion} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span>Team Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-gray-600">Active Placements</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">18.5</p>
              <p className="text-sm text-gray-600">Avg. Days to Hire</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">94%</p>
              <p className="text-sm text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTabContent;
