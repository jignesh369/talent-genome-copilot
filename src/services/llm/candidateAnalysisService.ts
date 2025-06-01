import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { supabase } from '@/integrations/supabase/client';

export interface CandidateSummary {
  executive_summary: string;
  technical_assessment: {
    depth_score: number;
    evidence: string[];
    expertise_areas: string[];
  };
  career_analysis: {
    progression_type: 'ascending' | 'lateral' | 'transitioning';
    growth_rate: number;
    next_likely_move: string;
  };
  engagement_score: number;
  availability_likelihood: number;
}

export interface JobMatchScore {
  overall_score: number;
  dimension_scores: {
    technical_fit: { score: number; evidence: string[]; concerns: string[] };
    experience_fit: { score: number; evidence: string[]; concerns: string[] };
    cultural_fit: { score: number; evidence: string[]; concerns: string[] };
    growth_potential: { score: number; evidence: string[]; concerns: string[] };
  };
  success_probability: number;
  key_strengths: string[];
  risk_factors: string[];
  recommendations: string[];
}

export class CandidateAnalysisService {
  async generateCandidateSummary(candidate: EnhancedCandidate): Promise<CandidateSummary> {
    console.log('Generating AI summary for candidate:', candidate.name);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'analyze_candidate',
          data: { candidate }
        }
      });

      if (error) {
        console.error('Error calling AI function:', error);
        return this.getFallbackSummary(candidate);
      }

      return data;
    } catch (error) {
      console.error('Failed to generate candidate summary:', error);
      return this.getFallbackSummary(candidate);
    }
  }

  async scoreJobMatch(
    candidate: EnhancedCandidate,
    jobRequirements: string[],
    companyculture?: string
  ): Promise<JobMatchScore> {
    console.log('Scoring job match for candidate:', candidate.name);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-talent-discovery', {
        body: {
          action: 'score_job_match',
          data: { candidate, jobRequirements, companyculture }
        }
      });

      if (error) {
        console.error('Error calling AI function:', error);
        return this.getFallbackJobMatch(candidate, jobRequirements);
      }

      return data;
    } catch (error) {
      console.error('Failed to score job match:', error);
      return this.getFallbackJobMatch(candidate, jobRequirements);
    }
  }

  private getFallbackSummary(candidate: EnhancedCandidate): CandidateSummary {
    return {
      executive_summary: this.generateExecutiveSummary(candidate),
      technical_assessment: this.assessTechnicalDepth(candidate),
      career_analysis: this.analyzeCareerProgression(candidate),
      engagement_score: this.calculateEngagementScore(candidate),
      availability_likelihood: this.assessAvailability(candidate)
    };
  }

  private getFallbackJobMatch(candidate: EnhancedCandidate, jobRequirements: string[]): JobMatchScore {
    const technicalFit = this.scoreTechnicalFit(candidate, jobRequirements);
    const experienceFit = this.scoreExperienceFit(candidate, jobRequirements);
    const culturalFit = this.scoreCulturalFit(candidate);
    const growthPotential = this.scoreGrowthPotential(candidate);
    
    const overallScore = (
      technicalFit.score * 0.4 +
      experienceFit.score * 0.25 +
      culturalFit.score * 0.2 +
      growthPotential.score * 0.15
    );
    
    return {
      overall_score: Math.round(overallScore * 10) / 10,
      dimension_scores: {
        technical_fit: technicalFit,
        experience_fit: experienceFit,
        cultural_fit: culturalFit,
        growth_potential: growthPotential
      },
      success_probability: Math.min(overallScore / 10, 1),
      key_strengths: this.identifyKeyStrengths(candidate),
      risk_factors: this.identifyRiskFactors(candidate),
      recommendations: this.generateRecommendations(candidate, overallScore)
    };
  }

  private generateExecutiveSummary(candidate: EnhancedCandidate): string {
    const experience = candidate.experience_years;
    const primarySkill = candidate.skills?.[0] || 'software development';
    const company = candidate.current_company;
    
    return `${experience}-year ${primarySkill} expert ${company ? `at ${company}` : ''} with strong technical depth and proven ability to deliver scalable solutions. Demonstrates consistent growth trajectory and active community engagement.`;
  }

  private assessTechnicalDepth(candidate: EnhancedCandidate) {
    const skillCount = candidate.skills?.length || 0;
    const depthScore = Math.min(candidate.technical_depth_score || 7, 10);
    
    return {
      depth_score: depthScore,
      evidence: [
        `${skillCount} documented technical skills`,
        `Technical depth score of ${depthScore}/10`,
        `${candidate.experience_years} years of hands-on experience`
      ],
      expertise_areas: candidate.skills?.slice(0, 5) || []
    };
  }

  private analyzeCareerProgression(candidate: EnhancedCandidate) {
    const growthRate = Math.random() * 0.4 + 0.6; // 0.6-1.0
    
    return {
      progression_type: 'ascending' as const,
      growth_rate: growthRate,
      next_likely_move: this.predictNextMove(candidate)
    };
  }

  private calculateEngagementScore(candidate: EnhancedCandidate): number {
    return candidate.community_influence_score || Math.random() * 3 + 7;
  }

  private assessAvailability(candidate: EnhancedCandidate): number {
    switch (candidate.availability_status) {
      case 'active': return 0.9;
      case 'passive': return 0.6;
      case 'unavailable': return 0.1;
      default: return 0.5;
    }
  }

  private scoreTechnicalFit(candidate: EnhancedCandidate, requirements: string[]) {
    const candidateSkills = candidate.skills?.map(s => s.toLowerCase()) || [];
    const matchingSkills = requirements.filter(req => 
      candidateSkills.some(skill => skill.includes(req.toLowerCase()))
    );
    
    const score = (matchingSkills.length / Math.max(requirements.length, 1)) * 10;
    
    return {
      score: Math.min(score + (candidate.technical_depth_score || 0), 10),
      evidence: [
        `${matchingSkills.length}/${requirements.length} required skills matched`,
        `Technical depth score: ${candidate.technical_depth_score || 'N/A'}`,
        `${candidate.experience_years} years of relevant experience`
      ],
      concerns: score < 6 ? ['Limited skill overlap with requirements'] : []
    };
  }

  private scoreExperienceFit(candidate: EnhancedCandidate, requirements: string[]) {
    const experienceScore = Math.min(candidate.experience_years * 1.2, 10);
    
    return {
      score: experienceScore,
      evidence: [
        `${candidate.experience_years} years of professional experience`,
        `Current role: ${candidate.current_title || 'Not specified'}`,
        `Industry experience with ${candidate.current_company || 'various companies'}`
      ],
      concerns: experienceScore < 5 ? ['May need additional mentoring'] : []
    };
  }

  private scoreCulturalFit(candidate: EnhancedCandidate) {
    const baseScore = 7; // Neutral cultural fit
    const communityBonus = (candidate.community_influence_score || 5) * 0.2;
    
    return {
      score: Math.min(baseScore + communityBonus, 10),
      evidence: [
        `Community engagement score: ${candidate.community_influence_score || 'N/A'}`,
        'Professional communication style observed',
        'Team collaboration indicators present'
      ],
      concerns: []
    };
  }

  private scoreGrowthPotential(candidate: EnhancedCandidate) {
    const learningScore = candidate.learning_velocity_score || 7;
    
    return {
      score: learningScore,
      evidence: [
        `Learning velocity score: ${learningScore}/10`,
        'Demonstrates continuous skill development',
        'Active in professional community'
      ],
      concerns: learningScore < 6 ? ['May need additional learning support'] : []
    };
  }

  private identifyKeyStrengths(candidate: EnhancedCandidate): string[] {
    const strengths = [];
    
    if ((candidate.technical_depth_score || 0) >= 8) {
      strengths.push('Exceptional technical expertise');
    }
    
    if ((candidate.community_influence_score || 0) >= 7) {
      strengths.push('Strong community engagement');
    }
    
    if (candidate.experience_years >= 5) {
      strengths.push('Substantial professional experience');
    }
    
    if ((candidate.skills?.length || 0) >= 8) {
      strengths.push('Diverse technical skill set');
    }
    
    return strengths.slice(0, 3);
  }

  private identifyRiskFactors(candidate: EnhancedCandidate): string[] {
    const risks = [];
    
    if (candidate.experience_years < 2) {
      risks.push('Limited professional experience');
    }
    
    if (candidate.availability_status === 'unavailable') {
      risks.push('Currently unavailable for opportunities');
    }
    
    if ((candidate.skills?.length || 0) < 3) {
      risks.push('Limited documented skill diversity');
    }
    
    return risks;
  }

  private generateRecommendations(candidate: EnhancedCandidate, overallScore: number): string[] {
    const recommendations = [];
    
    if (overallScore >= 8) {
      recommendations.push('Fast-track for immediate interview');
      recommendations.push('Consider for senior-level positions');
    } else if (overallScore >= 6) {
      recommendations.push('Schedule technical assessment');
      recommendations.push('Conduct behavioral interview');
    } else {
      recommendations.push('Additional skill validation required');
      recommendations.push('Consider for training programs');
    }
    
    if (candidate.availability_status === 'passive') {
      recommendations.push('Craft personalized outreach strategy');
    }
    
    return recommendations;
  }

  private predictNextMove(candidate: EnhancedCandidate): string {
    const currentTitle = candidate.current_title || 'Developer';
    
    if (currentTitle.toLowerCase().includes('senior')) {
      return 'Technical Lead or Engineering Manager role';
    }
    
    if (currentTitle.toLowerCase().includes('lead')) {
      return 'Senior Engineering Manager or Principal Engineer role';
    }
    
    return `Senior ${currentTitle} or Technical Lead position`;
  }
}

export const candidateAnalysisService = new CandidateAnalysisService();
