
import { useAnalyticsData } from './useAnalyticsData';
import { usePredictiveAnalytics } from './usePredictiveAnalytics';
import { useCandidateConversion } from './useCandidateConversion';

export const useCandidatePredictions = () => {
  const { enhancedCandidates } = useAnalyticsData();
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
