
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { PersonalizationData, PersonalizationInsight, OptimalTiming, GeneratedContent } from '@/types/outreach-service';

export class OutreachPersonalizationService {
  private personalizationCache: Map<string, PersonalizationData> = new Map();

  async generatePersonalizationData(candidate: EnhancedCandidate): Promise<PersonalizationData> {
    const cached = this.personalizationCache.get(candidate.id);
    if (cached) return cached;

    const insights = this.analyzeCandidate(candidate);
    const communicationStyle = this.determineCommunicationStyle(candidate);
    const optimalTiming = this.calculateOptimalTiming(candidate);
    const generatedContent = await this.generateAIContent(candidate, insights);

    const personalizationData: PersonalizationData = {
      candidate_id: candidate.id,
      insights,
      communication_style: communicationStyle,
      optimal_timing: optimalTiming,
      personalization_score: this.calculatePersonalizationScore(insights),
      generated_content: generatedContent
    };

    this.personalizationCache.set(candidate.id, personalizationData);
    return personalizationData;
  }

  private analyzeCandidate(candidate: EnhancedCandidate): PersonalizationInsight[] {
    const insights: PersonalizationInsight[] = [];

    if (candidate.skills.length > 0) {
      insights.push({
        type: 'skill_match',
        title: 'Technical Skills Alignment',
        content: `Strong expertise in ${candidate.skills.slice(0, 3).join(', ')} with ${candidate.experience_years} years of experience.`,
        confidence: 85,
        source: 'Profile Analysis',
        suggested_usage: 'Highlight relevant technical challenges and growth opportunities in these areas.'
      });
    }

    if (candidate.career_trajectory_analysis) {
      insights.push({
        type: 'career_trajectory',
        title: 'Career Progression Pattern',
        content: `${candidate.career_trajectory_analysis.progression_type} trajectory with ${candidate.career_trajectory_analysis.growth_rate}% growth rate.`,
        confidence: candidate.career_trajectory_analysis.stability_score,
        source: 'Career Analysis',
        suggested_usage: candidate.career_trajectory_analysis.next_likely_move
      });
    }

    if (candidate.osint_profile && candidate.osint_profile.availability_signals) {
      const recentActivity = candidate.osint_profile.availability_signals[0];
      if (recentActivity) {
        insights.push({
          type: 'recent_activity',
          title: 'Recent Activity Signal',
          content: `Recent activity detected on ${recentActivity.signal_type || 'professional platform'}`,
          confidence: recentActivity.confidence || 70,
          source: recentActivity.signal_type || 'OSINT Analysis',
          suggested_usage: 'Reference their current activity and engagement in the field.'
        });
      }
    }

    return insights;
  }

  private determineCommunicationStyle(candidate: EnhancedCandidate): 'formal' | 'casual' | 'technical' | 'executive' {
    if (candidate.current_title?.toLowerCase().includes('senior') || candidate.experience_years > 8) {
      return 'technical';
    }
    if (candidate.current_title?.toLowerCase().includes('manager') || candidate.current_title?.toLowerCase().includes('director')) {
      return 'executive';
    }
    return 'casual';
  }

  private calculateOptimalTiming(candidate: EnhancedCandidate): OptimalTiming {
    return {
      day_of_week: 'Tuesday',
      time_of_day: '10:00 AM',
      timezone: 'PST',
      confidence: 75
    };
  }

  private async generateAIContent(candidate: EnhancedCandidate, insights: PersonalizationInsight[]): Promise<GeneratedContent> {
    return {
      subject_suggestions: [
        `${candidate.current_title} opportunity at [Company] - ${insights[0]?.title}`,
        `Exciting ${candidate.skills[0]} role - would love to chat`,
        `Your expertise in ${candidate.skills.slice(0, 2).join(' & ')} caught our attention`
      ],
      opening_lines: [
        `Hi ${candidate.name}, I noticed your experience with ${candidate.skills[0]} and thought you might be interested in...`,
        `Your background in ${candidate.current_title} roles is exactly what we're looking for...`,
        `Given your ${candidate.experience_years} years of experience, I wanted to reach out about...`
      ],
      value_propositions: [
        `Work with cutting-edge ${candidate.skills[0]} technology in a fast-growing company`,
        `Lead technical initiatives and mentor junior developers`,
        `Significant equity upside and career growth opportunities`
      ],
      call_to_actions: [
        'Would you be open to a 15-minute chat about this opportunity?',
        'Happy to share more details - are you free for a quick call this week?',
        'I\'d love to hear your thoughts on this role. Worth a conversation?'
      ]
    };
  }

  private calculatePersonalizationScore(insights: PersonalizationInsight[]): number {
    if (insights.length === 0) return 0;
    const avgConfidence = insights.reduce((sum, insight) => sum + insight.confidence, 0) / insights.length;
    return Math.round(avgConfidence);
  }
}

export const outreachPersonalizationService = new OutreachPersonalizationService();
