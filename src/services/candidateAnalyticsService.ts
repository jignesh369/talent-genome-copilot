
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

class CandidateAnalyticsService {
  calculateTotalCandidates(candidates: EnhancedCandidate[]): number {
    return candidates.length;
  }

  calculateHighEngagementCandidates(candidates: EnhancedCandidate[]): number {
    return candidates.filter(c => c.engagement_score >= 70).length;
  }

  calculateActivelySeeking(candidates: EnhancedCandidate[]): number {
    return candidates.filter(c => 
      c.availability_signals.some(signal => 
        signal.signal_type === 'active_job_search' || signal.signal_type === 'career_change'
      )
    ).length;
  }

  calculateAverageEngagement(candidates: EnhancedCandidate[]): number {
    if (candidates.length === 0) return 0;
    return Math.round(
      candidates.reduce((sum, c) => sum + c.engagement_score, 0) / candidates.length
    );
  }

  calculateAveragePlacementProbability(candidates: EnhancedCandidate[]): number {
    if (candidates.length === 0) return 0;
    return Math.round(
      candidates.reduce((sum, c) => sum + c.placement_probability_score, 0) / candidates.length
    );
  }

  calculatePipelineDistribution(candidates: EnhancedCandidate[]): Record<string, number> {
    return candidates.reduce((acc, candidate) => {
      acc[candidate.pipeline_stage] = (acc[candidate.pipeline_stage] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  calculateTopSkills(candidates: EnhancedCandidate[], limit: number = 10): Array<[string, number]> {
    const skillCounts = candidates.reduce((acc, candidate) => {
      candidate.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(skillCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit);
  }

  calculateConversionRate(candidates: EnhancedCandidate[], pipelineStats: Record<string, number>): number {
    const totalCandidates = candidates.length;
    if (totalCandidates === 0) return 0;
    return Math.round((pipelineStats.hired || 0) / totalCandidates * 100);
  }
}

export const candidateAnalyticsService = new CandidateAnalyticsService();
