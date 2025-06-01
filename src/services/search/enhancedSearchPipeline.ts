
import { naturalLanguageQueryService, QueryInterpretation } from '@/services/llm/naturalLanguageQueryService';
import { platformQueryGenerator, OSINTSearchPlan } from '@/services/osint/platformQueryGenerator';
import { candidateAnalysisService, CandidateAnalysisResult } from '@/services/osint/candidateAnalysisService';
import { useAISearch } from '@/hooks/useSearch';
import { EnhancedCandidate, SearchResult } from '@/types/enhanced-candidate';
import { supabase } from '@/integrations/supabase/client';

export interface EnhancedSearchResult extends SearchResult {
  osintSearchPlan: OSINTSearchPlan;
  candidateAnalyses: CandidateAnalysisResult[];
  searchProgress: SearchProgress;
}

export interface SearchProgress {
  stage: 'interpreting' | 'searching_db' | 'osint_discovery' | 'ai_analysis' | 'completed';
  progress: number; // 0-100
  currentOperation: string;
  stagesCompleted: string[];
}

export class EnhancedSearchPipeline {
  private searchProgress: SearchProgress = {
    stage: 'interpreting',
    progress: 0,
    currentOperation: 'Starting search...',
    stagesCompleted: []
  };

  private progressCallback?: (progress: SearchProgress) => void;

  setProgressCallback(callback: (progress: SearchProgress) => void) {
    this.progressCallback = callback;
  }

  async executeSearchPipeline(query: string): Promise<EnhancedSearchResult> {
    console.log('Starting enhanced search pipeline for:', query);
    
    try {
      // Stage 1: Interpret natural language query
      this.updateProgress('interpreting', 10, 'Interpreting natural language query...');
      const interpretation = await naturalLanguageQueryService.interpretQuery(query);
      
      // Stage 2: Generate OSINT search plan
      this.updateProgress('interpreting', 20, 'Generating OSINT search plan...');
      const osintSearchPlan = platformQueryGenerator.generateSearchPlan(interpretation);
      
      // Stage 3: Search internal database
      this.updateProgress('searching_db', 30, 'Searching internal candidate database...');
      const internalResults = await this.searchInternalDatabase(interpretation);
      
      // Stage 4: Execute OSINT discovery
      this.updateProgress('osint_discovery', 50, 'Discovering candidates across platforms...');
      const osintCandidates = await this.executeOSINTDiscovery(osintSearchPlan);
      
      // Stage 5: Combine and deduplicate candidates
      this.updateProgress('osint_discovery', 70, 'Combining and deduplicating results...');
      const combinedCandidates = await this.combineCandidates(internalResults.candidates, osintCandidates);
      
      // Stage 6: AI analysis of candidates
      this.updateProgress('ai_analysis', 80, 'Performing AI analysis of candidates...');
      const candidateAnalyses = await this.performAIAnalysis(combinedCandidates);
      
      // Stage 7: Rank and score final results
      this.updateProgress('ai_analysis', 90, 'Ranking and scoring final results...');
      const rankedCandidates = await this.rankCandidates(combinedCandidates, candidateAnalyses);
      
      // Stage 8: Complete search
      this.updateProgress('completed', 100, 'Search completed successfully!');
      
      return {
        ...internalResults,
        candidates: rankedCandidates,
        total_found: rankedCandidates.length,
        osintSearchPlan,
        candidateAnalyses,
        searchProgress: this.searchProgress
      };
      
    } catch (error) {
      console.error('Enhanced search pipeline error:', error);
      throw error;
    }
  }

  private updateProgress(stage: SearchProgress['stage'], progress: number, operation: string) {
    this.searchProgress = {
      stage,
      progress,
      currentOperation: operation,
      stagesCompleted: this.getCompletedStages(stage)
    };
    
    if (this.progressCallback) {
      this.progressCallback(this.searchProgress);
    }
  }

  private getCompletedStages(currentStage: SearchProgress['stage']): string[] {
    const stages = ['interpreting', 'searching_db', 'osint_discovery', 'ai_analysis', 'completed'];
    const currentIndex = stages.indexOf(currentStage);
    return stages.slice(0, currentIndex);
  }

  private async searchInternalDatabase(interpretation: QueryInterpretation): Promise<SearchResult> {
    // Use existing search functionality but enhance with better filtering
    const searchParams = {
      query: interpretation.interpreted_intent,
      filters: this.convertInterpretationToFilters(interpretation),
      limit: 50
    };

    // Call the existing AI search
    const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
      body: {
        action: 'internal_search',
        data: searchParams
      }
    });

    if (error) {
      console.error('Internal search error:', error);
      return this.getFallbackInternalResults(interpretation);
    }

    return data;
  }

  private convertInterpretationToFilters(interpretation: QueryInterpretation) {
    const filters: any = {};
    
    interpretation.extracted_requirements.forEach(req => {
      switch (req.category) {
        case 'skills':
          if (!filters.skills) filters.skills = [];
          filters.skills.push(req.value);
          break;
        case 'experience':
          if (req.value.includes('+') || req.value.includes('years')) {
            const years = parseInt(req.value.match(/\d+/)?.[0] || '0');
            filters.experience_years = { min: years };
          }
          break;
        case 'location':
          filters.location = req.value;
          break;
      }
    });
    
    return filters;
  }

  private async executeOSINTDiscovery(searchPlan: OSINTSearchPlan): Promise<EnhancedCandidate[]> {
    console.log('Executing OSINT discovery with plan:', searchPlan);
    
    // In a real implementation, this would:
    // 1. Execute web scraping for each platform query
    // 2. Parse and extract candidate profiles
    // 3. Normalize data into EnhancedCandidate format
    
    // For now, return mock OSINT-discovered candidates
    return this.getMockOSINTCandidates();
  }

  private async combineCandidates(internal: EnhancedCandidate[], osint: EnhancedCandidate[]): Promise<EnhancedCandidate[]> {
    // Deduplicate by email and normalize profiles
    const candidateMap = new Map<string, EnhancedCandidate>();
    
    // Add internal candidates first (they have priority)
    internal.forEach(candidate => {
      candidateMap.set(candidate.email.toLowerCase(), candidate);
    });
    
    // Add OSINT candidates if not already present
    osint.forEach(candidate => {
      const key = candidate.email.toLowerCase();
      if (!candidateMap.has(key)) {
        candidateMap.set(key, {
          ...candidate,
          source_details: {
            type: 'osint',
            platform: 'multiple',
            verified: false,
            imported_date: new Date().toISOString(),
            confidence_score: 0.7
          }
        });
      } else {
        // Merge OSINT data with existing candidate
        const existing = candidateMap.get(key)!;
        candidateMap.set(key, this.mergeCandidateData(existing, candidate));
      }
    });
    
    return Array.from(candidateMap.values());
  }

  private mergeCandidateData(existing: EnhancedCandidate, osint: EnhancedCandidate): EnhancedCandidate {
    return {
      ...existing,
      // Enhance with OSINT data
      community_influence_score: Math.max(existing.community_influence_score, osint.community_influence_score),
      technical_depth_score: Math.max(existing.technical_depth_score, osint.technical_depth_score),
      // Merge skills
      skills: [...new Set([...existing.skills, ...osint.skills])],
      // Update OSINT profile with fresh data
      osint_profile: osint.osint_profile,
      osint_last_fetched: new Date().toISOString()
    };
  }

  private async performAIAnalysis(candidates: EnhancedCandidate[]): Promise<CandidateAnalysisResult[]> {
    const analyses: CandidateAnalysisResult[] = [];
    
    for (const candidate of candidates) {
      try {
        // Prepare OSINT data for analysis
        const osintData = {
          github: candidate.osint_profile.github ? {
            profile: candidate.osint_profile.github,
            repositories: [],
            contributions: []
          } : undefined,
          stackoverflow: candidate.osint_profile.stackoverflow ? {
            profile: candidate.osint_profile.stackoverflow,
            answers: [],
            questions: []
          } : undefined,
          linkedin: candidate.osint_profile.linkedin ? {
            profile: candidate.osint_profile.linkedin,
            connections: candidate.osint_profile.linkedin.connections || 0,
            posts: []
          } : undefined
        };
        
        const analysis = await candidateAnalysisService.analyzeCandidate(osintData, candidate.id);
        analyses.push(analysis);
      } catch (error) {
        console.error(`Failed to analyze candidate ${candidate.id}:`, error);
        // Continue with other candidates
      }
    }
    
    return analyses;
  }

  private async rankCandidates(candidates: EnhancedCandidate[], analyses: CandidateAnalysisResult[]): Promise<EnhancedCandidate[]> {
    // Create analysis lookup
    const analysisMap = new Map(analyses.map(a => [a.candidateId, a]));
    
    // Enhance candidates with AI analysis and calculate final scores
    const enhancedCandidates = candidates.map(candidate => {
      const analysis = analysisMap.get(candidate.id);
      
      if (analysis) {
        return {
          ...candidate,
          ai_summary: analysis.aiSummary,
          technical_depth_score: analysis.technicalDepthScore,
          community_influence_score: analysis.communityEngagementScore,
          match_score: this.calculateFinalMatchScore(candidate, analysis)
        };
      }
      
      return candidate;
    });
    
    // Sort by match score
    return enhancedCandidates.sort((a, b) => b.match_score - a.match_score);
  }

  private calculateFinalMatchScore(candidate: EnhancedCandidate, analysis: CandidateAnalysisResult): number {
    const baseScore = candidate.match_score || 75;
    const technicalWeight = analysis.technicalDepthScore * 0.3;
    const socialWeight = analysis.socialCredibilityScore * 0.2;
    const engagementWeight = analysis.communityEngagementScore * 0.2;
    const availabilityWeight = analysis.availabilitySignals.length > 0 ? 10 : 0;
    const riskPenalty = analysis.riskFlags.length * -5;
    
    return Math.min(Math.max(
      baseScore + technicalWeight + socialWeight + engagementWeight + availabilityWeight + riskPenalty,
      0
    ), 100);
  }

  private getFallbackInternalResults(interpretation: QueryInterpretation): SearchResult {
    return {
      candidates: [],
      total_found: 0,
      search_quality_score: 0.3,
      ai_interpretation: {
        original_query: interpretation.interpreted_intent,
        interpreted_intent: interpretation.interpreted_intent,
        extracted_requirements: interpretation.extracted_requirements,
        search_strategy: interpretation.search_strategy,
        confidence: interpretation.confidence
      },
      suggested_refinements: ['Try adding more specific skills', 'Include location preferences'],
      diversity_metrics: {
        gender_distribution: {},
        location_distribution: {},
        experience_distribution: {},
        background_diversity_score: 0
      }
    };
  }

  private getMockOSINTCandidates(): EnhancedCandidate[] {
    // Return mock candidates that would be discovered via OSINT
    return [
      {
        id: 'osint-1',
        name: 'Alex Thompson',
        handle: '@alexcodes',
        email: 'alex.thompson@email.com',
        location: 'Remote, US',
        current_title: 'Senior Software Engineer',
        current_company: 'TechStartup Inc',
        experience_years: 7,
        skills: ['Python', 'Machine Learning', 'AWS', 'Docker'],
        bio: 'ML engineer with focus on production systems',
        ai_summary: 'Experienced ML engineer discovered through GitHub activity',
        career_trajectory_analysis: {
          progression_type: 'ascending',
          growth_rate: 0.8,
          stability_score: 0.9,
          next_likely_move: 'Senior/Lead ML Engineer',
          timeline_events: []
        },
        technical_depth_score: 8.5,
        community_influence_score: 7.2,
        cultural_fit_indicators: [],
        learning_velocity_score: 8.0,
        osint_profile: {
          id: 'osint-profile-1',
          candidate_id: 'osint-1',
          overall_score: 8.0,
          influence_score: 7.2,
          technical_depth: 8.5,
          community_engagement: 7.8,
          learning_velocity: 8.0,
          availability_signals: [],
          github_profile: {
            username: 'alexcodes',
            public_repos: 25,
            followers: 150,
            top_languages: ['Python', 'JavaScript', 'Go'],
            contribution_activity: 850,
            notable_projects: [],
            open_source_contributions: 12
          },
          social_presence: {
            platforms: ['github', 'linkedin', 'twitter'],
            professional_consistency: 0.9,
            communication_style: 'technical',
            thought_leadership_score: 7.0
          },
          professional_reputation: {
            industry_recognition: [],
            conference_speaking: true,
            published_content: 3,
            community_involvement: [],
            expertise_areas: ['Machine Learning', 'Python', 'AWS']
          },
          github: {
            username: 'alexcodes',
            stars: 180,
            repos: 25,
            commits: 1200
          },
          linkedin: {
            connections: 450,
            url: 'https://linkedin.com/in/alexthompson'
          },
          stackoverflow: {
            reputation: 3500
          },
          twitter: {
            followers: 280,
            username: 'alexcodes'
          },
          reddit: { username: '' },
          devto: { username: '' },
          kaggle: { username: '' },
          medium: { username: '' },
          red_flags: [],
          last_updated: new Date().toISOString()
        },
        match_score: 88,
        relevance_factors: [],
        availability_status: 'passive',
        best_contact_method: {
          platform: 'linkedin',
          confidence: 0.8,
          best_time: 'weekday_evening',
          approach_style: 'technical'
        },
        profile_last_updated: new Date().toISOString(),
        osint_last_fetched: new Date().toISOString(),
        source_details: {
          type: 'osint',
          platform: 'github',
          verified: false,
          imported_date: new Date().toISOString(),
          confidence_score: 0.85
        }
      }
    ];
  }
}

export const enhancedSearchPipeline = new EnhancedSearchPipeline();
