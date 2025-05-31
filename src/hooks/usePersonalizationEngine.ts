
import { useState } from 'react';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { OutreachTemplate, PersonalizedSequence, PersonalizedStep } from '@/types/outreach-sequence';

export const usePersonalizationEngine = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePersonalizedSequence = async (
    candidate: EnhancedCandidate,
    template: OutreachTemplate
  ): Promise<PersonalizedSequence> => {
    setIsGenerating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const personalizedSteps: PersonalizedStep[] = template.sequence_steps.map((step) => {
        const personalized = personalizeStep(candidate, step);
        return {
          ...step,
          ...personalized
        };
      });

      const confidenceScore = calculateOverallConfidence(personalizedSteps);
      const successRate = estimateSuccessRate(candidate, template, confidenceScore);

      return {
        template_id: template.id,
        candidate_id: candidate.id,
        personalized_steps: personalizedSteps,
        confidence_score: confidenceScore,
        recommendation_reason: generateRecommendationReason(candidate, template),
        estimated_success_rate: successRate
      };
    } finally {
      setIsGenerating(false);
    }
  };

  const personalizeStep = (candidate: EnhancedCandidate, step: any) => {
    const personalizations = {
      candidate_name: candidate.name.split(' ')[0],
      company_name: 'TechCorp',
      role_title: 'Senior Software Engineer',
      recruiter_name: 'Sarah',
      top_skills: candidate.skills.slice(0, 3).join(', '),
      current_company: candidate.current_company,
      current_title: candidate.current_title,
      experience_years: candidate.experience_years.toString(),
      technical_skills: candidate.skills.filter(skill => 
        ['javascript', 'python', 'react', 'node', 'aws', 'kubernetes'].some(tech => 
          skill.toLowerCase().includes(tech)
        )
      ).slice(0, 2).join(' and '),
      recent_achievement: generateRecentAchievement(candidate),
      expertise_area: candidate.skills[0] || 'software development',
      industry_area: extractIndustryFromCompany(candidate.current_company),
      project_name: generateProjectName(candidate),
      technical_highlight: generateTechnicalHighlight(candidate),
      technical_challenge: 'scalability and performance optimization',
      role_description: 'lead our core platform development',
      key_benefits: 'competitive salary, equity, and remote flexibility'
    };

    let personalizedContent = step.content_template;
    let personalizedSubject = step.subject_template;

    // Replace template variables
    Object.entries(personalizations).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      personalizedContent = personalizedContent.replace(regex, value);
      if (personalizedSubject) {
        personalizedSubject = personalizedSubject.replace(regex, value);
      }
    });

    const highlights = generatePersonalizationHighlights(candidate, personalizations);
    const qualityScore = calculateQualityScore(personalizedContent, highlights);

    return {
      personalized_content: personalizedContent,
      personalized_subject: personalizedSubject,
      personalization_highlights: highlights,
      quality_score: qualityScore
    };
  };

  const generateRecentAchievement = (candidate: EnhancedCandidate): string => {
    if (candidate.osint_profile?.github?.notable_projects?.length > 0) {
      return `your work on ${candidate.osint_profile.github.notable_projects[0]}`;
    }
    if (candidate.skills.length > 3) {
      return `your expertise across ${candidate.skills.slice(0, 3).join(', ')}`;
    }
    return `your ${candidate.experience_years}+ years of experience at ${candidate.current_company}`;
  };

  const extractIndustryFromCompany = (company: string): string => {
    const industries = ['fintech', 'healthcare', 'e-commerce', 'AI/ML', 'cybersecurity'];
    return industries[Math.floor(Math.random() * industries.length)];
  };

  const generateProjectName = (candidate: EnhancedCandidate): string => {
    if (candidate.osint_profile?.github?.notable_projects?.length > 0) {
      return candidate.osint_profile.github.notable_projects[0];
    }
    const projectNames = ['the platform architecture', 'the API redesign', 'the performance optimization'];
    return projectNames[Math.floor(Math.random() * projectNames.length)];
  };

  const generateTechnicalHighlight = (candidate: EnhancedCandidate): string => {
    const highlights = [
      'the clean architecture and scalable design',
      'the innovative approach to solving complex problems',
      'the attention to code quality and best practices',
      'the comprehensive testing and documentation'
    ];
    return highlights[Math.floor(Math.random() * highlights.length)];
  };

  const generatePersonalizationHighlights = (
    candidate: EnhancedCandidate, 
    personalizations: Record<string, string>
  ): string[] => {
    const highlights = [];
    
    if (candidate.skills.length > 5) {
      highlights.push('Highlighted relevant technical skills');
    }
    
    if (candidate.osint_profile?.github?.public_repos > 10) {
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

  const calculateQualityScore = (content: string, highlights: string[]): number => {
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

  const calculateOverallConfidence = (steps: PersonalizedStep[]): number => {
    const avgQuality = steps.reduce((sum, step) => sum + step.quality_score, 0) / steps.length;
    return Math.min(avgQuality, 10);
  };

  const estimateSuccessRate = (
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

  const generateRecommendationReason = (candidate: EnhancedCandidate, template: OutreachTemplate): string => {
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

  return {
    generatePersonalizedSequence,
    isGenerating
  };
};
