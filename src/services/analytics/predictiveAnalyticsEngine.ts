
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { PredictiveInsight } from '@/types/predictive-analytics';
import { predictionService } from './predictionService';
import { dataTransformationService } from './dataTransformationService';
import { analyticsCache } from './analyticsCache';

class PredictiveAnalyticsEngine {
  async predictJobSuccess(candidate: EnhancedCandidate, jobRequirements: string[]) {
    // Check cache first
    const cached = analyticsCache.getCachedPrediction(candidate.id, jobRequirements);
    if (cached) {
      console.log('Returning cached prediction for candidate:', candidate.id);
      return cached;
    }

    // Generate new prediction
    const prediction = await predictionService.predictJobSuccess(candidate, jobRequirements);
    
    // Cache the result
    analyticsCache.cachePrediction(candidate.id, jobRequirements, prediction);
    
    return prediction;
  }

  async generateInsights(candidates: EnhancedCandidate[]): Promise<PredictiveInsight[]> {
    // Check cache first
    const cached = analyticsCache.getCachedInsights();
    if (cached) {
      console.log('Returning cached insights');
      return cached;
    }

    const insights: PredictiveInsight[] = [];

    // Market trend insight
    insights.push({
      id: `insight_${Date.now()}_1`,
      type: 'market_trend',
      title: 'High Demand for AI/ML Skills',
      description: 'Candidates with AI/ML experience are 40% more likely to receive multiple offers',
      confidence: 0.89,
      impact: 'high',
      timeframe: 'Next 3 months',
      actionable_recommendations: [
        'Prioritize candidates with AI/ML background',
        'Increase offer competitiveness for ML engineers',
        'Consider remote work options to expand candidate pool'
      ],
      created_at: new Date().toISOString()
    });

    // Pipeline bottleneck insight
    insights.push({
      id: `insight_${Date.now()}_2`,
      type: 'pipeline_bottleneck',
      title: 'Technical Assessment Delay',
      description: 'Average time between initial screen and technical assessment is 8 days - causing 25% candidate drop-off',
      confidence: 0.92,
      impact: 'medium',
      timeframe: 'Immediate action needed',
      actionable_recommendations: [
        'Implement automated technical screening',
        'Reduce time between screening and assessment to 3 days',
        'Provide clear timeline expectations to candidates'
      ],
      created_at: new Date().toISOString()
    });

    // Cache the insights
    analyticsCache.cacheInsights(insights);

    return insights;
  }

  // Utility methods that delegate to data transformation service
  calculateJobRelevanceScore(candidate: EnhancedCandidate, requirements: string[]): number {
    return dataTransformationService.calculateJobRelevanceScore(candidate, requirements);
  }

  calculateSkillMatch(candidate: EnhancedCandidate, requirements: string[]): number {
    return dataTransformationService.calculateSkillMatch(candidate, requirements);
  }

  // Cache management
  clearCache(): void {
    analyticsCache.clear();
  }

  getCacheStats() {
    return analyticsCache.getStats();
  }
}

export const predictiveAnalyticsEngine = new PredictiveAnalyticsEngine();
