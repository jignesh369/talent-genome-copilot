
import { useState, useEffect } from 'react';
import { Subscription, BillingStats, UsageMetrics } from '@/types/billing';
import { BillingService } from '@/services/billingService';

export const useBilling = (organizationId?: string) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [billingStats, setBillingStats] = useState<BillingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillingData = async () => {
      if (!organizationId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // TODO: Replace with actual Supabase calls
        // Simulated data for now
        const mockSubscription: Subscription = {
          id: 'sub_1',
          organization_id: organizationId,
          plan: 'professional',
          status: 'active',
          monthlyAmount: 299,
          currentPeriodStart: new Date().toISOString(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          nextBilling: 'Jan 15, 2024',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const mockStats: BillingStats = {
          totalRevenue: '$47,350',
          monthlyRecurring: '$38,200',
          activeSubscriptions: 47,
          churnRate: '2.1%',
          avgRevenuePerUser: '$812',
          growthRate: '+15.3%'
        };

        setSubscription(mockSubscription);
        setBillingStats(mockStats);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch billing data');
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, [organizationId]);

  const calculateUsageMetrics = (currentUsers: number, userLimit: number, currentJobs: number, jobLimit: number): UsageMetrics => {
    return {
      users: {
        current: currentUsers,
        limit: userLimit,
        percentage: BillingService.calculateUsagePercentage(currentUsers, userLimit)
      },
      jobs: {
        current: currentJobs,
        limit: jobLimit,
        percentage: BillingService.calculateUsagePercentage(currentJobs, jobLimit)
      }
    };
  };

  const updateSubscription = async (updates: Partial<Subscription>) => {
    if (!subscription) return;

    try {
      setLoading(true);
      // TODO: Replace with actual Supabase call
      const updatedSub = { ...subscription, ...updates };
      setSubscription(updatedSub);
      setError(null);
      return updatedSub;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update subscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    subscription,
    billingStats,
    loading,
    error,
    updateSubscription,
    calculateUsageMetrics
  };
};
