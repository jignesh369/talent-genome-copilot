
import { EnhancedCandidate as SearchCandidate } from '@/types/enhanced-candidate';

export const useCandidateConversion = () => {
  // Convert enhanced recruiting candidate to search candidate format
  const convertToSearchCandidate = (candidate: any): SearchCandidate => {
    return {
      id: candidate.id,
      name: candidate.first_name + ' ' + candidate.last_name,
      handle: candidate.email.split('@')[0],
      email: candidate.email,
      location: candidate.location || 'Unknown',
      current_title: candidate.current_title,
      current_company: candidate.current_company,
      experience_years: candidate.experience_years || 0,
      skills: candidate.skills || [],
      bio: candidate.ai_summary,
      avatar_url: candidate.avatar_url,
      ai_summary: candidate.ai_summary || '',
      career_trajectory_analysis: {
        progression_type: 'ascending',
        growth_rate: 0.8,
        stability_score: 0.7,
        next_likely_move: 'Senior role',
        timeline_events: []
      },
      technical_depth_score: 8.5,
      community_influence_score: 7.0,
      cultural_fit_indicators: [],
      learning_velocity_score: 8.0,
      osint_profile: candidate.osint_profile || {
        github_profile: undefined,
        linkedin_insights: undefined,
        social_presence: { platforms: [], professional_consistency: 0, communication_style: 'mixed', thought_leadership_score: 0 },
        professional_reputation: { industry_recognition: [], conference_speaking: false, published_content: 0, community_involvement: [], expertise_areas: [] },
        red_flags: [],
        last_updated: new Date().toISOString()
      },
      match_score: candidate.placement_probability_score || 85,
      relevance_factors: [],
      availability_status: candidate.availability_signals?.some((s: any) => s.signal_type === 'active_job_search') ? 'active' : 'passive',
      best_contact_method: {
        platform: candidate.preferred_contact_method || 'email',
        confidence: 0.8,
        best_time: '10:00 AM',
        approach_style: 'direct'
      },
      salary_expectation_range: candidate.portal_preferences?.salary_expectations ? {
        min: candidate.portal_preferences.salary_expectations.min,
        max: candidate.portal_preferences.salary_expectations.max,
        currency: candidate.portal_preferences.salary_expectations.currency,
        confidence: 0.7,
        source: 'portal_preferences'
      } : undefined,
      profile_last_updated: new Date().toISOString(),
      osint_last_fetched: new Date().toISOString()
    };
  };

  return {
    convertToSearchCandidate
  };
};
