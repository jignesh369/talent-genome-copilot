
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { dataTransformationService } from './dataTransformationService';

interface JobSuccessPrediction {
  candidate_id: string;
  success_probability: number;
  risk_factors: RiskFactor[];
  success_indicators: SuccessIndicator[];
  recommended_actions: string[];
  confidence_level: number;
}

interface RiskFactor {
  factor: string;
  severity: 'low' | 'medium' | 'high';
  impact_score: number;
  mitigation_strategy: string;
}

interface SuccessIndicator {
  indicator: string;
  strength: number;
  evidence: string[];
}

export class PredictionService {
  async predictJobSuccess(candidate: EnhancedCandidate, jobRequirements: string[]): Promise<JobSuccessPrediction> {
    console.log('Predicting job success for candidate:', candidate.id);
    
    const skillMatchScore = dataTransformationService.calculateSkillMatch(candidate, jobRequirements);
    const culturalFitScore = candidate.cultural_fit_indicators?.reduce((acc, indicator) => acc + indicator.score, 0) / candidate.cultural_fit_indicators?.length || 75;
    const engagementScore = 70; // Default engagement score since it's not in the type
    const osintScore = candidate.osint_profile?.overall_score || 8;
    
    const successProbability = dataTransformationService.calculateSuccessProbability(
      skillMatchScore,
      culturalFitScore,
      engagementScore,
      osintScore
    );

    const riskFactors = this.identifyRiskFactors(candidate);
    const successIndicators = this.identifySuccessIndicators(candidate);
    const recommendedActions = this.generateRecommendations(candidate, riskFactors);

    return {
      candidate_id: candidate.id,
      success_probability: successProbability,
      risk_factors: riskFactors,
      success_indicators: successIndicators,
      recommended_actions: recommendedActions,
      confidence_level: 0.85
    };
  }

  private identifyRiskFactors(candidate: EnhancedCandidate): RiskFactor[] {
    const risks: RiskFactor[] = [];

    // Job switching frequency
    if (candidate.experience_years > 0) {
      const avgJobDuration = candidate.experience_years / 3; // Assuming 3 jobs
      if (avgJobDuration < 1.5) {
        risks.push({
          factor: 'Frequent job changes',
          severity: 'medium',
          impact_score: 6,
          mitigation_strategy: 'Discuss career stability and long-term goals'
        });
      }
    }

    // Low engagement score (using a default since it's not in the type)
    const engagementScore = 70; // Default value
    if (engagementScore < 50) {
      risks.push({
        factor: 'Low engagement in recruitment process',
        severity: 'medium',
        impact_score: 7,
        mitigation_strategy: 'Increase personalized communication and follow-up'
      });
    }

    // OSINT red flags - using availability_signals as a proxy
    if (candidate.osint_profile?.availability_signals && candidate.osint_profile.availability_signals.length > 0) {
      const concerningSignals = candidate.osint_profile.availability_signals.filter(signal => 
        signal.confidence < 0.5
      );
      if (concerningSignals.length > 0) {
        risks.push({
          factor: 'Background verification concerns',
          severity: 'high',
          impact_score: 8,
          mitigation_strategy: 'Conduct thorough reference checks and background verification'
        });
      }
    }

    return risks;
  }

  private identifySuccessIndicators(candidate: EnhancedCandidate): SuccessIndicator[] {
    const indicators: SuccessIndicator[] = [];

    // High technical depth
    if (candidate.osint_profile?.technical_depth && candidate.osint_profile.technical_depth > 8) {
      indicators.push({
        indicator: 'Strong technical expertise',
        strength: candidate.osint_profile.technical_depth,
        evidence: ['High GitHub activity', 'Technical publications', 'Open source contributions']
      });
    }

    // Community involvement
    if (candidate.osint_profile?.community_engagement && candidate.osint_profile.community_engagement > 7) {
      indicators.push({
        indicator: 'Active community participation',
        strength: candidate.osint_profile.community_engagement,
        evidence: ['Speaking engagements', 'Mentoring activities', 'Technical writing']
      });
    }

    // Learning velocity
    if (candidate.osint_profile?.learning_velocity && candidate.osint_profile.learning_velocity > 8) {
      indicators.push({
        indicator: 'Continuous learning mindset',
        strength: candidate.osint_profile.learning_velocity,
        evidence: ['Recent skill acquisitions', 'Course completions', 'Technology adoption']
      });
    }

    return indicators;
  }

  private generateRecommendations(candidate: EnhancedCandidate, risks: RiskFactor[]): string[] {
    const recommendations: string[] = [];

    if (risks.length === 0) {
      recommendations.push('Fast-track for final interview');
      recommendations.push('Consider for senior-level positions');
    } else {
      recommendations.push('Schedule additional screening call');
      recommendations.push('Prepare targeted interview questions');
      
      if (risks.some(r => r.severity === 'high')) {
        recommendations.push('Conduct thorough reference checks');
        recommendations.push('Consider probationary period');
      }
    }

    // Use a default engagement score since it's not available in the type
    const defaultEngagementScore = 75;
    if (defaultEngagementScore > 80) {
      recommendations.push('High engagement - likely to accept offer');
    } else {
      recommendations.push('Increase personal touch in communications');
    }

    return recommendations;
  }
}

export const predictionService = new PredictionService();
