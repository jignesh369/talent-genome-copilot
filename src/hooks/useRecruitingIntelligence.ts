import { predictiveAnalyticsEngine } from '@/services/analytics/predictiveAnalyticsEngine';
import { dynamicAssessmentGenerator } from '@/services/analytics/dynamicAssessmentGenerator';
import { automatedCommunicationService } from '@/services/analytics/automatedCommunicationService';
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useToast } from '@/hooks/use-toast';
import { useRiskAlerts } from './useRiskAlerts';
import { useOSINTMonitoring } from './useOSINTMonitoring';
import { useCommunicationMetrics } from './useCommunicationMetrics';
import { enhancedAutomatedCommunication } from '@/services/analytics/enhancedAutomatedCommunication';
import { smartOutreachTriggers } from '@/services/analytics/smartOutreachTriggers';
import { EnhancedCandidate as SearchCandidate } from '@/types/enhanced-candidate';

export const useRecruitingIntelligence = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const { toast } = useToast();
  
  const candidateIds = enhancedCandidates.map(c => c.id);
  const { osintMonitoring } = useOSINTMonitoring(candidateIds);
  const { communicationMetrics } = useCommunicationMetrics();
  const { alerts, resolveAlert, getAlertStats, getCandidateAlerts } = useRiskAlerts(enhancedCandidates);

  // Convert enhanced recruiting candidate to search candidate format
  const convertToSearchCandidate = (candidate: any): SearchCandidate => {
    return {
      id: candidate.id,
      name: candidate.first_name + ' ' + candidate.last_name,
      handle: candidate.email.split('@')[0],
      email: candidate.email,
      location: candidate.location || 'Unknown',
      current_title: candidate.current_title,
      current_company: candidate.current_company,
      experience_years: candidate.experience_years || 0,
      skills: candidate.skills || [],
      bio: candidate.ai_summary,
      avatar_url: candidate.avatar_url,
      ai_summary: candidate.ai_summary || '',
      career_trajectory_analysis: {
        progression_type: 'ascending',
        growth_rate: 0.8,
        stability_score: 0.7,
        next_likely_move: 'Senior role',
        timeline_events: []
      },
      technical_depth_score: 8.5,
      community_influence_score: 7.0,
      cultural_fit_indicators: [],
      learning_velocity_score: 8.0,
      osint_profile: candidate.osint_profile || {
        github_profile: undefined,
        linkedin_insights: undefined,
        social_presence: { platforms: [], professional_consistency: 0, communication_style: 'mixed', thought_leadership_score: 0 },
        professional_reputation: { industry_recognition: [], conference_speaking: false, published_content: 0, community_involvement: [], expertise_areas: [] },
        red_flags: [],
        last_updated: new Date().toISOString()
      },
      match_score: candidate.placement_probability_score || 85,
      relevance_factors: [],
      availability_status: candidate.availability_signals?.some((s: any) => s.signal_type === 'active_job_search') ? 'active' : 'passive',
      best_contact_method: {
        platform: candidate.preferred_contact_method || 'email',
        confidence: 0.8,
        best_time: '10:00 AM',
        approach_style: 'direct'
      },
      salary_expectation_range: candidate.portal_preferences?.salary_expectations ? {
        min: candidate.portal_preferences.salary_expectations.min,
        max: candidate.portal_preferences.salary_expectations.max,
        currency: candidate.portal_preferences.salary_expectations.currency,
        confidence: 0.7,
        source: 'portal_preferences'
      } : undefined,
      profile_last_updated: new Date().toISOString(),
      osint_last_fetched: new Date().toISOString()
    };
  };

  const predictJobSuccess = async (candidateId: string, jobRequirements: string[] = []) => {
    const candidate = enhancedCandidates.find(c => c.id === candidateId);
    if (!candidate) return null;
    
    const searchCandidate = convertToSearchCandidate(candidate);
    return await predictiveAnalyticsEngine.predictJobSuccess(searchCandidate, jobRequirements);
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
    
    const searchCandidate = convertToSearchCandidate(candidate);
    
    // Use enhanced outreach generation
    const result = await enhancedAutomatedCommunication.generateEnhancedOutreach({
      candidate: searchCandidate,
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
    
    const searchCandidates = enhancedCandidates.map(convertToSearchCandidate);
    const result = await enhancedAutomatedCommunication.processTriggerBasedOutreach(searchCandidates);
    
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
