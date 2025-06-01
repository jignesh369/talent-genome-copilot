
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const personalizationUtils = {
  generateGitHubMention(candidate: EnhancedCandidate): string | null {
    const github = candidate.osint_profile?.github;
    if (!github?.username) return null;
    
    if (github.repos > 20) {
      return `I was impressed by your ${github.repos} repositories on GitHub`;
    }
    
    if (github.stars > 50) {
      return `Your open source work has earned ${github.stars} stars - impressive!`;
    }
    
    return `I noticed your active GitHub profile with ${github.repos} repositories`;
  },

  generateSkillMention(candidate: EnhancedCandidate, jobSkills?: string[]): string | null {
    if (!candidate.skills || candidate.skills.length === 0) return null;
    
    if (jobSkills && jobSkills.length > 0) {
      const matchingSkills = candidate.skills.filter(skill =>
        jobSkills.some(jobSkill => 
          jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(jobSkill.toLowerCase())
        )
      );
      
      if (matchingSkills.length > 0) {
        return `Your expertise in ${matchingSkills.slice(0, 3).join(', ')} aligns perfectly with what we're looking for`;
      }
    }
    
    const topSkills = candidate.skills.slice(0, 3);
    return `Your background in ${topSkills.join(', ')} caught my attention`;
  },

  generateCareerMention(candidate: EnhancedCandidate): string | null {
    const trajectory = candidate.career_trajectory_analysis;
    if (!trajectory) return null;
    
    if (trajectory.progression_type === 'ascending' && trajectory.growth_rate > 0.7) {
      return 'Your impressive career progression shows strong leadership potential';
    }
    
    if (candidate.experience_years > 8) {
      return `With ${candidate.experience_years} years of experience, you bring valuable expertise to any team`;
    }
    
    return null;
  },

  generateCompanyMention(candidate: EnhancedCandidate): string | null {
    if (!candidate.current_company) return null;
    
    // Add logic for recognizing prestigious companies
    const prestigiousCompanies = ['Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Tesla'];
    const isPrestigious = prestigiousCompanies.some(company => 
      candidate.current_company!.toLowerCase().includes(company.toLowerCase())
    );
    
    if (isPrestigious) {
      return `Your experience at ${candidate.current_company} speaks volumes about your capabilities`;
    }
    
    return `I see you're currently contributing to ${candidate.current_company}'s success`;
  },

  generateLocationMention(candidate: EnhancedCandidate, jobLocation?: string): string | null {
    if (!candidate.location) return null;
    
    if (jobLocation && candidate.location.toLowerCase().includes(jobLocation.toLowerCase())) {
      return `Great to connect with someone local to ${candidate.location}`;
    }
    
    // Check for major tech hubs
    const techHubs = ['San Francisco', 'Seattle', 'Austin', 'New York', 'Boston'];
    const isInTechHub = techHubs.some(hub => 
      candidate.location.toLowerCase().includes(hub.toLowerCase())
    );
    
    if (isInTechHub) {
      return `The tech scene in ${candidate.location} must be exciting`;
    }
    
    return null;
  },

  generatePersonalizedOpening(candidate: EnhancedCandidate, context?: any): string {
    const mentions: string[] = [];
    
    // Try different personalization approaches
    const githubMention = this.generateGitHubMention(candidate);
    if (githubMention) mentions.push(githubMention);
    
    const skillMention = this.generateSkillMention(candidate, context?.job_skills);
    if (skillMention) mentions.push(skillMention);
    
    const careerMention = this.generateCareerMention(candidate);
    if (careerMention) mentions.push(careerMention);
    
    const companyMention = this.generateCompanyMention(candidate);
    if (companyMention) mentions.push(companyMention);
    
    // Pick the best mention or fallback to generic
    if (mentions.length > 0) {
      return mentions[0];
    }
    
    return `Hi ${candidate.first_name || candidate.name.split(' ')[0]}, I came across your profile and was impressed by your background`;
  },

  generatePersonalizedSubject(candidate: EnhancedCandidate, context?: any): string {
    const firstName = candidate.first_name || candidate.name.split(' ')[0];
    
    if (candidate.current_company) {
      return `${firstName}, exciting opportunity for ${candidate.current_company} talent`;
    }
    
    if (candidate.skills && candidate.skills.length > 0) {
      const primarySkill = candidate.skills[0];
      return `${firstName}, ${primarySkill} opportunity you might find interesting`;
    }
    
    return `${firstName}, thought you might be interested in this opportunity`;
  },

  scorePersonalizationQuality(message: string): number {
    let score = 0;
    
    // Check for specific mentions
    if (message.includes('GitHub') || message.includes('repository')) score += 0.2;
    if (message.includes('experience') || message.includes('expertise')) score += 0.2;
    if (message.includes('skill') || message.includes('background')) score += 0.2;
    if (message.includes('company') || message.includes('work')) score += 0.1;
    if (message.includes('career') || message.includes('progression')) score += 0.1;
    
    // Check message length (not too generic)
    if (message.length > 100) score += 0.1;
    if (message.length > 200) score += 0.1;
    
    return Math.min(score, 1.0);
  }
};
