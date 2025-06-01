import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface PersonalizationContext {
  job_title?: string;
  company_name?: string;
  job_skills?: string[];
  company_culture?: string;
  team_values?: string[];
}

interface OutreachMessage {
  subject: string;
  body: string;
  quality_score: number;
  recommendations: string[];
}

export const enhancedPersonalizationEngine = {
  async generatePersonalizedOutreach(
    candidate: EnhancedCandidate,
    context: PersonalizationContext = {}
  ): Promise<OutreachMessage> {
    console.log('Generating enhanced outreach for candidate:', candidate.name);
    
    const subject = this.generatePersonalizedSubject(candidate, context);
    const body = this.generatePersonalizedBody(candidate, context);
    
    const qualityScore = this.scorePersonalizationQuality(body);
    const recommendations = this.generatePersonalizationInsights(candidate);
    
    return {
      subject,
      body,
      quality_score: qualityScore,
      recommendations: recommendations
    };
  },

  private generatePersonalizedSubject(
    candidate: EnhancedCandidate,
    context: PersonalizationContext
  ): string {
    const firstName = candidate.first_name || candidate.name.split(' ')[0];
    
    if (context.job_title) {
      return `${firstName}, ${context.job_title} opportunity at ${context.company_name}`;
    }
    
    if (candidate.skills && candidate.skills.length > 0) {
      const primarySkill = candidate.skills[0];
      return `${firstName}, ${primarySkill} role you might find interesting`;
    }
    
    return `${firstName}, exciting opportunity you might like`;
  },

  private generatePersonalizedBody(
    candidate: EnhancedCandidate,
    context: PersonalizationContext
  ): string {
    let opening = `Hi ${candidate.first_name || candidate.name.split(' ')[0]},`;
    let coreMessage = 'I came across your profile and was impressed by your background';
    let closing = 'Would love to chat about opportunities at our company';
    
    // Try different personalization approaches
    const githubPersonalization = this.generateGitHubPersonalization(candidate);
    if (githubPersonalization.length > 0) {
      coreMessage = githubPersonalization.join('. ');
    } else {
      const technicalPersonalization = this.generateTechnicalPersonalization(candidate);
      if (technicalPersonalization.length > 0) {
        coreMessage = technicalPersonalization.join('. ');
      } else {
        const careerPersonalization = this.generateCareerPersonalization(candidate);
        if (careerPersonalization.length > 0) {
          coreMessage = careerPersonalization.join('. ');
        }
      }
    }
    
    return `${opening} ${coreMessage}. ${closing}.`;
  },

  private generateGitHubPersonalization(candidate: EnhancedCandidate): string[] {
    const personalizations: string[] = [];
    const github = candidate.osint_profile?.github;
    
    if (github?.username) {
      if (github.repos > 20) {
        personalizations.push(`I noticed your impressive portfolio of ${github.repos} repositories on GitHub`);
      }
      
      if (github.stars > 100) {
        personalizations.push(`Your open source contributions have earned ${github.stars} stars - clearly the community values your work`);
      }
    }
    
    return personalizations;
  },

  private generateCareerPersonalization(candidate: EnhancedCandidate): string[] {
    const personalizations: string[] = [];
    const trajectory = candidate.career_trajectory_analysis;
    
    if (trajectory?.progression_type === 'ascending') {
      personalizations.push('Your career trajectory shows strong growth potential');
    }
    
    if (candidate.experience_years > 5) {
      personalizations.push(`With ${candidate.experience_years} years of experience, you bring valuable expertise`);
    }
    
    return personalizations;
  },

  private generateTechnicalPersonalization(candidate: EnhancedCandidate): string[] {
    const personalizations: string[] = [];
    const github = candidate.osint_profile?.github;
    
    // Use repos instead of primary_languages since that field doesn't exist
    if (github?.repos && github.repos > 10) {
      personalizations.push(`Your ${github.repos} repositories show a diverse technical skillset`);
    }
    
    if (candidate.skills && candidate.skills.length > 0) {
      const topSkills = candidate.skills.slice(0, 3);
      personalizations.push(`Your expertise in ${topSkills.join(', ')} aligns perfectly with what we're looking for`);
    }
    
    return personalizations;
  },

  private scorePersonalizationQuality(message: string): number {
    let score = 0;
    
    // Check for specific mentions
    if (message.includes('GitHub') || message.includes('repository')) score += 0.2;
    if (message.includes('experience') || message.includes('expertise')) score += 0.2;
    if (message.includes('skill') || message.includes('background')) score += 0.2;
    if (message.includes('career') || message.includes('progression')) score += 0.1;
    
    // Check message length (not too generic)
    if (message.length > 100) score += 0.1;
    if (message.length > 200) score += 0.1;
    
    return Math.min(score, 1.0);
  },

  private generatePersonalizationInsights(candidate: EnhancedCandidate): string[] {
    const insights: string[] = [];
    
    if (candidate.osint_profile?.github?.username) {
      insights.push('Leverage GitHub activity for personalized messaging');
    }
    
    if (candidate.skills && candidate.skills.length > 0) {
      insights.push('Highlight relevant skills in outreach');
    }
    
    if (candidate.career_trajectory_analysis?.progression_type === 'ascending') {
      insights.push('Emphasize growth opportunities');
    }
    
    return insights;
  }
};
