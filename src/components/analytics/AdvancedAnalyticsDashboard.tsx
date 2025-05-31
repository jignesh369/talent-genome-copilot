
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { predictiveAnalyticsService } from '@/services/predictiveAnalyticsService';
import { PredictiveInsight, MarketIntelligence } from '@/types/predictive-analytics';
import { useEnhancedCandidates } from '@/hooks/useEnhancedCandidates';
import AnalyticsHeader from './AnalyticsHeader';
import PredictiveInsightsCard from './PredictiveInsightsCard';
import PerformanceTabContent from './PerformanceTabContent';
import MarketIntelligenceTabContent from './MarketIntelligenceTabContent';
import PipelineTabContent from './PipelineTabContent';
import PredictionsTabContent from './PredictionsTabContent';

const AdvancedAnalyticsDashboard = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [marketData, setMarketData] = useState<MarketIntelligence | null>(null);

  useEffect(() => {
    if (enhancedCandidates.length > 0) {
      const generatedInsights = predictiveAnalyticsService.generatePredictiveInsights(enhancedCandidates);
      setInsights(generatedInsights);
    }
    setMarketData(predictiveAnalyticsService.getMarketIntelligence());
  }, [enhancedCandidates]);

  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <PredictiveInsightsCard insights={insights} />

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="market">Market Intelligence</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline Analytics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceTabContent />
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <MarketIntelligenceTabContent marketData={marketData} />
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <PipelineTabContent />
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <PredictionsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
