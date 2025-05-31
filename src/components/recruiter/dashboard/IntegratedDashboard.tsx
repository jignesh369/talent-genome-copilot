
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Users, Target, TrendingUp, Settings, Bell } from 'lucide-react';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';
import { useToast } from '@/hooks/use-toast';
import EnhancedAnalyticsDashboard from '@/components/analytics/EnhancedAnalyticsDashboard';
import ProductionReadinessChecker from '@/components/analytics/ProductionReadinessChecker';

const IntegratedDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const { 
    enhancedCandidates, 
    osintMonitoring, 
    alerts, 
    getAlertStats 
  } = useRecruitingIntelligence();

  const alertStats = getAlertStats();
  const activeCandidates = enhancedCandidates.filter(c => c.pipeline_stage !== 'rejected').length;
  const highEngagementCandidates = enhancedCandidates.filter(c => c.engagement_score > 70).length;

  const handleSystemHealthCheck = () => {
    toast({
      title: "System Health Check",
      description: "Running comprehensive system diagnostics...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrated Recruiting Platform</h1>
          <p className="text-gray-600 mt-1">AI-powered recruiting with advanced analytics</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleSystemHealthCheck}>
            <Settings className="h-4 w-4 mr-2" />
            Health Check
          </Button>
          <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-blue-100 text-green-700">
            <Brain className="h-4 w-4 mr-2" />
            AI Active
          </Badge>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Candidates</p>
                <p className="text-2xl font-bold">{activeCandidates}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Engagement</p>
                <p className="text-2xl font-bold">{highEngagementCandidates}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">OSINT Monitoring</p>
                <p className="text-2xl font-bold">{osintMonitoring.total || 0}</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold">{alertStats.recent || 0}</p>
              </div>
              <Bell className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">New candidate added to pipeline</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">OSINT profile updated</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                    <Badge variant="secondary">Updated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Automated outreach sent</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                    <Badge variant="outline">Automated</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-20 flex flex-col items-center justify-center">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Find Candidates</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Target className="h-6 w-6 mb-2" />
                    <span>Create Job</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <Brain className="h-6 w-6 mb-2" />
                    <span>AI Insights</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    <span>Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <EnhancedAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <ProductionReadinessChecker />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegratedDashboard;
