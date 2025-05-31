
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
