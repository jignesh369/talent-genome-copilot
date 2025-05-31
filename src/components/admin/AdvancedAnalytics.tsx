
import React, { useState } from 'react';
import AdvancedAnalyticsControlHeader from './analytics/AdvancedAnalyticsControlHeader';
import AdvancedAnalyticsKPIGrid from './analytics/AdvancedAnalyticsKPIGrid';
import RevenueTrendsChart from './analytics/RevenueTrendsChart';
import UserGrowthChart from './analytics/UserGrowthChart';
import PlanDistributionChart from './analytics/PlanDistributionChart';
import ChurnAnalysisChart from './analytics/ChurnAnalysisChart';

interface AdvancedAnalyticsProps {
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ dateRange, onDateRangeChange }) => {
  const handleExportData = () => {
    console.log('Exporting analytics data...');
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <AdvancedAnalyticsControlHeader 
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
        onExportData={handleExportData}
      />

      {/* KPI Cards */}
      <AdvancedAnalyticsKPIGrid />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrendsChart />
        <UserGrowthChart />
        <PlanDistributionChart />
        <ChurnAnalysisChart />
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
