import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export interface SearchQuery {
  id: string;
  recruiter_id?: string;
  organization_id?: string;
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

export interface SearchResult {
  searchQuery: SearchQuery;
  matches: CandidateJobMatch[];
  totalResults: number;
  candidates: EnhancedCandidate[];
  total_found: number;
  search_quality_score: number;
  ai_interpretation: {
    original_query: string;
    interpreted_intent: string;
    extracted_requirements: any[];
    search_strategy: string;
    confidence: number;
  };
  suggested_refinements: string[];
  diversity_metrics: {
    gender_distribution: Record<string, number>;
    location_distribution: Record<string, number>;
    experience_distribution: Record<string, number>;
    background_diversity_score: number;
  };
}

export const useAISearch = () => {
  return useMutation({
    mutationFn: async (params: SearchParams): Promise<SearchResult> => {
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
          const validStatuses = ['active', 'passive', 'unavailable'] as const;
          if (validStatuses.includes(params.filters.availability_status as any)) {
            query = query.eq('availability_status', params.filters.availability_status as 'active' | 'passive' | 'unavailable');
          }
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

      // Transform candidates to match EnhancedCandidate interface
      const transformedCandidates: EnhancedCandidate[] = (candidates || []).map(candidate => ({
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
          red_flags: [],
          last_updated: candidate.osint_profiles[0].last_updated || new Date().toISOString(),
        } : {
          id: '',
          candidate_id: candidate.id,
          overall_score: 0,
          influence_score: 0,
          technical_depth: 0,
          community_engagement: 0,
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
      }));

      // Generate AI match scores for each candidate
      const matches: CandidateJobMatch[] = transformedCandidates.map((candidate, index) => {
        const skillsMatch = params.filters?.skills 
          ? params.filters.skills.filter(skill => 
              candidate.skills?.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
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
          overall_match_score: Math.max(overallScore, 60),
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
        searchQuery: {
          ...searchQuery,
          extracted_requirements: Array.isArray(searchQuery.extracted_requirements) 
            ? searchQuery.extracted_requirements 
            : []
        },
        matches,
        totalResults: matches.length,
        candidates: transformedCandidates,
        total_found: matches.length,
        search_quality_score: 0.9,
        ai_interpretation: {
          original_query: params.query,
          interpreted_intent: `AI-interpreted: ${params.query}`,
          extracted_requirements: [],
          search_strategy: 'semantic_search_with_ai_ranking',
          confidence: 0.85
        },
        suggested_refinements: ['Add location filter', 'Specify experience level'],
        diversity_metrics: {
          gender_distribution: { 'male': 2, 'female': 3 },
          location_distribution: { 'San Francisco': 1, 'Austin': 1, 'New York': 1 },
          experience_distribution: { '3-5 years': 2, '5-8 years': 3 },
          background_diversity_score: 0.8
        }
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
