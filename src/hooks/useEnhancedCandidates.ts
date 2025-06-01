
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { AvailabilitySignal } from '@/types/osint';

export const useEnhancedCandidates = () => {
  return useQuery({
    queryKey: ['enhanced-candidates'],
    queryFn: async () => {
      console.log('Fetching enhanced candidates...');
      
      const { data, error } = await supabase
        .from('enhanced_candidates')
        .select(`
          *,
          osint_profiles(*),
          career_trajectories(*),
          cultural_fit_indicators(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching enhanced candidates:', error);
        throw error;
      }

      console.log('Enhanced candidates fetched:', data);
      
      // Transform the data to match the EnhancedCandidate interface
      const transformedData: EnhancedCandidate[] = (data || []).map(candidate => ({
        id: candidate.id,
        name: candidate.name,
        handle: candidate.handle || candidate.email.split('@')[0],
        email: candidate.email,
        location: candidate.location || '',
        current_title: candidate.current_title,
        current_company: candidate.current_company,
        experience_years: candidate.experience_years || 0,
        skills: candidate.skills || [],
        bio: candidate.bio,
        avatar_url: candidate.avatar_url,
        ai_summary: candidate.ai_summary || '',
        career_trajectory_analysis: candidate.career_trajectories?.[0] ? {
          progression_type: candidate.career_trajectories[0].progression_type as 'ascending' | 'lateral' | 'transitioning' | 'consulting',
          growth_rate: candidate.career_trajectories[0].growth_rate || 0,
          stability_score: candidate.career_trajectories[0].stability_score || 0,
          next_likely_move: candidate.career_trajectories[0].next_likely_move || '',
          timeline_events: Array.isArray(candidate.career_trajectories[0].timeline_events) 
            ? candidate.career_trajectories[0].timeline_events as any[]
            : []
        } : {
          progression_type: 'ascending' as const,
          growth_rate: 0,
          stability_score: 0,
          next_likely_move: '',
          timeline_events: []
        },
        technical_depth_score: candidate.technical_depth_score || 0,
        community_influence_score: candidate.community_influence_score || 0,
        cultural_fit_indicators: (candidate.cultural_fit_indicators || []).map((indicator: any) => ({
          aspect: indicator.aspect,
          score: indicator.score || 0,
          evidence: Array.isArray(indicator.evidence) ? indicator.evidence : 
                   typeof indicator.evidence === 'string' ? [indicator.evidence] : [],
          confidence: indicator.confidence || 0
        })),
        learning_velocity_score: candidate.learning_velocity_score || 0,
        osint_profile: candidate.osint_profiles?.[0] ? {
          id: candidate.osint_profiles[0].id,
          candidate_id: candidate.osint_profiles[0].candidate_id,
          overall_score: candidate.osint_profiles[0].overall_score || 0,
          influence_score: candidate.osint_profiles[0].influence_score || 0,
          technical_depth: candidate.osint_profiles[0].technical_depth || 0,
          community_engagement: candidate.osint_profiles[0].community_engagement || 0,
          learning_velocity: candidate.osint_profiles[0].influence_score || 0,
          availability_signals: Array.isArray(candidate.osint_profiles[0].availability_signals) 
            ? candidate.osint_profiles[0].availability_signals as AvailabilitySignal[]
            : [],
          github_profile: {
            username: candidate.osint_profiles[0].github_username || '',
            public_repos: candidate.osint_profiles[0].github_repos || 0,
            followers: 0,
            top_languages: [],
            contribution_activity: candidate.osint_profiles[0].github_commits || 0,
            notable_projects: [],
            open_source_contributions: candidate.osint_profiles[0].github_stars || 0,
          },
          linkedin_insights: {
            connection_count: candidate.osint_profiles[0].linkedin_connections || 0,
            recent_activity_level: 'medium' as const,
            job_change_indicators: [],
            skills_endorsements: {},
            recommendation_count: 0,
          },
          social_presence: {
            platforms: ['github', 'linkedin'],
            professional_consistency: 0.8,
            communication_style: 'professional' as const,
            thought_leadership_score: candidate.osint_profiles[0].influence_score || 0,
          },
          professional_reputation: {
            industry_recognition: [],
            conference_speaking: false,
            published_content: 0,
            community_involvement: [],
            expertise_areas: [],
          },
          // Legacy platform fields for backward compatibility
          github: {
            username: candidate.osint_profiles[0].github_username || '',
            stars: candidate.osint_profiles[0].github_stars || 0,
            repos: candidate.osint_profiles[0].github_repos || 0,
            commits: candidate.osint_profiles[0].github_commits || 0,
          },
          linkedin: {
            connections: candidate.osint_profiles[0].linkedin_connections || 0,
            url: candidate.osint_profiles[0].linkedin_url || '',
          },
          stackoverflow: {
            reputation: candidate.osint_profiles[0].stackoverflow_reputation || 0,
          },
          twitter: {
            followers: candidate.osint_profiles[0].twitter_followers || 0,
            username: candidate.osint_profiles[0].twitter_username || '',
          },
          reddit: {
            username: candidate.osint_profiles[0].reddit_username || '',
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
          last_updated: candidate.osint_profiles[0].last_updated || new Date().toISOString(),
        } : {
          id: '',
          candidate_id: candidate.id,
          overall_score: 0,
          influence_score: 0,
          technical_depth: 0,
          community_engagement: 0,
          learning_velocity: 0,
          availability_signals: [],
          github_profile: undefined,
          linkedin_insights: undefined,
          social_presence: {
            platforms: [],
            professional_consistency: 0,
            communication_style: 'mixed' as const,
            thought_leadership_score: 0,
          },
          professional_reputation: {
            industry_recognition: [],
            conference_speaking: false,
            published_content: 0,
            community_involvement: [],
            expertise_areas: [],
          },
          github: {
            username: '',
            stars: 0,
            repos: 0,
            commits: 0,
          },
          linkedin: {
            connections: 0,
            url: '',
          },
          stackoverflow: {
            reputation: 0,
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
        },
        match_score: Math.round((candidate.technical_depth_score + candidate.community_influence_score) * 5) || 75,
        relevance_factors: [],
        availability_status: (candidate.availability_status as 'active' | 'passive' | 'unavailable') || 'passive',
        best_contact_method: {
          platform: (candidate.preferred_contact_method === 'email' || 
                    candidate.preferred_contact_method === 'linkedin' || 
                    candidate.preferred_contact_method === 'phone') 
                    ? candidate.preferred_contact_method 
                    : 'email',
          confidence: 0.8,
          best_time: '9-17',
          approach_style: 'direct' as const,
        },
        salary_expectation_range: candidate.salary_expectation_min ? {
          min: candidate.salary_expectation_min,
          max: candidate.salary_expectation_max || candidate.salary_expectation_min + 20000,
          currency: candidate.salary_currency || 'USD',
          confidence: 0.7,
          source: 'database'
        } : undefined,
        profile_last_updated: candidate.profile_last_updated || candidate.created_at || new Date().toISOString(),
        osint_last_fetched: candidate.osint_last_fetched || candidate.created_at || new Date().toISOString(),
        // Additional fields for compatibility
        source_details: {
          type: 'manual_upload' as const,
          platform: 'enhanced_candidates',
          verified: true,
          imported_date: candidate.created_at || new Date().toISOString(),
          confidence_score: 0.9
        },
        first_name: candidate.name.split(' ')[0],
        last_name: candidate.name.split(' ').slice(1).join(' '),
        score: Math.round((candidate.technical_depth_score + candidate.community_influence_score) * 5) || 75,
        education: [],
        applications: [],
        interviews: [],
        notes: [],
        tags: [],
        organization_id: candidate.organization_id || '',
        created_at: candidate.created_at || new Date().toISOString(),
        updated_at: candidate.updated_at || new Date().toISOString(),
        portal_activity_score: candidate.learning_velocity_score,
        interaction_timeline: [],
        engagement_score: candidate.community_influence_score,
        response_rate: 0.8,
        preferred_contact_method: candidate.preferred_contact_method,
        osint_last_updated: candidate.osint_last_fetched,
        background_verification_status: 'verified' as const,
        placement_probability_score: Math.round((candidate.technical_depth_score + candidate.community_influence_score) * 5) || 75,
        cultural_fit_score: candidate.community_influence_score,
        availability_signals: [],
        job_interests: [],
        career_aspirations: candidate.ai_summary,
        pipeline_stage: 'sourced',
        stage_history: [],
        priority_level: 'medium' as const,
        status: 'new' as const,
        source: 'direct' as const,
      }));

      return transformedData;
    },
  });
};

export const useCreateEnhancedCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (candidateData: Partial<EnhancedCandidate>) => {
      // Transform to database format
      const dbData = {
        name: candidateData.name!,
        email: candidateData.email!,
        handle: candidateData.handle,
        location: candidateData.location,
        current_title: candidateData.current_title,
        current_company: candidateData.current_company,
        experience_years: candidateData.experience_years || 0,
        bio: candidateData.bio,
        avatar_url: candidateData.avatar_url,
        skills: candidateData.skills || [],
        ai_summary: candidateData.ai_summary,
        technical_depth_score: candidateData.technical_depth_score || 0,
        community_influence_score: candidateData.community_influence_score || 0,
        learning_velocity_score: candidateData.learning_velocity_score || 0,
        availability_status: candidateData.availability_status || 'passive',
        salary_expectation_min: candidateData.salary_expectation_range?.min,
        salary_expectation_max: candidateData.salary_expectation_range?.max,
        salary_currency: candidateData.salary_expectation_range?.currency || 'USD',
        preferred_contact_method: candidateData.best_contact_method?.platform === 'github' ? 'email' : candidateData.best_contact_method?.platform || 'email',
      };

      const { data, error } = await supabase
        .from('enhanced_candidates')
        .insert(dbData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enhanced-candidates'] });
    },
  });
};

export const useUpdateEnhancedCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string } & Partial<EnhancedCandidate>) => {
      // Transform updates to database format
      const dbUpdates: any = {};
      
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.email) dbUpdates.email = updates.email;
      if (updates.handle) dbUpdates.handle = updates.handle;
      if (updates.location) dbUpdates.location = updates.location;
      if (updates.current_title) dbUpdates.current_title = updates.current_title;
      if (updates.current_company) dbUpdates.current_company = updates.current_company;
      if (updates.experience_years !== undefined) dbUpdates.experience_years = updates.experience_years;
      if (updates.bio) dbUpdates.bio = updates.bio;
      if (updates.avatar_url) dbUpdates.avatar_url = updates.avatar_url;
      if (updates.skills) dbUpdates.skills = updates.skills;
      if (updates.ai_summary) dbUpdates.ai_summary = updates.ai_summary;
      if (updates.technical_depth_score !== undefined) dbUpdates.technical_depth_score = updates.technical_depth_score;
      if (updates.community_influence_score !== undefined) dbUpdates.community_influence_score = updates.community_influence_score;
      if (updates.learning_velocity_score !== undefined) dbUpdates.learning_velocity_score = updates.learning_velocity_score;
      if (updates.availability_status) dbUpdates.availability_status = updates.availability_status;
      if (updates.salary_expectation_range) {
        dbUpdates.salary_expectation_min = updates.salary_expectation_range.min;
        dbUpdates.salary_expectation_max = updates.salary_expectation_range.max;
        dbUpdates.salary_currency = updates.salary_expectation_range.currency;
      }
      if (updates.best_contact_method) {
        dbUpdates.preferred_contact_method = updates.best_contact_method.platform === 'github' ? 'email' : updates.best_contact_method.platform;
      }

      const { data, error } = await supabase
        .from('enhanced_candidates')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enhanced-candidates'] });
    },
  });
};
