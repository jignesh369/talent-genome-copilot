
import { useState, useEffect } from 'react';
import { riskAlertSystem, RiskAlert } from '@/services/analytics/riskAlertSystem';

export const useRiskAlerts = () => {
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);

  useEffect(() => {
    const handleNewAlert = (alert: RiskAlert) => {
      setAlerts(prev => [...prev, alert]);
    };

    riskAlertSystem.onAlert(handleNewAlert);
  }, []);

  const resolveAlert = (alertId: string) => {
    riskAlertSystem.resolveAlert(alertId, 'user');
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, is_resolved: true }
        : alert
    ));
  };

  const getAlertStats = () => {
    return riskAlertSystem.getAlertStats();
  };

  const getCandidateAlerts = (candidateId: string) => {
    return alerts.filter(alert => alert.candidate_id === candidateId);
  };

  // Transform alerts to include title from message for backwards compatibility
  const alertsWithTitle = alerts.map(alert => ({
    ...alert,
    title: alert.message.split('.')[0] || alert.message.substring(0, 50)
  }));

  return {
    alerts: alertsWithTitle,
    resolveAlert,
    getAlertStats,
    getCandidateAlerts
  };
};
