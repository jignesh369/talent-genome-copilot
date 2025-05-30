
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Server, 
  Database, 
  Wifi, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Activity,
  Cpu,
  HardDrive,
  RefreshCw
} from 'lucide-react';

const SystemHealth: React.FC = () => {
  const { toast } = useToast();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const systemServices = [
    {
      name: 'API Gateway',
      status: 'healthy',
      uptime: '99.98%',
      responseTime: '45ms',
      icon: Server,
      lastIncident: 'None'
    },
    {
      name: 'Database',
      status: 'healthy',
      uptime: '99.95%',
      responseTime: '12ms',
      icon: Database,
      lastIncident: '2 days ago'
    },
    {
      name: 'Authentication Service',
      status: 'warning',
      uptime: '99.89%',
      responseTime: '78ms',
      icon: Wifi,
      lastIncident: '6 hours ago'
    },
    {
      name: 'File Storage',
      status: 'healthy',
      uptime: '100%',
      responseTime: '23ms',
      icon: HardDrive,
      lastIncident: 'None'
    },
    {
      name: 'Email Service',
      status: 'degraded',
      uptime: '98.12%',
      responseTime: '156ms',
      icon: Activity,
      lastIncident: '1 hour ago'
    }
  ];

  const systemMetrics = [
    {
      name: 'CPU Usage',
      value: 45,
      threshold: 80,
      unit: '%',
      status: 'normal'
    },
    {
      name: 'Memory Usage',
      value: 67,
      threshold: 85,
      unit: '%',
      status: 'normal'
    },
    {
      name: 'Disk Usage',
      value: 82,
      threshold: 90,
      unit: '%',
      status: 'warning'
    },
    {
      name: 'Network I/O',
      value: 34,
      threshold: 70,
      unit: 'Mbps',
      status: 'normal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'degraded': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getProgressColor = (value: number, threshold: number) => {
    if (value >= threshold) return 'bg-red-500';
    if (value >= threshold * 0.8) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
    toast({
      title: "System Status Updated",
      description: "All system metrics have been refreshed.",
    });
  };

  const handleServiceAction = (serviceName: string, action: string) => {
    toast({
      title: `${action} ${serviceName}`,
      description: `${serviceName} ${action.toLowerCase()} initiated.`,
    });
    console.log(`${action} ${serviceName}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Health</h2>
          <p className="text-sm text-gray-600">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Overall Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            Overall System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-lg font-semibold text-green-600">All Systems Operational</span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              98.9% Uptime (30 days)
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* System Services */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <service.icon className="w-6 h-6 text-gray-600" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{service.name}</h3>
                      {getStatusIcon(service.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      Uptime: {service.uptime} | Response: {service.responseTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleServiceAction(service.name, 'Restart')}
                  >
                    Restart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cpu className="w-5 h-5 mr-2" />
            Resource Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{metric.name}</span>
                  <span className="text-sm text-gray-600">
                    {metric.value}{metric.unit} / {metric.threshold}{metric.unit}
                  </span>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0{metric.unit}</span>
                  <span>{metric.threshold}{metric.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealth;
