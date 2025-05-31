
import { MarketIntelligence, SkillTrend, SalaryBenchmark, CompetitionMetric, TalentAvailability, VelocityTrend } from '@/types/predictive-analytics';

class MarketIntelligenceService {
  getMarketIntelligence(): MarketIntelligence {
    return {
      skill_demand_trends: this.getSkillTrends(),
      salary_benchmarks: this.getSalaryBenchmarks(),
      competition_analysis: this.getCompetitionMetrics(),
      talent_availability: this.getTalentAvailability(),
      hiring_velocity_trends: this.getVelocityTrends()
    };
  }

  private getSkillTrends(): SkillTrend[] {
    return [
      {
        skill: 'React',
        demand_change: 23,
        popularity_score: 89,
        projected_growth: 31,
        market_saturation: 67
      },
      {
        skill: 'TypeScript',
        demand_change: 18,
        popularity_score: 82,
        projected_growth: 28,
        market_saturation: 54
      },
      {
        skill: 'Python',
        demand_change: 15,
        popularity_score: 91,
        projected_growth: 22,
        market_saturation: 71
      },
      {
        skill: 'AWS',
        demand_change: 35,
        popularity_score: 78,
        projected_growth: 42,
        market_saturation: 43
      },
      {
        skill: 'Machine Learning',
        demand_change: 41,
        popularity_score: 76,
        projected_growth: 48,
        market_saturation: 38
      }
    ];
  }

  private getSalaryBenchmarks(): SalaryBenchmark[] {
    return [
      {
        role: 'Frontend Developer',
        location: 'San Francisco, CA',
        min_salary: 120000,
        max_salary: 180000,
        median_salary: 150000,
        percentile_25: 135000,
        percentile_75: 165000,
        trend: 'increasing'
      },
      {
        role: 'Backend Developer',
        location: 'New York, NY',
        min_salary: 115000,
        max_salary: 175000,
        median_salary: 145000,
        percentile_25: 130000,
        percentile_75: 160000,
        trend: 'increasing'
      },
      {
        role: 'Data Scientist',
        location: 'Seattle, WA',
        min_salary: 130000,
        max_salary: 200000,
        median_salary: 165000,
        percentile_25: 145000,
        percentile_75: 185000,
        trend: 'stable'
      },
      {
        role: 'DevOps Engineer',
        location: 'Austin, TX',
        min_salary: 110000,
        max_salary: 170000,
        median_salary: 140000,
        percentile_25: 125000,
        percentile_75: 155000,
        trend: 'increasing'
      }
    ];
  }

  private getCompetitionMetrics(): CompetitionMetric[] {
    return [
      {
        company: 'Google',
        hiring_activity: 87,
        talent_retention: 94,
        market_share: 23,
        competitive_strength: 96
      },
      {
        company: 'Meta',
        hiring_activity: 76,
        talent_retention: 89,
        market_share: 18,
        competitive_strength: 91
      },
      {
        company: 'Amazon',
        hiring_activity: 92,
        talent_retention: 82,
        market_share: 26,
        competitive_strength: 88
      },
      {
        company: 'Microsoft',
        hiring_activity: 84,
        talent_retention: 91,
        market_share: 21,
        competitive_strength: 93
      },
      {
        company: 'Apple',
        hiring_activity: 71,
        talent_retention: 96,
        market_share: 19,
        competitive_strength: 95
      }
    ];
  }

  private getTalentAvailability(): TalentAvailability[] {
    return [
      {
        skill_set: ['React', 'TypeScript', 'Node.js'],
        available_candidates: 1247,
        response_rate: 68,
        avg_time_to_respond: 2.3,
        quality_score: 82
      },
      {
        skill_set: ['Python', 'Django', 'PostgreSQL'],
        available_candidates: 956,
        response_rate: 71,
        avg_time_to_respond: 1.8,
        quality_score: 87
      },
      {
        skill_set: ['AWS', 'Docker', 'Kubernetes'],
        available_candidates: 623,
        response_rate: 79,
        avg_time_to_respond: 1.2,
        quality_score: 91
      },
      {
        skill_set: ['Machine Learning', 'TensorFlow', 'Python'],
        available_candidates: 441,
        response_rate: 84,
        avg_time_to_respond: 0.9,
        quality_score: 94
      }
    ];
  }

  private getVelocityTrends(): VelocityTrend[] {
    return [
      {
        stage: 'Initial Screening',
        avg_duration_days: 3,
        trend: 'improving',
        bottleneck_probability: 15
      },
      {
        stage: 'Technical Interview',
        avg_duration_days: 7,
        trend: 'stable',
        bottleneck_probability: 23
      },
      {
        stage: 'Cultural Fit Assessment',
        avg_duration_days: 5,
        trend: 'improving',
        bottleneck_probability: 18
      },
      {
        stage: 'Final Interview',
        avg_duration_days: 10,
        trend: 'declining',
        bottleneck_probability: 34
      },
      {
        stage: 'Offer Negotiation',
        avg_duration_days: 6,
        trend: 'stable',
        bottleneck_probability: 28
      }
    ];
  }
}

export const marketIntelligenceService = new MarketIntelligenceService();
