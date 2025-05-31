
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Calendar, Filter } from 'lucide-react';

const InteractiveAnalyticsCharts = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  const applicationData = [
    { name: 'Mon', applications: 24, interviews: 8, offers: 2 },
    { name: 'Tue', applications: 18, interviews: 12, offers: 4 },
    { name: 'Wed', applications: 32, interviews: 15, offers: 3 },
    { name: 'Thu', applications: 28, interviews: 10, offers: 5 },
    { name: 'Fri', applications: 35, interviews: 18, offers: 6 },
    { name: 'Sat', applications: 12, interviews: 5, offers: 1 },
    { name: 'Sun', applications: 8, interviews: 3, offers: 2 },
  ];

  const conversionData = [
    { stage: 'Applied', count: 156, percentage: 100 },
    { stage: 'Screened', count: 89, percentage: 57 },
    { stage: 'Interviewed', count: 34, percentage: 22 },
    { stage: 'Offers', count: 12, percentage: 8 },
    { stage: 'Hired', count: 8, percentage: 5 },
  ];

  const sourceData = [
    { name: 'LinkedIn', value: 45, color: '#0077B5' },
    { name: 'Job Boards', value: 30, color: '#4CAF50' },
    { name: 'Referrals', value: 15, color: '#FF9800' },
    { name: 'Direct', value: 10, color: '#9C27B0' },
  ];

  const chartConfig = {
    applications: { label: "Applications", color: "#3B82F6" },
    interviews: { label: "Interviews", color: "#10B981" },
    offers: { label: "Offers", color: "#F59E0B" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Applications Trend */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Activity Trends</span>
          </CardTitle>
          <div className="flex space-x-2">
            {['7d', '30d', '90d'].map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? "default" : "outline"}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={applicationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="applications"
                stackId="1"
                stroke="var(--color-applications)"
                fill="var(--color-applications)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="interviews"
                stackId="1"
                stroke="var(--color-interviews)"
                fill="var(--color-interviews)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="offers"
                stackId="1"
                stroke="var(--color-offers)"
                fill="var(--color-offers)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span>Conversion Funnel</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={conversionData} layout="horizontal">
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Source Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <span>Candidate Sources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percentage }) => `${name} ${percentage}%`}
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-orange-600" />
            <span>Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">73%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">18.5</div>
              <div className="text-sm text-gray-600">Avg Days to Hire</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">42%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">89%</div>
              <div className="text-sm text-gray-600">Quality Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveAnalyticsCharts;
