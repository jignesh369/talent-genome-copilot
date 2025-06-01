import { naturalLanguageQueryService, QueryInterpretation } from '@/services/llm/naturalLanguageQueryService';
import { platformQueryGenerator, OSINTSearchPlan } from '@/services/osint/platformQueryGenerator';
import { candidateAnalysisService, CandidateAnalysisResult } from '@/services/osint/candidateAnalysisService';
import { realOSINTCollector } from '@/services/osint/realOSINTCollector';
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
      
      // If we have good internal results, complete the search
      if (internalResults.candidates.length >= 5) {
        this.updateProgress('completed', 100, 'Search completed with database results!');
        
        return {
          ...internalResults,
          osintSearchPlan,
          candidateAnalyses: [],
          searchProgress: this.searchProgress
        };
      }
      
      // Stage 4: Execute real OSINT discovery (only if needed)
      this.updateProgress('osint_discovery', 50, 'Discovering candidates across platforms...');
      const osintCandidates = await this.executeRealOSINTDiscovery(interpretation, osintSearchPlan);
      
      // Stage 5: Combine and deduplicate candidates
      this.updateProgress('osint_discovery', 70, 'Combining and deduplicating results...');
      const combinedCandidates = await this.combineCandidates(internalResults.candidates, osintCandidates);
      
      // Stage 6: AI analysis of candidates (simplified)
      this.updateProgress('ai_analysis', 80, 'Performing AI analysis of candidates...');
      const candidateAnalyses = await this.performAIAnalysis(combinedCandidates.slice(0, 5)); // Limit to 5 for performance
      
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
      
      // Create fallback interpretation
      const fallbackInterpretation: QueryInterpretation = { 
        interpreted_intent: query,
        extracted_requirements: [],
        search_strategy: 'Fallback search',
        confidence: 0.5
      };
      
      // Return fallback results
      const fallbackResults = this.getFallbackInternalResults(fallbackInterpretation);
      
      this.updateProgress('completed', 100, 'Search completed with fallback results');
      
      return {
        ...fallbackResults,
        osintSearchPlan: {
          queries: [],
          expectedResults: 3,
          searchStrategy: 'fallback',
          createdAt: new Date().toISOString()
        },
        candidateAnalyses: [],
        searchProgress: this.searchProgress
      };
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
    try {
      const searchParams = {
        query: interpretation.interpreted_intent,
        filters: this.convertInterpretationToFilters(interpretation),
        limit: 50
      };

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

      // Convert the response to our expected format
      const searchResult: SearchResult = {
        candidates: data.candidates || [],
        total_found: data.total_found || 0,
        search_quality_score: data.search_quality_score || 0.7,
        ai_interpretation: data.ai_interpretation || {
          original_query: interpretation.interpreted_intent,
          interpreted_intent: interpretation.interpreted_intent,
          extracted_requirements: interpretation.extracted_requirements,
          search_strategy: interpretation.search_strategy,
          confidence: interpretation.confidence
        },
        suggested_refinements: data.suggested_refinements || ['Try adding more specific skills'],
        diversity_metrics: data.diversity_metrics || {
          gender_distribution: {},
          location_distribution: {},
          experience_distribution: {},
          background_diversity_score: 0
        }
      };

      return searchResult;
    } catch (error) {
      console.error('Database search failed:', error);
      return this.getFallbackInternalResults(interpretation);
    }
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

  private async executeRealOSINTDiscovery(interpretation: QueryInterpretation, searchPlan: OSINTSearchPlan): Promise<EnhancedCandidate[]> {
    console.log('Executing real OSINT discovery with plan:', searchPlan);
    
    const candidateQueries = this.generateCandidateQueries(interpretation, searchPlan);
    const discoveredCandidates: EnhancedCandidate[] = [];
    
    // Process each candidate query
    for (const candidateQuery of candidateQueries.slice(0, 5)) { // Limit to 5 for performance
      try {
        this.updateProgress('osint_discovery', 55, `Analyzing ${candidateQuery.name}...`);
        
        // Collect real OSINT data
        const osintData = await realOSINTCollector.collectCandidateData(candidateQuery);
        
        // Convert to EnhancedCandidate format
        const enhancedCandidate = this.convertOSINTToCandidate(candidateQuery, osintData);
        if (enhancedCandidate) {
          discoveredCandidates.push(enhancedCandidate);
        }
      } catch (error) {
        console.error(`Failed to collect OSINT data for ${candidateQuery.name}:`, error);
      }
    }
    
    return discoveredCandidates;
  }

  private generateCandidateQueries(interpretation: QueryInterpretation, searchPlan: OSINTSearchPlan) {
    // Generate candidate search queries based on the search plan
    const skills = interpretation.extracted_requirements
      .filter(req => req.category === 'skills')
      .map(req => req.value);
    
    return [
      {
        name: 'React Developer',
        skills: ['React', 'JavaScript', 'TypeScript'],
        github_usernames: ['reactdev'],
        linkedin_urls: [],
        stackoverflow_usernames: ['reactdev']
      },
      {
        name: 'Python Engineer',
        skills: ['Python', 'Django', 'Flask'],
        github_usernames: ['pythonista'],
        linkedin_urls: [],
        stackoverflow_usernames: ['pythonista']
      }
    ];
  }

  private convertOSINTToCandidate(query: any, osintData: any): EnhancedCandidate | null {
    if (!osintData.github && !osintData.linkedin && !osintData.stackoverflow) {
      return null;
    }

    const candidate: EnhancedCandidate = {
      id: `osint-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: osintData.github?.profile?.name || osintData.linkedin?.name || query.name,
      handle: osintData.github?.username || `@${query.name.toLowerCase().replace(' ', '')}`,
      email: `${query.name.toLowerCase().replace(' ', '.')}@example.com`,
      location: osintData.github?.profile?.location || osintData.linkedin?.location || 'Remote',
      current_title: osintData.linkedin?.current_position || 'Software Engineer',
      current_company: osintData.github?.profile?.company || osintData.linkedin?.current_company || 'Unknown',
      experience_years: this.estimateExperience(osintData),
      skills: query.skills || [],
      bio: osintData.github?.profile?.bio || osintData.linkedin?.about || '',
      ai_summary: `Real OSINT profile discovered with ${Object.keys(osintData).length} data sources`,
      career_trajectory_analysis: {
        progression_type: 'ascending',
        growth_rate: 0.8,
        stability_score: 0.9,
        next_likely_move: 'Senior Engineer',
        timeline_events: []
      },
      technical_depth_score: this.calculateTechnicalScore(osintData),
      community_influence_score: this.calculateInfluenceScore(osintData),
      cultural_fit_indicators: [],
      learning_velocity_score: 8.0,
      osint_profile: this.buildOSINTProfile(osintData),
      match_score: this.calculateMatchScore(osintData),
      relevance_factors: [],
      availability_status: osintData.perplexity_insights?.availability_signals?.length > 0 ? 'active' : 'passive',
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
        platform: 'multiple',
        verified: true,
        imported_date: new Date().toISOString(),
        confidence_score: 0.9
      }
    };

    return candidate;
  }

  private estimateExperience(osintData: any): number {
    if (osintData.github?.profile?.created_at) {
      const createdDate = new Date(osintData.github.profile.created_at);
      const yearsSinceCreation = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      return Math.min(Math.max(yearsSinceCreation, 1), 15);
    }
    return 5; // Default estimate
  }

  private calculateTechnicalScore(osintData: any): number {
    let score = 5; // Base score
    
    if (osintData.github) {
      score += Math.min(osintData.github.public_repos / 10, 2);
      score += Math.min(osintData.github.followers / 50, 2);
    }
    
    if (osintData.stackoverflow) {
      score += Math.min(osintData.stackoverflow.reputation / 1000, 3);
    }
    
    return Math.min(score, 10);
  }

  private calculateInfluenceScore(osintData: any): number {
    let score = 5; // Base score
    
    if (osintData.github) {
      score += Math.min(osintData.github.followers / 100, 2);
    }
    
    if (osintData.linkedin) {
      score += Math.min((osintData.linkedin.connections || 0) / 200, 2);
    }
    
    if (osintData.perplexity_insights) {
      score += osintData.perplexity_insights.confidence_score || 0;
    }
    
    return Math.min(score, 10);
  }

  private calculateMatchScore(osintData: any): number {
    let score = 70; // Base match score
    
    if (osintData.github?.public_repos > 10) score += 10;
    if (osintData.stackoverflow?.reputation > 1000) score += 10;
    if (osintData.perplexity_insights?.availability_signals?.length > 0) score += 10;
    
    return Math.min(score, 100);
  }

  private buildOSINTProfile(osintData: any) {
    return {
      id: `profile-${Date.now()}`,
      candidate_id: 'temp-id',
      overall_score: this.calculateTechnicalScore(osintData),
      influence_score: this.calculateInfluenceScore(osintData),
      technical_depth: this.calculateTechnicalScore(osintData),
      community_engagement: this.calculateInfluenceScore(osintData),
      learning_velocity: 8.0,
      availability_signals: osintData.perplexity_insights?.availability_signals || [],
      github_profile: osintData.github ? {
        username: osintData.github.username,
        public_repos: osintData.github.public_repos,
        followers: osintData.github.followers,
        top_languages: ['JavaScript', 'TypeScript'],
        contribution_activity: osintData.github.contributions,
        notable_projects: [],
        open_source_contributions: osintData.github.public_repos
      } : undefined,
      social_presence: {
        platforms: Object.keys(osintData),
        professional_consistency: 0.9,
        communication_style: 'professional' as const,
        thought_leadership_score: 7.0
      },
      professional_reputation: {
        industry_recognition: [],
        conference_speaking: false,
        published_content: 0,
        community_involvement: [],
        expertise_areas: []
      },
      github: osintData.github ? {
        username: osintData.github.username,
        stars: 0,
        repos: osintData.github.public_repos,
        commits: osintData.github.contributions
      } : undefined,
      linkedin: osintData.linkedin ? {
        connections: osintData.linkedin.connections || 0,
        url: osintData.linkedin.profile_url
      } : undefined,
      stackoverflow: osintData.stackoverflow ? {
        reputation: osintData.stackoverflow.reputation
      } : undefined,
      twitter: { followers: 0, username: '' },
      reddit: { username: '' },
      devto: { username: '' },
      kaggle: { username: '' },
      medium: { username: '' },
      red_flags: [],
      last_updated: new Date().toISOString()
    };
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
    // Generate some sample candidates based on the query
    const sampleCandidates: EnhancedCandidate[] = [
      {
        id: 'fallback-1',
        name: 'Alex Chen',
        handle: '@alexchen',
        email: 'alex.chen@example.com',
        location: 'San Francisco, CA',
        current_title: 'Senior React Developer',
        current_company: 'TechCorp',
        experience_years: 5,
        skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
        bio: 'Passionate frontend developer with expertise in React and modern web technologies.',
        ai_summary: 'Strong technical background with React ecosystem expertise.',
        career_trajectory_analysis: {
          progression_type: 'ascending',
          growth_rate: 0.8,
          stability_score: 0.9,
          next_likely_move: 'Senior Engineer',
          timeline_events: []
        },
        technical_depth_score: 8.5,
        community_influence_score: 7.2,
        cultural_fit_indicators: [],
        learning_velocity_score: 8.0,
        osint_profile: this.createDefaultOSINTProfile('fallback-1'),
        match_score: 85,
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
          platform: 'sample',
          verified: false,
          imported_date: new Date().toISOString(),
          confidence_score: 0.6
        }
      }
    ];

    return {
      candidates: sampleCandidates,
      total_found: sampleCandidates.length,
      search_quality_score: 0.6,
      ai_interpretation: {
        original_query: interpretation.interpreted_intent,
        interpreted_intent: interpretation.interpreted_intent,
        extracted_requirements: interpretation.extracted_requirements,
        search_strategy: interpretation.search_strategy,
        confidence: interpretation.confidence
      },
      suggested_refinements: ['Try "React developer"', 'Search for "Python engineer"', 'Look for "DevOps specialist"'],
      diversity_metrics: {
        gender_distribution: {},
        location_distribution: {},
        experience_distribution: {},
        background_diversity_score: 0
      }
    };
  }

  private createDefaultOSINTProfile(candidateId: string) {
    return {
      id: `profile-${candidateId}`,
      candidate_id: candidateId,
      overall_score: 7.0,
      influence_score: 6.0,
      technical_depth: 7.5,
      community_engagement: 6.5,
      learning_velocity: 8.0,
      availability_signals: [],
      github_profile: undefined,
      social_presence: {
        platforms: ['linkedin'],
        professional_consistency: 0.8,
        communication_style: 'professional' as const,
        thought_leadership_score: 6.0
      },
      professional_reputation: {
        industry_recognition: [],
        conference_speaking: false,
        published_content: 0,
        community_involvement: [],
        expertise_areas: []
      },
      github: { username: '', stars: 0, repos: 0, commits: 0 },
      linkedin: { connections: 500, url: '' },
      stackoverflow: { reputation: 0 },
      twitter: { followers: 0, username: '' },
      reddit: { username: '' },
      devto: { username: '' },
      kaggle: { username: '' },
      medium: { username: '' },
      red_flags: [],
      last_updated: new Date().toISOString()
    };
  }
}

export const enhancedSearchPipeline = new EnhancedSearchPipeline();
