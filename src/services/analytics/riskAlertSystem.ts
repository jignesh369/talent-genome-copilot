
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface RiskAlert {
  id: string;
  candidate_id: string;
  alert_type: 'background' | 'engagement' | 'availability' | 'performance' | 'communication';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  recommended_actions: string[];
  detected_at: string;
  resolved: boolean;
  auto_generated: boolean;
}

class RiskAlertSystem {
  private alerts: RiskAlert[] = [];
  private alertCallbacks: Array<(alert: RiskAlert) => void> = [];

  analyzeCandidate(candidate: EnhancedCandidate): RiskAlert[] {
    const risks: RiskAlert[] = [];

    // Background verification risks
    if (candidate.background_verification_status === 'flagged') {
      risks.push(this.createAlert(
        candidate.id,
        'background',
        'high',
        'Background Verification Flag',
        'OSINT analysis has flagged potential concerns in background verification',
        [
          'Conduct manual background verification',
          'Schedule additional reference calls',
          'Review OSINT red flags in detail'
        ]
      ));
    }

    // Low engagement risk
    if (candidate.engagement_score < 30) {
      risks.push(this.createAlert(
        candidate.id,
        'engagement',
        'medium',
        'Low Candidate Engagement',
        `Engagement score of ${candidate.engagement_score}% indicates potential disinterest`,
        [
          'Increase personalized communication',
          'Schedule a quick check-in call',
          'Review communication history for patterns'
        ]
      ));
    }

    // Communication response patterns
    if (candidate.response_rate < 0.5 && candidate.interaction_timeline.length > 3) {
      risks.push(this.createAlert(
        candidate.id,
        'communication',
        'medium',
        'Poor Response Rate',
        `Response rate of ${Math.round(candidate.response_rate * 100)}% may indicate communication issues`,
        [
          'Try alternative communication channels',
          'Adjust communication timing',
          'Consider if role is still relevant to candidate'
        ]
      ));
    }

    // Availability concerns
    const recentAvailabilitySignals = candidate.availability_signals.filter(
      signal => new Date(signal.detected_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (recentAvailabilitySignals.length === 0 && candidate.availability_status === 'passive') {
      risks.push(this.createAlert(
        candidate.id,
        'availability',
        'low',
        'Unclear Availability Status',
        'No recent availability signals detected for passive candidate',
        [
          'Probe availability status in next interaction',
          'Update OSINT monitoring frequency',
          'Consider direct availability inquiry'
        ]
      ));
    }

    // Performance prediction risks
    if (candidate.placement_probability_score < 40) {
      risks.push(this.createAlert(
        candidate.id,
        'performance',
        'high',
        'Low Placement Probability',
        `AI predicts only ${candidate.placement_probability_score}% chance of successful placement`,
        [
          'Re-evaluate job fit',
          'Consider alternative roles',
          'Focus on addressing specific concerns'
        ]
      ));
    }

    // Store alerts and notify
    risks.forEach(alert => {
      this.alerts.push(alert);
      this.notifyAlert(alert);
    });

    return risks;
  }

  private createAlert(
    candidateId: string,
    type: RiskAlert['alert_type'],
    severity: RiskAlert['severity'],
    title: string,
    description: string,
    actions: string[]
  ): RiskAlert {
    return {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      candidate_id: candidateId,
      alert_type: type,
      severity,
      title,
      description,
      recommended_actions: actions,
      detected_at: new Date().toISOString(),
      resolved: false,
      auto_generated: true
    };
  }

  private notifyAlert(alert: RiskAlert): void {
    console.log(`🚨 Risk Alert [${alert.severity.toUpperCase()}]: ${alert.title}`);
    this.alertCallbacks.forEach(callback => callback(alert));
  }

  onAlert(callback: (alert: RiskAlert) => void): void {
    this.alertCallbacks.push(callback);
  }

  getAlerts(candidateId?: string): RiskAlert[] {
    if (candidateId) {
      return this.alerts.filter(alert => 
        alert.candidate_id === candidateId && !alert.resolved
      );
    }
    return this.alerts.filter(alert => !alert.resolved);
  }

  resolveAlert(alertId: string, resolvedBy: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
      console.log(`Alert ${alertId} resolved by ${resolvedBy}`);
    }
  }

  getAlertStats(): {
    total: number;
    by_severity: Record<string, number>;
    by_type: Record<string, number>;
    recent: number;
  } {
    const unresolvedAlerts = this.alerts.filter(a => !a.resolved);
    const recentAlerts = unresolvedAlerts.filter(
      a => new Date(a.detected_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    );

    const bySeverity = unresolvedAlerts.reduce((acc, alert) => {
      acc[alert.severity] = (acc[alert.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byType = unresolvedAlerts.reduce((acc, alert) => {
      acc[alert.alert_type] = (acc[alert.alert_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: unresolvedAlerts.length,
      by_severity: bySeverity,
      by_type: byType,
      recent: recentAlerts.length
    };
  }
}

export const riskAlertSystem = new RiskAlertSystem();
export type { RiskAlert };
