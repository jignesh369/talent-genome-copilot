
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { messageGenerationService } from './messageGenerationService';
import { batchProcessingService } from './batchProcessingService';
import { triggerBasedOutreachService } from './triggerBasedOutreachService';
import { outreachAnalyticsService } from './outreachAnalyticsService';

interface EnhancedOutreachRequest {
  candidate: EnhancedCandidate;
  message_type: 'initial_outreach' | 'follow_up' | 'assessment_request';
  context: {
    company_name: string;
    role_title: string;
    recruiter_name: string;
    role_benefits?: string[];
    urgency_level?: 'low' | 'medium' | 'high';
  };
  auto_send?: boolean;
  schedule_for?: string;
}

export class EnhancedAutomatedCommunication {
  private static instance: EnhancedAutomatedCommunication;

  static getInstance(): EnhancedAutomatedCommunication {
    if (!EnhancedAutomatedCommunication.instance) {
      EnhancedAutomatedCommunication.instance = new EnhancedAutomatedCommunication();
    }
    return EnhancedAutomatedCommunication.instance;
  }

  // Delegate to message generation service
  async generateEnhancedOutreach(request: EnhancedOutreachRequest) {
    return messageGenerationService.generatePersonalizedMessage(request);
  }

  // Delegate to trigger-based outreach service
  async processTriggerBasedOutreach(candidates: EnhancedCandidate[]) {
    return triggerBasedOutreachService.processTriggerBasedOutreach(candidates);
  }

  // Delegate to batch processing service
  async createBatchOutreachJob(candidateIds: string[], templateType: string, context: any) {
    return batchProcessingService.createBatchOutreachJob(candidateIds, templateType, context);
  }

  getBatchJobStatus(jobId: string) {
    return batchProcessingService.getBatchJobStatus(jobId);
  }

  // Delegate to analytics service
  getPerformanceAnalytics() {
    return outreachAnalyticsService.getPerformanceAnalytics();
  }

  getTemplatePerformance(templateType: string) {
    return outreachAnalyticsService.getTemplatePerformance(templateType);
  }

  getTrendAnalysis(timeframe: '7d' | '30d' | '90d') {
    return outreachAnalyticsService.getTrendAnalysis(timeframe);
  }
}

export const enhancedAutomatedCommunication = EnhancedAutomatedCommunication.getInstance();
