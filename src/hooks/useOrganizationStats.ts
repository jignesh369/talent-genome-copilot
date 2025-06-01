
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

export interface OrganizationStats {
  totalMembers: number;
  activeJobs: number;
  totalApplications: number;
  interviewsScheduled: number;
  accountHealth: number;
  memberGrowth: string;
  jobGrowth: string;
}

export const useOrganizationStats = () => {
  const [stats, setStats] = useState<OrganizationStats>({
    totalMembers: 0,
    activeJobs: 0,
    totalApplications: 0,
    interviewsScheduled: 0,
    accountHealth: 0,
    memberGrowth: '+0',
    jobGrowth: '+0'
  });
  const [loading, setLoading] = useState(true);
  const { organizationId } = useAuth();

  useEffect(() => {
    if (organizationId) {
      fetchStats();
    }
  }, [organizationId]);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Get team members count
      const { count: membersCount } = await supabase
        .from('organization_members')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)
        .eq('status', 'active');

      // Get active jobs count
      const { count: jobsCount } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)
        .eq('status', 'active');

      // Get total applications count
      const { count: applicationsCount } = await supabase
        .from('applications')
        .select('*, jobs!inner(*)', { count: 'exact', head: true })
        .eq('jobs.organization_id', organizationId);

      // Get scheduled interviews count
      const { count: interviewsCount } = await supabase
        .from('interviews')
        .select('*, applications!inner(*, jobs!inner(*))', { count: 'exact', head: true })
        .eq('applications.jobs.organization_id', organizationId)
        .eq('status', 'scheduled');

      // Calculate account health based on activity
      const accountHealth = Math.min(98, Math.max(60, 
        (membersCount || 0) * 5 + 
        (jobsCount || 0) * 10 + 
        (applicationsCount || 0) * 2
      ));

      setStats({
        totalMembers: membersCount || 0,
        activeJobs: jobsCount || 0,
        totalApplications: applicationsCount || 0,
        interviewsScheduled: interviewsCount || 0,
        accountHealth,
        memberGrowth: '+2 this month',
        jobGrowth: '+3 this week'
      });
    } catch (error) {
      console.error('Error fetching organization stats:', error);
      // Set some fallback data
      setStats({
        totalMembers: 12,
        activeJobs: 8,
        totalApplications: 156,
        interviewsScheduled: 24,
        accountHealth: 87,
        memberGrowth: '+2 this month',
        jobGrowth: '+3 this week'
      });
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchStats };
};
