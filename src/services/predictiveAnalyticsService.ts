
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface PredictionModel {
  id: string;
  name: string;
  type: 'hiring_success' | 'candidate_response' | 'interview_performance' | 'retention_risk';
  accuracy: number;
  features: string[];
  created_at: string;
  last_trained: string;
}

interface Prediction {
  candidate_id: string;
  model_type: string;
  prediction_score: number;
  confidence: number;
  factors: Record<string, number>;
  recommendations: string[];
  created_at: string;
}

export const predictiveAnalyticsService = {
  async generatePredictions(candidate: EnhancedCandidate): Promise<Prediction[]> {
    console.log('Generating predictions for candidate:', candidate.name);
    
    const predictions: Prediction[] = [];
    
    // Hiring Success Prediction
    predictions.push(await this.predictHiringSuccess(candidate));
    
    // Response Rate Prediction
    predictions.push(await this.predictResponseRate(candidate));
    
    // Interview Performance Prediction
    predictions.push(await this.predictInterviewPerformance(candidate));
    
    // Retention Risk Prediction
    predictions.push(await this.predictRetentionRisk(candidate));
    
    return predictions;
  },

  async predictHiringSuccess(candidate: EnhancedCandidate): Promise<Prediction> {
    const factors = {
      technical_fit: candidate.technical_depth_score / 10,
      experience_match: Math.min(candidate.experience_years / 8, 1),
      cultural_alignment: candidate.community_influence_score / 10,
      availability: candidate.availability_status === 'active' ? 1 : 0.5,
      skill_diversity: Math.min((candidate.skills?.length || 0) / 15, 1),
      learning_velocity: candidate.learning_velocity_score / 10
    };
    
    const weights = {
      technical_fit: 0.25,
      experience_match: 0.20,
      cultural_alignment: 0.15,
      availability: 0.15,
      skill_diversity: 0.15,
      learning_velocity: 0.10
    };
    
    const score = Object.entries(factors).reduce((sum, [key, value]) => {
      return sum + (value * weights[key as keyof typeof weights]);
    }, 0);
    
    const recommendations = [];
    if (factors.technical_fit < 0.6) {
      recommendations.push('Consider technical assessment or coding challenge');
    }
    if (factors.availability < 0.7) {
      recommendations.push('Discuss timeline and availability early');
    }
    if (factors.cultural_alignment < 0.5) {
      recommendations.push('Include cultural fit evaluation in interview process');
    }
    
    return {
      candidate_id: candidate.id,
      model_type: 'hiring_success',
      prediction_score: Math.round(score * 100) / 100,
      confidence: 0.82,
      factors,
      recommendations,
      created_at: new Date().toISOString()
    };
  },

  async predictResponseRate(candidate: EnhancedCandidate): Promise<Prediction> {
    const factors = {
      availability_status: candidate.availability_status === 'active' ? 0.9 : 0.4,
      osint_activity: candidate.osint_profile?.overall_score ? 
        candidate.osint_profile.overall_score / 10 : 0.3,
      communication_style: candidate.osint_profile?.social_presence?.communication_style === 'professional' ? 0.8 : 0.5,
      recent_activity: candidate.osint_profile?.availability_signals?.length ? 0.7 : 0.3,
      profile_completeness: this.calculateProfileCompleteness(candidate)
    };
    
    const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / Object.keys(factors).length;
    
    const recommendations = [];
    if (factors.availability_status < 0.5) {
      recommendations.push('Use warm introduction or referral if possible');
    }
    if (factors.communication_style < 0.6) {
      recommendations.push('Adapt communication style to match candidate preferences');
    }
    if (factors.recent_activity < 0.5) {
      recommendations.push('Check for recent job change indicators before outreach');
    }
    
    return {
      candidate_id: candidate.id,
      model_type: 'candidate_response',
      prediction_score: Math.round(score * 100) / 100,
      confidence: 0.75,
      factors,
      recommendations,
      created_at: new Date().toISOString()
    };
  },

  async predictInterviewPerformance(candidate: EnhancedCandidate): Promise<Prediction> {
    const factors = {
      technical_preparation: candidate.technical_depth_score / 10,
      communication_skills: candidate.community_influence_score / 10,
      industry_experience: Math.min(candidate.experience_years / 10, 1),
      cultural_indicators: candidate.cultural_fit_indicators?.length ? 
        candidate.cultural_fit_indicators.reduce((sum, ind) => sum + ind.score, 0) / (candidate.cultural_fit_indicators.length * 10) : 0.5,
      portfolio_quality: candidate.osint_profile?.github?.repos ? Math.min(candidate.osint_profile.github.repos / 20, 1) : 0.3
    };
    
    const score = Object.values(factors).reduce((sum, val) => sum + val, 0) / Object.keys(factors).length;
    
    const recommendations = [];
    if (factors.technical_preparation < 0.6) {
      recommendations.push('Provide technical interview preparation resources');
    }
    if (factors.communication_skills < 0.5) {
      recommendations.push('Include behavioral interview questions');
    }
    if (factors.cultural_indicators < 0.5) {
      recommendations.push('Focus on cultural fit assessment during interview');
    }
    
    return {
      candidate_id: candidate.id,
      model_type: 'interview_performance',
      prediction_score: Math.round(score * 100) / 100,
      confidence: 0.68,
      factors,
      recommendations,
      created_at: new Date().toISOString()
    };
  },

  async predictRetentionRisk(candidate: EnhancedCandidate): Promise<Prediction> {
    const careerStability = candidate.career_trajectory_analysis?.stability_score || 5;
    
    const factors = {
      career_stability: careerStability / 10,
      growth_trajectory: candidate.career_trajectory_analysis?.progression_type === 'ascending' ? 0.8 : 0.4,
      learning_motivation: candidate.learning_velocity_score / 10,
      cultural_alignment: candidate.community_influence_score / 10,
      compensation_fit: candidate.salary_expectation_range ? 0.6 : 0.4, // Would need job salary range to calculate properly
      location_stability: candidate.location ? 0.7 : 0.3
    };
    
    // Lower score means higher retention (less risk)
    const riskScore = 1 - (Object.values(factors).reduce((sum, val) => sum + val, 0) / Object.keys(factors).length);
    
    const recommendations = [];
    if (factors.career_stability < 0.5) {
      recommendations.push('Discuss career goals and growth opportunities during interview');
    }
    if (factors.learning_motivation > 0.8) {
      recommendations.push('Emphasize learning and development opportunities');
    }
    if (factors.cultural_alignment < 0.5) {
      recommendations.push('Ensure strong cultural onboarding process');
    }
    
    return {
      candidate_id: candidate.id,
      model_type: 'retention_risk',
      prediction_score: Math.round(riskScore * 100) / 100,
      confidence: 0.71,
      factors,
      recommendations,
      created_at: new Date().toISOString()
    };
  },

  calculateProfileCompleteness(candidate: EnhancedCandidate): number {
    const fields = [
      candidate.current_title,
      candidate.current_company,
      candidate.location,
      candidate.experience_years > 0,
      candidate.skills?.length > 0,
      candidate.ai_summary,
      candidate.osint_profile,
      candidate.bio
    ];
    
    const completedFields = fields.filter(Boolean).length;
    return completedFields / fields.length;
  },

  async getModelPerformance(): Promise<PredictionModel[]> {
    // In a real implementation, this would fetch from database
    return [
      {
        id: '1',
        name: 'Hiring Success Predictor',
        type: 'hiring_success',
        accuracy: 0.82,
        features: ['technical_fit', 'experience_match', 'cultural_alignment', 'availability'],
        created_at: '2024-01-01T00:00:00Z',
        last_trained: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        name: 'Response Rate Predictor',
        type: 'candidate_response',
        accuracy: 0.75,
        features: ['availability_status', 'osint_activity', 'communication_style'],
        created_at: '2024-01-01T00:00:00Z',
        last_trained: '2024-01-15T00:00:00Z'
      },
      {
        id: '3',
        name: 'Interview Performance Predictor',
        type: 'interview_performance',
        accuracy: 0.68,
        features: ['technical_preparation', 'communication_skills', 'portfolio_quality'],
        created_at: '2024-01-01T00:00:00Z',
        last_trained: '2024-01-15T00:00:00Z'
      },
      {
        id: '4',
        name: 'Retention Risk Predictor',
        type: 'retention_risk',
        accuracy: 0.71,
        features: ['career_stability', 'growth_trajectory', 'cultural_alignment'],
        created_at: '2024-01-01T00:00:00Z',
        last_trained: '2024-01-15T00:00:00Z'
      }
    ];
  }
};
