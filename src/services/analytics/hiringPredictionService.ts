
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

class HiringPredictionService {
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
}

export const hiringPredictionService = new HiringPredictionService();
