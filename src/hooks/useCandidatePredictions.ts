
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { usePredictiveAnalytics } from './usePredictiveAnalytics';
import { useCandidateConversion } from './useCandidateConversion';

export const useCandidatePredictions = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const { convertToSearchCandidate } = useCandidateConversion();
  const { predictJobSuccess, generateAssessment } = usePredictiveAnalytics();

  const predictJobSuccessForCandidate = async (candidateId: string, jobRequirements: string[] = []) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    const searchCandidate = convertToSearchCandidate(candidate);
    return await predictJobSuccess(searchCandidate, jobRequirements);
  };

  return {
    predictJobSuccess: predictJobSuccessForCandidate,
    generateAssessment,
    enhancedCandidates
  };
};
