
import { EnhancedCandidate } from '@/types/enhanced-recruiting';
import { PredictiveInsight, MarketIntelligence } from '@/types/predictive-analytics';
import { marketIntelligenceService } from './analytics/marketIntelligenceService';
import { hiringPredictionService } from './analytics/hiringPredictionService';
import { insightsGeneratorService } from './analytics/insightsGeneratorService';

class PredictiveAnalyticsService {
  private insights: PredictiveInsight[] = [];

  // Generate hiring success probability
  calculateHiringProbability(candidate: EnhancedCandidate, jobRequirements: string[]): number {
    return hiringPredictionService.calculateHiringProbability(candidate, jobRequirements);
  }

  // Predict time to hire
  predictTimeToHire(candidate: EnhancedCandidate): number {
    return hiringPredictionService.predictTimeToHire(candidate);
  }

  // Generate predictive insights
  generatePredictiveInsights(candidates: EnhancedCandidate[]): PredictiveInsight[] {
    return insightsGeneratorService.generatePredictiveInsights(candidates);
  }

  // Market intelligence
  getMarketIntelligence(): MarketIntelligence {
    return marketIntelligenceService.getMarketIntelligence();
  }

  // Get insights
  getInsights(): PredictiveInsight[] {
    return this.insights;
  }

  // Add custom insight
  addInsight(insight: Omit<PredictiveInsight, 'id' | 'created_at'>): void {
    this.insights.push({
      ...insight,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    });
  }
}

export const predictiveAnalyticsService = new PredictiveAnalyticsService();
export type { PredictiveInsight, MarketIntelligence } from '@/types/predictive-analytics';
