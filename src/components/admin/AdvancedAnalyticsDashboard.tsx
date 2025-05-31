
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdvancedAnalyticsHeader from './analytics/AdvancedAnalyticsHeader';
import AdvancedAnalyticsKPICards from './analytics/AdvancedAnalyticsKPICards';
import HiringFunnelChart from './analytics/HiringFunnelChart';
import PerformanceTrendsChart from './analytics/PerformanceTrendsChart';
import SourceEffectivenessPanel from './analytics/SourceEffectivenessPanel';
import PredictiveInsightsPanel from './analytics/PredictiveInsightsPanel';

const AdvancedAnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="space-y-6">
      <AdvancedAnalyticsHeader 
        dateRange={dateRange} 
        onDateRangeChange={setDateRange} 
      />

      <AdvancedAnalyticsKPICards />

      <Tabs defaultValue="funnel" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="funnel">Hiring Funnel</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="sources">Source Effectiveness</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="space-y-4">
          <HiringFunnelChart />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <PerformanceTrendsChart />
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <SourceEffectivenessPanel />
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <PredictiveInsightsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
