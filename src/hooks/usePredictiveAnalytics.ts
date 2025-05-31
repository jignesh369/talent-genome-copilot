
import { predictiveAnalyticsEngine } from '@/services/analytics/predictiveAnalyticsEngine';
import { dynamicAssessmentGenerator } from '@/services/analytics/dynamicAssessmentGenerator';
import { EnhancedCandidate as SearchCandidate } from '@/types/enhanced-candidate';

export const usePredictiveAnalytics = () => {
  const predictJobSuccess = async (candidate: SearchCandidate, jobRequirements: string[] = []) => {
    return await predictiveAnalyticsEngine.predictJobSuccess(candidate, jobRequirements);
  };

  const generateAssessment = async (roleTitle: string, requirements: string[], seniorityLevel: string) => {
    return await dynamicAssessmentGenerator.generateAssessment(roleTitle, requirements, seniorityLevel);
  };

  return {
    predictJobSuccess,
    generateAssessment
  };
};
