
import { predictiveAnalyticsEngine } from '@/services/analytics/predictiveAnalyticsEngine';
import { dynamicAssessmentGenerator } from '@/services/analytics/dynamicAssessmentGenerator';
import { automatedCommunicationService } from '@/services/analytics/automatedCommunicationService';
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useToast } from '@/hooks/use-toast';
import { useRiskAlerts } from './useRiskAlerts';
import { useOSINTMonitoring } from './useOSINTMonitoring';
import { useCommunicationMetrics } from './useCommunicationMetrics';
import { convertToAnalyticsCandidate } from '@/utils/candidateConverter';

export const useRecruitingIntelligence = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const { toast } = useToast();
  
  const candidateIds = enhancedCandidates.map(c => c.id);
  const { osintMonitoring } = useOSINTMonitoring(candidateIds);
  const { communicationMetrics } = useCommunicationMetrics();
  const { alerts, resolveAlert, getAlertStats, getCandidateAlerts } = useRiskAlerts(enhancedCandidates);

  const predictJobSuccess = async (candidateId: string, jobRequirements: string[] = []) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    const analyticsCandidate = convertToAnalyticsCandidate(candidate);
    return await predictiveAnalyticsEngine.predictJobSuccess(analyticsCandidate, jobRequirements);
  };

  const generateAssessment = async (roleTitle: string, requirements: string[], seniorityLevel: string) => {
    return await dynamicAssessmentGenerator.generateAssessment(roleTitle, requirements, seniorityLevel);
  };

  const generatePersonalizedOutreach = async (
    candidateId: string, 
    messageType: 'initial_outreach' | 'follow_up' | 'assessment_request',
    customData: Record<string, string> = {}
  ) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    const communicationCandidate = convertToAnalyticsCandidate(candidate);
    
    return await automatedCommunicationService.generatePersonalizedMessage(
      communicationCandidate, 
      messageType, 
      customData
    );
  };

  const sendMessage = async (messageId: string) => {
    const success = await automatedCommunicationService.sendMessage(messageId);
    if (success) {
      toast({
        title: "Message Sent",
        description: "Personalized outreach message has been sent successfully"
      });
    }
    return success;
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
    predictJobSuccess,
    
    // Assessment generation
    generateAssessment,
    
    // Communication automation
    generatePersonalizedOutreach,
    sendMessage,
    communicationMetrics,
    
    // Utility
    enhancedCandidates
  };
};
