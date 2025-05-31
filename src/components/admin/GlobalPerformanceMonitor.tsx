
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { 
  Server, 
  Database, 
  Globe, 
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Users
} from 'lucide-react';
import PlatformMetrics from './performance/PlatformMetrics';
import ResourceUtilization from './performance/ResourceUtilization';
import RegionalPerformance from './performance/RegionalPerformance';
import AlertsAndIncidents from './performance/AlertsAndIncidents';

const GlobalPerformanceMonitor: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const platformMetrics = [
    {
      title: 'Total Organizations',
      value: '1,247',
      change: '+23 this week',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Users',
      value: '8,934',
      change: '+156 today',
      trend: 'up',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'API Requests/min',
      value: '45.2k',
      change: '+12% vs yesterday',
      trend: 'up',
      icon: Server,
      color: 'text-purple-600'
    },
    {
      title: 'Global Uptime',
      value: '99.97%',
      change: 'SLA compliant',
      trend: 'up',
      icon: Globe,
      color: 'text-orange-600'
    }
  ];

  const resourceUtilization = [
    {
      name: 'CPU Usage',
      current: 67,
      max: 100,
      status: 'normal',
      trend: +3
    },
    {
      name: 'Memory Usage',
      current: 74,
      max: 100,
      status: 'normal',
      trend: -2
    },
    {
      name: 'Database Load',
      current: 45,
      max: 100,
      status: 'excellent',
      trend: -5
    },
    {
      name: 'Storage Usage',
      current: 82,
      max: 100,
      status: 'warning',
      trend: +8
    }
  ];

  const performanceTrends = [
    { time: '00:00', cpu: 45, memory: 62, api_requests: 320, users: 1200 },
    { time: '04:00', cpu: 38, memory: 58, api_requests: 180, users: 890 },
    { time: '08:00', cpu: 72, memory: 81, api_requests: 650, users: 2400 },
    { time: '12:00', cpu: 85, memory: 89, api_requests: 890, users: 3200 },
    { time: '16:00', cpu: 79, memory: 85, api_requests: 780, users: 2900 },
    { time: '20:00', cpu: 67, memory: 74, api_requests: 450, users: 1800 }
  ];

  const regionalData = [
    { region: 'North America', users: 3456, latency: 45, status: 'healthy' },
    { region: 'Europe', users: 2890, latency: 52, status: 'healthy' },
    { region: 'Asia Pacific', users: 1998, latency: 78, status: 'warning' },
    { region: 'South America', users: 590, latency: 67, status: 'healthy' }
  ];

  const alertsAndIncidents = [
    {
      severity: 'warning',
      title: 'High Database Latency',
      description: 'Average query time increased by 15% in Asia Pacific region',
      time: '5 minutes ago',
      status: 'investigating'
    },
    {
      severity: 'info',
      title: 'Scheduled Maintenance',
      description: 'Redis cluster maintenance completed successfully',
      time: '2 hours ago',
      status: 'resolved'
    },
    {
      severity: 'critical',
      title: 'API Rate Limit Exceeded',
      description: 'Customer org_1247 exceeded API limits',
      time: '3 hours ago',
      status: 'resolved'
    }
  ];

  const chartConfig = {
    cpu: { label: "CPU %", color: "#8884d8" },
    memory: { label: "Memory %", color: "#82ca9d" },
    api_requests: { label: "API Requests", color: "#ffc658" },
    users: { label: "Active Users", color: "#ff7300" }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Global Performance Monitor</h2>
          <p className="text-sm text-gray-600">Platform-wide performance metrics and resource monitoring</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1h">Last Hour</SelectItem>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PlatformMetrics metrics={platformMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResourceUtilization resources={resourceUtilization} />
        <RegionalPerformance regionalData={regionalData} />
      </div>

      {/* Performance Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="cpu" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                <Area type="monotone" dataKey="memory" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <AlertsAndIncidents alerts={alertsAndIncidents} />
    </div>
  );
};

export default GlobalPerformanceMonitor;
