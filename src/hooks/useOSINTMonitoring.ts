
import { useState, useEffect } from 'react';
import { realTimeOSINTService } from '@/services/analytics/realTimeOSINTService';

export const useOSINTMonitoring = (candidateIds: string[]) => {
  const [osintMonitoring, setOSINTMonitoring] = useState({ total: 0, active: [] });

  useEffect(() => {
    if (candidateIds.length > 0) {
      realTimeOSINTService.startMonitoring(candidateIds);
      
      const updateMonitoringStatus = () => {
        setOSINTMonitoring(realTimeOSINTService.getMonitoringStatus());
      };
      
      updateMonitoringStatus();
      const interval = setInterval(updateMonitoringStatus, 30000);
      
      return () => {
        clearInterval(interval);
        // Don't stop monitoring here as it might be used elsewhere
      };
    }
  }, [candidateIds]);

  return { osintMonitoring };
};
