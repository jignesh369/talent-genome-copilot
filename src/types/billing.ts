
export interface Subscription {
  id: string;
  organization_id: string;
  plan: 'starter' | 'professional' | 'enterprise';
  status: 'active' | 'trial' | 'past_due' | 'suspended' | 'canceled';
  monthlyAmount: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBilling: string;
  created_at: string;
  updated_at: string;
}

export interface BillingStats {
  totalRevenue: string;
  monthlyRecurring: string;
  activeSubscriptions: number;
  churnRate: string;
  avgRevenuePerUser: string;
  growthRate: string;
}

export interface Invoice {
  id: string;
  organization_id: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  dueDate: string;
  paidDate?: string;
  invoiceNumber: string;
  created_at: string;
}

export interface UsageMetrics {
  users: {
    current: number;
    limit: number;
    percentage: number;
  };
  jobs: {
    current: number;
    limit: number;
    percentage: number;
  };
}
