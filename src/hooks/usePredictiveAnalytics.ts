
import { useState } from 'react';
import { predictiveAnalyticsEngine } from '@/services/analytics/predictiveAnalyticsEngine';

interface JobSuccessPrediction {
  overall_score: number;
  technical_fit: number;
  cultural_fit: number;
  experience_alignment: number;
  success_probability: number;
  risk_factors: string[];
  strengths: string[];
  recommendations: string[];
}

interface AssessmentGeneration {
  questions: AssessmentQuestion[];
  estimated_duration: number;
  difficulty_level: 'junior' | 'mid' | 'senior' | 'lead';
  focus_areas: string[];
}

interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'coding' | 'scenario' | 'technical_explanation';
  options?: string[];
  expected_answer?: string;
  skill_area: string;
  difficulty: number;
}

export const usePredictiveAnalytics = () => {
  const [loading, setLoading] = useState(false);

  const predictJobSuccess = async (
    candidate: any, 
    jobRequirements: string[] = []
  ): Promise<JobSuccessPrediction | null> => {
    setLoading(true);
    try {
      return await predictiveAnalyticsEngine.predictJobSuccess(candidate, jobRequirements);
    } catch (error) {
      console.error('Failed to predict job success:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateAssessment = async (
    role: string,
    seniority: string,
    skills: string[]
  ): Promise<AssessmentGeneration | null> => {
    setLoading(true);
    try {
      return await predictiveAnalyticsEngine.generateAssessment(role, seniority, skills);
    } catch (error) {
      console.error('Failed to generate assessment:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const analyzeMarketTrends = async (skills: string[], location: string) => {
    setLoading(true);
    try {
      return await predictiveAnalyticsEngine.analyzeMarketTrends(skills, location);
    } catch (error) {
      console.error('Failed to analyze market trends:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    predictJobSuccess,
    generateAssessment,
    analyzeMarketTrends,
    loading
  };
};
