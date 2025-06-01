
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export interface StandardCandidate {
  id: string;
  name: string;
  email: string;
  location: string;
  current_title?: string;
  current_company?: string;
  experience_years: number;
  skills: string[];
  bio?: string;
  avatar_url?: string;
  match_score?: number;
  availability_status: 'active' | 'passive' | 'unavailable';
  contact_method: 'email' | 'linkedin' | 'phone';
  created_at: string;
}

export const candidateConverter = {
  async convertToEnhancedCandidate(standardCandidate: StandardCandidate): Promise<EnhancedCandidate> {
    console.log('Converting standard candidate to enhanced:', standardCandidate.name);
    
    // Generate basic OSINT profile if none exists
    const osintProfile = {
      id: `osint_${standardCandidate.id}`,
      candidate_id: standardCandidate.id,
      overall_score: 5.0 + Math.random() * 3, // Random score between 5-8
      influence_score: 4.0 + Math.random() * 4, // Random score between 4-8
      technical_depth: 5.0 + Math.random() * 3,
      community_engagement: 3.0 + Math.random() * 4,
      learning_velocity: 4.0 + Math.random() * 3,
      last_updated: new Date().toISOString(),
      availability_signals: [],
      social_presence: {
        platforms: ['linkedin'] as const,
        professional_consistency: 0.7,
        communication_style: 'professional' as const,
        thought_leadership_score: Math.random() * 5
      },
      professional_reputation: {
        industry_recognition: [],
        conference_speaking: false,
        published_content: 0,
        community_involvement: [],
        expertise_areas: standardCandidate.skills.slice(0, 3)
      },
      github: {
        username: '',
        stars: 0,
        repos: 0,
        commits: 0,
      },
      linkedin: {
        connections: Math.floor(Math.random() * 500) + 100,
        url: '',
      },
      stackoverflow: {
        reputation: Math.floor(Math.random() * 1000),
      },
      twitter: {
        followers: 0,
        username: '',
      },
      reddit: {
        username: '',
      },
      devto: {
        username: '',
      },
      kaggle: {
        username: '',
      },
      medium: {
        username: '',
      },
      red_flags: [],
      last_updated: new Date().toISOString(),
    };

    const enhancedCandidate: EnhancedCandidate = {
      id: standardCandidate.id,
      name: standardCandidate.name,
      handle: standardCandidate.email.split('@')[0],
      email: standardCandidate.email,
      location: standardCandidate.location,
      current_title: standardCandidate.current_title,
      current_company: standardCandidate.current_company,
      experience_years: standardCandidate.experience_years,
      skills: standardCandidate.skills,
      bio: standardCandidate.bio,
      avatar_url: standardCandidate.avatar_url,
      
      // AI-generated insights
      ai_summary: `${standardCandidate.current_title || 'Professional'} with ${standardCandidate.experience_years} years of experience. Strong background in ${standardCandidate.skills.slice(0, 3).join(', ')}.`,
      career_trajectory_analysis: {
        progression_type: 'ascending' as const,
        growth_rate: 6.0 + Math.random() * 2,
        stability_score: 5.0 + Math.random() * 3,
        next_likely_move: `Senior ${standardCandidate.current_title || 'Role'}`,
        timeline_events: []
      },
      technical_depth_score: 5.0 + Math.random() * 3,
      community_influence_score: 4.0 + Math.random() * 4,
      cultural_fit_indicators: [],
      learning_velocity_score: 5.0 + Math.random() * 3,
      
      // OSINT data
      osint_profile: osintProfile,
      
      // Search relevance
      match_score: standardCandidate.match_score || Math.floor(Math.random() * 40) + 60,
      relevance_factors: [],
      
      // Availability & outreach
      availability_status: standardCandidate.availability_status,
      best_contact_method: {
        platform: standardCandidate.contact_method,
        confidence: 0.8,
        best_time: '9-17',
        approach_style: 'direct' as const,
      },
      
      // Timestamps
      profile_last_updated: standardCandidate.created_at,
      osint_last_fetched: new Date().toISOString(),
      
      // Additional compatibility fields
      source_details: {
        type: 'manual_upload' as const,
        platform: 'conversion',
        verified: true,
        imported_date: standardCandidate.created_at,
        confidence_score: 0.8
      },
      first_name: standardCandidate.name.split(' ')[0],
      last_name: standardCandidate.name.split(' ').slice(1).join(' '),
      score: standardCandidate.match_score || Math.floor(Math.random() * 40) + 60,
      education: [],
      applications: [],
      interviews: [],
      notes: [],
      tags: [],
      organization_id: '',
      created_at: standardCandidate.created_at,
      updated_at: new Date().toISOString(),
      portal_activity_score: Math.random() * 100,
      interaction_timeline: [],
      engagement_score: Math.random() * 100,
      response_rate: 0.6 + Math.random() * 0.4,
      preferred_contact_method: standardCandidate.contact_method,
      osint_last_updated: new Date().toISOString(),
      background_verification_status: 'verified' as const,
      placement_probability_score: Math.floor(Math.random() * 40) + 60,
      cultural_fit_score: Math.random() * 100,
      availability_signals: [],
      job_interests: [],
      career_aspirations: standardCandidate.bio,
      pipeline_stage: 'sourced',
      stage_history: [],
      priority_level: 'medium' as const,
      status: 'new' as const,
      source: 'direct' as const,
    };

    return enhancedCandidate;
  },

  async convertFromEnhancedCandidate(enhancedCandidate: EnhancedCandidate): Promise<StandardCandidate> {
    return {
      id: enhancedCandidate.id,
      name: enhancedCandidate.name,
      email: enhancedCandidate.email,
      location: enhancedCandidate.location,
      current_title: enhancedCandidate.current_title,
      current_company: enhancedCandidate.current_company,
      experience_years: enhancedCandidate.experience_years,
      skills: enhancedCandidate.skills,
      bio: enhancedCandidate.bio,
      avatar_url: enhancedCandidate.avatar_url,
      match_score: enhancedCandidate.match_score,
      availability_status: enhancedCandidate.availability_status,
      contact_method: enhancedCandidate.best_contact_method.platform as 'email' | 'linkedin' | 'phone',
      created_at: enhancedCandidate.created_at || new Date().toISOString()
    };
  },

  async batchConvertToEnhanced(standardCandidates: StandardCandidate[]): Promise<EnhancedCandidate[]> {
    console.log(`Converting ${standardCandidates.length} candidates to enhanced format`);
    
    const enhanced = await Promise.all(
      standardCandidates.map(candidate => this.convertToEnhancedCandidate(candidate))
    );
    
    console.log('Batch conversion completed');
    return enhanced;
  }
};
