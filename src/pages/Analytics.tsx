
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import AdvancedAnalyticsDashboard from '@/components/analytics/AdvancedAnalyticsDashboard';
import CustomReportBuilder from '@/components/analytics/CustomReportBuilder';
import AutomatedInsights from '@/components/analytics/AutomatedInsights';
import PerformanceTracker from '@/components/recruiter/PerformanceTracker';
import { BarChart, Brain, Target, TrendingUp, Download, Settings } from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <RecruiterLayout 
      title="Analytics & Intelligence" 
      subtitle="Advanced insights and custom reporting"
    >
      <div className="space-y-6">
        {/* Enhanced Header with Quick Actions */}
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
            <AdvancedAnalyticsDashboard />
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
    </RecruiterLayout>
  );
};

export default Analytics;
