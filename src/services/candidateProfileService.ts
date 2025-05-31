
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export interface CandidateSearchRequest {
  candidateName: string;
  perplexityApiKey: string;
}

export interface ProfileGenerationResult {
  searchResults: string;
  profile: Partial<EnhancedCandidate>;
}

export class CandidateProfileService {
  static async searchCandidateInfo(request: CandidateSearchRequest): Promise<string> {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${request.perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a professional recruiter assistant. Search for professional information about the person including their current job, company, skills, experience, education, and any professional achievements. Be precise and focus on career-related information.'
          },
          {
            role: 'user',
            content: `Find professional information about ${request.candidateName}. Include their current position, company, experience, skills, education, and professional background. Focus on publicly available professional information.`
          }
        ],
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No information found';
  }

  static generateCandidateProfile(name: string, searchInfo: string): Partial<EnhancedCandidate> {
    return {
      id: `candidate_${Date.now()}`,
      name: name,
      handle: name.toLowerCase().replace(/\s+/g, '_'),
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      location: 'Unknown',
      current_title: this.extractFromText(searchInfo, ['title', 'position', 'role']) || 'Software Engineer',
      current_company: this.extractFromText(searchInfo, ['company', 'organization', 'employer']) || 'Tech Company',
      experience_years: this.extractExperienceYears(searchInfo),
      skills: this.extractSkills(searchInfo),
      bio: searchInfo.substring(0, 500) + (searchInfo.length > 500 ? '...' : ''),
      ai_summary: this.generateAISummary(name, searchInfo),
      career_trajectory_analysis: {
        progression_type: 'ascending',
        growth_rate: 0.8,
        stability_score: 0.7,
        next_likely_move: 'Senior technical role',
        timeline_events: []
      },
      technical_depth_score: 8.0,
      community_influence_score: 7.0,
      cultural_fit_indicators: [],
      learning_velocity_score: 8.0,
      osint_profile: {
        candidate_id: `candidate_${Date.now()}`,
        overall_score: 8.0,
        influence_score: 7.0,
        technical_depth: 8.0,
        community_engagement: 7.0,
        learning_velocity: 8.0,
        last_updated: new Date().toISOString(),
        availability_signals: []
      },
      match_score: 85,
      relevance_factors: [],
      availability_status: 'passive',
      best_contact_method: {
        platform: 'email',
        confidence: 0.8,
        best_time: '10:00 AM',
        approach_style: 'direct'
      },
      profile_last_updated: new Date().toISOString(),
      osint_last_fetched: new Date().toISOString()
    };
  }

  private static extractFromText(text: string, keywords: string[]): string | undefined {
    for (const keyword of keywords) {
      const regex = new RegExp(`${keyword}[:\\s]+([^\\n\\r\\.]{1,100})`, 'i');
      const match = text.match(regex);
      if (match) {
        return match[1].trim();
      }
    }
    return undefined;
  }

  private static extractExperienceYears(text: string): number {
    const yearMatches = text.match(/(\d+)\s*years?\s*(of\s*)?experience/i);
    if (yearMatches) {
      return parseInt(yearMatches[1]);
    }
    return 5; // Default
  }

  private static extractSkills(text: string): string[] {
    const commonTechSkills = [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'AWS', 
      'Docker', 'Kubernetes', 'Machine Learning', 'AI', 'Data Science', 'SQL',
      'MongoDB', 'PostgreSQL', 'GraphQL', 'REST API', 'Microservices'
    ];
    
    return commonTechSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    ).slice(0, 8);
  }

  private static generateAISummary(name: string, searchInfo: string): string {
    return `${name} is a skilled professional with expertise in software development and technology. Based on available information, they demonstrate strong technical capabilities and professional experience in their field.`;
  }
}
