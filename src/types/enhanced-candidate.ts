
import { OSINTProfile } from './osint';

export interface EnhancedCandidate {
  id: string;
  name: string;
  handle: string;
  email: string;
  location: string;
  
  // Core profile
  current_title?: string;
  current_company?: string;
  experience_years: number;
  skills: string[];
  bio?: string;
  avatar_url?: string;
  
  // AI-generated insights
  ai_summary: string;
  career_trajectory_analysis: CareerTrajectory;
  technical_depth_score: number;
  community_influence_score: number;
  cultural_fit_indicators: CultureFitIndicator[];
  learning_velocity_score: number;
  
  // OSINT data
  osint_profile: OSINTProfile;
  
  // Search relevance
  match_score: number;
  relevance_factors: RelevanceFactor[];
  
  // Availability & outreach
  availability_status: 'active' | 'passive' | 'unavailable';
  best_contact_method: ContactMethod;
  salary_expectation_range?: SalaryRange;
  
  // Timestamps
  profile_last_updated: string;
  osint_last_fetched: string;
}

export interface CareerTrajectory {
  progression_type: 'ascending' | 'lateral' | 'transitioning' | 'consulting';
  growth_rate: number;
  stability_score: number;
  next_likely_move: string;
  timeline_events: TimelineEvent[];
}

export interface CultureFitIndicator {
  aspect: 'communication_style' | 'work_values' | 'collaboration' | 'innovation';
  score: number;
  evidence: string[];
  confidence: number;
}

export interface RelevanceFactor {
  factor: string;
  weight: number;
  evidence: string;
  source: string;
}

export interface ContactMethod {
  platform: 'email' | 'linkedin' | 'twitter' | 'github';
  confidence: number;
  best_time: string;
  approach_style: 'direct' | 'casual' | 'technical' | 'project-based';
}

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  confidence: number;
  source: string;
}

export interface TimelineEvent {
  date: string;
  type: 'job_change' | 'skill_acquisition' | 'project_launch' | 'recognition';
  title: string;
  description: string;
  impact_score: number;
}

export interface SearchResult {
  candidates: EnhancedCandidate[];
  total_found: number;
  search_quality_score: number;
  ai_interpretation: SearchInterpretation;
  suggested_refinements: string[];
  diversity_metrics: DiversityMetrics;
}

export interface SearchInterpretation {
  original_query: string;
  interpreted_intent: string;
  extracted_requirements: ExtractedRequirement[];
  search_strategy: string;
  confidence: number;
}

export interface ExtractedRequirement {
  category: 'skills' | 'experience' | 'location' | 'industry' | 'culture';
  value: string;
  importance: number;
  source: 'explicit' | 'inferred';
}

export interface DiversityMetrics {
  gender_distribution: Record<string, number>;
  location_distribution: Record<string, number>;
  experience_distribution: Record<string, number>;
  background_diversity_score: number;
}
