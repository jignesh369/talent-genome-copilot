
import { useToast } from '@/hooks/use-toast';
import { enhancedAutomatedCommunication } from '@/services/analytics/enhancedAutomatedCommunication';
import { smartOutreachTriggers } from '@/services/analytics/smartOutreachTriggers';
import { automatedCommunicationService } from '@/services/analytics/automatedCommunicationService';
import { EnhancedCandidate as SearchCandidate } from '@/types/enhanced-candidate';

export const useOutreachGeneration = () => {
  const { toast } = useToast();

  const generatePersonalizedOutreach = async (
    candidate: SearchCandidate,
    messageType: 'initial_outreach' | 'follow_up' | 'assessment_request',
    customData: Record<string, string> = {}
  ) => {
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

  const processAutomaticOutreach = async (candidates: SearchCandidate[]) => {
    console.log('Processing automatic outreach for all candidates...');
    
    const result = await enhancedAutomatedCommunication.processTriggerBasedOutreach(candidates);
    
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
    generatePersonalizedOutreach,
    processAutomaticOutreach,
    createBulkOutreach,
    getOutreachAnalytics,
    sendMessage
  };
};
