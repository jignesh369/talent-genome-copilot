import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { supabase } from '@/integrations/supabase/client';
import { mindReaderService, MindReaderResponse } from './mindReaderService';

export interface QueryInterpretation {
  interpreted_intent: string;
  extracted_requirements: ExtractedRequirement[];
  search_strategy: string;
  confidence: number;
}

export interface ExtractedRequirement {
  category: 'skills' | 'experience' | 'location' | 'industry' | 'culture';
  value: string;
  importance: number;
  source: 'explicit' | 'inferred';
}

export interface PlatformSearchQuery {
  platform: 'linkedin' | 'github' | 'stackoverflow';
  search_queries: {
    type: 'broad' | 'targeted' | 'precise';
    query: string;
    expected_results: string;
  }[];
}

export class NaturalLanguageQueryService {
  async interpretQuery(userQuery: string): Promise<QueryInterpretation> {
    console.log('Interpreting natural language query with Mind Reader AI:', userQuery);
    
    try {
      // Use Mind Reader service for enhanced interpretation
      const mindReaderResult: MindReaderResponse = await mindReaderService.interpretHiringQuery(userQuery);
      
      // Convert Mind Reader format to existing QueryInterpretation format
      const extractedRequirements: ExtractedRequirement[] = [];
      
      // Add skills requirements
      mindReaderResult.job_specification.must_have_skills.forEach(skill => {
        extractedRequirements.push({
          category: 'skills',
          value: skill,
          importance: 0.9,
          source: 'explicit'
        });
      });
      
      mindReaderResult.job_specification.nice_to_have_skills.forEach(skill => {
        extractedRequirements.push({
          category: 'skills',
          value: skill,
          importance: 0.6,
          source: 'explicit'
        });
      });
      
      // Add experience requirement
      if (mindReaderResult.job_specification.years_of_experience) {
        extractedRequirements.push({
          category: 'experience',
          value: mindReaderResult.job_specification.years_of_experience,
          importance: 0.8,
          source: 'explicit'
        });
      }
      
      // Add location requirements
      mindReaderResult.job_specification.locations.forEach(location => {
        extractedRequirements.push({
          category: 'location',
          value: location,
          importance: 0.7,
          source: 'explicit'
        });
      });
      
      // Add industry requirements
      mindReaderResult.job_specification.industries.forEach(industry => {
        extractedRequirements.push({
          category: 'industry',
          value: industry,
          importance: 0.7,
          source: 'explicit'
        });
      });

      const result = {
        interpreted_intent: mindReaderResult.job_specification.job_title || 
          `Looking for candidates based on: ${userQuery}`,
        extracted_requirements: extractedRequirements,
        search_strategy: this.generateSearchStrategy(mindReaderResult.job_specification),
        confidence: mindReaderResult.confidence
      };

      // Store the query for analytics
      const { error: insertError } = await supabase
        .from('search_queries')
        .insert({
          original_query: userQuery,
          interpreted_intent: result.interpreted_intent,
          extracted_requirements: result.extracted_requirements,
          search_strategy: result.search_strategy,
          confidence_score: result.confidence
        });

      if (insertError) {
        console.error('Error storing search query:', insertError);
      }

      return result;
    } catch (error) {
      console.error('Failed to interpret query with Mind Reader:', error);
      return this.getFallbackInterpretation(userQuery);
    }
  }

  async generatePlatformSearchQueries(
    requirements: ExtractedRequirement[],
    platform: 'linkedin' | 'github' | 'stackoverflow'
  ): Promise<PlatformSearchQuery> {
    console.log(`Generating ${platform} search queries for requirements:`, requirements);
    
    // This is deterministic based on requirements, so we can generate locally
    return {
      platform,
      search_queries: this.createPlatformQueries(requirements, platform)
    };
  }

  private getFallbackInterpretation(query: string): QueryInterpretation {
    const lowercaseQuery = query.toLowerCase();
    
    return {
      interpreted_intent: this.generateInterpretedIntent(query),
      extracted_requirements: this.extractRequirements(query),
      search_strategy: this.generateSearchStrategy(query),
      confidence: 0.6 // Lower confidence for fallback
    };
  }

  private generateInterpretedIntent(query: string): string {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('react') || lowercaseQuery.includes('frontend')) {
      return 'Looking for frontend developers with React expertise';
    }
    if (lowercaseQuery.includes('backend') || lowercaseQuery.includes('api')) {
      return 'Seeking backend developers with API development experience';
    }
    if (lowercaseQuery.includes('fullstack') || lowercaseQuery.includes('full-stack')) {
      return 'Finding full-stack developers with comprehensive skills';
    }
    if (lowercaseQuery.includes('senior') || lowercaseQuery.includes('lead')) {
      return 'Searching for senior-level technical professionals';
    }
    
    return 'General technical talent search based on provided criteria';
  }

  private extractRequirements(query: string): ExtractedRequirement[] {
    const requirements: ExtractedRequirement[] = [];
    const lowercaseQuery = query.toLowerCase();
    
    // Extract skills
    const skillKeywords = ['react', 'node.js', 'python', 'java', 'typescript', 'aws', 'kubernetes'];
    skillKeywords.forEach(skill => {
      if (lowercaseQuery.includes(skill)) {
        requirements.push({
          category: 'skills',
          value: skill,
          importance: 0.9,
          source: 'explicit'
        });
      }
    });
    
    // Extract experience level
    if (lowercaseQuery.includes('senior') || lowercaseQuery.includes('lead')) {
      requirements.push({
        category: 'experience',
        value: 'senior',
        importance: 0.8,
        source: 'explicit'
      });
    }
    
    // Extract location hints
    const locationKeywords = ['remote', 'san francisco', 'new york', 'seattle'];
    locationKeywords.forEach(location => {
      if (lowercaseQuery.includes(location)) {
        requirements.push({
          category: 'location',
          value: location,
          importance: 0.7,
          source: 'explicit'
        });
      }
    });
    
    return requirements;
  }

  private generateSearchStrategy(jobSpec: any): string {
    const strategies = [];
    
    if (jobSpec.must_have_skills.length > 0) {
      strategies.push("Weighted technical skills matching based on GitHub and Stack Overflow activity");
    }
    
    if (jobSpec.years_of_experience) {
      strategies.push("Career progression analysis from LinkedIn and professional history");
    }
    
    if (jobSpec.industries.length > 0) {
      strategies.push("Industry background matching using company history and project types");
    }
    
    if (jobSpec.working_model) {
      strategies.push("Work preference alignment and location-based filtering");
    }

    return strategies.length > 0 ? 
      strategies.join('. ') + '.' : 
      'Multi-platform search combining LinkedIn profile matching, GitHub activity analysis, and Stack Overflow expertise validation';
  }

  private createPlatformQueries(
    requirements: ExtractedRequirement[],
    platform: 'linkedin' | 'github' | 'stackoverflow'
  ) {
    const skills = requirements.filter(r => r.category === 'skills').map(r => r.value);
    const experience = requirements.find(r => r.category === 'experience')?.value;
    
    switch (platform) {
      case 'linkedin':
        return [
          {
            type: 'broad' as const,
            query: `${skills.join(' OR ')} developer`,
            expected_results: '500-1000'
          },
          {
            type: 'targeted' as const,
            query: `"${skills[0]}" AND "${skills[1] || 'software'}" ${experience || ''}`,
            expected_results: '100-300'
          },
          {
            type: 'precise' as const,
            query: `"${experience || 'Senior'} ${skills[0]} Developer" AND "${skills.slice(1).join('" AND "')}"`,
            expected_results: '20-50'
          }
        ];
        
      case 'github':
        return [
          {
            type: 'broad' as const,
            query: `language:${skills[0]} followers:>10`,
            expected_results: '200-500'
          },
          {
            type: 'targeted' as const,
            query: `language:${skills[0]} stars:>50 ${skills.slice(1).join(' ')}`,
            expected_results: '50-150'
          },
          {
            type: 'precise' as const,
            query: `language:${skills[0]} stars:>100 followers:>50 ${skills.slice(1).join(' ')}`,
            expected_results: '10-30'
          }
        ];
        
      case 'stackoverflow':
        return [
          {
            type: 'broad' as const,
            query: `[${skills.join('] [')}] reputation:>1000`,
            expected_results: '100-300'
          },
          {
            type: 'targeted' as const,
            query: `[${skills[0]}] reputation:>5000 answers:>10`,
            expected_results: '30-80'
          },
          {
            type: 'precise' as const,
            query: `[${skills[0]}] reputation:>10000 gold-badges:>1`,
            expected_results: '5-20'
          }
        ];
        
      default:
        return [];
    }
  }
}

export const naturalLanguageQueryService = new NaturalLanguageQueryService();
