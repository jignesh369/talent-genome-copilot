
import { useAnalyticsData } from './useAnalyticsData';

export const useOSINTAnalytics = () => {
  const { osintMonitoring, alerts, resolveAlert, getAlertStats, getCandidateAlerts } = useAnalyticsData();

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
