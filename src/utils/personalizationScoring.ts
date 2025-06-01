
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const generatePersonalizationVariables = (candidate: EnhancedCandidate): Record<string, string> => {
  return {
    candidate_name: candidate.name,
    current_title: candidate.current_title || 'Professional',
    current_company: candidate.current_company || 'their current role',
    top_skills: candidate.skills.slice(0, 3).join(', '),
    experience_years: candidate.experience_years.toString(),
    location: candidate.location
  };
};

export const generatePersonalizationHighlights = (candidate: EnhancedCandidate): string[] => {
  const highlights: string[] = [];
  
  if (candidate.technical_depth_score > 8) {
    highlights.push('exceptional technical expertise');
  }
  
  if (candidate.community_influence_score > 7) {
    highlights.push('strong community presence');
  }
  
  if (candidate.osint_profile?.github?.stars && candidate.osint_profile.github.stars > 100) {
    highlights.push('impressive open source contributions');
  }
  
  return highlights;
};

export const calculateQualityScore = (message: string): number => {
  let score = 0.5;
  
  if (message.includes('GitHub') || message.includes('repository')) score += 0.2;
  if (message.includes('experience') || message.includes('expertise')) score += 0.2;
  if (message.includes('skill') || message.includes('background')) score += 0.2;
  if (message.length > 100) score += 0.1;
  if (message.length > 200) score += 0.1;
  
  return Math.min(score, 1.0);
};

export const calculateOverallConfidence = (candidate: EnhancedCandidate): number => {
  let confidence = 0.5;
  
  if (candidate.osint_profile?.overall_score && candidate.osint_profile.overall_score > 7) {
    confidence += 0.2;
  }
  
  if (candidate.skills.length > 5) {
    confidence += 0.1;
  }
  
  if (candidate.experience_years > 3) {
    confidence += 0.2;
  }
  
  return Math.min(confidence, 1.0);
};

export const estimateSuccessRate = (candidate: EnhancedCandidate): number => {
  const baseRate = 0.3;
  let multiplier = 1;
  
  if (candidate.availability_status === 'active') multiplier += 0.5;
  if (candidate.match_score > 80) multiplier += 0.3;
  if (candidate.technical_depth_score > 8) multiplier += 0.2;
  
  return Math.min(baseRate * multiplier, 0.95);
};

export const generateRecommendationReason = (candidate: EnhancedCandidate): string => {
  const reasons: string[] = [];
  
  if (candidate.match_score > 85) {
    reasons.push('high match score');
  }
  
  if (candidate.availability_status === 'active') {
    reasons.push('actively looking');
  }
  
  if (candidate.technical_depth_score > 8) {
    reasons.push('strong technical background');
  }
  
  return reasons.length > 0 ? `Recommended due to ${reasons.join(', ')}` : 'Good potential candidate';
};
