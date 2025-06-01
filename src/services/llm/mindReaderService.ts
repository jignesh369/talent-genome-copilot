
import { supabase } from '@/integrations/supabase/client';

export interface JobSpecification {
  job_title: string;
  must_have_skills: string[];
  nice_to_have_skills: string[];
  years_of_experience: string;
  locations: string[];
  industries: string[];
  working_model: 'remote' | 'hybrid' | 'onsite';
}

export interface MindReaderResponse {
  job_specification: JobSpecification;
  confidence: number;
}

export class MindReaderService {
  async interpretHiringQuery(query: string): Promise<MindReaderResponse> {
    console.log('Mind Reader interpreting query:', query);
    
    try {
      // Try to use the edge function first
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'mind_reader_interpret',
          data: { query }
        }
      });

      if (error) {
        console.error('Mind Reader edge function error:', error);
        return this.getFallbackInterpretation(query);
      }

      return data;
    } catch (error) {
      console.error('Mind Reader service error:', error);
      return this.getFallbackInterpretation(query);
    }
  }

  private getFallbackInterpretation(query: string): MindReaderResponse {
    console.log('Using fallback interpretation for:', query);
    
    const lowercaseQuery = query.toLowerCase();
    
    // Extract job title
    let jobTitle = 'Software Engineer';
    if (lowercaseQuery.includes('react') || lowercaseQuery.includes('frontend')) {
      jobTitle = 'React Developer';
    } else if (lowercaseQuery.includes('backend') || lowercaseQuery.includes('api')) {
      jobTitle = 'Backend Developer';
    } else if (lowercaseQuery.includes('fullstack') || lowercaseQuery.includes('full-stack')) {
      jobTitle = 'Full Stack Developer';
    } else if (lowercaseQuery.includes('python')) {
      jobTitle = 'Python Developer';
    } else if (lowercaseQuery.includes('devops')) {
      jobTitle = 'DevOps Engineer';
    }

    // Extract skills
    const mustHaveSkills = [];
    const niceToHaveSkills = [];
    
    const skillKeywords = ['react', 'python', 'java', 'javascript', 'typescript', 'node.js', 'aws', 'kubernetes', 'docker'];
    skillKeywords.forEach(skill => {
      if (lowercaseQuery.includes(skill)) {
        mustHaveSkills.push(skill);
      }
    });

    if (mustHaveSkills.length === 0) {
      mustHaveSkills.push('JavaScript'); // Default skill
    }

    // Extract experience
    let experience = '3+ years';
    if (lowercaseQuery.includes('senior')) {
      experience = '5+ years';
    } else if (lowercaseQuery.includes('junior')) {
      experience = '1-2 years';
    } else if (lowercaseQuery.includes('lead') || lowercaseQuery.includes('principal')) {
      experience = '8+ years';
    }

    // Extract locations
    const locations = [];
    if (lowercaseQuery.includes('remote')) {
      locations.push('Remote');
    }
    if (lowercaseQuery.includes('san francisco') || lowercaseQuery.includes('sf')) {
      locations.push('San Francisco');
    }
    if (lowercaseQuery.includes('new york') || lowercaseQuery.includes('nyc')) {
      locations.push('New York');
    }
    if (locations.length === 0) {
      locations.push('Remote'); // Default to remote
    }

    // Extract industries
    const industries = [];
    if (lowercaseQuery.includes('fintech')) {
      industries.push('Financial Technology');
    }
    if (lowercaseQuery.includes('startup')) {
      industries.push('Startup');
    }
    if (lowercaseQuery.includes('enterprise')) {
      industries.push('Enterprise');
    }

    // Extract working model
    let workingModel: 'remote' | 'hybrid' | 'onsite' = 'hybrid';
    if (lowercaseQuery.includes('remote')) {
      workingModel = 'remote';
    } else if (lowercaseQuery.includes('onsite') || lowercaseQuery.includes('office')) {
      workingModel = 'onsite';
    }

    return {
      job_specification: {
        job_title: jobTitle,
        must_have_skills: mustHaveSkills,
        nice_to_have_skills: niceToHaveSkills,
        years_of_experience: experience,
        locations: locations,
        industries: industries,
        working_model: workingModel
      },
      confidence: 0.7 // Lower confidence for fallback
    };
  }
}

export const mindReaderService = new MindReaderService();
