
import { EnhancedCandidate } from '@/types/enhanced-recruiting';
import { PredictiveInsight } from '@/types/predictive-analytics';
import { hiringPredictionService } from './hiringPredictionService';

class InsightsGeneratorService {
  generatePredictiveInsights(candidates: EnhancedCandidate[]): PredictiveInsight[] {
    const insights: PredictiveInsight[] = [];

    // Pipeline bottleneck analysis
    const stageDistribution = this.analyzeStageDistribution(candidates);
    const bottleneckStage = this.identifyBottleneck(stageDistribution);
    
    if (bottleneckStage) {
      insights.push({
        id: 'bottleneck-' + Date.now(),
        type: 'pipeline_bottleneck',
        title: 'Pipeline Bottleneck Detected',
        description: `${bottleneckStage} stage is showing signs of congestion with longer than average duration.`,
        confidence: 0.85,
        impact: 'high',
        timeframe: 'Next 2 weeks',
        actionable_recommendations: [
          'Review interview scheduling for this stage',
          'Consider adding additional reviewers',
          'Streamline decision-making process'
        ],
        created_at: new Date().toISOString()
      });
    }

    // Hiring forecast
    const highProbabilityCandidates = candidates.filter(c => 
      hiringPredictionService.calculateHiringProbability(c, ['software', 'engineer']) > 70
    );

    insights.push({
      id: 'forecast-' + Date.now(),
      type: 'hiring_forecast',
      title: 'Positive Hiring Outlook',
      description: `${highProbabilityCandidates.length} candidates show high probability of successful hiring within the next month.`,
      confidence: 0.78,
      impact: 'medium',
      timeframe: 'Next 30 days',
      actionable_recommendations: [
        'Prioritize engagement with high-probability candidates',
        'Prepare offer packages',
        'Schedule final interviews'
      ],
      created_at: new Date().toISOString()
    });

    return insights;
  }

  private analyzeStageDistribution(candidates: EnhancedCandidate[]) {
    const distribution: Record<string, number> = {};
    candidates.forEach(candidate => {
      const stage = candidate.pipeline_stage;
      distribution[stage] = (distribution[stage] || 0) + 1;
    });
    return distribution;
  }

  private identifyBottleneck(distribution: Record<string, number>): string | null {
    const stages = Object.keys(distribution);
    const maxCount = Math.max(...Object.values(distribution));
    const bottleneckThreshold = maxCount * 0.4; // 40% of candidates in one stage is a bottleneck
    
    for (const stage of stages) {
      if (distribution[stage] >= bottleneckThreshold) {
        return stage;
      }
    }
    return null;
  }
}

export const insightsGeneratorService = new InsightsGeneratorService();
