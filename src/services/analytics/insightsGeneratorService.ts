
import { EnhancedCandidate } from '@/types/enhanced-recruiting';
import { PredictiveInsight } from '@/types/predictive-analytics';

class InsightsGeneratorService {
  generatePredictiveInsights(candidates: EnhancedCandidate[]): PredictiveInsight[] {
    const insights: PredictiveInsight[] = [];

    // Generate hiring forecast insight
    const highEngagementCandidates = candidates.filter(c => c.engagement_score > 75);
    if (highEngagementCandidates.length > 0) {
      insights.push({
        id: 'hiring-forecast-1',
        type: 'hiring_forecast',
        title: 'Strong Hiring Pipeline Detected',
        description: `${highEngagementCandidates.length} candidates show high engagement scores (>75%). Expected to convert within 2-3 weeks.`,
        confidence: 87,
        impact: 'high',
        timeframe: '2-3 weeks',
        actionable_recommendations: [
          'Prioritize outreach to high-engagement candidates',
          'Schedule interviews within next 5 days',
          'Prepare competitive offers for top performers'
        ],
        created_at: new Date().toISOString()
      });
    }

    // Generate pipeline bottleneck insight
    const stuckCandidates = candidates.filter(c => 
      c.pipeline_stage === 'qualified' && 
      new Date(c.updated_at) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
    
    if (stuckCandidates.length > 5) {
      insights.push({
        id: 'bottleneck-1',
        type: 'pipeline_bottleneck',
        title: 'Qualification Stage Bottleneck',
        description: `${stuckCandidates.length} candidates have been in qualification stage for over a week. This may indicate process inefficiencies.`,
        confidence: 92,
        impact: 'medium',
        timeframe: 'immediate',
        actionable_recommendations: [
          'Review qualification criteria and process',
          'Assign dedicated resources to move candidates forward',
          'Implement automated follow-up sequences'
        ],
        created_at: new Date().toISOString()
      });
    }

    // Generate candidate trajectory insight
    const topCandidates = candidates
      .filter(c => c.placement_probability_score > 80)
      .sort((a, b) => b.placement_probability_score - a.placement_probability_score)
      .slice(0, 3);

    if (topCandidates.length > 0) {
      insights.push({
        id: 'trajectory-1',
        type: 'candidate_trajectory',
        title: 'Top Performers Identified',
        description: `${topCandidates.length} candidates show exceptional placement probability scores. Fast-track recommended.`,
        confidence: 94,
        impact: 'high',
        timeframe: '1-2 weeks',
        actionable_recommendations: [
          'Schedule executive interviews immediately',
          'Prepare premium offer packages',
          'Assign senior recruiters to these candidates'
        ],
        created_at: new Date().toISOString()
      });
    }

    // Generate market trend insight
    const techSkills = ['React', 'Node.js', 'Python', 'TypeScript', 'AWS'];
    const skillCounts = techSkills.map(skill => ({
      skill,
      count: candidates.filter(c => 
        c.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      ).length
    }));

    const topSkill = skillCounts.reduce((max, current) => 
      current.count > max.count ? current : max
    );

    if (topSkill.count > 10) {
      insights.push({
        id: 'market-trend-1',
        type: 'market_trend',
        title: `${topSkill.skill} Talent Pool Analysis`,
        description: `Strong representation of ${topSkill.skill} skills in pipeline (${topSkill.count} candidates). Market timing favorable for placements.`,
        confidence: 78,
        impact: 'medium',
        timeframe: '2-4 weeks',
        actionable_recommendations: [
          `Focus on ${topSkill.skill} job opportunities`,
          'Leverage skill abundance for competitive positioning',
          'Consider specialized recruitment campaigns'
        ],
        created_at: new Date().toISOString()
      });
    }

    return insights;
  }
}

export const insightsGeneratorService = new InsightsGeneratorService();
