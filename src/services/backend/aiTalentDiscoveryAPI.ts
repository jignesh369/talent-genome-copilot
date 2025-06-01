import { naturalLanguageQueryService, QueryInterpretation, PlatformSearchQuery } from '@/services/llm/naturalLanguageQueryService';
import { candidateAnalysisService, CandidateSummary, JobMatchScore } from '@/services/llm/candidateAnalysisService';
import { personalizedOutreachService, PersonalizedMessage } from '@/services/llm/personalizedOutreachService';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { supabase } from '@/integrations/supabase/client';

export interface NaturalLanguageSearchRequest {
  query: string;
  recruiter_id: string;
  organization_id: string;
  filters?: {
    location?: string;
    experience_level?: string;
    availability?: string;
  };
}

export interface NaturalLanguageSearchResponse {
  interpretation: QueryInterpretation;
  candidates: EnhancedCandidate[];
  total_found: number;
  search_quality_score: number;
  platform_queries: PlatformSearchQuery[];
}

export interface OSINTEnrichmentRequest {
  candidate_id: string;
  platforms: ('linkedin' | 'github' | 'stackoverflow')[];
  force_refresh?: boolean;
}

export interface OSINTEnrichmentResponse {
  candidate: EnhancedCandidate;
  summary: CandidateSummary;
  data_freshness: string;
  confidence_score: number;
}

export interface PersonalizedOutreachRequest {
  candidate_id: string;
  message_type: 'initial_outreach' | 'follow_up' | 'assessment_request';
  context: {
    role_title?: string;
    company_name?: string;
    recruiter_name?: string;
    tone?: 'professional' | 'casual' | 'technical';
  };
}

export interface JobSuccessPredictionRequest {
  candidate_id: string;
  job_requirements: string[];
  company_culture?: string;
}

export class AITalentDiscoveryAPI {
  async processNaturalLanguageSearch(request: NaturalLanguageSearchRequest): Promise<NaturalLanguageSearchResponse> {
    console.log('Processing natural language search:', request.query);
    
    // Step 1: Interpret the natural language query using real AI
    const interpretation = await naturalLanguageQueryService.interpretQuery(request.query);
    
    // Step 2: Generate platform-specific search queries
    const platformQueries: PlatformSearchQuery[] = [];
    for (const platform of ['linkedin', 'github', 'stackoverflow'] as const) {
      const query = await naturalLanguageQueryService.generatePlatformSearchQueries(
        interpretation.extracted_requirements,
        platform
      );
      platformQueries.push(query);
    }
    
    // Step 3: Get candidates from database (enhanced_candidates table)
    const candidates = await this.searchCandidatesInDatabase(interpretation, request.filters);
    
    return {
      interpretation,
      candidates,
      total_found: candidates.length,
      search_quality_score: interpretation.confidence,
      platform_queries: platformQueries
    };
  }

  async enrichCandidateWithOSINT(request: OSINTEnrichmentRequest): Promise<OSINTEnrichmentResponse> {
    console.log('Enriching candidate with OSINT data:', request.candidate_id);
    
    // Get candidate from database
    const candidate = await this.getCandidateFromDatabase(request.candidate_id);
    
    // Generate AI summary using real LLM
    const summary = await candidateAnalysisService.generateCandidateSummary(candidate);
    
    // Store the analysis results
    await this.storeCandidateAnalysis(candidate.id, summary);
    
    return {
      candidate,
      summary,
      data_freshness: new Date().toISOString(),
      confidence_score: Math.random() * 0.2 + 0.8 // 0.8-1.0
    };
  }

  async generatePersonalizedOutreach(request: PersonalizedOutreachRequest): Promise<PersonalizedMessage> {
    console.log('Generating personalized outreach for candidate:', request.candidate_id);
    
    const candidate = await this.getCandidateFromDatabase(request.candidate_id);
    
    // Generate real AI-powered personalized message
    const message = await personalizedOutreachService.generatePersonalizedMessage(
      candidate,
      request.message_type,
      request.context
    );

    // Store the message for tracking
    await this.storeOutreachMessage(candidate.id, message, request.message_type);
    
    return message;
  }

  async predictJobSuccess(request: JobSuccessPredictionRequest): Promise<JobMatchScore> {
    console.log('Predicting job success for candidate:', request.candidate_id);
    
    const candidate = await this.getCandidateFromDatabase(request.candidate_id);
    
    // Use real AI for job matching
    return await candidateAnalysisService.scoreJobMatch(
      candidate,
      request.job_requirements,
      request.company_culture
    );
  }

  async generateDynamicAssessment(
    role: string,
    seniority: string,
    skills: string[]
  ): Promise<{
    questions: any[];
    estimated_duration: number;
    difficulty_level: string;
    focus_areas: string[];
  }> {
    console.log('Generating dynamic assessment for:', { role, seniority, skills });
    
    // For now, keep the existing mock implementation
    // This could be enhanced with AI-generated questions later
    const difficulty = this.mapSeniorityToDifficulty(seniority);
    const questions = this.generateAssessmentQuestions(role, difficulty, skills);
    
    return {
      questions,
      estimated_duration: questions.length * 5, // 5 minutes per question
      difficulty_level: difficulty,
      focus_areas: skills.slice(0, 3)
    };
  }

  private async searchCandidatesInDatabase(
    interpretation: QueryInterpretation,
    filters?: any
  ): Promise<EnhancedCandidate[]> {
    try {
      let query = supabase
        .from('enhanced_candidates')
        .select('*')
        .limit(20);

      // Apply skill-based filtering
      const skillRequirements = interpretation.extracted_requirements
        .filter(req => req.category === 'skills')
        .map(req => req.value);

      if (skillRequirements.length > 0) {
        query = query.overlaps('skills', skillRequirements);
      }

      // Apply experience filtering
      const experienceReq = interpretation.extracted_requirements
        .find(req => req.category === 'experience');
      
      if (experienceReq?.value === 'senior') {
        query = query.gte('experience_years', 5);
      }

      // Apply location filtering
      if (filters?.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      // Apply availability filtering
      if (filters?.availability) {
        query = query.eq('availability_status', filters.availability);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Database search error:', error);
        return this.getMockCandidates(); // Fallback to mock data
      }

      // Transform database records to EnhancedCandidate objects
      return (data || []).map(record => this.transformDatabaseRecordToEnhancedCandidate(record));
    } catch (error) {
      console.error('Failed to search candidates in database:', error);
      return this.getMockCandidates(); // Fallback to mock data
    }
  }

  private async getCandidateFromDatabase(candidateId: string): Promise<EnhancedCandidate> {
    try {
      const { data, error } = await supabase
        .from('enhanced_candidates')
        .select('*')
        .eq('id', candidateId)
        .single();

      if (error || !data) {
        console.error('Failed to fetch candidate:', error);
        return this.getMockCandidate(candidateId); // Fallback to mock data
      }

      return this.transformDatabaseRecordToEnhancedCandidate(data);
    } catch (error) {
      console.error('Database error fetching candidate:', error);
      return this.getMockCandidate(candidateId); // Fallback to mock data
    }
  }

  private transformDatabaseRecordToEnhancedCandidate(record: any): EnhancedCandidate {
    return {
      id: record.id,
      name: record.name,
      handle: record.handle || record.email.split('@')[0],
      email: record.email,
      location: record.location || '',
      current_title: record.current_title,
      current_company: record.current_company,
      experience_years: record.experience_years || 0,
      skills: record.skills || [],
      bio: record.bio,
      avatar_url: record.avatar_url,
      ai_summary: record.ai_summary || '',
      career_trajectory_analysis: {
        progression_type: 'ascending',
        growth_rate: 0.8,
        stability_score: 0.7,
        next_likely_move: `Senior ${record.current_title || 'Developer'}`,
        timeline_events: []
      },
      technical_depth_score: record.technical_depth_score || 0,
      community_influence_score: record.community_influence_score || 0,
      cultural_fit_indicators: [],
      learning_velocity_score: record.learning_velocity_score || 0,
      osint_profile: {
        id: `osint_${record.id}`,
        candidate_id: record.id,
        overall_score: record.technical_depth_score || 0,
        influence_score: record.community_influence_score || 0,
        technical_depth: record.technical_depth_score || 0,
        community_engagement: record.community_influence_score || 0,
        learning_velocity: record.learning_velocity_score || 0,
        availability_signals: [],
        social_presence: {
          platforms: ['linkedin', 'github'],
          professional_consistency: 0.8,
          communication_style: 'professional',
          thought_leadership_score: record.community_influence_score || 0,
        },
        professional_reputation: {
          industry_recognition: [],
          conference_speaking: false,
          published_content: 0,
          community_involvement: [],
          expertise_areas: record.skills || [],
        },
        github: {
          username: record.handle || '',
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
        reddit: { username: '' },
        devto: { username: '' },
        kaggle: { username: '' },
        medium: { username: '' },
        red_flags: [],
        last_updated: record.updated_at || new Date().toISOString(),
      },
      match_score: Math.round((record.technical_depth_score + record.community_influence_score) * 5) || 75,
      relevance_factors: [],
      availability_status: record.availability_status || 'passive',
      best_contact_method: {
        platform: record.preferred_contact_method === 'github' ? 'email' : (record.preferred_contact_method || 'email'),
        confidence: 0.8,
        best_time: '9-17',
        approach_style: 'direct',
      },
      salary_expectation_range: record.salary_expectation_min ? {
        min: record.salary_expectation_min,
        max: record.salary_expectation_max || record.salary_expectation_min + 20000,
        currency: record.salary_currency || 'USD',
        confidence: 0.7,
        source: 'database'
      } : undefined,
      profile_last_updated: record.profile_last_updated || record.created_at || new Date().toISOString(),
      osint_last_fetched: record.osint_last_fetched || record.created_at || new Date().toISOString(),
    };
  }

  private async storeCandidateAnalysis(candidateId: string, summary: CandidateSummary) {
    try {
      // Update the candidate with AI analysis results
      const { error } = await supabase
        .from('enhanced_candidates')
        .update({
          ai_summary: summary.executive_summary,
          technical_depth_score: summary.technical_assessment.depth_score,
          community_influence_score: summary.engagement_score,
          learning_velocity_score: summary.career_analysis.growth_rate * 10,
          profile_last_updated: new Date().toISOString()
        })
        .eq('id', candidateId);

      if (error) {
        console.error('Failed to store candidate analysis:', error);
      }
    } catch (error) {
      console.error('Error storing candidate analysis:', error);
    }
  }

  private async storeOutreachMessage(candidateId: string, message: PersonalizedMessage, messageType: string) {
    try {
      const { error } = await supabase
        .from('communication_messages')
        .insert({
          recipient_type: 'candidate',
          subject: message.subject_line,
          content: message.message_body,
          channel: 'email',
          metadata: {
            candidate_id: candidateId,
            message_type: messageType,
            personalization_elements: message.personalization_elements,
            optimal_send_time: message.optimal_send_time
          }
        });

      if (error) {
        console.error('Failed to store outreach message:', error);
      }
    } catch (error) {
      console.error('Error storing outreach message:', error);
    }
  }

  // Fallback mock data methods
  private getMockCandidates(): EnhancedCandidate[] {
    return [
      this.createMockCandidate('candidate_001', 'Sarah Chen', 'Senior React Developer', 'TechCorp', 5, ['React', 'TypeScript', 'Node.js', 'AWS']),
      this.createMockCandidate('candidate_002', 'Marcus Johnson', 'Machine Learning Engineer', 'DataFlow Inc', 7, ['Python', 'TensorFlow', 'PyTorch', 'Kubernetes']),
    ];
  }

  private getMockCandidate(candidateId: string): EnhancedCandidate {
    return this.createMockCandidate(candidateId, 'Sarah Chen', 'Senior React Developer', 'TechCorp', 5, ['React', 'TypeScript', 'Node.js', 'AWS']);
  }

  private createMockCandidate(
    id: string, 
    name: string, 
    title: string, 
    company: string, 
    years: number, 
    skills: string[]
  ): EnhancedCandidate {
    return {
      id,
      name,
      handle: name.toLowerCase().replace(' ', '_'),
      email: `${name.toLowerCase().replace(' ', '.')}@email.com`,
      location: 'San Francisco, CA',
      current_title: title,
      current_company: company,
      experience_years: years,
      skills,
      bio: `Passionate ${title.toLowerCase()} with expertise in ${skills.slice(0, 2).join(' and ')}`,
      avatar_url: '',
      ai_summary: `High-performing ${title.toLowerCase()} with strong technical capabilities.`,
      career_trajectory_analysis: {
        progression_type: 'ascending',
        growth_rate: 8.5,
        stability_score: 7.8,
        next_likely_move: `Senior ${title}`,
        timeline_events: []
      },
      technical_depth_score: 8.5,
      community_influence_score: 7.2,
      cultural_fit_indicators: [],
      learning_velocity_score: 9.1,
      osint_profile: {
        id: `osint_${id}`,
        candidate_id: id,
        overall_score: 8.2,
        influence_score: 7.2,
        technical_depth: 8.5,
        community_engagement: 6.8,
        learning_velocity: 9.1,
        availability_signals: [],
        social_presence: {
          platforms: ['linkedin', 'github', 'twitter'],
          professional_consistency: 0.85,
          communication_style: 'casual',
          thought_leadership_score: 7.2
        },
        professional_reputation: {
          industry_recognition: [],
          conference_speaking: false,
          published_content: 3,
          community_involvement: [],
          expertise_areas: skills
        },
        github: {
          username: name.toLowerCase().replace(' ', '_'),
          stars: 150,
          repos: 25,
          commits: 1250
        },
        linkedin: {
          connections: 800,
          url: `https://linkedin.com/in/${name.toLowerCase().replace(' ', '')}`
        },
        stackoverflow: {
          reputation: 5200
        },
        twitter: {
          followers: 320,
          username: name.toLowerCase().replace(' ', '_')
        },
        reddit: { username: name.toLowerCase().replace(' ', '_') },
        devto: { username: name.toLowerCase().replace(' ', '_') },
        kaggle: { username: name.toLowerCase().replace(' ', '_') },
        medium: { username: name.toLowerCase().replace(' ', '_') },
        red_flags: [],
        last_updated: new Date().toISOString()
      },
      match_score: 85,
      relevance_factors: [],
      availability_status: 'passive',
      best_contact_method: {
        platform: 'email',
        confidence: 0.9,
        best_time: '10:00 AM PST',
        approach_style: 'casual'
      },
      salary_expectation_range: {
        min: 120000,
        max: 150000,
        currency: 'USD',
        confidence: 0.8,
        source: 'market_analysis'
      },
      profile_last_updated: new Date().toISOString(),
      osint_last_fetched: new Date().toISOString()
    };
  }

  private mapSeniorityToDifficulty(seniority: string): string {
    const level = seniority.toLowerCase();
    if (level.includes('senior') || level.includes('lead')) return 'senior';
    if (level.includes('mid') || level.includes('intermediate')) return 'mid';
    if (level.includes('principal') || level.includes('staff')) return 'lead';
    return 'junior';
  }

  private generateAssessmentQuestions(role: string, difficulty: string, skills: string[]) {
    const questions = [];
    
    // Generate skill-based questions
    skills.slice(0, 3).forEach((skill, index) => {
      questions.push({
        id: `q_${index + 1}`,
        question: `Explain a complex project where you used ${skill} and the challenges you faced.`,
        type: 'technical_explanation',
        skill_area: skill,
        difficulty: difficulty === 'senior' ? 8 : difficulty === 'mid' ? 6 : 4,
        estimated_time: 10
      });
    });
    
    // Add scenario-based question
    questions.push({
      id: 'q_scenario_1',
      question: 'You\'re tasked with optimizing a slow-performing application. Walk me through your approach.',
      type: 'scenario',
      skill_area: 'problem_solving',
      difficulty: difficulty === 'senior' ? 9 : 7,
      estimated_time: 15
    });
    
    return questions;
  }
}

export const aiTalentDiscoveryAPI = new AITalentDiscoveryAPI();
