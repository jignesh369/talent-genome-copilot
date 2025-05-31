
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

export interface OutreachSequence {
  id: string;
  name: string;
  description: string;
  target_persona: string;
  industry: string;
  experience_level: string;
  steps: SequenceStep[];
  is_active: boolean;
  success_metrics: SequenceMetrics;
  created_at: string;
  updated_at: string;
}

export interface SequenceStep {
  id: string;
  sequence_id: string;
  step_number: number;
  type: 'email' | 'linkedin' | 'phone' | 'sms';
  delay_days: number;
  subject_template?: string;
  content_template: string;
  personalization_variables: string[];
  trigger_conditions: TriggerCondition[];
  a_b_test_config?: ABTestConfig;
}

export interface TriggerCondition {
  type: 'time_delay' | 'candidate_action' | 'no_response' | 'specific_response';
  condition: string;
  value?: string;
}

export interface ABTestConfig {
  enabled: boolean;
  variant_a_percentage: number;
  variant_b_content?: string;
  test_metric: 'open_rate' | 'response_rate' | 'conversion_rate';
}

export interface SequenceMetrics {
  total_candidates: number;
  active_candidates: number;
  completed_candidates: number;
  responses_received: number;
  interviews_scheduled: number;
  hires_made: number;
  open_rate: number;
  response_rate: number;
  conversion_rate: number;
  avg_response_time_hours: number;
}

export interface CandidateSequenceStatus {
  candidate_id: string;
  sequence_id: string;
  current_step: number;
  status: 'active' | 'paused' | 'completed' | 'opted_out';
  started_at: string;
  last_interaction?: string;
  responses_received: number;
  scheduled_next_step?: string;
}

export interface PersonalizationData {
  candidate_id: string;
  insights: PersonalizationInsight[];
  communication_style: 'formal' | 'casual' | 'technical' | 'executive';
  optimal_timing: OptimalTiming;
  personalization_score: number;
  generated_content: GeneratedContent;
}

export interface PersonalizationInsight {
  type: 'skill_match' | 'career_trajectory' | 'recent_activity' | 'mutual_connection' | 'company_interest';
  title: string;
  content: string;
  confidence: number;
  source: string;
  suggested_usage: string;
}

export interface OptimalTiming {
  day_of_week: string;
  time_of_day: string;
  timezone: string;
  confidence: number;
}

export interface GeneratedContent {
  subject_suggestions: string[];
  opening_lines: string[];
  value_propositions: string[];
  call_to_actions: string[];
}

class OutreachSequenceService {
  private sequences: OutreachSequence[] = [];
  private candidateStatuses: CandidateSequenceStatus[] = [];
  private personalizationCache: Map<string, PersonalizationData> = new Map();

  // Sequence Management
  createSequence(sequenceData: Omit<OutreachSequence, 'id' | 'created_at' | 'updated_at' | 'success_metrics'>): string {
    const sequence: OutreachSequence = {
      ...sequenceData,
      id: Date.now().toString(),
      success_metrics: this.initializeMetrics(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.sequences.push(sequence);
    return sequence.id;
  }

  updateSequence(sequenceId: string, updates: Partial<OutreachSequence>): void {
    const index = this.sequences.findIndex(s => s.id === sequenceId);
    if (index !== -1) {
      this.sequences[index] = {
        ...this.sequences[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
    }
  }

  getSequence(sequenceId: string): OutreachSequence | null {
    return this.sequences.find(s => s.id === sequenceId) || null;
  }

  getAllSequences(): OutreachSequence[] {
    return this.sequences;
  }

  // Candidate Enrollment
  enrollCandidateInSequence(candidateId: string, sequenceId: string): void {
    const existing = this.candidateStatuses.find(
      status => status.candidate_id === candidateId && status.sequence_id === sequenceId
    );

    if (!existing) {
      const status: CandidateSequenceStatus = {
        candidate_id: candidateId,
        sequence_id: sequenceId,
        current_step: 1,
        status: 'active',
        started_at: new Date().toISOString(),
        responses_received: 0
      };

      this.candidateStatuses.push(status);
      this.scheduleNextStep(candidateId, sequenceId);
    }
  }

  // Sequence Execution
  private scheduleNextStep(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    const sequence = this.getSequence(sequenceId);

    if (!status || !sequence || status.status !== 'active') return;

    const currentStep = sequence.steps.find(step => step.step_number === status.current_step);
    if (!currentStep) return;

    const nextStepTime = new Date();
    nextStepTime.setDate(nextStepTime.getDate() + currentStep.delay_days);

    status.scheduled_next_step = nextStepTime.toISOString();

    // In a real implementation, this would schedule the actual message sending
    console.log(`Scheduled step ${status.current_step} for candidate ${candidateId} at ${nextStepTime}`);
  }

  executeSequenceStep(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    const sequence = this.getSequence(sequenceId);

    if (!status || !sequence || status.status !== 'active') return;

    const currentStep = sequence.steps.find(step => step.step_number === status.current_step);
    if (!currentStep) return;

    // Generate personalized content
    const personalizedContent = this.generatePersonalizedMessage(candidateId, currentStep);

    // Send message (in real implementation, this would integrate with email/LinkedIn APIs)
    this.sendMessage(candidateId, currentStep.type, personalizedContent);

    // Update status
    status.last_interaction = new Date().toISOString();
    
    // Move to next step
    this.moveToNextStep(candidateId, sequenceId);
  }

  private moveToNextStep(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    const sequence = this.getSequence(sequenceId);

    if (!status || !sequence) return;

    const nextStepNumber = status.current_step + 1;
    const nextStep = sequence.steps.find(step => step.step_number === nextStepNumber);

    if (nextStep) {
      status.current_step = nextStepNumber;
      this.scheduleNextStep(candidateId, sequenceId);
    } else {
      status.status = 'completed';
      status.scheduled_next_step = undefined;
    }
  }

  // Personalization Engine
  async generatePersonalizationData(candidate: EnhancedCandidate): Promise<PersonalizationData> {
    // Check cache first
    const cached = this.personalizationCache.get(candidate.id);
    if (cached) return cached;

    // Generate insights based on candidate data
    const insights = this.analyzeCandidate(candidate);
    const communicationStyle = this.determineCommunicationStyle(candidate);
    const optimalTiming = this.calculateOptimalTiming(candidate);
    const generatedContent = await this.generateAIContent(candidate, insights);

    const personalizationData: PersonalizationData = {
      candidate_id: candidate.id,
      insights,
      communication_style,
      optimal_timing,
      personalization_score: this.calculatePersonalizationScore(insights),
      generated_content: generatedContent
    };

    // Cache the result
    this.personalizationCache.set(candidate.id, personalizationData);
    return personalizationData;
  }

  private analyzeCandidate(candidate: EnhancedCandidate): PersonalizationInsight[] {
    const insights: PersonalizationInsight[] = [];

    // Skill match analysis
    if (candidate.skills.length > 0) {
      insights.push({
        type: 'skill_match',
        title: 'Technical Skills Alignment',
        content: `Strong expertise in ${candidate.skills.slice(0, 3).join(', ')} with ${candidate.experience_years} years of experience.`,
        confidence: 85,
        source: 'Profile Analysis',
        suggested_usage: 'Highlight relevant technical challenges and growth opportunities in these areas.'
      });
    }

    // Career trajectory analysis
    if (candidate.career_trajectory_analysis) {
      insights.push({
        type: 'career_trajectory',
        title: 'Career Progression Pattern',
        content: `${candidate.career_trajectory_analysis.progression_type} trajectory with ${candidate.career_trajectory_analysis.growth_rate}% growth rate.`,
        confidence: candidate.career_trajectory_analysis.stability_score,
        source: 'Career Analysis',
        suggested_usage: candidate.career_trajectory_analysis.next_likely_move
      });
    }

    // Recent activity signals
    if (candidate.availability_signals.length > 0) {
      const recentSignal = candidate.availability_signals[0];
      insights.push({
        type: 'recent_activity',
        title: 'Availability Signal Detected',
        content: recentSignal.details,
        confidence: recentSignal.confidence,
        source: recentSignal.source,
        suggested_usage: 'Reference their current career exploration and timing for new opportunities.'
      });
    }

    return insights;
  }

  private determineCommunicationStyle(candidate: EnhancedCandidate): 'formal' | 'casual' | 'technical' | 'executive' {
    // Simple heuristic based on title and experience
    if (candidate.current_title?.toLowerCase().includes('senior') || candidate.experience_years > 8) {
      return 'technical';
    }
    if (candidate.current_title?.toLowerCase().includes('manager') || candidate.current_title?.toLowerCase().includes('director')) {
      return 'executive';
    }
    return 'casual';
  }

  private calculateOptimalTiming(candidate: EnhancedCandidate): OptimalTiming {
    // Mock optimal timing calculation
    return {
      day_of_week: 'Tuesday',
      time_of_day: '10:00 AM',
      timezone: 'PST',
      confidence: 75
    };
  }

  private async generateAIContent(candidate: EnhancedCandidate, insights: PersonalizationInsight[]): Promise<GeneratedContent> {
    // Mock AI content generation
    return {
      subject_suggestions: [
        `${candidate.current_title} opportunity at [Company] - ${insights[0]?.title}`,
        `Exciting ${candidate.skills[0]} role - would love to chat`,
        `Your expertise in ${candidate.skills.slice(0, 2).join(' & ')} caught our attention`
      ],
      opening_lines: [
        `Hi ${candidate.first_name}, I noticed your experience with ${candidate.skills[0]} and thought you might be interested in...`,
        `Your background in ${candidate.current_title} roles is exactly what we're looking for...`,
        `Given your ${candidate.experience_years} years of experience, I wanted to reach out about...`
      ],
      value_propositions: [
        `Work with cutting-edge ${candidate.skills[0]} technology in a fast-growing company`,
        `Lead technical initiatives and mentor junior developers`,
        `Significant equity upside and career growth opportunities`
      ],
      call_to_actions: [
        'Would you be open to a 15-minute chat about this opportunity?',
        'Happy to share more details - are you free for a quick call this week?',
        'I\'d love to hear your thoughts on this role. Worth a conversation?'
      ]
    };
  }

  private calculatePersonalizationScore(insights: PersonalizationInsight[]): number {
    if (insights.length === 0) return 0;
    const avgConfidence = insights.reduce((sum, insight) => sum + insight.confidence, 0) / insights.length;
    return Math.round(avgConfidence);
  }

  private generatePersonalizedMessage(candidateId: string, step: SequenceStep): string {
    const personalizationData = this.personalizationCache.get(candidateId);
    if (!personalizationData) return step.content_template;

    // Simple template replacement
    let content = step.content_template;
    const replacements = {
      '{{candidate_name}}': 'John', // Would get from candidate data
      '{{current_title}}': 'Senior Developer',
      '{{skills}}': 'React, TypeScript, Node.js',
      '{{company_name}}': 'TechCorp'
    };

    Object.entries(replacements).forEach(([key, value]) => {
      content = content.replace(new RegExp(key, 'g'), value);
    });

    return content;
  }

  private sendMessage(candidateId: string, type: string, content: string): void {
    console.log(`Sending ${type} message to candidate ${candidateId}:`, content);
    // In real implementation, this would integrate with email/LinkedIn APIs
  }

  // Analytics and Reporting
  getSequenceMetrics(sequenceId: string): SequenceMetrics | null {
    const sequence = this.getSequence(sequenceId);
    if (!sequence) return null;

    const candidateStatuses = this.candidateStatuses.filter(status => status.sequence_id === sequenceId);
    
    return {
      total_candidates: candidateStatuses.length,
      active_candidates: candidateStatuses.filter(s => s.status === 'active').length,
      completed_candidates: candidateStatuses.filter(s => s.status === 'completed').length,
      responses_received: candidateStatuses.reduce((sum, s) => sum + s.responses_received, 0),
      interviews_scheduled: Math.floor(candidateStatuses.length * 0.15), // Mock data
      hires_made: Math.floor(candidateStatuses.length * 0.03), // Mock data
      open_rate: Math.random() * 20 + 60, // Mock data
      response_rate: Math.random() * 15 + 20, // Mock data
      conversion_rate: Math.random() * 10 + 10, // Mock data
      avg_response_time_hours: Math.random() * 48 + 24 // Mock data
    };
  }

  getCandidateStatus(candidateId: string, sequenceId: string): CandidateSequenceStatus | null {
    return this.candidateStatuses.find(
      status => status.candidate_id === candidateId && status.sequence_id === sequenceId
    ) || null;
  }

  // Response Handling
  recordCandidateResponse(candidateId: string, sequenceId: string, responseType: 'positive' | 'negative' | 'neutral'): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    if (status) {
      status.responses_received += 1;
      status.last_interaction = new Date().toISOString();
      
      if (responseType === 'positive') {
        // Move to interview scheduling or custom follow-up
        status.status = 'completed';
      } else if (responseType === 'negative') {
        status.status = 'opted_out';
      }
    }
  }

  // Utility Methods
  private initializeMetrics(): SequenceMetrics {
    return {
      total_candidates: 0,
      active_candidates: 0,
      completed_candidates: 0,
      responses_received: 0,
      interviews_scheduled: 0,
      hires_made: 0,
      open_rate: 0,
      response_rate: 0,
      conversion_rate: 0,
      avg_response_time_hours: 0
    };
  }

  // Batch Operations
  enrollMultipleCandidates(candidateIds: string[], sequenceId: string): void {
    candidateIds.forEach(candidateId => {
      this.enrollCandidateInSequence(candidateId, sequenceId);
    });
  }

  pauseSequenceForCandidate(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    if (status && status.status === 'active') {
      status.status = 'paused';
    }
  }

  resumeSequenceForCandidate(candidateId: string, sequenceId: string): void {
    const status = this.getCandidateStatus(candidateId, sequenceId);
    if (status && status.status === 'paused') {
      status.status = 'active';
      this.scheduleNextStep(candidateId, sequenceId);
    }
  }
}

export const outreachSequenceService = new OutreachSequenceService();
