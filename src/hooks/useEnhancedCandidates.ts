
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface EnhancedCandidate {
  id: string;
  organization_id: string;
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
  osint_profiles?: OSINTProfile;
  career_trajectories?: CareerTrajectory[];
  cultural_fit_indicators?: CulturalFitIndicator[];
}

export interface OSINTProfile {
  id: string;
  candidate_id: string;
  overall_score: number;
  influence_score: number;
  technical_depth: number;
  community_engagement: number;
  github_username?: string;
  github_stars: number;
  github_commits: number;
  github_repos: number;
  linkedin_url?: string;
  linkedin_connections: number;
  stackoverflow_id?: string;
  stackoverflow_reputation: number;
  twitter_username?: string;
  twitter_followers: number;
  reddit_username?: string;
  availability_signals: any[];
  last_updated: string;
}

export interface CareerTrajectory {
  id: string;
  candidate_id: string;
  progression_type: 'ascending' | 'lateral' | 'transitioning' | 'consulting';
  growth_rate: number;
  stability_score: number;
  next_likely_move?: string;
  timeline_events: any[];
  analysis_date: string;
}

export interface CulturalFitIndicator {
  id: string;
  candidate_id: string;
  aspect: 'communication_style' | 'work_values' | 'collaboration' | 'innovation';
  score: number;
  evidence: any[];
  confidence: number;
  created_at: string;
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
      return data as EnhancedCandidate[];
    },
  });
};

export const useCreateEnhancedCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (candidate: Partial<EnhancedCandidate>) => {
      const { data, error } = await supabase
        .from('enhanced_candidates')
        .insert([candidate])
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
    mutationFn: async ({ id, ...updates }: Partial<EnhancedCandidate> & { id: string }) => {
      const { data, error } = await supabase
        .from('enhanced_candidates')
        .update(updates)
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
