
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import UsageAnalyticsDashboard from '@/components/admin/analytics/UsageAnalyticsDashboard';
import ROIPerformanceDashboard from '@/components/admin/analytics/ROIPerformanceDashboard';
import ForecastingInsights from '@/components/admin/analytics/ForecastingInsights';

const AnalyticsTabsWrapper: React.FC = () => {
  return (
    <>
      <TabsContent value="analytics" className="mt-0">
        <UsageAnalyticsDashboard />
      </TabsContent>

      <TabsContent value="performance" className="mt-0">
        <ROIPerformanceDashboard />
      </TabsContent>

      <TabsContent value="forecasting" className="mt-0">
        <ForecastingInsights />
      </TabsContent>
    </>
  );
};

export default AnalyticsTabsWrapper;
