
import { useCandidateStore } from './useCandidateStore';

export const useCandidateQueries = () => {
  const { enhancedCandidates } = useCandidateStore();

  const getHighEngagementCandidates = (minScore: number = 70) => {
    return enhancedCandidates.filter(candidate => candidate.engagement_score >= minScore);
  };

  const getActivelySeeking = () => {
    return enhancedCandidates.filter(candidate => 
      candidate.availability_signals.some(signal => 
        signal.signal_type === 'active_job_search' || signal.signal_type === 'career_change'
      )
    );
  };

  const getCandidatesByStage = (stage: string) => {
    return enhancedCandidates.filter(candidate => candidate.pipeline_stage === stage);
  };

  const getTopCandidates = (limit: number = 10) => {
    return enhancedCandidates
      .sort((a, b) => b.placement_probability_score - a.placement_probability_score)
      .slice(0, limit);
  };

  return {
    getHighEngagementCandidates,
    getActivelySeeking,
    getCandidatesByStage,
    getTopCandidates
  };
};
