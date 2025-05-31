import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { enhancedPersonalizationEngine } from './enhancedPersonalizationEngine';
import { smartOutreachTriggers } from './smartOutreachTriggers';
import { automatedCommunicationService, OutreachMessage } from './automatedCommunicationService';

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

interface BatchOutreachJob {
  id: string;
  candidates: string[];
  template_type: string;
  context: any;
  created_at: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  results: BatchOutreachResult[];
}

interface BatchOutreachResult {
  candidate_id: string;
  success: boolean;
  message_id?: string;
  error?: string;
  personalization_score: number;
}

export class EnhancedAutomatedCommunication {
  private static instance: EnhancedAutomatedCommunication;
  private batchJobs: BatchOutreachJob[] = [];

  static getInstance(): EnhancedAutomatedCommunication {
    if (!EnhancedAutomatedCommunication.instance) {
      EnhancedAutomatedCommunication.instance = new EnhancedAutomatedCommunication();
    }
    return EnhancedAutomatedCommunication.instance;
  }

  async generateEnhancedOutreach(request: EnhancedOutreachRequest): Promise<{
    message: OutreachMessage;
    personalization_data: any;
    quality_score: number;
    recommendations: string[];
  }> {
    console.log('Generating enhanced outreach for:', request.candidate.name);

    // Step 1: Generate enhanced personalization
    const personalizationData = await enhancedPersonalizationEngine.generateEnhancedPersonalization(
      request.candidate,
      request.context
    );

    // Step 2: Use the recommended template and personalization
    const customData = {
      ...request.context,
      candidate_name: personalizationData.candidate_name,
      personalized_greeting: personalizationData.personalized_greeting,
      technical_highlight: personalizationData.technical_highlights.join(', '),
      career_story_hook: personalizationData.career_story_hook,
      value_add_content: personalizationData.value_propositions.join('\n• '),
      call_to_action: personalizationData.call_to_action,
      optimal_channel: personalizationData.preferred_channel
    };

    // Step 3: Generate the message using enhanced data
    const message = await automatedCommunicationService.generatePersonalizedMessage(
      request.candidate,
      request.message_type,
      customData
    );

    // Step 4: Calculate quality score
    const qualityScore = this.calculateMessageQuality(personalizationData, message);

    // Step 5: Generate recommendations
    const recommendations = this.generateOptimizationRecommendations(
      personalizationData,
      qualityScore
    );

    return {
      message,
      personalization_data: personalizationData,
      quality_score: qualityScore,
      recommendations
    };
  }

  async processTriggerBasedOutreach(candidates: EnhancedCandidate[]): Promise<{
    processed: number;
    generated: number;
    scheduled: number;
    errors: string[];
  }> {
    console.log(`Processing trigger-based outreach for ${candidates.length} candidates`);

    let processed = 0;
    let generated = 0;
    let scheduled = 0;
    const errors: string[] = [];

    for (const candidate of candidates) {
      try {
        // Evaluate triggers for this candidate
        const triggeredEvents = smartOutreachTriggers.evaluateCandidateForTriggers(candidate);
        processed++;

        // Check if any auto-generation should happen
        const autoGenCandidates = smartOutreachTriggers.getAutoGenerationCandidates();
        const candidateAutoGen = autoGenCandidates.find(ag => ag.candidate_id === candidate.id);

        if (candidateAutoGen) {
          const request: EnhancedOutreachRequest = {
            candidate,
            message_type: candidateAutoGen.trigger.template_type as any,
            context: {
              company_name: 'TechCorp',
              role_title: 'Senior Software Engineer',
              recruiter_name: 'Sarah',
              urgency_level: candidateAutoGen.trigger.priority === 'urgent' ? 'high' : 'medium'
            }
          };

          await this.generateEnhancedOutreach(request);
          smartOutreachTriggers.markEventProcessed(candidateAutoGen.event.id, true);
          generated++;
        } else if (triggeredEvents.length > 0) {
          scheduled++;
        }
      } catch (error) {
        errors.push(`Error processing ${candidate.name}: ${error.message}`);
      }
    }

    return { processed, generated, scheduled, errors };
  }

  async createBatchOutreachJob(
    candidateIds: string[],
    templateType: string,
    context: any
  ): Promise<string> {
    const job: BatchOutreachJob = {
      id: `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      candidates: candidateIds,
      template_type: templateType,
      context,
      created_at: new Date().toISOString(),
      status: 'pending',
      progress: 0,
      results: []
    };

    this.batchJobs.push(job);
    
    // Start processing asynchronously
    this.processBatchJob(job.id);
    
    return job.id;
  }

  private async processBatchJob(jobId: string): Promise<void> {
    const job = this.batchJobs.find(j => j.id === jobId);
    if (!job) return;

    job.status = 'processing';
    
    for (let i = 0; i < job.candidates.length; i++) {
      const candidateId = job.candidates[i];
      
      try {
        // Mock candidate data for batch processing
        const mockCandidate: Partial<EnhancedCandidate> = {
          id: candidateId,
          name: `Candidate ${i + 1}`,
          match_score: Math.random() * 20 + 80,
          // ... other required fields would be loaded from actual data source
        };

        // This would normally load the actual candidate data
        // const candidate = await loadCandidateData(candidateId);
        
        job.results.push({
          candidate_id: candidateId,
          success: true,
          personalization_score: Math.random() * 0.3 + 0.7
        });
      } catch (error) {
        job.results.push({
          candidate_id: candidateId,
          success: false,
          error: error.message,
          personalization_score: 0
        });
      }

      job.progress = ((i + 1) / job.candidates.length) * 100;
    }

    job.status = 'completed';
    console.log(`Batch job ${jobId} completed with ${job.results.filter(r => r.success).length} successful outreach messages`);
  }

  getBatchJobStatus(jobId: string): BatchOutreachJob | null {
    return this.batchJobs.find(j => j.id === jobId) || null;
  }

  private calculateMessageQuality(personalizationData: any, message: OutreachMessage): number {
    let score = 0;

    // Personalization depth (40%)
    const personalizationScore = personalizationData.personalization_score.overall_score;
    score += personalizationScore * 0.4;

    // Message length appropriateness (20%)
    const messageLength = message.content.length;
    const lengthScore = messageLength >= 200 && messageLength <= 800 ? 1 : 0.7;
    score += lengthScore * 0.2;

    // Technical relevance (20%)
    const technicalScore = personalizationData.personalization_score.technical_relevance;
    score += technicalScore * 0.2;

    // Call-to-action clarity (20%)
    const ctaScore = message.content.includes('?') ? 1 : 0.8;
    score += ctaScore * 0.2;

    return Math.min(score, 1);
  }

  private generateOptimizationRecommendations(
    personalizationData: any,
    qualityScore: number
  ): string[] {
    const recommendations = [];

    if (qualityScore < 0.7) {
      recommendations.push('Consider adding more specific technical achievements');
    }

    if (personalizationData.personalization_score.technical_relevance < 0.6) {
      recommendations.push('Highlight more relevant technical skills match');
    }

    if (personalizationData.personalization_score.cultural_fit < 0.7) {
      recommendations.push('Emphasize company culture alignment');
    }

    if (personalizationData.preferred_channel !== 'email') {
      recommendations.push(`Consider reaching out via ${personalizationData.preferred_channel} for better response rates`);
    }

    return recommendations;
  }

  getPerformanceAnalytics(): {
    total_enhanced_outreach: number;
    average_quality_score: number;
    trigger_based_generated: number;
    batch_jobs_completed: number;
    top_performing_templates: string[];
  } {
    const completedBatchJobs = this.batchJobs.filter(j => j.status === 'completed');
    const successfulResults = completedBatchJobs.flatMap(j => j.results.filter(r => r.success));
    
    return {
      total_enhanced_outreach: successfulResults.length,
      average_quality_score: successfulResults.reduce((sum, r) => sum + r.personalization_score, 0) / successfulResults.length || 0,
      trigger_based_generated: smartOutreachTriggers.getTriggerAnalytics().auto_generated,
      batch_jobs_completed: completedBatchJobs.length,
      top_performing_templates: ['technical_deep_dive', 'opportunity_focused', 'culture_focused']
    };
  }
}

export const enhancedAutomatedCommunication = EnhancedAutomatedCommunication.getInstance();
