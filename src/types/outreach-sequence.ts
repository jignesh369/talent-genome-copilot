
export interface OutreachTemplate {
  id: string;
  name: string;
  description: string;
  steps: number;
  duration_days: number;
  target_audience: string[];
  success_rate: number;
  recommended_for: string[];
  sequence_steps: TemplateStep[];
}

export interface TemplateStep {
  step_number: number;
  channel: 'email' | 'linkedin' | 'phone';
  delay_days: number;
  subject_template?: string;
  content_template: string;
  personalization_variables: string[];
  tone: 'professional' | 'casual' | 'technical' | 'executive';
}

export interface PersonalizedSequence {
  template_id: string;
  candidate_id: string;
  personalized_steps: PersonalizedStep[];
  confidence_score: number;
  recommendation_reason: string;
  estimated_success_rate: number;
}

export interface PersonalizedStep extends TemplateStep {
  personalized_subject?: string;
  personalized_content: string;
  personalization_highlights: string[];
  quality_score: number;
}

export interface SequenceRecommendation {
  template: OutreachTemplate;
  confidence: number;
  reasoning: string[];
  predicted_success_rate: number;
}
