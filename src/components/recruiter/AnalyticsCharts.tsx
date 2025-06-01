
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useOrganizationAnalytics } from '@/hooks/useOrganizationAnalytics';
import { TrendingUp, Users, Brain } from 'lucide-react';

const AnalyticsCharts: React.FC = () => {
  const { analytics, loading } = useOrganizationAnalytics();

  const chartConfig = {
    applications: { label: "Applications", color: "#3B82F6" },
    interviews: { label: "Interviews", color: "#10B981" },
    offers: { label: "Offers", color: "#8B5CF6" },
    hires: { label: "Hires", color: "#F59E0B" },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="min-w-0">
            <CardHeader>
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
              </div>
            </CardHeader>
            <CardContent className="p-3 lg:p-6">
              <div className="w-full h-[250px] lg:h-[300px] bg-gray-100 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full overflow-hidden">
      {/* Hiring Funnel Chart */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm lg:text-base truncate">
            <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600 flex-shrink-0" />
            <span className="truncate">Hiring Funnel Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          <div className="w-full h-[250px] lg:h-[300px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.hiringFunnel} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    fontSize={12}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fontSize: 12 }}
                    width={40}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="applications" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="interviews" fill="#10B981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="offers" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="hires" fill="#F59E0B" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Department Distribution */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm lg:text-base truncate">
            <Users className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600 flex-shrink-0" />
            <span className="truncate">Hiring by Department</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          <div className="w-full h-[250px] lg:h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.departmentBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                  fontSize={10}
                >
                  {analytics.departmentBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Performance Chart - Full width on large screens */}
      <Card className="min-w-0 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm lg:text-base truncate">
            <Brain className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">AI Performance Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 lg:p-6">
          <div className="w-full h-[250px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.performanceMetrics} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="week" 
                    fontSize={12}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    fontSize={12}
                    tick={{ fontSize: 12 }}
                    width={40}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stackId="1" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="quality" 
                    stackId="2" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;
