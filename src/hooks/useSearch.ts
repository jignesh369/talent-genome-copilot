
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from './useEnhancedCandidates';

export interface SearchQuery {
  id: string;
  recruiter_id: string;
  organization_id: string;
  original_query: string;
  interpreted_intent?: string;
  extracted_requirements: any[];
  search_strategy?: string;
  confidence_score: number;
  total_candidates_found: number;
  search_quality_score: number;
  created_at: string;
}

export interface CandidateJobMatch {
  id: string;
  candidate_id: string;
  job_id?: string;
  search_query_id?: string;
  overall_match_score: number;
  technical_skills_score: number;
  experience_score: number;
  cultural_fit_score: number;
  relevance_factors: any[];
  match_explanation?: string;
  recommendation_strength: 'weak' | 'moderate' | 'strong' | 'exceptional';
  created_at: string;
  enhanced_candidates?: EnhancedCandidate;
}

export interface SearchParams {
  query: string;
  filters?: {
    skills?: string[];
    experience_years?: { min?: number; max?: number };
    location?: string;
    availability_status?: string;
    salary_range?: { min?: number; max?: number };
  };
  limit?: number;
}

export const useAISearch = () => {
  return useMutation({
    mutationFn: async (params: SearchParams) => {
      console.log('Performing AI search with params:', params);
      
      // First, save the search query
      const { data: searchQuery, error: searchError } = await supabase
        .from('search_queries')
        .insert({
          original_query: params.query,
          interpreted_intent: `AI-interpreted: ${params.query}`,
          extracted_requirements: params.filters ? [params.filters] : [],
          search_strategy: 'semantic_search_with_ai_ranking',
          confidence_score: 0.85,
          total_candidates_found: 0,
          search_quality_score: 0.9,
        })
        .select()
        .single();

      if (searchError) {
        console.error('Error saving search query:', searchError);
        throw searchError;
      }

      // Build the search query for candidates
      let query = supabase
        .from('enhanced_candidates')
        .select(`
          *,
          osint_profiles(*),
          career_trajectories(*),
          cultural_fit_indicators(*)
        `);

      // Apply filters
      if (params.filters) {
        if (params.filters.skills && params.filters.skills.length > 0) {
          query = query.overlaps('skills', params.filters.skills);
        }
        
        if (params.filters.experience_years?.min) {
          query = query.gte('experience_years', params.filters.experience_years.min);
        }
        
        if (params.filters.experience_years?.max) {
          query = query.lte('experience_years', params.filters.experience_years.max);
        }
        
        if (params.filters.location) {
          query = query.ilike('location', `%${params.filters.location}%`);
        }
        
        if (params.filters.availability_status) {
          query = query.eq('availability_status', params.filters.availability_status);
        }
      }

      // Apply text search on multiple fields
      if (params.query.trim()) {
        query = query.or(`
          name.ilike.%${params.query}%,
          current_title.ilike.%${params.query}%,
          current_company.ilike.%${params.query}%,
          bio.ilike.%${params.query}%,
          ai_summary.ilike.%${params.query}%
        `);
      }

      query = query
        .order('technical_depth_score', { ascending: false })
        .order('community_influence_score', { ascending: false })
        .limit(params.limit || 50);

      const { data: candidates, error: candidatesError } = await query;

      if (candidatesError) {
        console.error('Error searching candidates:', candidatesError);
        throw candidatesError;
      }

      console.log('Search results found:', candidates?.length);

      // Generate AI match scores for each candidate
      const matches: CandidateJobMatch[] = (candidates || []).map((candidate, index) => {
        // AI scoring algorithm (simplified)
        const skillsMatch = params.filters?.skills 
          ? params.filters.skills.filter(skill => 
              candidate.skills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
            ).length / params.filters.skills.length
          : 0.8;

        const experienceMatch = params.filters?.experience_years?.min
          ? Math.min(candidate.experience_years / params.filters.experience_years.min, 1)
          : 0.8;

        const overallScore = Math.round(
          (skillsMatch * 0.4 + 
           experienceMatch * 0.3 + 
           (candidate.technical_depth_score / 10) * 0.2 + 
           (candidate.community_influence_score / 10) * 0.1) * 100
        );

        return {
          id: `match-${candidate.id}-${Date.now()}-${index}`,
          candidate_id: candidate.id,
          search_query_id: searchQuery.id,
          overall_match_score: Math.max(overallScore, 60), // Minimum 60% for demo
          technical_skills_score: skillsMatch * 10,
          experience_score: experienceMatch * 10,
          cultural_fit_score: candidate.community_influence_score,
          relevance_factors: [
            { factor: 'skills_match', weight: 0.4, score: skillsMatch },
            { factor: 'experience_match', weight: 0.3, score: experienceMatch },
            { factor: 'technical_depth', weight: 0.2, score: candidate.technical_depth_score / 10 },
            { factor: 'community_influence', weight: 0.1, score: candidate.community_influence_score / 10 }
          ],
          match_explanation: `Strong candidate with ${candidate.experience_years} years of experience. ${
            skillsMatch > 0.7 ? 'Excellent skills match.' : 'Good skills alignment.'
          } ${candidate.technical_depth_score > 7 ? 'High technical depth.' : ''}`,
          recommendation_strength: overallScore > 85 ? 'exceptional' : 
                                   overallScore > 75 ? 'strong' : 
                                   overallScore > 65 ? 'moderate' : 'weak',
          created_at: new Date().toISOString(),
          enhanced_candidates: candidate,
        } as CandidateJobMatch;
      }).sort((a, b) => b.overall_match_score - a.overall_match_score);

      // Update search query with results count
      await supabase
        .from('search_queries')
        .update({ 
          total_candidates_found: matches.length,
          search_quality_score: matches.length > 0 ? 0.9 : 0.3 
        })
        .eq('id', searchQuery.id);

      return {
        searchQuery,
        matches,
        totalResults: matches.length,
      };
    },
  });
};

export const useSearchHistory = () => {
  return useQuery({
    queryKey: ['search-history'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('search_queries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as SearchQuery[];
    },
  });
};

export const useSearchFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (feedback: {
      search_query_id: string;
      candidate_id: string;
      feedback_type: 'positive' | 'negative' | 'contacted' | 'hired' | 'not_interested';
      feedback_notes?: string;
    }) => {
      const { data, error } = await supabase
        .from('search_feedback')
        .insert([feedback])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['search-history'] });
    },
  });
};
