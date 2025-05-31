
import { useState, useEffect } from 'react';
import { automatedCommunicationService } from '@/services/analytics/automatedCommunicationService';

export const useCommunicationMetrics = () => {
  const [communicationMetrics, setCommunicationMetrics] = useState({
    total_sent: 0,
    response_rate: 0,
    platform_performance: {}
  });

  useEffect(() => {
    const updateMetrics = () => {
      setCommunicationMetrics(automatedCommunicationService.getPerformanceMetrics());
    };
    
    updateMetrics();
    const interval = setInterval(updateMetrics, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return { communicationMetrics };
};
