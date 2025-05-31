
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, TrendingUp, Clock, Target, Download, Calendar } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ROIPerformanceDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');

  const roiMetrics = [
    { title: 'Cost per Hire', value: '$3,247', change: '-12.5%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Time to Hire', value: '18.5 days', change: '-8.2%', icon: Clock, color: 'text-blue-600' },
    { title: 'Quality Score', value: '87%', change: '+15.3%', icon: Target, color: 'text-purple-600' },
    { title: 'ROI', value: '340%', change: '+22.8%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const performanceData = [
    { month: 'Jan', cost_per_hire: 3800, time_to_hire: 22, quality_score: 78, roi: 280 },
    { month: 'Feb', cost_per_hire: 3600, time_to_hire: 21, quality_score: 81, roi: 295 },
    { month: 'Mar', cost_per_hire: 3400, time_to_hire: 20, quality_score: 83, roi: 310 },
    { month: 'Apr', cost_per_hire: 3300, time_to_hire: 19, quality_score: 85, roi: 325 },
    { month: 'May', cost_per_hire: 3200, time_to_hire: 18, quality_score: 86, roi: 335 },
    { month: 'Jun', cost_per_hire: 3247, time_to_hire: 18.5, quality_score: 87, roi: 340 }
  ];

  const departmentROI = [
    { department: 'Engineering', hires: 45, cost: 156000, revenue_impact: 675000, roi: 332 },
    { department: 'Sales', hires: 32, cost: 89000, revenue_impact: 450000, roi: 405 },
    { department: 'Marketing', hires: 18, cost: 54000, revenue_impact: 234000, roi: 333 },
    { department: 'Product', hires: 28, cost: 98000, revenue_impact: 378000, roi: 286 }
  ];

  const chartConfig = {
    cost_per_hire: { label: "Cost per Hire", color: "#8884d8" },
    time_to_hire: { label: "Time to Hire", color: "#82ca9d" },
    quality_score: { label: "Quality Score", color: "#ffc658" },
    roi: { label: "ROI %", color: "#ff7300" }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-8 border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">ROI & Performance</h2>
            <p className="text-gray-600">Track hiring efficiency, costs, and return on investment</p>
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
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {roiMetrics.map((metric, index) => (
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

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="departments">Department ROI</TabsTrigger>
          <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="cost_per_hire" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="time_to_hire" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="quality_score" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department-wise ROI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentROI.map((dept, index) => (
                  <div key={index} className="p-6 border rounded-lg bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{dept.department}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">ROI:</span>
                        <span className="text-xl font-bold text-green-600">{dept.roi}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Hires</p>
                        <p className="font-semibold text-lg">{dept.hires}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Cost</p>
                        <p className="font-semibold text-lg">${dept.cost.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Revenue Impact</p>
                        <p className="font-semibold text-lg">${dept.revenue_impact.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Cost per Hire</p>
                        <p className="font-semibold text-lg">${Math.round(dept.cost / dept.hires).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Industry Benchmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Cost per Hire</p>
                      <p className="text-sm text-gray-600">Your org vs Industry avg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">18% Better</p>
                      <p className="text-sm text-gray-600">$3,247 vs $3,956</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Time to Hire</p>
                      <p className="text-sm text-gray-600">Your org vs Industry avg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">23% Faster</p>
                      <p className="text-sm text-gray-600">18.5 vs 24 days</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">Quality Score</p>
                      <p className="text-sm text-gray-600">Your org vs Industry avg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">15% Higher</p>
                      <p className="text-sm text-gray-600">87% vs 76%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-green-400 bg-green-50 rounded-r-lg">
                    <p className="font-medium text-green-900">High Impact</p>
                    <p className="text-sm text-green-700 mt-1">Implement AI screening to reduce time-to-hire by 3-5 days</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                    <p className="font-medium text-blue-900">Medium Impact</p>
                    <p className="text-sm text-blue-700 mt-1">Optimize LinkedIn sourcing to improve cost efficiency by 15%</p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-400 bg-orange-50 rounded-r-lg">
                    <p className="font-medium text-orange-900">Quick Win</p>
                    <p className="text-sm text-orange-700 mt-1">Increase referral program to boost quality scores</p>
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

export default ROIPerformanceDashboard;
