
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Calendar,
  Award,
  Filter
} from 'lucide-react';

const TeamAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('hires');

  const teamPerformance = [
    { 
      name: 'Sarah Johnson', 
      role: 'Senior Recruiter',
      hires: 8, 
      interviews: 24, 
      applications: 156, 
      conversion: 18.2,
      avgTimeToHire: 21,
      satisfaction: 4.6
    },
    { 
      name: 'Mike Chen', 
      role: 'Hiring Manager',
      hires: 5, 
      interviews: 18, 
      applications: 89, 
      conversion: 22.1,
      avgTimeToHire: 19,
      satisfaction: 4.8
    },
    { 
      name: 'Emily Davis', 
      role: 'Recruiter',
      hires: 6, 
      interviews: 21, 
      applications: 123, 
      conversion: 16.7,
      avgTimeToHire: 25,
      satisfaction: 4.4
    }
  ];

  const pipelineData = [
    { stage: 'Applied', count: 156, conversion: 100 },
    { stage: 'Screening', count: 89, conversion: 57.1 },
    { stage: 'Interview', count: 45, conversion: 50.6 },
    { stage: 'Final', count: 23, conversion: 51.1 },
    { stage: 'Offer', count: 12, conversion: 52.2 },
    { stage: 'Hired', count: 8, conversion: 66.7 }
  ];

  const hiringTrends = [
    { month: 'Jan', hires: 15, applications: 245, timeToHire: 23 },
    { month: 'Feb', hires: 18, applications: 289, timeToHire: 21 },
    { month: 'Mar', hires: 22, applications: 334, timeToHire: 19 },
    { month: 'Apr', hires: 19, applications: 298, timeToHire: 22 },
    { month: 'May', hires: 25, applications: 367, timeToHire: 18 },
    { month: 'Jun', hires: 23, applications: 342, timeToHire: 20 }
  ];

  const departmentStats = [
    { name: 'Engineering', value: 45, color: '#8884d8' },
    { name: 'Sales', value: 30, color: '#82ca9d' },
    { name: 'Marketing', value: 15, color: '#ffc658' },
    { name: 'HR', value: 10, color: '#ff7300' }
  ];

  const chartConfig = {
    hires: { label: "Hires", color: "#8884d8" },
    applications: { label: "Applications", color: "#82ca9d" },
    timeToHire: { label: "Time to Hire", color: "#ffc658" }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Analytics</h2>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hires</p>
                <p className="text-3xl font-bold text-gray-900">19</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Time to Hire</p>
                <p className="text-3xl font-bold text-gray-900">21 days</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-red-600 mr-1" />
                  <span className="text-sm text-red-600">+2 days</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">19.2%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+1.3%</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900">4.6</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+0.2</span>
                </div>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hiringTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="hires" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="timeToHire" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Pipeline Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Hires by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <Badge variant="outline">
                      {member.satisfaction}/5.0 ⭐
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Hires</p>
                      <p className="font-semibold">{member.hires}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Conversion</p>
                      <p className="font-semibold">{member.conversion}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Time</p>
                      <p className="font-semibold">{member.avgTimeToHire}d</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamAnalytics;
