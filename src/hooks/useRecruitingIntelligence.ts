
import { useOutreachGeneration } from './useOutreachGeneration';
import { usePredictiveAnalytics } from './usePredictiveAnalytics';
import { useCandidateConversion } from './useCandidateConversion';
import { useAnalyticsData } from './useAnalyticsData';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const useRecruitingIntelligence = () => {
  const { enhancedCandidates, osintMonitoring, communicationMetrics, alerts, resolveAlert, getAlertStats, getCandidateAlerts } = useAnalyticsData();
  const { convertToSearchCandidate } = useCandidateConversion();
  const { predictJobSuccess, generateAssessment } = usePredictiveAnalytics();
  const { generatePersonalizedOutreach, processAutomaticOutreach, createBulkOutreach, getOutreachAnalytics, sendMessage } = useOutreachGeneration();

  const predictJobSuccessForCandidate = async (candidateId: string, jobRequirements: string[] = []) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    const searchCandidate = convertToSearchCandidate(candidate);
    return await predictJobSuccess(searchCandidate, jobRequirements);
  };

  const generatePersonalizedOutreachForCandidate = async (
    candidateId: string, 
    messageType: 'initial_outreach' | 'follow_up' | 'assessment_request',
    customData: Record<string, string> = {}
  ) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    return await generatePersonalizedOutreach(candidate, messageType, customData);
  };

  const processAutomaticOutreachForAll = async () => {
    console.log('Processing automatic outreach for all candidates...');
    return await processAutomaticOutreach(enhancedCandidates);
  };

  return {
    // Real-time monitoring
    osintMonitoring,
    
    // Risk management
    alerts,
    resolveAlert,
    getAlertStats,
    getCandidateAlerts,
    
    // Predictive analytics
    predictJobSuccess: predictJobSuccessForCandidate,
    
    // Assessment generation
    generateAssessment,
    
    // Communication automation
    generatePersonalizedOutreach: generatePersonalizedOutreachForCandidate,
    processAutomaticOutreach: processAutomaticOutreachForAll,
    createBulkOutreach,
    getOutreachAnalytics,
    sendMessage,
    communicationMetrics,
    
    // Utility
    enhancedCandidates
  };
};
