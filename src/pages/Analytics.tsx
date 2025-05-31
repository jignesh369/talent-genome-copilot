import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import EnhancedAnalyticsDashboard from '@/components/analytics/EnhancedAnalyticsDashboard';
import ProductionReadinessChecker from '@/components/analytics/ProductionReadinessChecker';
import SystemIntegrationTest from '@/components/system/SystemIntegrationTest';
import CustomReportBuilder from '@/components/analytics/CustomReportBuilder';
import AutomatedInsights from '@/components/analytics/AutomatedInsights';
import PerformanceTracker from '@/components/recruiter/PerformanceTracker';
import { BarChart, Brain, Target, TrendingUp, Download, Settings, TestTube } from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('enhanced');

  return (
    <RecruiterLayout 
      title="Analytics & Intelligence" 
      subtitle="Advanced insights and system monitoring"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enhanced" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Enhanced Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="production" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Production Health</span>
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center space-x-2">
              <TestTube className="h-4 w-4" />
              <span>Integration Tests</span>
            </TabsTrigger>
            <TabsTrigger value="legacy" className="flex items-center space-x-2">
              <BarChart className="h-4 w-4" />
              <span>Legacy Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enhanced" className="space-y-6">
            <EnhancedAnalyticsDashboard />
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            <ProductionReadinessChecker />
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <SystemIntegrationTest />
          </TabsContent>

          <TabsContent value="legacy" className="space-y-6">
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="flex items-center space-x-2">
                    <BarChart className="h-4 w-4" />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>AI Insights</span>
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Performance</span>
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Custom Reports</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <EnhancedAnalyticsDashboard />
                </TabsContent>

                <TabsContent value="insights" className="space-y-6">
                  <AutomatedInsights />
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                  <PerformanceTracker />
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                  <CustomReportBuilder />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RecruiterLayout>
  );
};

export default Analytics;
