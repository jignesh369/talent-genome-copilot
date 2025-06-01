
import { RiskAlert } from '@/hooks/useRiskAlerts';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

class RiskAlertSystem {
  private alerts: RiskAlert[] = [];

  async getAllAlerts(): Promise<RiskAlert[]> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock alerts if none exist
    if (this.alerts.length === 0) {
      this.generateMockAlerts();
    }
    
    return this.alerts;
  }

  async generateAlertForCandidate(candidate: EnhancedCandidate): Promise<RiskAlert[]> {
    const candidateAlerts: RiskAlert[] = [];
    
    // Check for employment gaps
    if (candidate.experience_years < 3) {
      candidateAlerts.push(this.createAlert(
        candidate.id,
        'employment_gap',
        'medium',
        'Limited Experience Detected',
        `${candidate.name} has only ${candidate.experience_years} years of experience, which may indicate potential gaps in employment history.`,
        ['Verify employment history during interview', 'Request detailed work timeline', 'Focus on skill assessment rather than years of experience'],
        ['linkedin_profile', 'resume_analysis']
      ));
    }

    // Check for skill mismatches
    if (candidate.technical_depth_score < 5) {
      candidateAlerts.push(this.createAlert(
        candidate.id,
        'skill_mismatch',
        'high',
        'Low Technical Depth Score',
        `Technical assessment shows score of ${candidate.technical_depth_score}/10, indicating potential skill gaps.`,
        ['Conduct detailed technical interview', 'Provide skill development plan', 'Consider alternative role placement'],
        ['github_analysis', 'stackoverflow_activity']
      ));
    }

    // Check for availability changes
    if (candidate.availability_status === 'unavailable') {
      candidateAlerts.push(this.createAlert(
        candidate.id,
        'availability_change',
        'high',
        'Candidate Unavailable',
        `${candidate.name} has marked themselves as unavailable, indicating they may no longer be interested in opportunities.`,
        ['Reach out to confirm availability', 'Update candidate status', 'Move to passive pipeline'],
        ['profile_update', 'last_activity']
      ));
    }

    this.alerts.push(...candidateAlerts);
    return candidateAlerts;
  }

  async resolveAlert(alertId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const alertIndex = this.alerts.findIndex(alert => alert.id === alertId);
    if (alertIndex !== -1) {
      this.alerts[alertIndex].resolved = true;
    }
  }

  private createAlert(
    candidateId: string,
    alertType: RiskAlert['alert_type'],
    severity: RiskAlert['severity'],
    title: string,
    description: string,
    recommendedActions: string[],
    evidence: string[]
  ): RiskAlert {
    return {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      candidate_id: candidateId,
      alert_type: alertType,
      severity,
      title,
      description,
      detected_at: new Date().toISOString(),
      resolved: false,
      confidence_score: Math.random() * 0.3 + 0.7, // 0.7 - 1.0
      evidence,
      recommended_actions: recommendedActions
    };
  }

  private generateMockAlerts(): void {
    const mockAlerts: RiskAlert[] = [
      {
        id: 'alert_001',
        candidate_id: 'candidate_001',
        alert_type: 'profile_inconsistency',
        severity: 'medium',
        title: 'Profile Inconsistency Detected',
        description: 'Discrepancy found between LinkedIn profile and GitHub activity dates.',
        detected_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        resolved: false,
        confidence_score: 0.75,
        evidence: ['linkedin_profile', 'github_commits'],
        recommended_actions: ['Verify employment timeline', 'Request clarification during screening']
      },
      {
        id: 'alert_002',
        candidate_id: 'candidate_002',
        alert_type: 'employment_gap',
        severity: 'high',
        title: 'Employment Gap Identified',
        description: '8-month gap between previous positions requires investigation.',
        detected_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        resolved: false,
        confidence_score: 0.90,
        evidence: ['resume_analysis', 'linkedin_timeline'],
        recommended_actions: ['Ask about gap during phone screening', 'Verify with references']
      },
      {
        id: 'alert_003',
        candidate_id: 'candidate_003',
        alert_type: 'reputation_risk',
        severity: 'critical',
        title: 'Negative Online Presence',
        description: 'Controversial social media posts found that may impact company reputation.',
        detected_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        resolved: true,
        confidence_score: 0.85,
        evidence: ['twitter_posts', 'reddit_comments'],
        recommended_actions: ['Review social media policy', 'Discuss professional conduct expectations']
      }
    ];

    this.alerts = mockAlerts;
  }
}

export const riskAlertSystem = new RiskAlertSystem();
