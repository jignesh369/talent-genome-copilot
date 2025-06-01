
import { EnhancedCandidate as RecruitingCandidate } from '@/types/enhanced-recruiting';
import { EnhancedCandidate as AnalyticsCandidate } from '@/types/enhanced-candidate';

export const convertToAnalyticsCandidate = (candidate: RecruitingCandidate): AnalyticsCandidate => {
  return {
    id: candidate.id,
    name: `${candidate.first_name} ${candidate.last_name}`,
    handle: `${candidate.first_name} ${candidate.last_name}`,
    email: candidate.email,
    location: candidate.location || '',
    current_title: candidate.current_title,
    current_company: candidate.current_company,
    experience_years: candidate.experience_years,
    skills: candidate.skills,
    bio: candidate.ai_summary || '',
    avatar_url: null, // EnhancedCandidate from recruiting doesn't have avatar_url
    ai_summary: candidate.ai_summary || '',
    career_trajectory_analysis: {
      progression_type: 'ascending' as const,
      growth_rate: 0.8,
      stability_score: 0.75,
      next_likely_move: 'Senior role',
      timeline_events: []
    },
    technical_depth_score: candidate.placement_probability_score || 75,
    community_influence_score: 70,
    cultural_fit_indicators: candidate.cultural_fit_score ? [{
      aspect: 'communication_style' as const,
      score: candidate.cultural_fit_score,
      evidence: [],
      confidence: 0.8
    }] : [],
    learning_velocity_score: 75,
    osint_profile: {
      candidate_id: candidate.id,
      overall_score: 8,
      influence_score: 7,
      technical_depth: 8,
      community_engagement: 7,
      learning_velocity: 8,
      last_updated: new Date().toISOString(),
      availability_signals: candidate.availability_signals.map(signal => ({
        signal_type: signal.signal_type as any,
        confidence: signal.confidence,
        detected_date: signal.detected_date,
        description: signal.details,
        platform_source: signal.source
      }))
    },
    match_score: candidate.placement_probability_score || 75,
    relevance_factors: [],
    availability_status: 'passive' as const,
    best_contact_method: {
      platform: candidate.preferred_contact_method as any || 'email',
      confidence: 0.8,
      best_time: '9-17',
      approach_style: 'direct' as const
    },
    profile_last_updated: new Date().toISOString(),
    osint_last_fetched: new Date().toISOString()
  };
};
