
import { useCandidateData } from './useCandidateData';
import { useCandidateActions } from './useCandidateActions';
import { useCandidateQueries } from './useCandidateQueries';
import { useCandidateSearch } from './useCandidateSearch';

export const useEnhancedCandidates = () => {
  const { enhancedCandidates, loading } = useCandidateData();
  const { addInteraction, addAvailabilitySignal, moveToStage } = useCandidateActions();
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
