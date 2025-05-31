
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'normal': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      case 'healthy': return 'bg-green-100 text-green-800';
      default: return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {platformMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center ${metric.color}`}>
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="w-5 h-5 mr-2" />
              Resource Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {resourceUtilization.map((resource, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{resource.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {resource.current}%
                      </span>
                      <div className="flex items-center">
                        {resource.trend > 0 ? (
                          <TrendingUp className="w-3 h-3 text-red-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-green-600" />
                        )}
                        <span className={`text-xs ml-1 ${resource.trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {Math.abs(resource.trend)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <Progress 
                    value={resource.current} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Regional Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{region.region}</h3>
                    <p className="text-sm text-gray-600">{region.users} active users</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(region.status)}>
                      {region.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{region.latency}ms avg</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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

      {/* Alerts and Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Recent Alerts & Incidents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertsAndIncidents.map((alert, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <h3 className="font-semibold">{alert.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <Badge variant="outline">
                    {alert.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalPerformanceMonitor;
