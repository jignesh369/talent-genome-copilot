
import { useState, useEffect } from 'react';

interface SearchMetrics {
  searchTime: number;
  resultsCount: number;
  qualityScore: number;
  timestamp: string;
}

export const useSearchPerformance = () => {
  const [metrics, setMetrics] = useState<SearchMetrics[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startTracking = () => {
    setIsTracking(true);
    setStartTime(Date.now());
  };

  const stopTracking = (resultsCount: number, qualityScore: number) => {
    if (!isTracking || !startTime) return;
    
    const searchTime = Date.now() - startTime;
    const newMetric: SearchMetrics = {
      searchTime,
      resultsCount,
      qualityScore,
      timestamp: new Date().toISOString()
    };
    
    setMetrics(prev => [...prev.slice(-9), newMetric]); // Keep last 10 metrics
    setIsTracking(false);
    setStartTime(null);
  };

  const getAverageSearchTime = () => {
    if (metrics.length === 0) return 0;
    return metrics.reduce((sum, metric) => sum + metric.searchTime, 0) / metrics.length;
  };

  const getAverageQualityScore = () => {
    if (metrics.length === 0) return 0;
    return metrics.reduce((sum, metric) => sum + metric.qualityScore, 0) / metrics.length;
  };

  return {
    metrics,
    isTracking,
    startTracking,
    stopTracking,
    getAverageSearchTime,
    getAverageQualityScore
  };
};
