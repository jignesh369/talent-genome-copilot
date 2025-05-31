
import { useCandidateData } from './useCandidateData';

export const useCandidateQueries = () => {
  const { enhancedCandidates } = useCandidateData();

  // Get candidates by engagement score
  const getHighEngagementCandidates = (minScore: number = 70) => {
    return enhancedCandidates.filter(candidate => candidate.engagement_score >= minScore);
  };

  // Get candidates with active availability signals
  const getActivelySeeking = () => {
    return enhancedCandidates.filter(candidate => 
      candidate.availability_signals.some(signal => 
        signal.signal_type === 'active_job_search' || signal.signal_type === 'career_change'
      )
    );
  };

  // Get candidates by pipeline stage
  const getCandidatesByStage = (stage: string) => {
    return enhancedCandidates.filter(candidate => candidate.pipeline_stage === stage);
  };

  // Get top candidates by placement probability
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
