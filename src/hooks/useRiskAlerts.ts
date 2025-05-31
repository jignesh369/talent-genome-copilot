
import { useState, useEffect } from 'react';
import { riskAlertSystem, RiskAlert } from '@/services/analytics/riskAlertSystem';
import { useToast } from '@/hooks/use-toast';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

export const useRiskAlerts = (candidates: EnhancedCandidate[]) => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<RiskAlert[]>([]);

  useEffect(() => {
    const handleNewAlert = (alert: RiskAlert) => {
      setAlerts(prev => [alert, ...prev]);
      
      if (alert.severity === 'high' || alert.severity === 'critical') {
        toast({
          title: `🚨 ${alert.severity.toUpperCase()} Alert`,
          description: alert.title,
          variant: alert.severity === 'critical' ? 'destructive' : 'default'
        });
      }
    };

    riskAlertSystem.onAlert(handleNewAlert);
    
    candidates.forEach(candidate => {
      const candidateRisks = riskAlertSystem.analyzeCandidate(candidate);
      if (candidateRisks.length > 0) {
        setAlerts(prev => [...candidateRisks, ...prev]);
      }
    });
  }, [candidates, toast]);

  const resolveAlert = (alertId: string) => {
    riskAlertSystem.resolveAlert(alertId, 'recruiter');
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Resolved",
      description: "Risk alert has been marked as resolved"
    });
  };

  const getAlertStats = () => {
    return riskAlertSystem.getAlertStats();
  };

  const getCandidateAlerts = (candidateId: string) => {
    return alerts.filter(alert => alert.candidate_id === candidateId);
  };

  return {
    alerts,
    resolveAlert,
    getAlertStats,
    getCandidateAlerts
  };
};
