
export interface PredictiveInsight {
  id: string;
  type: 'hiring_forecast' | 'candidate_trajectory' | 'market_trend' | 'pipeline_bottleneck';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  actionable_recommendations: string[];
  created_at: string;
}

export interface MarketIntelligence {
  skill_demand_trends: SkillTrend[];
  salary_benchmarks: SalaryBenchmark[];
  competition_analysis: CompetitionMetric[];
  talent_availability: TalentAvailability[];
  hiring_velocity_trends: VelocityTrend[];
}

export interface SkillTrend {
  skill: string;
  demand_change: number;
  popularity_score: number;
  projected_growth: number;
  market_saturation: number;
}

export interface SalaryBenchmark {
  role: string;
  location: string;
  min_salary: number;
  max_salary: number;
  median_salary: number;
  percentile_25: number;
  percentile_75: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface CompetitionMetric {
  company: string;
  hiring_activity: number;
  talent_retention: number;
  market_share: number;
  competitive_strength: number;
}

export interface TalentAvailability {
  skill_set: string[];
  available_candidates: number;
  response_rate: number;
  avg_time_to_respond: number;
  quality_score: number;
}

export interface VelocityTrend {
  stage: string;
  avg_duration_days: number;
  trend: 'improving' | 'stable' | 'declining';
  bottleneck_probability: number;
}
