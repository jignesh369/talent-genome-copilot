
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export class DataTransformationService {
  calculateSkillMatch(candidate: EnhancedCandidate, requirements: string[]): number {
    const candidateSkills = candidate.skills.map(s => s.toLowerCase());
    const matchedSkills = requirements.filter(req => 
      candidateSkills.some(skill => skill.includes(req.toLowerCase()))
    );
    
    return (matchedSkills.length / requirements.length) * 100;
  }

  calculateSuccessProbability(
    skillMatch: number,
    culturalFit: number,
    engagement: number,
    osintScore: number
  ): number {
    const weights = {
      skills: 0.4,
      culture: 0.25,
      engagement: 0.2,
      osint: 0.15
    };

    const weightedScore = 
      (skillMatch * weights.skills) +
      (culturalFit * weights.culture) +
      (engagement * weights.engagement) +
      (osintScore * 10 * weights.osint);

    return Math.min(Math.max(weightedScore, 0), 100);
  }

  normalizeScore(score: number, min: number = 0, max: number = 100): number {
    return Math.min(Math.max(score, min), max);
  }

  calculateWeightedAverage(values: number[], weights: number[]): number {
    if (values.length !== weights.length) {
      throw new Error('Values and weights arrays must have the same length');
    }

    const weightedSum = values.reduce((sum, value, index) => sum + (value * weights[index]), 0);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  extractTechnicalMetrics(candidate: EnhancedCandidate): {
    technical_depth: number;
    community_engagement: number;
    learning_velocity: number;
  } {
    const osint = candidate.osint_profile;
    
    return {
      technical_depth: osint?.technical_depth || 0,
      community_engagement: osint?.community_engagement || 0,
      learning_velocity: osint?.learning_velocity || 0
    };
  }

  calculateJobRelevanceScore(candidate: EnhancedCandidate, requirements: string[]): number {
    let score = 0;

    // Skill matching
    const skillMatches = candidate.skills.filter(skill => 
      requirements.some(req => skill.toLowerCase().includes(req.toLowerCase()))
    ).length;
    score += (skillMatches / requirements.length) * 40;

    // Experience level
    score += Math.min(25, candidate.experience_years * 2);

    // Technical depth from OSINT
    const technicalDepth = candidate.osint_profile?.technical_depth || 0;
    score += technicalDepth * 2;

    // Community engagement
    const communityEngagement = candidate.osint_profile?.community_engagement || 0;
    score += communityEngagement * 1.5;

    return Math.min(100, score);
  }
}

export const dataTransformationService = new DataTransformationService();
