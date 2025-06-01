
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface EnhancedCandidate {
  id: string;
  organization_id?: string;
  name: string;
  handle?: string;
  email: string;
  location?: string;
  current_title?: string;
  current_company?: string;
  experience_years: number;
  bio?: string;
  avatar_url?: string;
  skills: string[];
  ai_summary?: string;
  technical_depth_score: number;
  community_influence_score: number;
  learning_velocity_score: number;
  availability_status: 'active' | 'passive' | 'unavailable';
  salary_expectation_min?: number;
  salary_expectation_max?: number;
  salary_currency: string;
  preferred_contact_method: 'email' | 'linkedin' | 'phone' | 'sms' | 'slack';
  profile_last_updated: string;
  osint_last_fetched: string;
  created_at: string;
  updated_at: string;
  
  // Related data from joins
  osint_profiles?: any[];
  career_trajectories?: any[];
  cultural_fit_indicators?: any[];
  
  // Frontend-specific properties for compatibility
  career_trajectory_analysis?: any;
  osint_profile?: any;
  match_score?: number;
  relevance_factors?: any[];
  best_contact_method?: any;
  source_details?: any;
  portal_activity_score?: number;
  interaction_timeline?: any[];
  engagement_score?: number;
}

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
      
      // Transform the data to include frontend-compatible properties
      const transformedData = (data || []).map(candidate => ({
        ...candidate,
        // Add missing frontend properties with defaults
        career_trajectory_analysis: candidate.career_trajectories?.[0] || {
          progression_type: 'ascending',
          growth_rate: 0,
          stability_score: 0,
          next_likely_move: '',
          timeline_events: []
        },
        osint_profile: candidate.osint_profiles?.[0] || {
          overall_score: 0,
          influence_score: 0,
          technical_depth: 0,
          community_engagement: 0,
          github: {},
          linkedin: {},
          stackoverflow: {},
          twitter: {},
          availability_signals: []
        },
        match_score: Math.round((candidate.technical_depth_score + candidate.community_influence_score) * 5),
        relevance_factors: [],
        best_contact_method: {
          platform: candidate.preferred_contact_method || 'email',
          confidence: 0.8,
          best_time: '9-17',
          approach_style: 'professional'
        },
        source_details: { platform: 'database', verified: true },
        portal_activity_score: candidate.learning_velocity_score,
        interaction_timeline: [],
        engagement_score: candidate.community_influence_score
      }));

      return transformedData as EnhancedCandidate[];
    },
  });
};

export const useCreateEnhancedCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (candidateData: Partial<EnhancedCandidate>) => {
      // Filter out frontend-only properties before inserting
      const {
        career_trajectory_analysis,
        osint_profile,
        match_score,
        relevance_factors,
        best_contact_method,
        source_details,
        portal_activity_score,
        interaction_timeline,
        engagement_score,
        osint_profiles,
        career_trajectories,
        cultural_fit_indicators,
        ...dbData
      } = candidateData;

      const { data, error } = await supabase
        .from('enhanced_candidates')
        .insert([dbData])
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
      // Filter out frontend-only properties before updating
      const {
        career_trajectory_analysis,
        osint_profile,
        match_score,
        relevance_factors,
        best_contact_method,
        source_details,
        portal_activity_score,
        interaction_timeline,
        engagement_score,
        osint_profiles,
        career_trajectories,
        cultural_fit_indicators,
        ...dbUpdates
      } = updates;

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
