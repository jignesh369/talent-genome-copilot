
import { useState, useEffect } from 'react';
import { predictiveAnalyticsService } from '@/services/predictiveAnalyticsService';
import { PredictiveInsight, MarketIntelligence } from '@/types/predictive-analytics';
import { useEnhancedCandidates } from './useEnhancedCandidates';

export const usePredictiveAnalytics = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [marketData, setMarketData] = useState<MarketIntelligence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      
      try {
        // Generate insights based on current candidates
        if (enhancedCandidates.length > 0) {
          const generatedInsights = predictiveAnalyticsService.generatePredictiveInsights(enhancedCandidates);
          setInsights(generatedInsights);
        }

        // Load market intelligence
        const market = predictiveAnalyticsService.getMarketIntelligence();
        setMarketData(market);
      } catch (error) {
        console.error('Error loading predictive analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [enhancedCandidates]);

  const calculateHiringProbability = (candidateId: string, jobRequirements: string[] = []) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return 0;
    
    return predictiveAnalyticsService.calculateHiringProbability(candidate, jobRequirements);
  };

  const predictTimeToHire = (candidateId: string) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return 0;
    
    return predictiveAnalyticsService.predictTimeToHire(candidate);
  };

  const addCustomInsight = (insight: Omit<PredictiveInsight, 'id' | 'created_at'>) => {
    predictiveAnalyticsService.addInsight(insight);
    setInsights(prev => [...prev, {
      ...insight,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    }]);
  };

  const refreshInsights = () => {
    if (enhancedCandidates.length > 0) {
      const newInsights = predictiveAnalyticsService.generatePredictiveInsights(enhancedCandidates);
      setInsights(newInsights);
    }
  };

  return {
    insights,
    marketData,
    loading,
    calculateHiringProbability,
    predictTimeToHire,
    addCustomInsight,
    refreshInsights
  };
};
