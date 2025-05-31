import { predictiveAnalyticsEngine } from '@/services/analytics/predictiveAnalyticsEngine';
import { dynamicAssessmentGenerator } from '@/services/analytics/dynamicAssessmentGenerator';
import { automatedCommunicationService } from '@/services/analytics/automatedCommunicationService';
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useToast } from '@/hooks/use-toast';
import { useRiskAlerts } from './useRiskAlerts';
import { useOSINTMonitoring } from './useOSINTMonitoring';
import { useCommunicationMetrics } from './useCommunicationMetrics';
import { convertToAnalyticsCandidate } from '@/utils/candidateConverter';
import { enhancedAutomatedCommunication } from '@/services/analytics/enhancedAutomatedCommunication';
import { smartOutreachTriggers } from '@/services/analytics/smartOutreachTriggers';

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
    
    // Use enhanced outreach generation
    const result = await enhancedAutomatedCommunication.generateEnhancedOutreach({
      candidate,
      message_type: messageType,
      context: {
        company_name: customData.company_name || 'TechCorp',
        role_title: customData.role_title || 'Senior Software Engineer',
        recruiter_name: customData.recruiter_name || 'Sarah',
        role_benefits: customData.role_benefits ? customData.role_benefits.split(',') : undefined
      }
    });

    console.log('Enhanced outreach generated:', {
      quality_score: result.quality_score,
      recommendations: result.recommendations
    });

    return result.message;
  };

  const processAutomaticOutreach = async () => {
    console.log('Processing automatic outreach for all candidates...');
    
    const result = await enhancedAutomatedCommunication.processTriggerBasedOutreach(enhancedCandidates);
    
    toast({
      title: "Automatic Outreach Processed",
      description: `Generated ${result.generated} messages, scheduled ${result.scheduled} more.`
    });

    return result;
  };

  const createBulkOutreach = async (candidateIds: string[], templateType: string) => {
    const jobId = await enhancedAutomatedCommunication.createBatchOutreachJob(
      candidateIds,
      templateType,
      {
        company_name: 'TechCorp',
        role_title: 'Senior Software Engineer',
        recruiter_name: 'Sarah'
      }
    );

    toast({
      title: "Bulk Outreach Started",
      description: `Processing outreach for ${candidateIds.length} candidates.`
    });

    return jobId;
  };

  const getOutreachAnalytics = () => {
    const triggerAnalytics = smartOutreachTriggers.getTriggerAnalytics();
    const performanceAnalytics = enhancedAutomatedCommunication.getPerformanceAnalytics();
    
    return {
      ...triggerAnalytics,
      ...performanceAnalytics
    };
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
    processAutomaticOutreach,
    createBulkOutreach,
    getOutreachAnalytics,
    sendMessage,
    communicationMetrics,
    
    // Utility
    enhancedCandidates
  };
};
