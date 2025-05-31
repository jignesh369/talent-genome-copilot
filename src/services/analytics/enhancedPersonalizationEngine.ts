import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface PersonalizationContext {
  company_name: string;
  role_title: string;
  recruiter_name: string;
  role_benefits?: string[];
  company_culture?: string[];
  urgency_level?: 'low' | 'medium' | 'high';
}

interface PersonalizationScore {
  overall_score: number;
  technical_relevance: number;
  cultural_fit: number;
  career_alignment: number;
  engagement_potential: number;
}

interface EnhancedPersonalizationData {
  candidate_name: string;
  personalized_greeting: string;
  technical_highlights: string[];
  career_story_hook: string;
  value_propositions: string[];
  call_to_action: string;
  personalization_score: PersonalizationScore;
  recommended_template: string;
  optimal_send_time: string;
  preferred_channel: 'email' | 'linkedin' | 'phone';
}

export class EnhancedPersonalizationEngine {
  private static instance: EnhancedPersonalizationEngine;

  static getInstance(): EnhancedPersonalizationEngine {
    if (!EnhancedPersonalizationEngine.instance) {
      EnhancedPersonalizationEngine.instance = new EnhancedPersonalizationEngine();
    }
    return EnhancedPersonalizationEngine.instance;
  }

  async generateEnhancedPersonalization(
    candidate: EnhancedCandidate,
    context: PersonalizationContext
  ): Promise<EnhancedPersonalizationData> {
    console.log('Generating enhanced personalization for:', candidate.name);

    const personalizationScore = this.calculatePersonalizationScore(candidate, context);
    const templateType = this.selectOptimalTemplate(candidate, personalizationScore);
    
    return {
      candidate_name: this.generatePersonalizedGreeting(candidate),
      personalized_greeting: this.createContextualGreeting(candidate, context),
      technical_highlights: this.extractTechnicalHighlights(candidate, context),
      career_story_hook: this.generateCareerStoryHook(candidate),
      value_propositions: this.generateValuePropositions(candidate, context),
      call_to_action: this.generateOptimalCTA(candidate, context),
      personalization_score: personalizationScore,
      recommended_template: templateType,
      optimal_send_time: this.predictOptimalSendTime(candidate),
      preferred_channel: this.determinePreferredChannel(candidate)
    };
  }

  private calculatePersonalizationScore(
    candidate: EnhancedCandidate,
    context: PersonalizationContext
  ): PersonalizationScore {
    const technical_relevance = this.calculateTechnicalRelevance(candidate, context);
    const cultural_fit = candidate.cultural_fit_indicators?.reduce((sum, indicator) => 
      sum + indicator.score, 0) / (candidate.cultural_fit_indicators?.length || 1) / 10;
    const career_alignment = this.calculateCareerAlignment(candidate, context);
    const engagement_potential = this.calculateEngagementPotential(candidate);

    const overall_score = (
      technical_relevance * 0.3 +
      cultural_fit * 0.25 +
      career_alignment * 0.25 +
      engagement_potential * 0.2
    );

    return {
      overall_score,
      technical_relevance,
      cultural_fit,
      career_alignment,
      engagement_potential
    };
  }

  private calculateTechnicalRelevance(candidate: EnhancedCandidate, context: PersonalizationContext): number {
    // Mock calculation based on skill matching
    const roleKeywords = context.role_title.toLowerCase().split(' ');
    const matchingSkills = candidate.skills.filter(skill => 
      roleKeywords.some(keyword => skill.toLowerCase().includes(keyword))
    );
    return Math.min(matchingSkills.length / 3, 1); // Normalize to 0-1
  }

  private calculateCareerAlignment(candidate: EnhancedCandidate, context: PersonalizationContext): number {
    // Analyze career trajectory alignment with role level
    const experienceScore = Math.min(candidate.experience_years / 8, 1);
    const progressionScore = candidate.career_trajectory_analysis?.growth_rate || 0.7;
    return (experienceScore + progressionScore) / 2;
  }

  private calculateEngagementPotential(candidate: EnhancedCandidate): number {
    const availabilityScore = candidate.availability_status === 'active' ? 1 : 
                             candidate.availability_status === 'passive' ? 0.6 : 0.3;
    const communityScore = candidate.community_influence_score / 10;
    return (availabilityScore + communityScore) / 2;
  }

  private selectOptimalTemplate(candidate: EnhancedCandidate, score: PersonalizationScore): string {
    if (score.technical_relevance > 0.8) return 'technical_deep_dive';
    if (score.cultural_fit > 0.8) return 'culture_focused';
    if (score.career_alignment > 0.8) return 'career_growth';
    if (score.engagement_potential > 0.7) return 'opportunity_focused';
    return 'balanced_approach';
  }

  private generatePersonalizedGreeting(candidate: EnhancedCandidate): string {
    return candidate.name.split(' ')[0] || candidate.handle || 'there';
  }

  private createContextualGreeting(candidate: EnhancedCandidate, context: PersonalizationContext): string {
    const achievements = this.extractTopAchievements(candidate);
    if (achievements.length > 0) {
      return `I came across your impressive work in ${achievements[0]} and was particularly drawn to your expertise.`;
    }
    return `I've been following your work and am impressed by your technical background.`;
  }

  private extractTechnicalHighlights(candidate: EnhancedCandidate, context: PersonalizationContext): string[] {
    const highlights = [];
    
    if (candidate.osint_profile?.github_profile?.public_repos && candidate.osint_profile.github_profile.public_repos > 10) {
      highlights.push(`${candidate.osint_profile.github_profile.public_repos}+ open source projects`);
    }
    
    if (candidate.technical_depth_score > 8) {
      highlights.push(`Exceptional technical depth (${candidate.technical_depth_score.toFixed(1)}/10)`);
    }
    
    if (candidate.skills.length > 5) {
      highlights.push(`Diverse skill set spanning ${candidate.skills.slice(0, 3).join(', ')}`);
    }

    return highlights.slice(0, 3);
  }

  private generateCareerStoryHook(candidate: EnhancedCandidate): string {
    const trajectory = candidate.career_trajectory_analysis;
    if (trajectory?.progression_type === 'ascending') {
      return `Your career trajectory shows consistent growth and innovation`;
    }
    return `Your experience at ${candidate.current_company} demonstrates strong technical leadership`;
  }

  private generateValuePropositions(candidate: EnhancedCandidate, context: PersonalizationContext): string[] {
    const propositions = [];
    
    if (context.role_benefits) {
      propositions.push(...context.role_benefits.slice(0, 2));
    }
    
    propositions.push(`Work with cutting-edge technology in ${context.role_title}`);
    propositions.push(`Join a team that values innovation and technical excellence`);
    
    if (candidate.availability_status === 'active') {
      propositions.push(`Fast-track interview process for exceptional candidates`);
    }

    return propositions.slice(0, 3);
  }

  private generateOptimalCTA(candidate: EnhancedCandidate, context: PersonalizationContext): string {
    if (candidate.availability_status === 'active') {
      return `Would you be open to a brief conversation this week about this exciting opportunity?`;
    }
    return `I'd love to learn more about your current goals and share how this role could align with your career vision.`;
  }

  private predictOptimalSendTime(candidate: EnhancedCandidate): string {
    // Simple heuristic based on location and role
    if (candidate.location.includes('PST') || candidate.location.includes('CA')) {
      return 'Tuesday 10:00 AM PST';
    }
    return 'Tuesday 10:00 AM EST';
  }

  private determinePreferredChannel(candidate: EnhancedCandidate): 'email' | 'linkedin' | 'phone' {
    if (candidate.best_contact_method?.platform === 'linkedin') return 'linkedin';
    if (candidate.best_contact_method?.platform === 'email') return 'email';
    return 'linkedin'; // Default to LinkedIn for professional outreach
  }

  private extractTopAchievements(candidate: EnhancedCandidate): string[] {
    const achievements = [];
    
    if (candidate.skills.length > 0) {
      achievements.push(candidate.skills[0]);
    }
    
    if (candidate.osint_profile?.github_profile?.top_languages) {
      achievements.push(...candidate.osint_profile.github_profile.top_languages.slice(0, 1));
    }
    
    return achievements;
  }
}

export const enhancedPersonalizationEngine = EnhancedPersonalizationEngine.getInstance();
