
export interface OSINTProfile {
  candidate_id: string;
  github?: GitHubProfile;
  stackoverflow?: StackOverflowProfile;
  twitter?: TwitterProfile;
  linkedin?: LinkedInProfile;
  reddit?: RedditProfile;
  devto?: DevToProfile;
  medium?: MediumProfile;
  hackernews?: HackerNewsProfile;
  kaggle?: KaggleProfile;
  overall_score: number;
  influence_score: number;
  technical_depth: number;
  community_engagement: number;
  learning_velocity: number;
  last_updated: string;
  availability_signals: AvailabilitySignal[];
}

export interface GitHubProfile {
  username: string;
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
  total_commits_last_year: number;
  top_languages: LanguageStats[];
  recent_activity: GitHubActivity[];
  notable_repos: Repository[];
  contribution_streak: number;
  code_quality_score: number;
}

export interface StackOverflowProfile {
  user_id: number;
  reputation: number;
  badges: BadgeCount;
  top_tags: TagStats[];
  answer_count: number;
  question_count: number;
  helpfulness_score: number;
  recent_activity: StackOverflowActivity[];
}

export interface TwitterProfile {
  username: string;
  followers: number;
  following: number;
  tweet_count: number;
  tech_engagement_score: number;
  thought_leadership_score: number;
  recent_tech_tweets: Tweet[];
  influence_metrics: InfluenceMetrics;
}

export interface LinkedInProfile {
  profile_url: string;
  current_position: string;
  current_company: string;
  experience_years: number;
  education: Education[];
  skills: SkillEndorsement[];
  recommendations_count: number;
  connections_count: number;
  career_progression_score: number;
}

export interface RedditProfile {
  username: string;
  karma: number;
  account_age_days: number;
  active_subreddits: SubredditActivity[];
  tech_contributions: RedditContribution[];
  expertise_areas: string[];
  community_standing: number;
}

export interface DevToProfile {
  username: string;
  followers: number;
  posts_count: number;
  recent_articles: Article[];
  tags: string[];
  engagement_score: number;
}

export interface MediumProfile {
  username: string;
  followers: number;
  articles: Article[];
  claps_received: number;
  technical_writing_score: number;
}

export interface HackerNewsProfile {
  username: string;
  karma: number;
  submissions: HNSubmission[];
  comments: HNComment[];
  technical_depth_score: number;
}

export interface KaggleProfile {
  username: string;
  tier: string;
  competitions_entered: number;
  datasets_published: number;
  notebooks_published: number;
  medals: MedalCount;
  expertise_areas: string[];
}

export interface LanguageStats {
  language: string;
  percentage: number;
  lines_of_code: number;
  projects_count: number;
}

export interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  last_updated: string;
  complexity_score: number;
  innovation_score: number;
}

export interface AvailabilitySignal {
  signal_type: 'job_search' | 'open_to_opportunities' | 'career_transition' | 'side_project_focus';
  confidence: number;
  source: string;
  detected_at: string;
  details: string;
}

export interface InfluenceMetrics {
  retweets_avg: number;
  mentions_count: number;
  engagement_rate: number;
  thought_leadership_topics: string[];
}

export interface TagStats {
  tag: string;
  score: number;
  posts_count: number;
  badges_earned: number;
}

export interface BadgeCount {
  gold: number;
  silver: number;
  bronze: number;
}

export interface SkillEndorsement {
  skill: string;
  endorsements: number;
  verified: boolean;
}

export interface SubredditActivity {
  subreddit: string;
  posts_count: number;
  karma: number;
  expertise_level: 'beginner' | 'intermediate' | 'expert';
}

export interface Article {
  title: string;
  url: string;
  published_date: string;
  views: number;
  engagement: number;
  tags: string[];
}

export interface MedalCount {
  gold: number;
  silver: number;
  bronze: number;
}

export interface GitHubActivity {
  type: 'commit' | 'pr' | 'issue' | 'release';
  repo: string;
  date: string;
  description: string;
}

export interface StackOverflowActivity {
  type: 'answer' | 'question' | 'badge';
  title: string;
  date: string;
  score: number;
}

export interface Tweet {
  content: string;
  date: string;
  retweets: number;
  likes: number;
  tech_relevance: number;
}

export interface RedditContribution {
  subreddit: string;
  title: string;
  type: 'post' | 'comment';
  score: number;
  date: string;
}

export interface HNSubmission {
  title: string;
  url: string;
  score: number;
  comments: number;
  date: string;
}

export interface HNComment {
  content: string;
  score: number;
  date: string;
  thread_title: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  start_year: number;
  end_year?: number;
}
