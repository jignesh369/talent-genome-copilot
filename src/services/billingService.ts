
import { BillingStats, UsageMetrics } from '@/types/billing';
import { Organization } from '@/types/organization';

export class BillingService {
  static calculateUsagePercentage(current: number, limit: number): number {
    return Math.min((current / limit) * 100, 100);
  }

  static getUsageStatus(percentage: number): 'normal' | 'warning' | 'danger' {
    if (percentage > 80) return 'danger';
    if (percentage > 60) return 'warning';
    return 'normal';
  }

  static getUsageColor(status: string): string {
    switch (status) {
      case 'danger': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  }

  static getPlanPricing(plan: string): number {
    switch (plan) {
      case 'enterprise': return 599;
      case 'professional': return 299;
      case 'starter': return 99;
      default: return 0;
    }
  }

  static getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'past_due': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  static getPlanColor(plan: string): string {
    switch (plan) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'professional': return 'bg-blue-100 text-blue-800';
      case 'starter': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
