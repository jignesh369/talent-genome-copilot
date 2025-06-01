
export interface OSINTProfile {
  id: string;
  candidate_id: string;
  overall_score: number;
  influence_score: number;
  technical_depth: number;
  community_engagement: number;
  learning_velocity: number;
  availability_signals: AvailabilitySignal[];
  
  // Platform-specific data
  github_profile?: GitHubProfile;
  linkedin_insights?: LinkedInInsights;
  social_presence: SocialPresence;
  professional_reputation: ProfessionalReputation;
  
  // Legacy platform fields for backward compatibility
  github?: {
    username: string;
    stars: number;
    repos: number;
    commits: number;
  };
  linkedin?: {
    connections: number;
    url: string;
  };
  stackoverflow?: {
    reputation: number;
  };
  twitter?: {
    followers: number;
    username: string;
  };
  reddit?: {
    username: string;
  };
  devto?: {
    username: string;
  };
  kaggle?: {
    username: string;
  };
  medium?: {
    username: string;
  };
  
  // Risk assessment
  red_flags: RedFlag[];
  
  // Metadata
  last_updated: string;
}

export interface GitHubProfile {
  username: string;
  public_repos: number;
  followers: number;
  top_languages: string[];
  contribution_activity: number;
  notable_projects: Project[];
  open_source_contributions: number;
}

export interface LinkedInInsights {
  connection_count: number;
  recent_activity_level: 'low' | 'medium' | 'high';
  job_change_indicators: JobChangeIndicator[];
  skills_endorsements: Record<string, number>;
  recommendation_count: number;
}

export interface SocialPresence {
  platforms: string[];
  professional_consistency: number;
  communication_style: 'professional' | 'casual' | 'technical' | 'mixed';
  thought_leadership_score: number;
}

export interface ProfessionalReputation {
  industry_recognition: Recognition[];
  conference_speaking: boolean;
  published_content: number;
  community_involvement: CommunityInvolvement[];
  expertise_areas: string[];
}

export interface AvailabilitySignal {
  signal_type: 'profile_update' | 'job_search_activity' | 'network_expansion' | 'skill_updates';
  confidence: number;
  detected_at: string;
  details: string;
}

export interface JobChangeIndicator {
  indicator_type: 'profile_changes' | 'activity_patterns' | 'network_signals';
  strength: number;
  description: string;
}

export interface Recognition {
  type: 'award' | 'mention' | 'feature';
  source: string;
  title: string;
  date: string;
}

export interface CommunityInvolvement {
  type: 'meetup' | 'conference' | 'open_source' | 'forum';
  name: string;
  role: string;
  activity_level: 'low' | 'medium' | 'high';
}

export interface Project {
  name: string;
  description: string;
  stars: number;
  language: string;
  last_updated: string;
}

export interface RedFlag {
  type: 'inconsistency' | 'controversial_content' | 'employment_gap' | 'reputation_issue';
  severity: 'low' | 'medium' | 'high';
  description: string;
  evidence: string[];
}
