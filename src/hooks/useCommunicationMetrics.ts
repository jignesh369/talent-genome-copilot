
import { useState, useEffect } from 'react';
import { realTimeCommunicationService } from '@/services/realTimeCommunicationService';

interface CommunicationMetrics {
  total_sent: number;
  response_rate: number;
  platform_performance: Record<string, any>;
  engagement_score?: number;
  avg_response_time?: number;
}

export const useCommunicationMetrics = () => {
  const [metrics, setMetrics] = useState<CommunicationMetrics>({
    total_sent: 0,
    response_rate: 0,
    platform_performance: {}
  });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const communicationMetrics = await realTimeCommunicationService.getCommunicationMetrics();
        setMetrics(communicationMetrics);
      } catch (error) {
        console.error('Failed to load communication metrics:', error);
        // Set default values on error
        setMetrics({
          total_sent: 0,
          response_rate: 0,
          platform_performance: {}
        });
      }
    };

    loadMetrics();
  }, []);

  return metrics;
};
