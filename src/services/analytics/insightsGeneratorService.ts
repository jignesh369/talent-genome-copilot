
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { convertToEnhancedCandidate } from '@/utils/candidateConverter';

interface MarketInsight {
  type: 'talent_scarcity' | 'salary_trends' | 'skill_demand' | 'location_trends' | 'hiring_velocity';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable_recommendations: string[];
  confidence: number;
  data_points: any[];
}

interface TalentPoolAnalysis {
  total_candidates: number;
  active_candidates: number;
  passive_candidates: number;
  skill_distribution: Record<string, number>;
  experience_distribution: Record<string, number>;
  location_distribution: Record<string, number>;
  availability_trends: Record<string, number>;
  quality_metrics: {
    avg_technical_score: number;
    avg_influence_score: number;
    avg_learning_velocity: number;
  };
}

export const insightsGeneratorService = {
  async generateMarketInsights(organizationId?: string): Promise<MarketInsight[]> {
    console.log('Generating market insights...');
    
    const candidates = await this.fetchCandidateData(organizationId);
    const insights: MarketInsight[] = [];
    
    // Generate different types of insights
    insights.push(...await this.analyzeTalentScarcity(candidates));
    insights.push(...await this.analyzeSalaryTrends(candidates));
    insights.push(...await this.analyzeSkillDemand(candidates));
    insights.push(...await this.analyzeLocationTrends(candidates));
    insights.push(...await this.analyzeHiringVelocity(candidates));
    
    return insights.sort((a, b) => b.confidence - a.confidence);
  },

  async generateTalentPoolAnalysis(organizationId?: string): Promise<TalentPoolAnalysis> {
    console.log('Analyzing talent pool...');
    
    const candidates = await this.fetchCandidateData(organizationId);
    
    return {
      total_candidates: candidates.length,
      active_candidates: candidates.filter(c => c.availability_status === 'active').length,
      passive_candidates: candidates.filter(c => c.availability_status === 'passive').length,
      skill_distribution: this.calculateSkillDistribution(candidates),
      experience_distribution: this.calculateExperienceDistribution(candidates),
      location_distribution: this.calculateLocationDistribution(candidates),
      availability_trends: this.calculateAvailabilityTrends(candidates),
      quality_metrics: this.calculateQualityMetrics(candidates)
    };
  },

  async fetchCandidateData(organizationId?: string): Promise<EnhancedCandidate[]> {
    let query = supabase
      .from('enhanced_candidates')
      .select(`
        *,
        osint_profiles(*),
        career_trajectories(*),
        cultural_fit_indicators(*)
      `);
    
    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching candidate data:', error);
      return [];
    }
    
    // Use the converter utility to transform database results to EnhancedCandidate
    return (data || []).map(candidate => convertToEnhancedCandidate(candidate));
  },

  async analyzeTalentScarcity(candidates: EnhancedCandidate[]): Promise<MarketInsight[]> {
    const insights: MarketInsight[] = [];
    
    // Analyze skill scarcity
    const skillCounts = this.calculateSkillDistribution(candidates);
    const totalCandidates = candidates.length;
    
    Object.entries(skillCounts).forEach(([skill, count]) => {
      const percentage = totalCandidates > 0 ? (count / totalCandidates) * 100 : 0;
      
      if (percentage < 10 && count > 0) { // Rare skills
        insights.push({
          type: 'talent_scarcity',
          title: `${skill} Talent Scarcity`,
          description: `Only ${percentage.toFixed(1)}% of candidates have ${skill} skills. This represents a potential talent bottleneck.`,
          impact: percentage < 5 ? 'high' : 'medium',
          actionable_recommendations: [
            `Consider expanding search criteria for ${skill}`,
            'Invest in upskilling existing team members',
            'Consider remote candidates to expand talent pool',
            'Partner with bootcamps or training programs'
          ],
          confidence: 0.8,
          data_points: [{ skill, count, percentage }]
        });
      }
    });
    
    return insights;
  },

  async analyzeSalaryTrends(candidates: EnhancedCandidate[]): Promise<MarketInsight[]> {
    const insights: MarketInsight[] = [];
    
    const candidatesWithSalary = candidates.filter(c => 
      c.salary_expectation_range?.min && typeof c.salary_expectation_range.min === 'number'
    );
    
    if (candidatesWithSalary.length > 10) {
      const salaries = candidatesWithSalary.map(c => c.salary_expectation_range!.min);
      const avgSalary = salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;
      const medianSalary = this.calculateMedian(salaries);
      
      insights.push({
        type: 'salary_trends',
        title: 'Salary Expectations Analysis',
        description: `Average salary expectation is $${Math.round(avgSalary).toLocaleString()}, with median at $${Math.round(medianSalary).toLocaleString()}.`,
        impact: 'medium',
        actionable_recommendations: [
          'Review compensation packages to ensure competitiveness',
          'Consider non-monetary benefits to offset salary gaps',
          'Benchmark against industry standards'
        ],
        confidence: 0.7,
        data_points: [{ avgSalary, medianSalary, sampleSize: candidatesWithSalary.length }]
      });
    }
    
    return insights;
  },

  async analyzeSkillDemand(candidates: EnhancedCandidate[]): Promise<MarketInsight[]> {
    const insights: MarketInsight[] = [];
    
    const skillCounts = this.calculateSkillDistribution(candidates);
    const topSkills = Object.entries(skillCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    insights.push({
      type: 'skill_demand',
      title: 'Top In-Demand Skills',
      description: `The most common skills in our talent pool are: ${topSkills.map(([skill]) => skill).join(', ')}.`,
      impact: 'medium',
      actionable_recommendations: [
        'Focus job descriptions on in-demand skills',
        'Consider skills adjacency for harder-to-fill roles',
        'Develop targeted sourcing strategies for top skills'
      ],
      confidence: 0.9,
      data_points: topSkills.map(([skill, count]) => ({ skill, count }))
    });
    
    return insights;
  },

  async analyzeLocationTrends(candidates: EnhancedCandidate[]): Promise<MarketInsight[]> {
    const insights: MarketInsight[] = [];
    
    const locationCounts = this.calculateLocationDistribution(candidates);
    const topLocations = Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
    
    if (topLocations.length > 0) {
      insights.push({
        type: 'location_trends',
        title: 'Geographic Talent Distribution',
        description: `Highest talent concentration in: ${topLocations.map(([loc]) => loc).join(', ')}.`,
        impact: 'low',
        actionable_recommendations: [
          'Consider remote work options to access broader talent pools',
          'Establish satellite offices in talent-rich areas',
          'Partner with local universities and training programs'
        ],
        confidence: 0.6,
        data_points: topLocations.map(([location, count]) => ({ location, count }))
      });
    }
    
    return insights;
  },

  async analyzeHiringVelocity(candidates: EnhancedCandidate[]): Promise<MarketInsight[]> {
    const insights: MarketInsight[] = [];
    
    const activeCandidates = candidates.filter(c => c.availability_status === 'active').length;
    const passiveCandidates = candidates.filter(c => c.availability_status === 'passive').length;
    const total = activeCandidates + passiveCandidates;
    
    if (total > 0) {
      const activePercentage = (activeCandidates / total) * 100;
      
      insights.push({
        type: 'hiring_velocity',
        title: 'Candidate Availability Analysis',
        description: `${activePercentage.toFixed(1)}% of candidates are actively seeking new opportunities.`,
        impact: activePercentage > 30 ? 'high' : activePercentage > 15 ? 'medium' : 'low',
        actionable_recommendations: [
          activePercentage < 20 
            ? 'Focus on passive candidate outreach strategies'
            : 'Expedite hiring processes to capitalize on active candidates',
          'Develop compelling value propositions for passive candidates',
          'Consider timing of outreach based on market conditions'
        ],
        confidence: 0.8,
        data_points: [{ activeCandidates, passiveCandidates, activePercentage }]
      });
    }
    
    return insights;
  },

  calculateSkillDistribution(candidates: EnhancedCandidate[]): Record<string, number> {
    const skillCounts: Record<string, number> = {};
    
    candidates.forEach(candidate => {
      candidate.skills?.forEach((skill: string) => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
    });
    
    return skillCounts;
  },

  calculateExperienceDistribution(candidates: EnhancedCandidate[]): Record<string, number> {
    const distribution: Record<string, number> = {
      'Junior (0-2 years)': 0,
      'Mid-level (3-5 years)': 0,
      'Senior (6-10 years)': 0,
      'Lead (10+ years)': 0
    };
    
    candidates.forEach(candidate => {
      const years = candidate.experience_years || 0;
      
      if (years <= 2) distribution['Junior (0-2 years)']++;
      else if (years <= 5) distribution['Mid-level (3-5 years)']++;
      else if (years <= 10) distribution['Senior (6-10 years)']++;
      else distribution['Lead (10+ years)']++;
    });
    
    return distribution;
  },

  calculateLocationDistribution(candidates: EnhancedCandidate[]): Record<string, number> {
    const locationCounts: Record<string, number> = {};
    
    candidates.forEach(candidate => {
      if (candidate.location) {
        // Normalize location (extract city/state)
        const location = candidate.location.split(',')[0].trim();
        locationCounts[location] = (locationCounts[location] || 0) + 1;
      }
    });
    
    return locationCounts;
  },

  calculateAvailabilityTrends(candidates: EnhancedCandidate[]): Record<string, number> {
    const trends: Record<string, number> = {
      active: 0,
      passive: 0,
      unavailable: 0
    };
    
    candidates.forEach(candidate => {
      trends[candidate.availability_status || 'passive']++;
    });
    
    return trends;
  },

  calculateQualityMetrics(candidates: EnhancedCandidate[]): any {
    if (candidates.length === 0) {
      return {
        avg_technical_score: 0,
        avg_influence_score: 0,
        avg_learning_velocity: 0
      };
    }
    
    const validCandidates = candidates.filter(c => 
      typeof c.technical_depth_score === 'number' && 
      typeof c.community_influence_score === 'number' && 
      typeof c.learning_velocity_score === 'number'
    );
    
    if (validCandidates.length === 0) {
      return {
        avg_technical_score: 0,
        avg_influence_score: 0,
        avg_learning_velocity: 0
      };
    }
    
    return {
      avg_technical_score: validCandidates.reduce((sum, c) => sum + (c.technical_depth_score || 0), 0) / validCandidates.length,
      avg_influence_score: validCandidates.reduce((sum, c) => sum + (c.community_influence_score || 0), 0) / validCandidates.length,
      avg_learning_velocity: validCandidates.reduce((sum, c) => sum + (c.learning_velocity_score || 0), 0) / validCandidates.length
    };
  },

  calculateMedian(numbers: number[]): number {
    const sorted = numbers.sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    
    return sorted[middle];
  }
};
