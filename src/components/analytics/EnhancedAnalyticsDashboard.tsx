
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Users, Target, Zap, AlertTriangle } from 'lucide-react';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';
import OSINTAnalyticsTab from './OSINTAnalyticsTab';
import PredictiveInsightsTab from './PredictiveInsightsTab';
import CommunicationAnalyticsTab from './CommunicationAnalyticsTab';
import PerformanceMetricsTab from './PerformanceMetricsTab';

const EnhancedAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    osintMonitoring, 
    alerts, 
    getAlertStats,
    enhancedCandidates,
    communicationMetrics
  } = useRecruitingIntelligence();

  const alertStats = getAlertStats();
  const activeCandidates = enhancedCandidates.filter(c => c.pipeline_stage !== 'rejected').length;
  const highEngagementCandidates = enhancedCandidates.filter(c => c.engagement_score > 70).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI-Powered Analytics</h2>
          <p className="text-gray-600 mt-1">Advanced insights and predictive intelligence</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
          <Brain className="h-4 w-4 mr-2" />
          Intelligence Active
        </Badge>
      </div>

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
                <p className="text-sm text-gray-600">OSINT Profiles</p>
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
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="osint">OSINT Analytics</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Insights</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PerformanceMetricsTab />
        </TabsContent>

        <TabsContent value="osint" className="space-y-6">
          <OSINTAnalyticsTab />
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <PredictiveInsightsTab />
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <CommunicationAnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;
