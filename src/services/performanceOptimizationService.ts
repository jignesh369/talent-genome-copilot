
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface PerformanceMetrics {
  loadTime: number;
  searchResponseTime: number;
  cacheHitRate: number;
  memoryUsage: number;
  errorRate: number;
}

interface OptimizationRecommendation {
  type: 'cache' | 'query' | 'component' | 'data';
  priority: 'high' | 'medium' | 'low';
  description: string;
  estimatedImpact: string;
  implementation: string;
}

class PerformanceOptimizationService {
  private metrics: PerformanceMetrics = {
    loadTime: 0,
    searchResponseTime: 0,
    cacheHitRate: 0,
    memoryUsage: 0,
    errorRate: 0
  };

  private cache = new Map<string, any>();
  private cacheStats = { hits: 0, misses: 0 };

  // Memoization for expensive operations
  memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map();
    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        this.cacheStats.hits++;
        return cache.get(key);
      }
      this.cacheStats.misses++;
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  }

  // Optimized candidate filtering
  optimizedCandidateFilter = this.memoize((candidates: EnhancedCandidate[], filters: any) => {
    const startTime = performance.now();
    
    let filtered = candidates;

    // Use indexed filtering for better performance
    if (filters.skills && filters.skills.length > 0) {
      const skillsSet = new Set(filters.skills.map((s: string) => s.toLowerCase()));
      filtered = filtered.filter(candidate => 
        candidate.skills.some(skill => skillsSet.has(skill.toLowerCase()))
      );
    }

    if (filters.minEngagementScore) {
      filtered = filtered.filter(candidate => 
        candidate.engagement_score >= filters.minEngagementScore
      );
    }

    if (filters.stages && filters.stages.length > 0) {
      const stagesSet = new Set(filters.stages);
      filtered = filtered.filter(candidate => 
        stagesSet.has(candidate.pipeline_stage)
      );
    }

    const endTime = performance.now();
    this.updateMetrics('searchResponseTime', endTime - startTime);

    return filtered;
  });

  // Batch operations for better performance
  batchUpdate(candidates: EnhancedCandidate[], updates: Partial<EnhancedCandidate>[]): EnhancedCandidate[] {
    return candidates.map((candidate, index) => ({
      ...candidate,
      ...(updates[index] || {}),
      updated_at: new Date().toISOString()
    }));
  }

  // Virtual scrolling helper
  getVirtualizedCandidates(candidates: EnhancedCandidate[], startIndex: number, endIndex: number) {
    return candidates.slice(startIndex, endIndex);
  }

  // Performance monitoring
  startPerformanceTimer(operation: string): number {
    return performance.now();
  }

  endPerformanceTimer(startTime: number, operation: string): number {
    const duration = performance.now() - startTime;
    console.log(`Performance: ${operation} took ${duration.toFixed(2)}ms`);
    return duration;
  }

  // Update metrics
  updateMetrics(metric: keyof PerformanceMetrics, value: number) {
    this.metrics[metric] = value;
  }

  // Get performance metrics
  getMetrics(): PerformanceMetrics {
    return {
      ...this.metrics,
      cacheHitRate: this.cacheStats.hits + this.cacheStats.misses > 0 
        ? (this.cacheStats.hits / (this.cacheStats.hits + this.cacheStats.misses)) * 100 
        : 0
    };
  }

  // Generate optimization recommendations
  getOptimizationRecommendations(): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];

    if (this.metrics.cacheHitRate < 70) {
      recommendations.push({
        type: 'cache',
        priority: 'high',
        description: 'Low cache hit rate detected',
        estimatedImpact: '30-50% faster load times',
        implementation: 'Implement more aggressive caching for search results and candidate data'
      });
    }

    if (this.metrics.searchResponseTime > 500) {
      recommendations.push({
        type: 'query',
        priority: 'high',
        description: 'Slow search response times',
        estimatedImpact: '60% faster search',
        implementation: 'Optimize database queries and implement search indexing'
      });
    }

    if (this.metrics.loadTime > 3000) {
      recommendations.push({
        type: 'component',
        priority: 'medium',
        description: 'Slow initial page load',
        estimatedImpact: '40% faster page loads',
        implementation: 'Implement code splitting and lazy loading for components'
      });
    }

    return recommendations;
  }

  // Memory optimization
  cleanupUnusedData() {
    // Clear old cache entries
    if (this.cache.size > 100) {
      const entries = Array.from(this.cache.entries());
      const toDelete = entries.slice(0, 50);
      toDelete.forEach(([key]) => this.cache.delete(key));
    }
  }

  // Debounce helper for search inputs
  debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout;
    return ((...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
  }

  // Throttle helper for scroll events
  throttle<T extends (...args: any[]) => any>(func: T, delay: number): T {
    let lastCall = 0;
    return ((...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return func(...args);
      }
    }) as T;
  }
}

export const performanceOptimizationService = new PerformanceOptimizationService();
