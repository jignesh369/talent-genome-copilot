
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity,
  Calendar,
  Download
} from 'lucide-react';

interface AdvancedAnalyticsProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ dateRange, onDateRangeChange }) => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const revenueData = [
    { month: 'Jan', revenue: 45000, customers: 12, churn: 5 },
    { month: 'Feb', revenue: 52000, customers: 15, churn: 3 },
    { month: 'Mar', revenue: 61000, customers: 18, churn: 4 },
    { month: 'Apr', revenue: 58000, customers: 17, churn: 6 },
    { month: 'May', revenue: 67000, customers: 21, churn: 2 },
    { month: 'Jun', revenue: 74000, customers: 24, churn: 3 }
  ];

  const userGrowthData = [
    { month: 'Jan', totalUsers: 347, newUsers: 45, activeUsers: 298 },
    { month: 'Feb', totalUsers: 412, newUsers: 65, activeUsers: 356 },
    { month: 'Mar', totalUsers: 489, newUsers: 77, activeUsers: 423 },
    { month: 'Apr', totalUsers: 534, newUsers: 45, activeUsers: 467 },
    { month: 'May', totalUsers: 612, newUsers: 78, activeUsers: 534 },
    { month: 'Jun', totalUsers: 689, newUsers: 77, activeUsers: 601 }
  ];

  const planDistribution = [
    { name: 'Starter', value: 40, color: '#8884d8' },
    { name: 'Professional', value: 35, color: '#82ca9d' },
    { name: 'Enterprise', value: 25, color: '#ffc658' }
  ];

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

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "#8884d8",
    },
    customers: {
      label: "Customers",
      color: "#82ca9d",
    },
    churn: {
      label: "Churn",
      color: "#ffc658",
    },
  };

  const handleExportData = () => {
    console.log('Exporting analytics data...');
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
        <div className="flex items-center space-x-4">
          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="newUsers" fill="#82ca9d" />
                  <Bar dataKey="activeUsers" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Plan Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Churn Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Churn Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="churn" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
