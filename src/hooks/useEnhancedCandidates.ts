
import { useCandidateStore } from './useCandidateStore';
import { useCandidateQueries } from './useCandidateQueries';
import { useCandidateSearch } from './useCandidateSearch';

export const useEnhancedCandidates = () => {
  const { enhancedCandidates, loading, addInteraction, addAvailabilitySignal, moveToStage } = useCandidateStore();
  const { 
    getHighEngagementCandidates, 
    getActivelySeeking, 
    getCandidatesByStage, 
    getTopCandidates 
  } = useCandidateQueries();
  const { searchEnhancedCandidates } = useCandidateSearch();

  return {
    enhancedCandidates,
    loading,
    addInteraction,
    addAvailabilitySignal,
    moveToStage,
    getHighEngagementCandidates,
    getActivelySeeking,
    getCandidatesByStage,
    getTopCandidates,
    searchEnhancedCandidates
  };
};
