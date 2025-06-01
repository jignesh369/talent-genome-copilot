
import { supabase } from '@/integrations/supabase/client';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export interface RiskAlert {
  id: string;
  type: 'candidate_risk' | 'process_risk' | 'market_risk' | 'compliance_risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  candidate_id?: string;
  affected_entities: string[];
  recommendations: string[];
  auto_resolvable: boolean;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
  metadata: Record<string, any>;
}

interface AlertStats {
  total_alerts: number;
  by_severity: Record<string, number>;
  by_type: Record<string, number>;
  unresolved_count: number;
  avg_resolution_time_hours: number;
}

export const riskAlertSystem = {
  alerts: [] as RiskAlert[],
  listeners: [] as ((alert: RiskAlert) => void)[],

  onAlert(callback: (alert: RiskAlert) => void) {
    this.listeners.push(callback);
  },

  offAlert(callback: (alert: RiskAlert) => void) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  },

  private triggerAlert(alert: RiskAlert) {
    this.alerts.unshift(alert);
    this.listeners.forEach(listener => listener(alert));
  },

  analyzeCandidate(candidate: EnhancedCandidate): RiskAlert[] {
    const alerts: RiskAlert[] = [];
    
    // Check for data quality issues
    alerts.push(...this.checkDataQualityRisks(candidate));
    
    // Check for red flags in background
    alerts.push(...this.checkBackgroundRisks(candidate));
    
    // Check for engagement risks
    alerts.push(...this.checkEngagementRisks(candidate));
    
    // Check for timeline risks
    alerts.push(...this.checkTimelineRisks(candidate));
    
    return alerts;
  },

  checkDataQualityRisks(candidate: EnhancedCandidate): RiskAlert[] {
    const alerts: RiskAlert[] = [];
    
    // Missing critical information
    const missingFields = [];
    if (!candidate.current_title) missingFields.push('current title');
    if (!candidate.current_company) missingFields.push('current company');
    if (!candidate.location) missingFields.push('location');
    if (!candidate.skills || candidate.skills.length === 0) missingFields.push('skills');
    
    if (missingFields.length >= 2) {
      const alert: RiskAlert = {
        id: `data_quality_${candidate.id}_${Date.now()}`,
        type: 'candidate_risk',
        severity: missingFields.length >= 3 ? 'high' : 'medium',
        title: 'Incomplete Candidate Profile',
        description: `Missing critical information: ${missingFields.join(', ')}`,
        candidate_id: candidate.id,
        affected_entities: [candidate.id],
        recommendations: [
          'Request additional information from candidate',
          'Conduct enhanced screening interview',
          'Verify information through references'
        ],
        auto_resolvable: false,
        created_at: new Date().toISOString(),
        metadata: { missing_fields: missingFields }
      };
      
      alerts.push(alert);
    }
    
    // Outdated OSINT data
    const osintAge = candidate.osint_last_fetched ? 
      Date.now() - new Date(candidate.osint_last_fetched).getTime() : 
      Date.now();
    
    if (osintAge > 30 * 24 * 60 * 60 * 1000) { // 30 days
      const alert: RiskAlert = {
        id: `osint_outdated_${candidate.id}_${Date.now()}`,
        type: 'candidate_risk',
        severity: 'low',
        title: 'Outdated Digital Footprint Data',
        description: 'OSINT data is more than 30 days old and may be stale',
        candidate_id: candidate.id,
        affected_entities: [candidate.id],
        recommendations: [
          'Refresh OSINT data collection',
          'Verify current employment status',
          'Check recent activity on professional platforms'
        ],
        auto_resolvable: true,
        created_at: new Date().toISOString(),
        metadata: { days_since_update: Math.floor(osintAge / (24 * 60 * 60 * 1000)) }
      };
      
      alerts.push(alert);
    }
    
    return alerts;
  },

  checkBackgroundRisks(candidate: EnhancedCandidate): RiskAlert[] {
    const alerts: RiskAlert[] = [];
    
    // Check for red flags in OSINT profile
    if (candidate.osint_profile?.red_flags && candidate.osint_profile.red_flags.length > 0) {
      const alert: RiskAlert = {
        id: `red_flags_${candidate.id}_${Date.now()}`,
        type: 'candidate_risk',
        severity: 'high',
        title: 'Background Red Flags Detected',
        description: `Found ${candidate.osint_profile.red_flags.length} potential red flags in digital footprint`,
        candidate_id: candidate.id,
        affected_entities: [candidate.id],
        recommendations: [
          'Conduct thorough background check',
          'Schedule additional screening interviews',
          'Verify claims through references',
          'Consider legal consultation if needed'
        ],
        auto_resolvable: false,
        created_at: new Date().toISOString(),
        metadata: { red_flags: candidate.osint_profile.red_flags }
      };
      
      alerts.push(alert);
    }
    
    // Check for unusual career patterns
    if (candidate.career_trajectory_analysis?.stability_score < 3) {
      const alert: RiskAlert = {
        id: `career_instability_${candidate.id}_${Date.now()}`,
        type: 'candidate_risk',
        severity: 'medium',
        title: 'Career Instability Detected',
        description: 'Candidate shows pattern of frequent job changes',
        candidate_id: candidate.id,
        affected_entities: [candidate.id],
        recommendations: [
          'Discuss career goals and motivations',
          'Understand reasons for job changes',
          'Assess cultural fit carefully',
          'Consider retention strategies'
        ],
        auto_resolvable: false,
        created_at: new Date().toISOString(),
        metadata: { 
          stability_score: candidate.career_trajectory_analysis.stability_score,
          progression_type: candidate.career_trajectory_analysis.progression_type
        }
      };
      
      alerts.push(alert);
    }
    
    return alerts;
  },

  checkEngagementRisks(candidate: EnhancedCandidate): RiskAlert[] {
    const alerts: RiskAlert[] = [];
    
    // Low engagement score
    if ((candidate.engagement_score || 0) < 30) {
      const alert: RiskAlert = {
        id: `low_engagement_${candidate.id}_${Date.now()}`,
        type: 'process_risk',
        severity: 'medium',
        title: 'Low Candidate Engagement',
        description: 'Candidate shows low engagement signals, may indicate lack of interest',
        candidate_id: candidate.id,
        affected_entities: [candidate.id],
        recommendations: [
          'Increase personalization in outreach',
          'Offer compelling value proposition',
          'Schedule discovery call to assess interest',
          'Consider alternative communication channels'
        ],
        auto_resolvable: false,
        created_at: new Date().toISOString(),
        metadata: { engagement_score: candidate.engagement_score }
      };
      
      alerts.push(alert);
    }
    
    // Poor response rate
    if ((candidate.response_rate || 0) < 0.3 && (candidate.interaction_timeline?.length || 0) > 3) {
      const alert: RiskAlert = {
        id: `poor_response_${candidate.id}_${Date.now()}`,
        type: 'process_risk',
        severity: 'high',
        title: 'Poor Response Rate',
        description: 'Candidate has low response rate despite multiple contact attempts',
        candidate_id: candidate.id,
        affected_entities: [candidate.id],
        recommendations: [
          'Try different communication channel',
          'Send break-up email to re-engage',
          'Consider putting on nurture sequence',
          'Focus on more responsive candidates'
        ],
        auto_resolvable: false,
        created_at: new Date().toISOString(),
        metadata: { 
          response_rate: candidate.response_rate,
          interaction_count: candidate.interaction_timeline?.length 
        }
      };
      
      alerts.push(alert);
    }
    
    return alerts;
  },

  checkTimelineRisks(candidate: EnhancedCandidate): RiskAlert[] {
    const alerts: RiskAlert[] = [];
    
    // Stale candidate (no activity for long time)
    const lastContact = candidate.last_contact_date ? 
      new Date(candidate.last_contact_date) : 
      new Date(candidate.created_at || new Date());
    
    const daysSinceContact = Math.floor((Date.now() - lastContact.getTime()) / (24 * 60 * 60 * 1000));
    
    if (daysSinceContact > 30 && candidate.status === 'new') {
      const alert: RiskAlert = {
        id: `stale_candidate_${candidate.id}_${Date.now()}`,
        type: 'process_risk',
        severity: 'low',
        title: 'Stale Candidate Record',
        description: `No contact activity for ${daysSinceContact} days`,
        candidate_id: candidate.id,
        affected_entities: [candidate.id],
        recommendations: [
          'Send re-engagement message',
          'Update candidate status',
          'Move to nurture sequence',
          'Archive if no longer relevant'
        ],
        auto_resolvable: true,
        created_at: new Date().toISOString(),
        metadata: { days_since_contact: daysSinceContact }
      };
      
      alerts.push(alert);
    }
    
    return alerts;
  },

  resolveAlert(alertId: string, resolvedBy: string) {
    const alertIndex = this.alerts.findIndex(alert => alert.id === alertId);
    if (alertIndex !== -1) {
      this.alerts[alertIndex].resolved_at = new Date().toISOString();
      this.alerts[alertIndex].resolved_by = resolvedBy;
    }
  },

  getAlertStats(): AlertStats {
    const totalAlerts = this.alerts.length;
    const unresolvedAlerts = this.alerts.filter(alert => !alert.resolved_at);
    
    const bySeverity = this.alerts.reduce((acc, alert) => {
      acc[alert.severity] = (acc[alert.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byType = this.alerts.reduce((acc, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const resolvedAlerts = this.alerts.filter(alert => alert.resolved_at);
    const avgResolutionTime = resolvedAlerts.length > 0 ? 
      resolvedAlerts.reduce((sum, alert) => {
        const created = new Date(alert.created_at).getTime();
        const resolved = new Date(alert.resolved_at!).getTime();
        return sum + (resolved - created);
      }, 0) / resolvedAlerts.length / (60 * 60 * 1000) : 0; // Convert to hours
    
    return {
      total_alerts: totalAlerts,
      by_severity: bySeverity,
      by_type: byType,
      unresolved_count: unresolvedAlerts.length,
      avg_resolution_time_hours: avgResolutionTime
    };
  },

  // Simulate some automated risk detection
  startRiskMonitoring() {
    console.log('Risk monitoring system started');
    
    // Simulate periodic risk checks
    setInterval(() => {
      this.performAutomatedChecks();
    }, 300000); // Check every 5 minutes
  },

  async performAutomatedChecks() {
    // This would normally fetch latest candidate data and run checks
    console.log('Performing automated risk checks...');
    
    // Simulate finding a risk
    if (Math.random() < 0.1) { // 10% chance
      const alert: RiskAlert = {
        id: `automated_${Date.now()}`,
        type: 'market_risk',
        severity: 'low',
        title: 'Market Shift Detected',
        description: 'Automated monitoring detected potential market changes affecting talent acquisition',
        affected_entities: ['market'],
        recommendations: [
          'Review current sourcing strategies',
          'Monitor competitor activity',
          'Adjust outreach messaging'
        ],
        auto_resolvable: false,
        created_at: new Date().toISOString(),
        metadata: { source: 'automated_monitoring' }
      };
      
      this.triggerAlert(alert);
    }
  }
};
