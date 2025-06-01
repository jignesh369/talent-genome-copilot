
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export interface RiskAlert {
  id: string;
  candidate_id: string;
  alert_type: 'high_competition' | 'likely_to_decline' | 'compensation_mismatch' | 'cultural_misfit';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  recommendation: string;
  confidence_score: number;
  created_at: string;
  is_resolved: boolean;
  metadata?: Record<string, any>;
}

interface RiskMetrics {
  total_alerts: number;
  critical_alerts: number;
  resolution_rate: number;
  average_response_time: number;
  risk_categories: Record<string, number>;
}

class RiskAlertSystem {
  private static instance: RiskAlertSystem;
  private alerts: RiskAlert[] = [];
  private alertHandlers: ((alert: RiskAlert) => void)[] = [];

  static getInstance(): RiskAlertSystem {
    if (!RiskAlertSystem.instance) {
      RiskAlertSystem.instance = new RiskAlertSystem();
    }
    return RiskAlertSystem.instance;
  }

  async generateRiskAlerts(candidate: EnhancedCandidate): Promise<RiskAlert[]> {
    const alerts: RiskAlert[] = [];
    
    const competitionAlert = this.checkCompetitionRisk(candidate);
    if (competitionAlert) alerts.push(competitionAlert);
    
    const declineAlert = this.checkDeclineRisk(candidate);
    if (declineAlert) alerts.push(declineAlert);
    
    const compensationAlert = this.checkCompensationRisk(candidate);
    if (compensationAlert) alerts.push(compensationAlert);
    
    return alerts;
  }

  checkCompetitionRisk(candidate: EnhancedCandidate): RiskAlert | null {
    if (candidate.community_influence_score > 8 && candidate.technical_depth_score > 8) {
      return {
        id: `risk_${Date.now()}_competition`,
        candidate_id: candidate.id,
        alert_type: 'high_competition',
        severity: 'high',
        message: 'High-profile candidate likely receiving multiple offers',
        recommendation: 'Move quickly with competitive offer and clear value proposition',
        confidence_score: 0.85,
        created_at: new Date().toISOString(),
        is_resolved: false
      };
    }
    return null;
  }

  checkDeclineRisk(candidate: EnhancedCandidate): RiskAlert | null {
    if (candidate.availability_status === 'passive' && candidate.experience_years > 10) {
      return {
        id: `risk_${Date.now()}_decline`,
        candidate_id: candidate.id,
        alert_type: 'likely_to_decline',
        severity: 'medium',
        message: 'Senior passive candidate may require strong motivation to consider change',
        recommendation: 'Focus on growth opportunities and unique challenges in initial outreach',
        confidence_score: 0.7,
        created_at: new Date().toISOString(),
        is_resolved: false
      };
    }
    return null;
  }

  checkCompensationRisk(candidate: EnhancedCandidate): RiskAlert | null {
    if (candidate.current_company && ['Google', 'Apple', 'Microsoft', 'Amazon', 'Meta'].includes(candidate.current_company)) {
      return {
        id: `risk_${Date.now()}_compensation`,
        candidate_id: candidate.id,
        alert_type: 'compensation_mismatch',
        severity: 'high',
        message: 'Candidate from high-paying tech company may have elevated compensation expectations',
        recommendation: 'Prepare competitive compensation package and emphasize non-monetary benefits',
        confidence_score: 0.8,
        created_at: new Date().toISOString(),
        is_resolved: false
      };
    }
    return null;
  }

  onAlert(handler: (alert: RiskAlert) => void): void {
    this.alertHandlers.push(handler);
  }

  analyzeCandidate(candidate: EnhancedCandidate): RiskAlert[] {
    const alerts = this.generateRiskAlerts(candidate);
    alerts.forEach(alert => {
      this.alerts.push(alert);
      this.alertHandlers.forEach(handler => handler(alert));
    });
    return alerts;
  }

  resolveAlert(alertId: string, resolvedBy: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.is_resolved = true;
      alert.metadata = { ...alert.metadata, resolved_by: resolvedBy };
    }
  }

  getAlertStats(): RiskMetrics {
    return {
      total_alerts: this.alerts.length,
      critical_alerts: this.alerts.filter(a => a.severity === 'critical').length,
      resolution_rate: this.alerts.length > 0 ? this.alerts.filter(a => a.is_resolved).length / this.alerts.length : 0,
      average_response_time: 4.5,
      risk_categories: {
        'high_competition': this.alerts.filter(a => a.alert_type === 'high_competition').length,
        'likely_to_decline': this.alerts.filter(a => a.alert_type === 'likely_to_decline').length,
        'compensation_mismatch': this.alerts.filter(a => a.alert_type === 'compensation_mismatch').length,
        'cultural_misfit': this.alerts.filter(a => a.alert_type === 'cultural_misfit').length
      }
    };
  }

  async getRiskMetrics(): Promise<RiskMetrics> {
    return this.getAlertStats();
  }
}

export const riskAlertSystem = RiskAlertSystem.getInstance();
