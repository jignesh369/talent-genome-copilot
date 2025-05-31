
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdvancedAnalyticsControlHeader from './analytics/AdvancedAnalyticsControlHeader';
import AdvancedAnalyticsKPIGrid from './analytics/AdvancedAnalyticsKPIGrid';
import RevenueTrendsChart from './analytics/RevenueTrendsChart';
import UserGrowthChart from './analytics/UserGrowthChart';
import PlanDistributionChart from './analytics/PlanDistributionChart';
import ChurnAnalysisChart from './analytics/ChurnAnalysisChart';
import AdvancedRevenueAnalytics from './AdvancedRevenueAnalytics';

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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Revenue & Analytics Hub</h2>
        <p className="text-gray-600 mb-6">Comprehensive business intelligence and revenue optimization</p>
        
        <AdvancedAnalyticsControlHeader 
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          onExportData={handleExportData}
        />
      </div>

      {/* Enhanced KPI Grid */}
      <AdvancedAnalyticsKPIGrid />

      {/* Unified Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white border rounded-lg p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Analytics Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
            Revenue Deep Dive
          </TabsTrigger>
          <TabsTrigger value="forecasting" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
            Forecasting & Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueTrendsChart />
            <UserGrowthChart />
            <PlanDistributionChart />
            <ChurnAnalysisChart />
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <AdvancedRevenueAnalytics />
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Forecasting</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Next Month Projection</p>
                    <p className="text-sm text-gray-600">Based on current trends</p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">$425k</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Quarter Forecast</p>
                    <p className="text-sm text-gray-600">Q1 2024 projection</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">$1.28M</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Annual Target</p>
                    <p className="text-sm text-gray-600">2024 goal progress</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">68%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Insights</h3>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-emerald-400 bg-emerald-50 rounded-r-lg">
                  <p className="font-medium text-emerald-900">Strong Enterprise Growth</p>
                  <p className="text-sm text-emerald-700 mt-1">Enterprise signups increased 45% this month</p>
                </div>
                <div className="p-4 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                  <p className="font-medium text-blue-900">Geographic Expansion</p>
                  <p className="text-sm text-blue-700 mt-1">European market showing 32% growth</p>
                </div>
                <div className="p-4 border-l-4 border-orange-400 bg-orange-50 rounded-r-lg">
                  <p className="font-medium text-orange-900">Retention Alert</p>
                  <p className="text-sm text-orange-700 mt-1">3 accounts at churn risk - recommend intervention</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
