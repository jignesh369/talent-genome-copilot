
import { supabase } from '@/integrations/supabase/client';

export interface MindReaderJobSpec {
  job_title: string;
  must_have_skills: string[];
  nice_to_have_skills: string[];
  years_of_experience: string;
  locations: string[];
  industries: string[];
  education: string;
  certifications: string[];
  employment_type: string;
  working_model: string;
  salary_range: string;
  other_criteria: string;
}

export interface MindReaderResponse {
  job_specification: MindReaderJobSpec;
  confidence: number;
  interpretation_notes: string[];
}

export class MindReaderService {
  async interpretHiringQuery(query: string): Promise<MindReaderResponse> {
    console.log('Mind Reader interpreting hiring query:', query);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'mind_reader_interpret',
          data: { query }
        }
      });

      if (error) {
        console.error('Error calling Mind Reader AI function:', error);
        return this.getFallbackInterpretation(query);
      }

      return data;
    } catch (error) {
      console.error('Failed to interpret hiring query:', error);
      return this.getFallbackInterpretation(query);
    }
  }

  private getFallbackInterpretation(query: string): MindReaderResponse {
    const lowercaseQuery = query.toLowerCase();
    
    // Skill extraction with synonym canonicalization
    const skillMappings = {
      'react': 'React',
      'typescript': 'TypeScript',
      'javascript': 'JavaScript',
      'python': 'Python',
      'java': 'Java',
      'node.js': 'Node.js',
      'nodejs': 'Node.js',
      'aws': 'AWS',
      'kubernetes': 'Kubernetes',
      'docker': 'Docker',
      'machine learning': 'Machine Learning',
      'ml': 'Machine Learning',
      'ai': 'Artificial Intelligence',
      'nlp': 'Natural Language Processing',
      'natural language processing': 'Natural Language Processing',
      'llm': 'Large Language Models',
      'large language models': 'Large Language Models',
      'gpt': 'Large Language Models',
      'gpt models': 'Large Language Models',
      'chatgpt': 'Large Language Models',
      'openai tools': 'Large Language Models',
      'openai': 'Large Language Models'
    };

    const mustHaveSkills: string[] = [];
    const niceToHaveSkills: string[] = [];

    Object.entries(skillMappings).forEach(([keyword, skill]) => {
      if (lowercaseQuery.includes(keyword)) {
        if (lowercaseQuery.includes(`nice to have ${keyword}`) || 
            lowercaseQuery.includes(`bonus ${keyword}`) || 
            lowercaseQuery.includes(`preferred ${keyword}`)) {
          if (!niceToHaveSkills.includes(skill)) {
            niceToHaveSkills.push(skill);
          }
        } else {
          if (!mustHaveSkills.includes(skill)) {
            mustHaveSkills.push(skill);
          }
        }
      }
    });

    // Experience parsing
    let experienceYears = '';
    if (lowercaseQuery.includes('senior') || lowercaseQuery.includes('5+ years') || lowercaseQuery.includes('5-8 years')) {
      experienceYears = '5+ years';
    } else if (lowercaseQuery.includes('junior') || lowercaseQuery.includes('entry-level') || lowercaseQuery.includes('0-2 years')) {
      experienceYears = '0-2 years';
    } else if (lowercaseQuery.includes('mid-level') || lowercaseQuery.includes('3-5 years') || lowercaseQuery.includes('intermediate')) {
      experienceYears = '3-5 years';
    } else if (lowercaseQuery.includes('lead') || lowercaseQuery.includes('principal') || lowercaseQuery.includes('8+ years')) {
      experienceYears = '8+ years';
    }

    // Job title inference with experience level
    let jobTitle = '';
    const experiencePrefix = experienceYears.includes('5+') || experienceYears.includes('8+') ? 'Senior ' : '';
    
    if (lowercaseQuery.includes('frontend') || lowercaseQuery.includes('front-end')) {
      jobTitle = `${experiencePrefix}Frontend Developer`;
    } else if (lowercaseQuery.includes('backend') || lowercaseQuery.includes('back-end')) {
      jobTitle = `${experiencePrefix}Backend Developer`;
    } else if (lowercaseQuery.includes('fullstack') || lowercaseQuery.includes('full-stack')) {
      jobTitle = `${experiencePrefix}Full Stack Developer`;
    } else if (lowercaseQuery.includes('data scientist')) {
      jobTitle = `${experiencePrefix}Data Scientist`;
    } else if (lowercaseQuery.includes('devops')) {
      jobTitle = `${experiencePrefix}DevOps Engineer`;
    } else if (lowercaseQuery.includes('ml engineer') || lowercaseQuery.includes('machine learning engineer')) {
      jobTitle = `${experiencePrefix}ML Engineer`;
    } else if (lowercaseQuery.includes('software engineer') || lowercaseQuery.includes('developer')) {
      jobTitle = `${experiencePrefix}Software Engineer`;
    }

    // Geography parsing - normalize to proper case
    const locations: string[] = [];
    const locationKeywords = [
      'remote', 'hybrid', 'san francisco', 'new york', 'seattle', 'austin', 
      'boston', 'chicago', 'denver', 'los angeles', 'hyderabad', 'bangalore', 
      'mumbai', 'pune', 'delhi', 'chennai'
    ];
    
    locationKeywords.forEach(location => {
      if (lowercaseQuery.includes(location)) {
        const formattedLocation = location.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        if (!locations.includes(formattedLocation)) {
          locations.push(formattedLocation);
        }
      }
    });

    // Industry extraction
    const industries: string[] = [];
    const industryMappings = {
      'fintech': 'Fintech',
      'healthcare': 'Healthcare',
      'e-commerce': 'E-commerce',
      'ecommerce': 'E-commerce',
      'saas': 'SaaS',
      'startup': 'Startup',
      'enterprise': 'Enterprise',
      'blockchain': 'Blockchain',
      'crypto': 'Cryptocurrency',
      'edtech': 'EdTech',
      'gaming': 'Gaming'
    };

    Object.entries(industryMappings).forEach(([keyword, industry]) => {
      if (lowercaseQuery.includes(keyword) && !industries.includes(industry)) {
        industries.push(industry);
      }
    });

    // Working model extraction
    let workingModel = '';
    if (lowercaseQuery.includes('fully remote') || (lowercaseQuery.includes('remote') && !lowercaseQuery.includes('hybrid'))) {
      workingModel = 'Remote';
    } else if (lowercaseQuery.includes('hybrid')) {
      workingModel = 'Hybrid';
    } else if (lowercaseQuery.includes('onsite') || lowercaseQuery.includes('on-site') || lowercaseQuery.includes('office')) {
      workingModel = 'Onsite';
    }

    // Employment type extraction
    let employmentType = '';
    if (lowercaseQuery.includes('full-time') || lowercaseQuery.includes('fulltime')) {
      employmentType = 'Full-time';
    } else if (lowercaseQuery.includes('part-time') || lowercaseQuery.includes('parttime')) {
      employmentType = 'Part-time';
    } else if (lowercaseQuery.includes('contract') || lowercaseQuery.includes('contractor')) {
      employmentType = 'Contract';
    } else if (lowercaseQuery.includes('internship') || lowercaseQuery.includes('intern')) {
      employmentType = 'Internship';
    }

    const interpretationNotes = [
      'Fallback interpretation used due to AI service unavailability',
      'Basic keyword matching applied for skill extraction',
      'Experience level inferred from common phrases'
    ];

    return {
      job_specification: {
        job_title: jobTitle,
        must_have_skills: mustHaveSkills,
        nice_to_have_skills: niceToHaveSkills,
        years_of_experience: experienceYears,
        locations: locations,
        industries: industries,
        education: '',
        certifications: [],
        employment_type: employmentType,
        working_model: workingModel,
        salary_range: '',
        other_criteria: ''
      },
      confidence: 0.6,
      interpretation_notes: interpretationNotes
    };
  }
}

export const mindReaderService = new MindReaderService();
