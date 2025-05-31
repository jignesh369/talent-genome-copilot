
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Users, Search, FileText, Brain, Download, Calendar } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const UsageAnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');

  const usageMetrics = [
    { title: 'Active Users', value: '2,347', change: '+18%', icon: Users, color: 'text-blue-600' },
    { title: 'AI Searches', value: '12,458', change: '+24%', icon: Search, color: 'text-green-600' },
    { title: 'Resume Parses', value: '3,892', change: '+15%', icon: FileText, color: 'text-purple-600' },
    { title: 'AI Insights', value: '7,234', change: '+32%', icon: Brain, color: 'text-orange-600' }
  ];

  const userActivityData = [
    { date: 'Jan', recruiters: 45, candidates: 120, searches: 234, applications: 89 },
    { date: 'Feb', recruiters: 52, candidates: 145, searches: 287, applications: 112 },
    { date: 'Mar', recruiters: 48, candidates: 134, searches: 298, applications: 98 },
    { date: 'Apr', recruiters: 61, candidates: 167, searches: 345, applications: 134 },
    { date: 'May', recruiters: 58, candidates: 178, searches: 389, applications: 156 },
    { date: 'Jun', recruiters: 67, candidates: 203, searches: 423, applications: 178 }
  ];

  const sourceEffectiveness = [
    { source: 'LinkedIn', usage: 4500, success_rate: 28, cost_per_hire: 1200, quality_score: 89 },
    { source: 'Indeed', usage: 3200, success_rate: 22, cost_per_hire: 800, quality_score: 76 },
    { source: 'Referrals', usage: 1800, success_rate: 45, cost_per_hire: 450, quality_score: 94 },
    { source: 'Company Site', usage: 2200, success_rate: 18, cost_per_hire: 200, quality_score: 82 }
  ];

  const chartConfig = {
    recruiters: { label: "Recruiters", color: "#8884d8" },
    candidates: { label: "Candidates", color: "#82ca9d" },
    searches: { label: "Searches", color: "#ffc658" },
    applications: { label: "Applications", color: "#ff7300" }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Usage Analytics</h2>
            <p className="text-gray-600">Monitor platform usage, user activity, and source effectiveness</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

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
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="sources">Source Analytics</TabsTrigger>
          <TabsTrigger value="ai-usage">AI Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="recruiters" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="candidates" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="searches" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Source Effectiveness Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sourceEffectiveness.map((source, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{source.source}</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">Quality: <strong>{source.quality_score}%</strong></span>
                        <span className="text-gray-600">Success: <strong>{source.success_rate}%</strong></span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Total Usage</p>
                        <p className="font-semibold">{source.usage.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Cost per Hire</p>
                        <p className="font-semibold">${source.cost_per_hire}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Quality Score</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${source.quality_score}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{source.quality_score}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-usage" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Feature Adoption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Smart Search</span>
                    <span className="text-lg font-bold text-blue-600">94%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Resume Parsing</span>
                    <span className="text-lg font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Candidate Matching</span>
                    <span className="text-lg font-bold text-purple-600">76%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Interview Insights</span>
                    <span className="text-lg font-bold text-orange-600">68%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-green-400 bg-green-50 rounded-r-lg">
                    <p className="font-medium text-green-900">Accuracy Improvement</p>
                    <p className="text-sm text-green-700 mt-1">AI matching accuracy improved by 23% this month</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                    <p className="font-medium text-blue-900">Time Savings</p>
                    <p className="text-sm text-blue-700 mt-1">Average 4.5 hours saved per recruiter weekly</p>
                  </div>
                  <div className="p-4 border-l-4 border-purple-400 bg-purple-50 rounded-r-lg">
                    <p className="font-medium text-purple-900">Quality Enhancement</p>
                    <p className="text-sm text-purple-700 mt-1">18% improvement in candidate quality scores</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsageAnalyticsDashboard;
