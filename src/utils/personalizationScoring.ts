import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { OutreachTemplate, PersonalizedStep } from '@/types/outreach-sequence';

export const generatePersonalizationVariables = (candidate: EnhancedCandidate): Record<string, string> => {
  return {
    name: candidate.name,
    firstName: candidate.name.split(' ')[0],
    currentTitle: candidate.current_title || 'Professional',
    currentCompany: candidate.current_company || '',
    experience: `${candidate.experience_years} years`,
    topSkills: candidate.skills.slice(0, 3).join(', '),
    location: candidate.location || '',
    industry: candidate.industry || 'Technology'
  };
};

export const generatePersonalizationHighlights = (
  candidate: EnhancedCandidate, 
  personalizations: Record<string, string>
): string[] => {
  const highlights = [];
  
  if (candidate.skills.length > 5) {
    highlights.push('Highlighted relevant technical skills');
  }
  
  if (candidate.osint_profile?.github?.public_repos && candidate.osint_profile.github.public_repos > 10) {
    highlights.push('Referenced GitHub activity');
  }
  
  if (candidate.experience_years >= 8) {
    highlights.push('Acknowledged senior experience level');
  }
  
  if (candidate.current_company) {
    highlights.push('Mentioned current company context');
  }
  
  highlights.push('Customized role relevance');
  highlights.push('Personalized greeting and tone');
  
  return highlights.slice(0, 4);
};

export const calculateQualityScore = (content: string, highlights: string[], candidate: EnhancedCandidate): number => {
  let score = 5; // Base score
  
  // Add points for personalization
  score += highlights.length * 0.5;
  
  // Add points for content length and structure
  if (content.length > 200 && content.length < 800) score += 1;
  if (content.includes(candidate.name)) score += 0.5;
  if (content.split('\n').length > 3) score += 0.5; // Good structure
  
  // Cap at 10
  return Math.min(score, 10);
};

export const calculateOverallConfidence = (steps: PersonalizedStep[]): number => {
  const avgQuality = steps.reduce((sum, step) => sum + step.quality_score, 0) / steps.length;
  return Math.min(avgQuality, 10);
};

export const estimateSuccessRate = (
  candidate: EnhancedCandidate, 
  template: OutreachTemplate, 
  confidenceScore: number
): number => {
  let baseRate = template.success_rate;
  
  // Adjust based on candidate factors
  if (candidate.availability_status === 'active') baseRate += 10;
  if (candidate.match_score >= 90) baseRate += 5;
  if (confidenceScore >= 8) baseRate += 5;
  if (candidate.community_influence_score >= 8) baseRate -= 5; // Gets more outreach
  
  return Math.min(Math.max(baseRate, 25), 85);
};

export const generateRecommendationReason = (candidate: EnhancedCandidate, template: OutreachTemplate): string => {
  const reasons = [];
  
  if (candidate.availability_status === 'active') {
    reasons.push('candidate is actively job searching');
  }
  
  if (candidate.match_score >= 85) {
    reasons.push(`high role compatibility (${candidate.match_score}% match)`);
  }
  
  if (template.success_rate >= 70) {
    reasons.push(`proven template effectiveness (${template.success_rate}% success rate)`);
  }
  
  return `Recommended due to ${reasons.join(', ')}.`;
};
