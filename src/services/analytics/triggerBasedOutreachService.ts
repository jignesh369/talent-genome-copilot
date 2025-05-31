
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { smartOutreachTriggers } from './smartOutreachTriggers';
import { messageGenerationService } from './messageGenerationService';

interface TriggerOutreachRequest {
  candidate: EnhancedCandidate;
  message_type: 'initial_outreach' | 'follow_up' | 'assessment_request';
  context: {
    company_name: string;
    role_title: string;
    recruiter_name: string;
    urgency_level?: 'low' | 'medium' | 'high';
  };
}

export class TriggerBasedOutreachService {
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
          const request: TriggerOutreachRequest = {
            candidate,
            message_type: candidateAutoGen.trigger.template_type as any,
            context: {
              company_name: 'TechCorp',
              role_title: 'Senior Software Engineer',
              recruiter_name: 'Sarah',
              urgency_level: candidateAutoGen.trigger.priority === 'urgent' ? 'high' : 'medium'
            }
          };

          await messageGenerationService.generatePersonalizedMessage(request);
          smartOutreachTriggers.markEventProcessed(candidateAutoGen.event.id, true);
          generated++;
        } else if (triggeredEvents.length > 0) {
          scheduled++;
        }
      } catch (error) {
        errors.push(`Error processing ${candidate.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return { processed, generated, scheduled, errors };
  }

  async evaluateCandidate(candidate: EnhancedCandidate): Promise<{
    should_trigger: boolean;
    recommended_action: string;
    priority: 'low' | 'medium' | 'high';
    timing: string;
  }> {
    const triggeredEvents = smartOutreachTriggers.evaluateCandidateForTriggers(candidate);
    
    if (triggeredEvents.length === 0) {
      return {
        should_trigger: false,
        recommended_action: 'continue_monitoring',
        priority: 'low',
        timing: 'no_action'
      };
    }

    // Get the trigger rules for the triggered events
    const triggerRules = triggeredEvents.map(event => {
      const triggers = (smartOutreachTriggers as any).triggers || [];
      return triggers.find((t: any) => t.id === event.trigger_rule_id);
    }).filter(Boolean);

    const highPriorityRules = triggerRules.filter((rule: any) => rule.priority === 'urgent');
    const priority = highPriorityRules.length > 0 ? 'high' : 'medium';
    
    const firstRule = triggerRules[0];
    
    return {
      should_trigger: true,
      recommended_action: firstRule?.template_type || 'initial_outreach',
      priority,
      timing: priority === 'high' ? 'immediate' : 'within_24h'
    };
  }
}

export const triggerBasedOutreachService = new TriggerBasedOutreachService();
