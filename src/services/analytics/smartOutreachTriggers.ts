
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface TriggerRule {
  id: string;
  name: string;
  condition: (candidate: EnhancedCandidate) => boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  auto_generate: boolean;
  delay_hours?: number;
  template_type: 'initial_outreach' | 'follow_up' | 'opportunity_alert';
}

interface TriggerEvent {
  id: string;
  candidate_id: string;
  trigger_rule_id: string;
  triggered_at: string;
  processed: boolean;
  scheduled_for?: string;
  outreach_generated: boolean;
}

export class SmartOutreachTriggers {
  private static instance: SmartOutreachTriggers;
  private triggers: TriggerRule[] = [];
  private triggerEvents: TriggerEvent[] = [];

  static getInstance(): SmartOutreachTriggers {
    if (!SmartOutreachTriggers.instance) {
      SmartOutreachTriggers.instance = new SmartOutreachTriggers();
    }
    return SmartOutreachTriggers.instance;
  }

  constructor() {
    this.initializeTriggerRules();
  }

  private initializeTriggerRules(): void {
    this.triggers = [
      {
        id: 'high_match_score',
        name: 'High Match Score Auto-Outreach',
        condition: (candidate) => candidate.match_score >= 90,
        priority: 'high',
        auto_generate: true,
        delay_hours: 2,
        template_type: 'initial_outreach'
      },
      {
        id: 'active_candidate_engagement',
        name: 'Active Candidate Quick Response',
        condition: (candidate) => candidate.availability_status === 'active' && candidate.match_score >= 80,
        priority: 'urgent',
        auto_generate: true,
        delay_hours: 1,
        template_type: 'initial_outreach'
      },
      {
        id: 'technical_excellence',
        name: 'Technical Excellence Recognition',
        condition: (candidate) => candidate.technical_depth_score >= 9,
        priority: 'high',
        auto_generate: true,
        delay_hours: 4,
        template_type: 'initial_outreach'
      },
      {
        id: 'community_leader',
        name: 'Community Leader Outreach',
        condition: (candidate) => candidate.community_influence_score >= 8.5,
        priority: 'medium',
        auto_generate: true,
        delay_hours: 6,
        template_type: 'initial_outreach'
      },
      {
        id: 'passive_high_potential',
        name: 'Passive High Potential Nurture',
        condition: (candidate) => 
          candidate.availability_status === 'passive' && 
          candidate.match_score >= 85 &&
          candidate.technical_depth_score >= 8,
        priority: 'medium',
        auto_generate: false, // Requires manual review
        template_type: 'opportunity_alert'
      }
    ];
  }

  evaluateCandidateForTriggers(candidate: EnhancedCandidate): TriggerEvent[] {
    const triggeredEvents: TriggerEvent[] = [];

    this.triggers.forEach(trigger => {
      if (trigger.condition(candidate)) {
        const event: TriggerEvent = {
          id: `trigger_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          candidate_id: candidate.id,
          trigger_rule_id: trigger.id,
          triggered_at: new Date().toISOString(),
          processed: false,
          outreach_generated: false
        };

        if (trigger.delay_hours) {
          const scheduledTime = new Date(Date.now() + trigger.delay_hours * 60 * 60 * 1000);
          event.scheduled_for = scheduledTime.toISOString();
        }

        triggeredEvents.push(event);
        this.triggerEvents.push(event);

        console.log(`Trigger "${trigger.name}" activated for candidate ${candidate.name}`);
      }
    });

    return triggeredEvents;
  }

  getAutoGenerationCandidates(): { candidate_id: string; trigger: TriggerRule; event: TriggerEvent }[] {
    const currentTime = new Date();
    const readyForGeneration = [];

    this.triggerEvents.forEach(event => {
      if (!event.processed && !event.outreach_generated) {
        const trigger = this.triggers.find(t => t.id === event.trigger_rule_id);
        
        if (trigger?.auto_generate) {
          const isReady = !event.scheduled_for || new Date(event.scheduled_for) <= currentTime;
          
          if (isReady) {
            readyForGeneration.push({
              candidate_id: event.candidate_id,
              trigger,
              event
            });
          }
        }
      }
    });

    return readyForGeneration.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.trigger.priority] - priorityOrder[a.trigger.priority];
    });
  }

  markEventProcessed(eventId: string, outreachGenerated: boolean = false): void {
    const event = this.triggerEvents.find(e => e.id === eventId);
    if (event) {
      event.processed = true;
      event.outreach_generated = outreachGenerated;
    }
  }

  getTriggerAnalytics(): {
    total_triggers: number;
    auto_generated: number;
    pending_review: number;
    success_rate: number;
    by_priority: Record<string, number>;
  } {
    const stats = {
      total_triggers: this.triggerEvents.length,
      auto_generated: this.triggerEvents.filter(e => e.outreach_generated).length,
      pending_review: this.triggerEvents.filter(e => !e.processed).length,
      success_rate: 0,
      by_priority: { urgent: 0, high: 0, medium: 0, low: 0 }
    };

    // Calculate success rate
    const processed = this.triggerEvents.filter(e => e.processed).length;
    if (processed > 0) {
      stats.success_rate = stats.auto_generated / processed;
    }

    // Count by priority
    this.triggerEvents.forEach(event => {
      const trigger = this.triggers.find(t => t.id === event.trigger_rule_id);
      if (trigger) {
        stats.by_priority[trigger.priority]++;
      }
    });

    return stats;
  }

  addCustomTrigger(trigger: Omit<TriggerRule, 'id'>): string {
    const id = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.triggers.push({ ...trigger, id });
    return id;
  }

  updateTriggerRule(id: string, updates: Partial<TriggerRule>): boolean {
    const index = this.triggers.findIndex(t => t.id === id);
    if (index !== -1) {
      this.triggers[index] = { ...this.triggers[index], ...updates };
      return true;
    }
    return false;
  }
}

export const smartOutreachTriggers = SmartOutreachTriggers.getInstance();
