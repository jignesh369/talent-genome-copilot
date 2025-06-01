
import { useEnhancedCandidates } from './useEnhancedCandidates';
import { useOSINTMonitoring } from './useOSINTMonitoring';
import { useCommunicationMetrics } from './useCommunicationMetrics';
import { useRiskAlerts } from './useRiskAlerts';
import { useCandidateConversion } from './useCandidateConversion';

export const useAnalyticsData = () => {
  const { data: enhancedCandidates = [] } = useEnhancedCandidates();
  const { convertToSearchCandidate } = useCandidateConversion();
  
  // Convert candidates for analytics
  const candidatesForAnalytics = enhancedCandidates.map(candidate => convertToSearchCandidate(candidate as any));
  
  const candidateIds = enhancedCandidates.map(c => c.id);
  const { osintMonitoring } = useOSINTMonitoring(candidateIds);
  const { communicationMetrics } = useCommunicationMetrics();
  const { alerts, resolveAlert, getAlertStats, getCandidateAlerts } = useRiskAlerts(candidatesForAnalytics);

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
