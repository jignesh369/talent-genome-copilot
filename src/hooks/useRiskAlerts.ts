
import { useState, useEffect } from 'react';
import { riskAlertSystem } from '@/services/analytics/riskAlertSystem';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export interface RiskAlert {
  id: string;
  candidate_id: string;
  alert_type: 'profile_inconsistency' | 'employment_gap' | 'skill_mismatch' | 'availability_change' | 'reputation_risk';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  detected_at: string;
  resolved: boolean;
  confidence_score: number;
  evidence: string[];
  recommended_actions: string[];
}

export interface AlertStats {
  total: number;
  unresolved: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export const useRiskAlerts = () => {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const alertsData = await riskAlertSystem.getAllAlerts();
      setAlerts(alertsData);
    } catch (error) {
      console.error('Failed to load risk alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      await riskAlertSystem.resolveAlert(alertId);
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      ));
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    }
  };

  const getAlertStats = (): AlertStats => {
    const unresolved = alerts.filter(alert => !alert.resolved);
    return {
      total: alerts.length,
      unresolved: unresolved.length,
      critical: unresolved.filter(alert => alert.severity === 'critical').length,
      high: unresolved.filter(alert => alert.severity === 'high').length,
      medium: unresolved.filter(alert => alert.severity === 'medium').length,
      low: unresolved.filter(alert => alert.severity === 'low').length
    };
  };

  const getCandidateAlerts = (candidateId: string): RiskAlert[] => {
    return alerts.filter(alert => alert.candidate_id === candidateId);
  };

  return {
    alerts,
    loading,
    resolveAlert,
    getAlertStats,
    getCandidateAlerts,
    refreshAlerts: loadAlerts
  };
};
