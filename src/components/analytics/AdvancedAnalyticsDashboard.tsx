
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { predictiveAnalyticsService } from '@/services/predictiveAnalyticsService';
import { PredictiveInsight, MarketIntelligence } from '@/types/predictive-analytics';
import { useEnhancedCandidates } from '@/hooks/useEnhancedCandidates';
import { useCandidateConversion } from '@/hooks/useCandidateConversion';
import AnalyticsHeader from './AnalyticsHeader';
import PredictiveInsightsCard from './PredictiveInsightsCard';
import PerformanceTabContent from './PerformanceTabContent';
import MarketIntelligenceTabContent from './MarketIntelligenceTabContent';
import PipelineTabContent from './PipelineTabContent';
import PredictionsTabContent from './PredictionsTabContent';

const AdvancedAnalyticsDashboard = () => {
  const { data: enhancedCandidates = [] } = useEnhancedCandidates();
  const { convertToSearchCandidate } = useCandidateConversion();
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [marketData, setMarketData] = useState<MarketIntelligence | null>(null);

  useEffect(() => {
    if (enhancedCandidates.length > 0) {
      // Convert enhanced candidates to the format expected by predictiveAnalyticsService
      const candidatesForAnalysis = enhancedCandidates.map(candidate => {
        const convertedCandidate = convertToSearchCandidate(candidate as any);
        
        // Add missing properties required for analytics
        return {
          ...convertedCandidate,
          first_name: candidate.name.split(' ')[0],
          last_name: candidate.name.split(' ').slice(1).join(' '),
          score: convertedCandidate.match_score,
          education: [],
          applications: [],
          interviews: [],
          notes: [],
          tags: [],
          organization_id: '',
          created_at: candidate.profile_last_updated,
          updated_at: candidate.profile_last_updated,
          source_details: { platform: 'database', verified: true },
          portal_activity_score: candidate.learning_velocity_score,
          interaction_timeline: [],
          engagement_score: candidate.community_influence_score,
          last_contact_date: undefined,
          response_rate: 0.8,
          preferred_contact_method: convertedCandidate.best_contact_method.platform,
          osint_last_updated: candidate.osint_last_fetched,
          background_verification_status: 'verified' as const,
          placement_probability_score: convertedCandidate.match_score,
          cultural_fit_score: candidate.community_influence_score,
          availability_signals: [],
          portal_preferences: undefined,
          job_interests: [],
          career_aspirations: candidate.ai_summary,
          pipeline_stage: 'sourced',
          stage_history: [],
          assigned_recruiter_id: undefined,
          priority_level: 'medium' as const,
          status: 'new' as const,
          source: 'direct' as const,
        };
      });
      
      const generatedInsights = predictiveAnalyticsService.generatePredictiveInsights(candidatesForAnalysis);
      setInsights(generatedInsights);
    }
    setMarketData(predictiveAnalyticsService.getMarketIntelligence());
  }, [enhancedCandidates, convertToSearchCandidate]);

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
