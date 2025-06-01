
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { OSINTProfile } from '@/types/osint';

export const convertToEnhancedCandidate = (candidateData: any): EnhancedCandidate => {
  const osintProfile: OSINTProfile = {
    id: `osint_${candidateData.id}`,
    candidate_id: candidateData.id,
    overall_score: candidateData.osint_overall_score || 6.5,
    influence_score: candidateData.osint_influence_score || 5.2,
    technical_depth: candidateData.osint_technical_depth || 7.1,
    community_engagement: candidateData.osint_community_engagement || 4.8,
    learning_velocity: candidateData.osint_learning_velocity || 6.3,
    availability_signals: candidateData.availability_signals || [],
    social_presence: {
      platforms: ['linkedin', 'github'],
      professional_consistency: 0.8,
      communication_style: 'professional',
      thought_leadership_score: 3.2
    },
    professional_reputation: {
      industry_recognition: [],
      conference_speaking: false,
      published_content: 0,
      community_involvement: [],
      expertise_areas: candidateData.skills || []
    },
    github: {
      username: candidateData.github_username || '',
      stars: candidateData.github_stars || 0,
      repos: candidateData.github_repos || 0,
      commits: candidateData.github_commits || 0
    },
    linkedin: {
      connections: candidateData.linkedin_connections || 0,
      url: candidateData.linkedin_url || ''
    },
    stackoverflow: {
      reputation: candidateData.stackoverflow_reputation || 0
    },
    twitter: {
      followers: candidateData.twitter_followers || 0,
      username: candidateData.twitter_username || ''
    },
    reddit: {
      username: candidateData.reddit_username || ''
    },
    devto: {
      username: candidateData.devto_username || ''
    },
    kaggle: {
      username: candidateData.kaggle_username || ''
    },
    medium: {
      username: candidateData.medium_username || ''
    },
    red_flags: [],
    last_updated: new Date().toISOString()
  };

  const enhancedCandidate: EnhancedCandidate = {
    id: candidateData.id,
    name: candidateData.name || `${candidateData.first_name || ''} ${candidateData.last_name || ''}`.trim(),
    handle: candidateData.handle || candidateData.email?.split('@')[0] || '',
    email: candidateData.email,
    location: candidateData.location || '',
    current_title: candidateData.current_title,
    current_company: candidateData.current_company,
    experience_years: candidateData.experience_years || candidateData.years_of_experience || 0,
    skills: candidateData.skills || [],
    bio: candidateData.bio,
    avatar_url: candidateData.avatar_url,
    ai_summary: candidateData.ai_summary || 'Enhanced candidate profile',
    career_trajectory_analysis: {
      progression_type: 'ascending',
      growth_rate: 5.0,
      stability_score: 6.0,
      next_likely_move: 'Senior Role',
      timeline_events: []
    },
    technical_depth_score: candidateData.technical_depth_score || 7.0,
    community_influence_score: candidateData.community_influence_score || 5.0,
    cultural_fit_indicators: [],
    learning_velocity_score: candidateData.learning_velocity_score || 6.0,
    osint_profile: osintProfile,
    match_score: candidateData.match_score || candidateData.score || 75,
    relevance_factors: [],
    availability_status: candidateData.availability_status || 'passive',
    best_contact_method: {
      platform: 'email',
      confidence: 0.8,
      best_time: '9-17',
      approach_style: 'direct'
    },
    profile_last_updated: candidateData.profile_last_updated || new Date().toISOString(),
    osint_last_fetched: candidateData.osint_last_fetched || new Date().toISOString(),
    created_at: candidateData.created_at || new Date().toISOString(),
    updated_at: candidateData.updated_at || new Date().toISOString()
  };

  return enhancedCandidate;
};

export const convertToSearchCandidate = (enhancedCandidate: EnhancedCandidate): EnhancedCandidate => {
  return enhancedCandidate;
};
