
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Activity, TrendingUp, Users } from "lucide-react";
import { useOSINTMonitoring } from '@/hooks/useOSINTMonitoring';

interface OSINTMonitoringPanelProps {
  candidateIds: string[];
}

const OSINTMonitoringPanel: React.FC<OSINTMonitoringPanelProps> = ({ candidateIds }) => {
  const { osintMonitoring } = useOSINTMonitoring(candidateIds);

  const getMonitoringStats = () => {
    const activePercentage = osintMonitoring.total > 0 
      ? (osintMonitoring.active.length / osintMonitoring.total) * 100 
      : 0;

    return {
      total: osintMonitoring.total,
      active: osintMonitoring.active.length,
      percentage: activePercentage,
      status: activePercentage > 80 ? 'excellent' : activePercentage > 60 ? 'good' : 'needs_attention'
    };
  };

  const stats = getMonitoringStats();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'needs_attention': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <TrendingUp className="h-4 w-4" />;
      case 'good': return <Activity className="h-4 w-4" />;
      case 'needs_attention': return <Eye className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-purple-600" />
          <span>OSINT Monitoring</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overview Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
              <div className="text-xs text-gray-500">Total Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-xs text-gray-500">Active Profiles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.percentage.toFixed(0)}%</div>
              <div className="text-xs text-gray-500">Coverage</div>
            </div>
          </div>

          {/* Monitoring Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Monitoring Coverage</span>
              <Badge className={getStatusColor(stats.status)}>
                {getStatusIcon(stats.status)}
                <span className="ml-1 capitalize">{stats.status.replace('_', ' ')}</span>
              </Badge>
            </div>
            <Progress value={stats.percentage} className="h-2" />
          </div>

          {/* Platform Status */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Platform Status</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>LinkedIn</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>GitHub</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>Twitter</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">Limited</Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>Stack Overflow</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2">
            <div className="text-sm font-medium">Recent Updates</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span>GitHub activity detected</span>
                <span className="text-blue-600">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span>LinkedIn profile updated</span>
                <span className="text-green-600">15 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                <span>New skill endorsement</span>
                <span className="text-purple-600">1 hr ago</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OSINTMonitoringPanel;
