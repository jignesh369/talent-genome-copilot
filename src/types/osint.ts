
export interface OSINTProfile {
  candidate_id: string;
  overall_score: number;
  influence_score: number;
  technical_depth: number;
  community_engagement: number;
  learning_velocity: number;
  last_updated: string;
  availability_signals: AvailabilitySignal[];
  
  // Platform profiles
  github?: GitHubProfile;
  linkedin?: LinkedInProfile;
  twitter?: TwitterProfile;
  stackoverflow?: StackOverflowProfile;
  reddit?: RedditProfile;
  devto?: DevToProfile;
  medium?: MediumProfile;
  kaggle?: KaggleProfile;
}

export interface GitHubProfile {
  username: string;
  profile_url: string;
  public_repos: number;
  followers: number;
  following: number;
  contributions_last_year: number;
  star_count: number;
  fork_count: number;
  primary_languages: string[];
  recent_activity_score: number;
  contribution_streak: number;
  account_created: string;
  last_activity: string;
}

export interface LinkedInProfile {
  profile_url: string;
  connections: number;
  current_position: string;
  company: string;
  industry: string;
  location: string;
  experience_years: number;
  education: string[];
  skills: string[];
  recommendations_count: number;
  posts_last_month: number;
  engagement_rate: number;
}

export interface TwitterProfile {
  username: string;
  profile_url: string;
  followers: number;
  following: number;
  tweets_count: number;
  listed_count: number;
  verified: boolean;
  account_created: string;
  recent_activity_score: number;
  engagement_rate: number;
  tech_mention_frequency: number;
}

export interface StackOverflowProfile {
  user_id: number;
  profile_url: string;
  reputation: number;
  questions_count: number;
  answers_count: number;
  badges: {
    gold: number;
    silver: number;
    bronze: number;
  };
  top_tags: string[];
  answer_acceptance_rate: number;
  last_activity: string;
  member_since: string;
}

export interface RedditProfile {
  username: string;
  profile_url: string;
  karma: number;
  post_karma: number;
  comment_karma: number;
  account_created: string;
  active_subreddits: string[];
  recent_activity_score: number;
  tech_community_participation: number;
}

export interface DevToProfile {
  username: string;
  profile_url: string;
  followers: number;
  posts_count: number;
  tags: string[];
  total_reactions: number;
  total_comments: number;
  recent_activity_score: number;
}

export interface MediumProfile {
  username: string;
  profile_url: string;
  followers: number;
  posts_count: number;
  total_claps: number;
  topics: string[];
  recent_activity_score: number;
}

export interface KaggleProfile {
  username: string;
  profile_url: string;
  tier: string;
  competitions_entered: number;
  datasets_count: number;
  notebooks_count: number;
  total_votes: number;
  ranking: number;
}

export interface AvailabilitySignal {
  signal_type: 'job_change' | 'profile_update' | 'increased_activity' | 'skill_learning';
  confidence: number;
  detected_date: string;
  description: string;
  platform_source: string;
}
