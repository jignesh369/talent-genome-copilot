
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface PersonalizationFactors {
  github_activity: number;
  professional_presence: number;
  skill_relevance: number;
  career_trajectory: number;
  communication_style: number;
  availability_signals: number;
}

export const personalizationScoring = {
  calculatePersonalizationScore(candidate: EnhancedCandidate, jobRequirements?: any): number {
    const factors = this.extractPersonalizationFactors(candidate, jobRequirements);
    
    // Weighted scoring
    const weights = {
      github_activity: 0.20,
      professional_presence: 0.15,
      skill_relevance: 0.25,
      career_trajectory: 0.15,
      communication_style: 0.10,
      availability_signals: 0.15
    };
    
    const score = Object.entries(factors).reduce((total, [key, value]) => {
      return total + (value * weights[key as keyof PersonalizationFactors]);
    }, 0);
    
    return Math.round(score * 100) / 100;
  },

  extractPersonalizationFactors(candidate: EnhancedCandidate, jobRequirements?: any): PersonalizationFactors {
    return {
      github_activity: this.scoreGitHubActivity(candidate),
      professional_presence: this.scoreProfessionalPresence(candidate),
      skill_relevance: this.scoreSkillRelevance(candidate, jobRequirements),
      career_trajectory: this.scoreCareerTrajectory(candidate),
      communication_style: this.scoreCommunicationStyle(candidate),
      availability_signals: this.scoreAvailabilitySignals(candidate)
    };
  },

  scoreGitHubActivity(candidate: EnhancedCandidate): number {
    const github = candidate.osint_profile?.github;
    if (!github?.username) return 0.2;
    
    let score = 0;
    
    // Repository count (use repos instead of public_repos)
    if (github.repos > 20) score += 0.4;
    else if (github.repos > 10) score += 0.3;
    else if (github.repos > 5) score += 0.2;
    else if (github.repos > 0) score += 0.1;
    
    // Stars received
    if (github.stars > 100) score += 0.3;
    else if (github.stars > 50) score += 0.2;
    else if (github.stars > 10) score += 0.1;
    
    // Commit activity
    if (github.commits > 1000) score += 0.3;
    else if (github.commits > 500) score += 0.2;
    else if (github.commits > 100) score += 0.1;
    
    return Math.min(score, 1.0);
  },

  scoreProfessionalPresence(candidate: EnhancedCandidate): number {
    let score = 0;
    const osint = candidate.osint_profile;
    
    // LinkedIn presence
    if (osint?.linkedin?.connections) {
      if (osint.linkedin.connections > 500) score += 0.4;
      else if (osint.linkedin.connections > 200) score += 0.3;
      else if (osint.linkedin.connections > 100) score += 0.2;
      else score += 0.1;
    }
    
    // StackOverflow reputation
    if (osint?.stackoverflow?.reputation) {
      if (osint.stackoverflow.reputation > 1000) score += 0.3;
      else if (osint.stackoverflow.reputation > 500) score += 0.2;
      else score += 0.1;
    }
    
    // Professional bio/summary
    if (candidate.ai_summary && candidate.ai_summary.length > 100) {
      score += 0.3;
    } else if (candidate.bio && candidate.bio.length > 50) {
      score += 0.2;
    }
    
    return Math.min(score, 1.0);
  },

  scoreSkillRelevance(candidate: EnhancedCandidate, jobRequirements?: any): number {
    if (!candidate.skills || candidate.skills.length === 0) return 0.2;
    
    let score = 0;
    const candidateSkills = candidate.skills.map(s => s.toLowerCase());
    
    // Base score for having skills
    score += Math.min(candidateSkills.length / 10, 0.4);
    
    // Bonus for job requirement matching
    if (jobRequirements?.required_skills) {
      const requiredSkills = jobRequirements.required_skills.map((s: string) => s.toLowerCase());
      const matchCount = candidateSkills.filter(skill => 
        requiredSkills.some(req => req.includes(skill) || skill.includes(req))
      ).length;
      
      score += (matchCount / requiredSkills.length) * 0.6;
    }
    
    return Math.min(score, 1.0);
  },

  scoreCareerTrajectory(candidate: EnhancedCandidate): number {
    const trajectory = candidate.career_trajectory_analysis;
    if (!trajectory) return 0.4;
    
    let score = 0;
    
    // Progression type
    switch (trajectory.progression_type) {
      case 'ascending': score += 0.4; break;
      case 'lateral': score += 0.3; break;
      case 'transitioning': score += 0.2; break;
      case 'consulting': score += 0.3; break;
      default: score += 0.2;
    }
    
    // Growth rate
    if (trajectory.growth_rate > 0.8) score += 0.3;
    else if (trajectory.growth_rate > 0.6) score += 0.2;
    else if (trajectory.growth_rate > 0.4) score += 0.1;
    
    // Stability
    if (trajectory.stability_score > 7) score += 0.3;
    else if (trajectory.stability_score > 5) score += 0.2;
    else if (trajectory.stability_score > 3) score += 0.1;
    
    return Math.min(score, 1.0);
  },

  scoreCommunicationStyle(candidate: EnhancedCandidate): number {
    const style = candidate.osint_profile?.social_presence?.communication_style;
    
    switch (style) {
      case 'professional': return 0.8;
      case 'technical': return 0.7;
      case 'casual': return 0.6;
      case 'mixed': return 0.5;
      default: return 0.4;
    }
  },

  scoreAvailabilitySignals(candidate: EnhancedCandidate): number {
    let score = 0;
    
    // Availability status
    switch (candidate.availability_status) {
      case 'active': score += 0.5; break;
      case 'passive': score += 0.3; break;
      case 'unavailable': score += 0.1; break;
    }
    
    // Recent signals
    const signals = candidate.osint_profile?.availability_signals || [];
    if (signals.length > 0) {
      score += Math.min(signals.length / 5, 0.5);
    }
    
    return Math.min(score, 1.0);
  },

  generatePersonalizationInsights(candidate: EnhancedCandidate): string[] {
    const insights: string[] = [];
    const factors = this.extractPersonalizationFactors(candidate);
    
    if (factors.github_activity > 0.7) {
      insights.push('Strong GitHub presence with active contributions');
    }
    
    if (factors.professional_presence > 0.7) {
      insights.push('Well-established professional network');
    }
    
    if (factors.skill_relevance > 0.8) {
      insights.push('Skills highly relevant to target roles');
    }
    
    if (factors.career_trajectory > 0.7) {
      insights.push('Positive career progression trajectory');
    }
    
    if (factors.availability_signals > 0.6) {
      insights.push('Shows signs of job market engagement');
    }
    
    if (insights.length === 0) {
      insights.push('Standard personalization approach recommended');
    }
    
    return insights;
  }
};
