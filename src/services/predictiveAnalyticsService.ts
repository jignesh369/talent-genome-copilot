
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

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

class PredictiveAnalyticsService {
  private insights: PredictiveInsight[] = [];
  private marketData: MarketIntelligence = this.generateMockMarketData();

  // Generate hiring success probability
  calculateHiringProbability(candidate: EnhancedCandidate, jobRequirements: string[]): number {
    let probability = 50; // Base probability

    // Factor in engagement score
    probability += candidate.engagement_score * 0.3;

    // Factor in skill match
    const skillMatches = candidate.skills.filter(skill => 
      jobRequirements.some(req => skill.toLowerCase().includes(req.toLowerCase()))
    ).length;
    probability += (skillMatches / jobRequirements.length) * 25;

    // Factor in availability signals
    const activeSignals = candidate.availability_signals.filter(s => 
      s.signal_type === 'active_job_search' || s.signal_type === 'career_change'
    );
    probability += activeSignals.length * 10;

    // Factor in cultural fit
    probability += candidate.cultural_fit_score * 0.15;

    return Math.min(95, Math.max(5, probability));
  }

  // Predict time to hire
  predictTimeToHire(candidate: EnhancedCandidate): number {
    let baseDays = 30; // Base time to hire

    // Adjust based on engagement
    if (candidate.engagement_score > 80) baseDays -= 5;
    if (candidate.engagement_score < 40) baseDays += 10;

    // Adjust based on availability
    const activeSignals = candidate.availability_signals.filter(s => 
      s.signal_type === 'active_job_search'
    );
    if (activeSignals.length > 0) baseDays -= 7;

    // Adjust based on response rate
    if (candidate.response_rate > 0.8) baseDays -= 3;
    if (candidate.response_rate < 0.3) baseDays += 7;

    return Math.max(14, baseDays); // Minimum 14 days
  }

  // Generate predictive insights
  generatePredictiveInsights(candidates: EnhancedCandidate[]): PredictiveInsight[] {
    const insights: PredictiveInsight[] = [];

    // Pipeline bottleneck analysis
    const stageDistribution = this.analyzeStageDistribution(candidates);
    const bottleneckStage = this.identifyBottleneck(stageDistribution);
    
    if (bottleneckStage) {
      insights.push({
        id: 'bottleneck-' + Date.now(),
        type: 'pipeline_bottleneck',
        title: 'Pipeline Bottleneck Detected',
        description: `${bottleneckStage} stage is showing signs of congestion with longer than average duration.`,
        confidence: 0.85,
        impact: 'high',
        timeframe: 'Next 2 weeks',
        actionable_recommendations: [
          'Review interview scheduling for this stage',
          'Consider adding additional reviewers',
          'Streamline decision-making process'
        ],
        created_at: new Date().toISOString()
      });
    }

    // Hiring forecast
    const highProbabilityCandidates = candidates.filter(c => 
      this.calculateHiringProbability(c, ['software', 'engineer']) > 70
    );

    insights.push({
      id: 'forecast-' + Date.now(),
      type: 'hiring_forecast',
      title: 'Positive Hiring Outlook',
      description: `${highProbabilityCandidates.length} candidates show high probability of successful hiring within the next month.`,
      confidence: 0.78,
      impact: 'medium',
      timeframe: 'Next 30 days',
      actionable_recommendations: [
        'Prioritize engagement with high-probability candidates',
        'Prepare offer packages',
        'Schedule final interviews'
      ],
      created_at: new Date().toISOString()
    });

    return insights;
  }

  private analyzeStageDistribution(candidates: EnhancedCandidate[]) {
    const distribution: Record<string, number> = {};
    candidates.forEach(candidate => {
      const stage = candidate.pipeline_stage;
      distribution[stage] = (distribution[stage] || 0) + 1;
    });
    return distribution;
  }

  private identifyBottleneck(distribution: Record<string, number>): string | null {
    const stages = Object.keys(distribution);
    const maxCount = Math.max(...Object.values(distribution));
    const bottleneckThreshold = maxCount * 0.4; // 40% of candidates in one stage is a bottleneck
    
    for (const stage of stages) {
      if (distribution[stage] >= bottleneckThreshold) {
        return stage;
      }
    }
    return null;
  }

  // Market intelligence
  getMarketIntelligence(): MarketIntelligence {
    return this.marketData;
  }

  private generateMockMarketData(): MarketIntelligence {
    return {
      skill_demand_trends: [
        {
          skill: 'React',
          demand_change: 15.2,
          popularity_score: 92,
          projected_growth: 18.5,
          market_saturation: 0.68
        },
        {
          skill: 'TypeScript',
          demand_change: 22.8,
          popularity_score: 87,
          projected_growth: 25.3,
          market_saturation: 0.45
        },
        {
          skill: 'Python',
          demand_change: 12.4,
          popularity_score: 94,
          projected_growth: 14.7,
          market_saturation: 0.72
        }
      ],
      salary_benchmarks: [
        {
          role: 'Senior Frontend Developer',
          location: 'San Francisco',
          min_salary: 140000,
          max_salary: 200000,
          median_salary: 170000,
          percentile_25: 155000,
          percentile_75: 185000,
          trend: 'increasing'
        },
        {
          role: 'Full Stack Engineer',
          location: 'New York',
          min_salary: 120000,
          max_salary: 180000,
          median_salary: 150000,
          percentile_25: 135000,
          percentile_75: 165000,
          trend: 'stable'
        }
      ],
      competition_analysis: [
        {
          company: 'Google',
          hiring_activity: 85,
          talent_retention: 92,
          market_share: 18.5,
          competitive_strength: 94
        },
        {
          company: 'Meta',
          hiring_activity: 72,
          talent_retention: 88,
          market_share: 14.2,
          competitive_strength: 87
        }
      ],
      talent_availability: [
        {
          skill_set: ['React', 'TypeScript', 'Node.js'],
          available_candidates: 1247,
          response_rate: 0.68,
          avg_time_to_respond: 2.3,
          quality_score: 78
        }
      ],
      hiring_velocity_trends: [
        {
          stage: 'screening',
          avg_duration_days: 3.2,
          trend: 'improving',
          bottleneck_probability: 0.15
        },
        {
          stage: 'interviewing',
          avg_duration_days: 8.7,
          trend: 'stable',
          bottleneck_probability: 0.45
        }
      ]
    };
  }

  // Get insights
  getInsights(): PredictiveInsight[] {
    return this.insights;
  }

  // Add custom insight
  addInsight(insight: Omit<PredictiveInsight, 'id' | 'created_at'>): void {
    this.insights.push({
      ...insight,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    });
  }
}

export const predictiveAnalyticsService = new PredictiveAnalyticsService();
