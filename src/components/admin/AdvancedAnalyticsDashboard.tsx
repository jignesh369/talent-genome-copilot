
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Users,
  Target,
  Calendar,
  Download,
  Filter,
  Eye,
  Activity
} from 'lucide-react';

const AdvancedAnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const kpiData = [
    {
      title: 'Hiring Velocity',
      value: '18.5 days',
      change: '-2.3 days',
      trend: 'up',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Cost per Hire',
      value: '$3,247',
      change: '-12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-600'
    },
    {
      title: 'Quality of Hire',
      value: '87%',
      change: '+3.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const hiringFunnelData = [
    { stage: 'Applications', count: 1250, conversion: 100 },
    { stage: 'Screening', count: 423, conversion: 33.8 },
    { stage: 'Phone Interview', count: 187, conversion: 44.2 },
    { stage: 'Technical', count: 89, conversion: 47.6 },
    { stage: 'Final Interview', count: 45, conversion: 50.6 },
    { stage: 'Offer', count: 23, conversion: 51.1 },
    { stage: 'Hired', count: 18, conversion: 78.3 }
  ];

  const performanceTrendsData = [
    { month: 'Jan', hires: 15, timeToHire: 22, costPerHire: 3200, qualityScore: 82 },
    { month: 'Feb', hires: 18, timeToHire: 20, costPerHire: 3100, qualityScore: 85 },
    { month: 'Mar', hires: 22, timeToHire: 19, costPerHire: 2900, qualityScore: 87 },
    { month: 'Apr', hires: 19, timeToHire: 21, costPerHire: 3050, qualityScore: 84 },
    { month: 'May', hires: 25, timeToHire: 18, costPerHire: 2850, qualityScore: 89 },
    { month: 'Jun', hires: 23, timeToHire: 17, costPerHire: 2750, qualityScore: 91 }
  ];

  const sourceEffectivenessData = [
    { source: 'LinkedIn', applications: 450, hires: 8, cost: 1200, quality: 89 },
    { source: 'Indeed', applications: 320, hires: 5, cost: 800, quality: 76 },
    { source: 'Referrals', applications: 180, hires: 3, cost: 450, quality: 94 },
    { source: 'Company Website', applications: 220, hires: 2, cost: 200, quality: 82 },
    { source: 'Glassdoor', applications: 80, hires: 0, cost: 300, quality: 65 }
  ];

  const chartConfig = {
    hires: { label: "Hires", color: "#8884d8" },
    timeToHire: { label: "Time to Hire", color: "#82ca9d" },
    costPerHire: { label: "Cost per Hire", color: "#ffc658" },
    qualityScore: { label: "Quality Score", color: "#ff7300" }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
          <p className="text-sm text-gray-600">Real-time recruiting intelligence and insights</p>
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
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">{kpi.change}</span>
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

      <Tabs defaultValue="funnel" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="funnel">Hiring Funnel</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="sources">Source Effectiveness</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Funnel Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hiringFunnelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="conversion" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="hires" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="timeToHire" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="qualityScore" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Source Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sourceEffectivenessData.map((source, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{source.source}</h3>
                      <Badge variant="outline">Quality: {source.quality}%</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Applications</p>
                        <p className="font-semibold">{source.applications}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Hires</p>
                        <p className="font-semibold">{source.hires}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cost</p>
                        <p className="font-semibold">${source.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-blue-900">Hiring Forecast</h3>
                      <p className="text-sm text-blue-700">Based on current trends, you're projected to hire 28 candidates next month (+12% vs this month)</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Quality Improvement</h3>
                      <p className="text-sm text-green-700">Focusing on LinkedIn and Referrals could improve overall hire quality by 8%</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <h3 className="font-semibold text-orange-900">Process Optimization</h3>
                      <p className="text-sm text-orange-700">Streamlining technical interviews could reduce time-to-hire by 3-4 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
