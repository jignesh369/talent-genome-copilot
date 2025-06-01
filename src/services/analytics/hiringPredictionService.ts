
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface PredictionFactors {
  technical_fit: number;
  cultural_fit: number;
  experience_match: number;
  availability: number;
  communication_style: number;
  salary_alignment: number;
  location_preference: number;
  career_trajectory: number;
}

interface HiringPrediction {
  probability: number;
  confidence: number;
  factors: PredictionFactors;
  recommendations: string[];
  risk_factors: string[];
  timeline_estimate: {
    min_days: number;
    max_days: number;
    most_likely_days: number;
  };
}

export const hiringPredictionService = {
  async predictHiringSuccess(candidate: EnhancedCandidate, jobRequirements: any = {}): Promise<HiringPrediction> {
    console.log('Predicting hiring success for candidate:', candidate.name);
    
    // Calculate individual factors
    const factors: PredictionFactors = {
      technical_fit: this.calculateTechnicalFit(candidate, jobRequirements),
      cultural_fit: this.calculateCulturalFit(candidate),
      experience_match: this.calculateExperienceMatch(candidate, jobRequirements),
      availability: this.calculateAvailability(candidate),
      communication_style: this.calculateCommunicationFit(candidate),
      salary_alignment: this.calculateSalaryAlignment(candidate, jobRequirements),
      location_preference: this.calculateLocationFit(candidate, jobRequirements),
      career_trajectory: this.calculateCareerTrajectoryFit(candidate)
    };

    // Calculate weighted probability
    const weights = {
      technical_fit: 0.25,
      cultural_fit: 0.20,
      experience_match: 0.15,
      availability: 0.10,
      communication_style: 0.10,
      salary_alignment: 0.10,
      location_preference: 0.05,
      career_trajectory: 0.05
    };

    const probability = Object.entries(factors).reduce((sum, [key, value]) => {
      return sum + (value * weights[key as keyof typeof weights]);
    }, 0);

    const confidence = this.calculateConfidence(factors, candidate);

    return {
      probability: Math.round(probability * 100) / 100,
      confidence: Math.round(confidence * 100) / 100,
      factors,
      recommendations: this.generateRecommendations(factors, candidate),
      risk_factors: this.identifyRiskFactors(factors, candidate),
      timeline_estimate: this.estimateTimeline(factors, candidate)
    };
  },

  calculateTechnicalFit(candidate: EnhancedCandidate, jobRequirements: any): number {
    const baseScore = candidate.technical_depth_score / 10;
    const skillsMatch = candidate.skills?.length ? 
      Math.min(candidate.skills.length / 10, 1) : 0.5;
    
    return (baseScore * 0.7) + (skillsMatch * 0.3);
  },

  calculateCulturalFit(candidate: EnhancedCandidate): number {
    if (candidate.cultural_fit_indicators?.length) {
      const avgScore = candidate.cultural_fit_indicators.reduce((sum, indicator) => 
        sum + indicator.score, 0) / candidate.cultural_fit_indicators.length;
      return avgScore / 10;
    }
    return candidate.community_influence_score / 10;
  },

  calculateExperienceMatch(candidate: EnhancedCandidate, jobRequirements: any): number {
    const requiredYears = jobRequirements.min_experience || 3;
    const candidateYears = candidate.experience_years;
    
    if (candidateYears >= requiredYears) {
      return Math.min(candidateYears / (requiredYears * 1.5), 1);
    }
    return candidateYears / requiredYears;
  },

  calculateAvailability(candidate: EnhancedCandidate): number {
    switch (candidate.availability_status) {
      case 'active': return 1;
      case 'passive': return 0.7;
      case 'unavailable': return 0.2;
      default: return 0.5;
    }
  },

  calculateCommunicationFit(candidate: EnhancedCandidate): number {
    const osint = candidate.osint_profile;
    if (osint?.social_presence?.communication_style) {
      switch (osint.social_presence.communication_style) {
        case 'professional': return 0.9;
        case 'casual': return 0.7;
        case 'technical': return 0.8;
        case 'mixed': return 0.6;
        default: return 0.5;
      }
    }
    return 0.6;
  },

  calculateSalaryAlignment(candidate: EnhancedCandidate, jobRequirements: any): number {
    if (!candidate.salary_expectation_range || !jobRequirements.salary_range) {
      return 0.5; // Unknown, assume neutral
    }
    
    const candidateMin = candidate.salary_expectation_range.min;
    const jobMax = jobRequirements.salary_range.max;
    
    if (candidateMin <= jobMax) {
      return Math.min(jobMax / candidateMin, 1);
    }
    return jobMax / candidateMin;
  },

  calculateLocationFit(candidate: EnhancedCandidate, jobRequirements: any): number {
    if (!jobRequirements.location || !candidate.location) {
      return 0.5;
    }
    
    // Simple location matching - in real implementation would use geolocation
    const sameLocation = candidate.location.toLowerCase().includes(
      jobRequirements.location.toLowerCase()
    );
    
    return sameLocation ? 1 : (jobRequirements.remote_allowed ? 0.8 : 0.3);
  },

  calculateCareerTrajectoryFit(candidate: EnhancedCandidate): number {
    const trajectory = candidate.career_trajectory_analysis;
    if (!trajectory) return 0.5;
    
    switch (trajectory.progression_type) {
      case 'ascending': return 0.9;
      case 'lateral': return 0.7;
      case 'transitioning': return 0.6;
      case 'consulting': return 0.5;
      default: return 0.5;
    }
  },

  calculateConfidence(factors: PredictionFactors, candidate: EnhancedCandidate): number {
    const dataCompleteness = this.assessDataCompleteness(candidate);
    const factorVariance = this.calculateFactorVariance(factors);
    
    return (dataCompleteness * 0.6) + ((1 - factorVariance) * 0.4);
  },

  assessDataCompleteness(candidate: EnhancedCandidate): number {
    const fields = [
      candidate.current_title,
      candidate.current_company,
      candidate.location,
      candidate.experience_years > 0,
      candidate.skills?.length > 0,
      candidate.ai_summary,
      candidate.osint_profile,
      candidate.salary_expectation_range
    ];
    
    const completedFields = fields.filter(Boolean).length;
    return completedFields / fields.length;
  },

  calculateFactorVariance(factors: PredictionFactors): number {
    const values = Object.values(factors);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    
    return Math.sqrt(variance);
  },

  generateRecommendations(factors: PredictionFactors, candidate: EnhancedCandidate): string[] {
    const recommendations: string[] = [];
    
    if (factors.technical_fit < 0.6) {
      recommendations.push('Consider additional technical assessment or skills validation');
    }
    
    if (factors.cultural_fit < 0.5) {
      recommendations.push('Schedule cultural fit interview with team members');
    }
    
    if (factors.availability < 0.7) {
      recommendations.push('Discuss timeline expectations and availability during initial contact');
    }
    
    if (factors.salary_alignment < 0.8) {
      recommendations.push('Clarify salary expectations early in the process');
    }
    
    if (candidate.osint_profile?.availability_signals?.length === 0) {
      recommendations.push('Assess genuine interest level through direct conversation');
    }
    
    return recommendations;
  },

  identifyRiskFactors(factors: PredictionFactors, candidate: EnhancedCandidate): string[] {
    const risks: string[] = [];
    
    if (factors.availability < 0.5) {
      risks.push('Low availability - candidate may not be actively looking');
    }
    
    if (factors.salary_alignment < 0.6) {
      risks.push('Salary expectations may exceed budget');
    }
    
    if (factors.location_preference < 0.4) {
      risks.push('Location mismatch may require relocation or remote work arrangement');
    }
    
    if (candidate.career_trajectory_analysis?.stability_score < 5) {
      risks.push('Frequent job changes indicate potential retention risk');
    }
    
    return risks;
  },

  estimateTimeline(factors: PredictionFactors, candidate: EnhancedCandidate): any {
    const baseTimeline = 21; // 3 weeks baseline
    
    // Adjust based on availability
    const availabilityMultiplier = factors.availability > 0.8 ? 0.8 : 
                                 factors.availability > 0.5 ? 1.0 : 1.5;
    
    // Adjust based on technical fit (more assessment needed)
    const technicalMultiplier = factors.technical_fit > 0.8 ? 0.9 : 1.2;
    
    const estimatedDays = Math.round(baseTimeline * availabilityMultiplier * technicalMultiplier);
    
    return {
      min_days: Math.max(estimatedDays - 7, 7),
      max_days: estimatedDays + 14,
      most_likely_days: estimatedDays
    };
  }
};
