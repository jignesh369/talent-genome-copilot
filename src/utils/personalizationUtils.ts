
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const generatePersonalizationVariables = (candidate: EnhancedCandidate): Record<string, string> => {
  return {
    name: candidate.name,
    first_name: candidate.first_name || candidate.name.split(' ')[0],
    title: candidate.current_title || 'professional',
    company: candidate.current_company || 'your field',
    location: candidate.location,
    skills: candidate.skills.slice(0, 3).join(', '),
    experience: `${candidate.experience_years} years`
  };
};

export const generatePersonalizationHighlights = (candidate: EnhancedCandidate): string[] => {
  const highlights: string[] = [];
  
  if (candidate.osint_profile?.github?.repos && candidate.osint_profile.github.repos > 10) {
    highlights.push(`${candidate.osint_profile.github.repos} GitHub repositories`);
  }
  
  if (candidate.technical_depth_score > 7) {
    highlights.push('Strong technical expertise');
  }
  
  if (candidate.community_influence_score > 7) {
    highlights.push('Active in professional community');
  }
  
  return highlights;
};

export const calculateQualityScore = (message: string, candidate: EnhancedCandidate): number => {
  let score = 0;
  
  // Personalization elements
  if (message.includes(candidate.name)) score += 0.2;
  if (message.includes(candidate.current_company || '')) score += 0.2;
  if (candidate.skills.some(skill => message.toLowerCase().includes(skill.toLowerCase()))) score += 0.3;
  
  // Message quality
  if (message.length > 100 && message.length < 300) score += 0.2;
  if (message.includes('GitHub') || message.includes('experience')) score += 0.1;
  
  return Math.min(score, 1.0);
};

export const calculateOverallConfidence = (factors: Record<string, number>): number => {
  const weights = {
    personalization: 0.4,
    relevance: 0.3,
    timing: 0.2,
    channel: 0.1
  };
  
  return Object.entries(factors).reduce((total, [key, value]) => {
    return total + (value * (weights[key as keyof typeof weights] || 0.1));
  }, 0);
};

export const estimateSuccessRate = (candidate: EnhancedCandidate, messageQuality: number): number => {
  let baseRate = 0.15; // 15% base response rate
  
  // Adjust based on candidate factors
  if (candidate.availability_status === 'active') baseRate += 0.1;
  if (candidate.community_influence_score > 7) baseRate += 0.05;
  if (candidate.technical_depth_score > 8) baseRate += 0.05;
  
  // Adjust based on message quality
  baseRate *= (0.5 + messageQuality);
  
  return Math.min(baseRate, 0.8);
};

export const generateRecommendationReason = (candidate: EnhancedCandidate): string => {
  const reasons = [];
  
  if (candidate.technical_depth_score > 8) {
    reasons.push('exceptional technical skills');
  }
  
  if (candidate.career_trajectory_analysis?.progression_type === 'ascending') {
    reasons.push('strong career growth');
  }
  
  if (candidate.community_influence_score > 7) {
    reasons.push('active community involvement');
  }
  
  if (reasons.length === 0) {
    return 'solid professional background';
  }
  
  return reasons.join(', ');
};
