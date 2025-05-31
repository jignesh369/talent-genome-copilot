
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useCommunicationMetrics } from './useCommunicationMetrics';
import { useOutreachGeneration } from './useOutreachGeneration';
import { useCandidateConversion } from './useCandidateConversion';

export const useCommunicationAutomation = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const { communicationMetrics } = useCommunicationMetrics();
  const { convertToSearchCandidate } = useCandidateConversion();
  const { 
    generatePersonalizedOutreach, 
    processAutomaticOutreach, 
    createBulkOutreach, 
    getOutreachAnalytics, 
    sendMessage 
  } = useOutreachGeneration();

  const generatePersonalizedOutreachForCandidate = async (
    candidateId: string, 
    messageType: 'initial_outreach' | 'follow_up' | 'assessment_request',
    customData: Record<string, string> = {}
  ) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    const searchCandidate = convertToSearchCandidate(candidate);
    return await generatePersonalizedOutreach(searchCandidate, messageType, customData);
  };

  const processAutomaticOutreachForAll = async () => {
    const searchCandidates = enhancedCandidates.map(convertToSearchCandidate);
    return await processAutomaticOutreach(searchCandidates);
  };

  return {
    generatePersonalizedOutreach: generatePersonalizedOutreachForCandidate,
    processAutomaticOutreach: processAutomaticOutreachForAll,
    createBulkOutreach,
    getOutreachAnalytics,
    sendMessage,
    communicationMetrics
  };
};
