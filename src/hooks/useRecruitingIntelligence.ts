
import { useAnalyticsData } from './useAnalyticsData';

export const useRecruitingIntelligence = () => {
  const analyticsData = useAnalyticsData();

  return {
    // Direct access to analytics data
    enhancedCandidates: analyticsData.enhancedCandidates,
    osintMonitoring: analyticsData.osintMonitoring,
    alerts: analyticsData.alerts,
    
    // Analytics methods
    resolveAlert: analyticsData.resolveAlert,
    getAlertStats: analyticsData.getAlertStats,
    getCandidateAlerts: analyticsData.getCandidateAlerts,
    
    // Communication metrics
    communicationMetrics: analyticsData.communicationMetrics
  };
};
