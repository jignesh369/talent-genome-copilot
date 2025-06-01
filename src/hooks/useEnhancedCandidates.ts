
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
  osint_profiles?: any[];
  career_trajectories?: any[];
  cultural_fit_indicators?: any[];
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
      return data || [];
    },
  });
};

export const useCreateEnhancedCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (candidateData: {
      name: string;
      email: string;
      location?: string;
      current_title?: string;
      current_company?: string;
      experience_years?: number;
      bio?: string;
      skills?: string[];
      ai_summary?: string;
      technical_depth_score?: number;
      community_influence_score?: number;
      learning_velocity_score?: number;
      availability_status?: 'active' | 'passive' | 'unavailable';
      salary_expectation_min?: number;
      salary_expectation_max?: number;
      preferred_contact_method?: 'email' | 'linkedin' | 'phone' | 'sms' | 'slack';
    }) => {
      const { data, error } = await supabase
        .from('enhanced_candidates')
        .insert([candidateData])
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
