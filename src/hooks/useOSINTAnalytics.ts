
import { useOSINTMonitoring } from './useOSINTMonitoring';
import { useRiskAlerts } from './useRiskAlerts';
import { useEnhancedCandidates } from './useEnhancedCandidates';

export const useOSINTAnalytics = () => {
  const { enhancedCandidates } = useEnhancedCandidates();
  const candidateIds = enhancedCandidates.map(c => c.id);
  
  const { osintMonitoring } = useOSINTMonitoring(candidateIds);
  const { alerts, resolveAlert, getAlertStats, getCandidateAlerts } = useRiskAlerts(enhancedCandidates);

  return {
    // Real-time monitoring
    osintMonitoring,
    
    // Risk management
    alerts,
    resolveAlert,
    getAlertStats,
    getCandidateAlerts
  };
};
