
import { EnhancedCandidate, CandidateInteraction, AvailabilitySignal, OSINTProfile } from '@/types/enhanced-recruiting';
import { Candidate } from '@/types/recruiting';

class EnhancedCandidateService {
  private candidates: EnhancedCandidate[] = [];

  // Convert basic candidate to enhanced candidate
  enhanceCandidate(basicCandidate: Candidate): EnhancedCandidate {
    return {
      ...basicCandidate,
      source_details: {
        type: basicCandidate.source === 'direct' ? 'portal' : 
              basicCandidate.source === 'linkedin' ? 'linkedin' : 'manual_upload',
        imported_date: basicCandidate.created_at,
        confidence_score: 0.8
      },
      portal_activity_score: 0,
      interaction_timeline: [],
      engagement_score: 0,
      response_rate: 0,
      preferred_contact_method: 'email',
      background_verification_status: 'pending',
      placement_probability_score: 0,
      cultural_fit_score: 0,
      availability_signals: [],
      job_interests: basicCandidate.skills,
      pipeline_stage: this.mapStatusToStage(basicCandidate.status),
      stage_history: [{
        stage: this.mapStatusToStage(basicCandidate.status),
        entered_date: basicCandidate.created_at,
        moved_by: 'system',
        automated: true
      }],
      priority_level: 'medium'
    };
  }

  private mapStatusToStage(status: string): string {
    const stageMap: Record<string, string> = {
      'new': 'sourced',
      'screening': 'qualified',
      'interviewing': 'interviewing',
      'offer': 'offer_stage',
      'hired': 'hired',
      'rejected': 'rejected'
    };
    return stageMap[status] || 'sourced';
  }

  // Add interaction to candidate timeline
  addInteraction(candidateId: string, interaction: Omit<CandidateInteraction, 'id'>): void {
    const candidate = this.candidates.find(c => c.id === candidateId);
    if (candidate) {
      const newInteraction: CandidateInteraction = {
        ...interaction,
        id: Date.now().toString()
      };
      candidate.interaction_timeline.push(newInteraction);
      this.updateEngagementScore(candidate);
    }
  }

  // Update engagement score based on interactions
  private updateEngagementScore(candidate: EnhancedCandidate): void {
    const interactions = candidate.interaction_timeline;
    const totalInteractions = interactions.length;
    const responses = interactions.filter(i => i.response_received).length;
    const recentActivity = interactions.filter(i => 
      new Date(i.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;

    candidate.response_rate = totalInteractions > 0 ? responses / totalInteractions : 0;
    candidate.engagement_score = Math.min(100, 
      (candidate.response_rate * 40) + 
      (recentActivity * 10) + 
      (candidate.portal_activity_score * 0.5)
    );
  }

  // Add availability signal
  addAvailabilitySignal(candidateId: string, signal: AvailabilitySignal): void {
    const candidate = this.candidates.find(c => c.id === candidateId);
    if (candidate) {
      candidate.availability_signals.push(signal);
      // Update placement probability based on availability signals
      this.updatePlacementProbability(candidate);
    }
  }

  // Make this method public so it can be called from hooks
  updatePlacementProbability(candidate: EnhancedCandidate): void {
    let score = 50; // Base score

    // Factor in engagement
    score += candidate.engagement_score * 0.3;

    // Factor in availability signals
    const activeSignals = candidate.availability_signals.filter(s => 
      s.signal_type === 'active_job_search' || s.signal_type === 'career_change'
    );
    score += activeSignals.length * 15;

    // Factor in response rate
    score += candidate.response_rate * 20;

    // Factor in skill match (simplified)
    if (candidate.skills.length > 3) {
      score += 10;
    }

    candidate.placement_probability_score = Math.min(100, Math.max(0, score));
  }

  // Update OSINT profile
  updateOSINTProfile(candidateId: string, osintProfile: OSINTProfile): void {
    const candidate = this.candidates.find(c => c.id === candidateId);
    if (candidate) {
      candidate.osint_profile = osintProfile;
      candidate.osint_last_updated = new Date().toISOString();
      
      // Update cultural fit score based on OSINT data
      this.updateCulturalFitScore(candidate);
      
      // Check for red flags
      if (osintProfile.red_flags && osintProfile.red_flags.length > 0) {
        candidate.background_verification_status = 'flagged';
      } else {
        candidate.background_verification_status = 'verified';
      }
    }
  }

  private updateCulturalFitScore(candidate: EnhancedCandidate): void {
    if (!candidate.osint_profile) return;

    let score = 50; // Base score
    const osint = candidate.osint_profile;

    // Factor in professional reputation (simplified scoring)
    if (osint.professional_reputation) {
      score += (osint.professional_reputation.industry_recognition || 0) * 0.2;
      const communityInvolvementLength = osint.professional_reputation.community_involvement?.length ?? 0;
      score += communityInvolvementLength * 5;
    }

    // Factor in social presence
    if (osint.social_presence) {
      score += (osint.social_presence.professional_consistency || 0) * 0.3;
    }

    // Factor in GitHub activity (for technical roles)
    if (osint.github_profile) {
      score += Math.min(20, (osint.github_profile.contribution_activity || 0) * 0.1);
    }

    candidate.cultural_fit_score = Math.min(100, Math.max(0, score));
  }

  // Move candidate through pipeline stages
  moveToStage(candidateId: string, newStage: string, movedBy: string, reason?: string): void {
    const candidate = this.candidates.find(c => c.id === candidateId);
    if (candidate && candidate.pipeline_stage !== newStage) {
      // Add to stage history
      const currentStageEntry = candidate.stage_history.find(s => s.stage === candidate.pipeline_stage);
      if (currentStageEntry && !currentStageEntry.duration_days) {
        currentStageEntry.duration_days = Math.floor(
          (Date.now() - new Date(currentStageEntry.entered_date).getTime()) / (1000 * 60 * 60 * 24)
        );
      }

      candidate.stage_history.push({
        stage: newStage,
        entered_date: new Date().toISOString(),
        moved_by: movedBy,
        reason,
        automated: false
      });

      candidate.pipeline_stage = newStage;
      candidate.updated_at = new Date().toISOString();
    }
  }

  // Get candidates by various filters
  getCandidatesByEngagement(minScore: number): EnhancedCandidate[] {
    return this.candidates.filter(c => c.engagement_score >= minScore);
  }

  getCandidatesByAvailability(signalTypes: string[]): EnhancedCandidate[] {
    return this.candidates.filter(c => 
      c.availability_signals.some(s => signalTypes.includes(s.signal_type))
    );
  }

  getCandidatesByStage(stage: string): EnhancedCandidate[] {
    return this.candidates.filter(c => c.pipeline_stage === stage);
  }

  // AI-powered candidate ranking
  rankCandidatesForJob(jobId: string, jobRequirements: string[]): EnhancedCandidate[] {
    return this.candidates
      .map(candidate => ({
        ...candidate,
        relevance_score: this.calculateJobRelevanceScore(candidate, jobRequirements)
      }))
      .sort((a, b) => b.relevance_score - a.relevance_score);
  }

  private calculateJobRelevanceScore(candidate: EnhancedCandidate, requirements: string[]): number {
    let score = 0;

    // Skill matching
    const skillMatches = candidate.skills.filter(skill => 
      requirements.some(req => skill.toLowerCase().includes(req.toLowerCase()))
    ).length;
    score += (skillMatches / requirements.length) * 40;

    // Experience level
    score += Math.min(25, candidate.experience_years * 2);

    // Engagement and availability
    score += candidate.engagement_score * 0.2;
    score += candidate.placement_probability_score * 0.15;

    return Math.min(100, score);
  }

  // Mock data population (for development)
  initializeMockData(): void {
    console.log('Enhanced candidate service initialized with mock data');
  }
}

export const enhancedCandidateService = new EnhancedCandidateService();
