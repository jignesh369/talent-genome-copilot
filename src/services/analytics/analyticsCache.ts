
import { PredictiveInsight } from '@/types/predictive-analytics';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class AnalyticsCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    const keysToDelete = Array.from(this.cache.keys()).filter(key => regex.test(key));
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  clear(): void {
    this.cache.clear();
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Specific caching methods for analytics
  getCachedPrediction(candidateId: string, jobRequirements: string[]): any | null {
    const key = `prediction_${candidateId}_${jobRequirements.join('_')}`;
    return this.get(key);
  }

  cachePrediction(candidateId: string, jobRequirements: string[], prediction: any): void {
    const key = `prediction_${candidateId}_${jobRequirements.join('_')}`;
    this.set(key, prediction, 10 * 60 * 1000); // 10 minutes for predictions
  }

  getCachedInsights(): PredictiveInsight[] | null {
    return this.get('insights');
  }

  cacheInsights(insights: PredictiveInsight[]): void {
    this.set('insights', insights, 30 * 60 * 1000); // 30 minutes for insights
  }
}

export const analyticsCache = new AnalyticsCache();
