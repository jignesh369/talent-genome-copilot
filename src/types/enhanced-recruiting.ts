
import { Candidate, Job, Application, Interview } from './recruiting';

export interface EnhancedCandidate extends Candidate {
  // Source Attribution
  source_details: CandidateSource;
  portal_registration_date?: string;
  portal_activity_score: number;
  
  // Interaction History
  interaction_timeline: CandidateInteraction[];
  engagement_score: number;
  last_contact_date?: string;
  response_rate: number;
  preferred_contact_method: 'email' | 'linkedin' | 'phone' | 'portal';
  
  // OSINT Enhancement
  osint_profile?: OSINTProfile;
  osint_last_updated?: string;
  background_verification_status: 'pending' | 'verified' | 'flagged' | 'not_required';
  
  // AI Insights
  ai_summary?: string;
  placement_probability_score: number;
  cultural_fit_score: number;
  availability_signals: AvailabilitySignal[];
  
  // Portal Integration
  portal_preferences?: PortalPreferences;
  job_interests: string[];
  career_aspirations?: string;
  
  // Pipeline Tracking
  pipeline_stage: string;
  stage_history: StageHistoryEntry[];
  assigned_recruiter_id?: string;
  priority_level: 'low' | 'medium' | 'high' | 'urgent';
}

export interface CandidateSource {
  type: 'portal' | 'ats' | 'manual_upload' | 'linkedin' | 'github' | 'referral' | 'osint';
  source_url?: string;
  imported_date: string;
  imported_by?: string;
  ats_system?: string;
  confidence_score: number;
}

export interface CandidateInteraction {
  id: string;
  type: 'email' | 'linkedin_message' | 'phone_call' | 'portal_visit' | 'application' | 'interview';
  direction: 'inbound' | 'outbound';
  content_summary: string;
  timestamp: string;
  recruiter_id?: string;
  response_received: boolean;
  sentiment_score?: number;
  follow_up_required: boolean;
}

export interface AvailabilitySignal {
  signal_type: 'active_job_search' | 'passive_interest' | 'career_change' | 'promotion_seeking';
  confidence: number;
  detected_date: string;
  source: string;
  details: string;
}

export interface PortalPreferences {
  job_alerts_enabled: boolean;
  preferred_industries: string[];
  preferred_locations: string[];
  remote_preference: 'remote_only' | 'hybrid' | 'onsite' | 'flexible';
  salary_expectations?: {
    min: number;
    max: number;
    currency: string;
  };
  availability_timeline: 'immediate' | 'within_month' | 'within_quarter' | 'exploring';
}

export interface StageHistoryEntry {
  stage: string;
  entered_date: string;
  duration_days?: number;
  moved_by: string;
  reason?: string;
  automated: boolean;
}

export interface OSINTProfile {
  github_profile?: GitHubProfile;
  linkedin_insights?: LinkedInInsights;
  social_presence: SocialPresence;
  professional_reputation: ProfessionalReputation;
  red_flags: RedFlag[];
  last_updated: string;
}

export interface GitHubProfile {
  username: string;
  public_repos: number;
  followers: number;
  top_languages: string[];
  contribution_activity: number;
  notable_projects: string[];
  open_source_contributions: number;
}

export interface LinkedInInsights {
  connection_count: number;
  recent_activity_level: 'low' | 'medium' | 'high';
  job_change_indicators: string[];
  skills_endorsements: Record<string, number>;
  recommendation_count: number;
}

export interface SocialPresence {
  platforms: string[];
  professional_consistency: number;
  communication_style: 'formal' | 'casual' | 'technical' | 'mixed';
  thought_leadership_score: number;
}

export interface ProfessionalReputation {
  industry_recognition: string[];
  conference_speaking: boolean;
  published_content: number;
  community_involvement: string[];
  expertise_areas: string[];
}

export interface RedFlag {
  type: 'employment_gap' | 'inconsistent_info' | 'negative_sentiment' | 'legal_issues';
  severity: 'low' | 'medium' | 'high';
  description: string;
  detected_date: string;
  verified: boolean;
}

// Enhanced Job Types for Portal Integration
export interface EnhancedJob extends Job {
  portal_visibility: boolean;
  portal_applications_count: number;
  ai_job_summary: string;
  company_culture_insights: string[];
  skill_match_algorithm: SkillMatchConfig;
  candidate_persona_target: CandidatePersona;
}

export interface SkillMatchConfig {
  required_skills: SkillRequirement[];
  preferred_skills: SkillRequirement[];
  deal_breaker_skills: string[];
  skill_weight_algorithm: 'strict' | 'flexible' | 'ai_optimized';
}

export interface SkillRequirement {
  skill: string;
  importance: number;
  years_experience?: number;
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface CandidatePersona {
  experience_range: [number, number];
  preferred_backgrounds: string[];
  cultural_fit_criteria: string[];
  growth_trajectory: 'ascending' | 'lateral' | 'transitioning';
}

// Communication & Outreach Types
export interface CommunicationTemplate {
  id: string;
  name: string;
  type: 'initial_outreach' | 'follow_up' | 'interview_invitation' | 'offer_discussion';
  channel: 'email' | 'linkedin' | 'phone_script';
  template_content: string;
  personalization_fields: string[];
  success_rate: number;
  ai_optimized: boolean;
}

export interface OutreachCampaign {
  id: string;
  name: string;
  target_candidates: string[];
  template_sequence: string[];
  trigger_conditions: TriggerCondition[];
  performance_metrics: CampaignMetrics;
  status: 'draft' | 'active' | 'paused' | 'completed';
}

export interface TriggerCondition {
  type: 'time_delay' | 'candidate_action' | 'recruiter_action' | 'ai_signal';
  condition: string;
  delay_hours?: number;
}

export interface CampaignMetrics {
  sent_count: number;
  response_rate: number;
  positive_response_rate: number;
  conversion_to_interview: number;
  roi_score: number;
}
