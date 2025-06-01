
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useOSINTMonitoring } from './useOSINTMonitoring';
import { useCommunicationMetrics } from './useCommunicationMetrics';
import { useRiskAlerts } from './useRiskAlerts';

export const useAnalyticsData = () => {
  const { data: enhancedCandidates = [] } = useEnhancedCandidates();
  
  const candidateIds = enhancedCandidates.map(c => c.id);
  const { osintMonitoring } = useOSINTMonitoring(candidateIds);
  const { communicationMetrics } = useCommunicationMetrics();
  const { alerts, resolveAlert, getAlertStats, getCandidateAlerts } = useRiskAlerts(enhancedCandidates);

  return {
    enhancedCandidates,
    osintMonitoring,
    communicationMetrics,
    alerts,
    resolveAlert,
    getAlertStats,
    getCandidateAlerts
  };
};
