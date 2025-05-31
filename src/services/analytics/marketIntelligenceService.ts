
import { MarketIntelligence } from '@/types/predictive-analytics';

class MarketIntelligenceService {
  private marketData: MarketIntelligence;

  constructor() {
    this.marketData = this.generateMockMarketData();
  }

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
}

export const marketIntelligenceService = new MarketIntelligenceService();
