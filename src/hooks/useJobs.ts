
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

// Updated types to match database schema
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'draft' | 'active' | 'paused' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  requirements: string[];
  experience: string | null;
  salary_min: number | null;
  salary_max: number | null;
  remote: boolean;
  applications_count: number;
  views: number;
  posted_date: string | null;
  closing_date: string | null;
  hiring_manager: string | null;
  organization_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface JobMetrics {
  applications_today: number;
  applications_week: number;
  applications_month: number;
  conversion_rate: number;
  avg_time_to_hire: number;
  quality_score: number;
}

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [metrics, setMetrics] = useState<JobMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organizationId } = useAuth();
  const { toast } = useToast();

  // Fetch jobs from database
  const fetchJobs = async () => {
    if (!organizationId) return;
    
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select(`
          *,
          applications:applications(count)
        `)
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform data to include applications count
      const transformedJobs = data?.map(job => ({
        ...job,
        applications_count: job.applications?.[0]?.count || 0
      })) || [];

      setJobs(transformedJobs);
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
      setError(err.message);
      toast({
        title: 'Error loading jobs',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch job metrics
  const fetchMetrics = async () => {
    if (!organizationId) return;

    try {
      // Get applications from the last month for metrics
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data: applicationsData, error: appError } = await supabase
        .from('applications')
        .select(`
          applied_at,
          jobs!inner(organization_id)
        `)
        .eq('jobs.organization_id', organizationId)
        .gte('applied_at', thirtyDaysAgo.toISOString());

      if (appError) throw appError;

      const applications = applicationsData || [];
      
      const applicationsToday = applications.filter(app => 
        new Date(app.applied_at) >= today
      ).length;
      
      const applicationsWeek = applications.filter(app => 
        new Date(app.applied_at) >= sevenDaysAgo
      ).length;
      
      const applicationsMonth = applications.length;

      // Calculate basic metrics (in a real app, these would be more sophisticated)
      const metrics: JobMetrics = {
        applications_today: applicationsToday,
        applications_week: applicationsWeek,
        applications_month: applicationsMonth,
        conversion_rate: applicationsMonth > 0 ? (applicationsMonth * 0.032) : 0, // Mock 3.2% conversion
        avg_time_to_hire: 28, // Mock average
        quality_score: 8.4 // Mock score
      };

      setMetrics(metrics);
    } catch (err: any) {
      console.error('Error fetching metrics:', err);
    }
  };

  useEffect(() => {
    if (organizationId) {
      fetchJobs();
      fetchMetrics();
    }
  }, [organizationId]);

  const createJob = async (jobData: Partial<Job>) => {
    if (!organizationId) {
      toast({
        title: 'Error',
        description: 'Organization not found',
        variant: 'destructive',
      });
      return null;
    }

    try {
      setError(null);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const newJobData = {
        title: jobData.title || '',
        department: jobData.department || '',
        location: jobData.location || '',
        type: jobData.type || 'full-time' as const,
        status: 'draft' as const,
        priority: jobData.priority || 'medium' as const,
        description: jobData.description || '',
        requirements: jobData.requirements || [],
        experience: jobData.experience || null,
        salary_min: jobData.salary_min || null,
        salary_max: jobData.salary_max || null,
        remote: jobData.remote || false,
        hiring_manager: jobData.hiring_manager || null,
        organization_id: organizationId,
        created_by: userData.user.id,
      };

      const { data, error: createError } = await supabase
        .from('jobs')
        .insert(newJobData)
        .select()
        .single();

      if (createError) throw createError;

      const newJob = { ...data, applications_count: 0 };
      setJobs(prev => [newJob, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Job created successfully',
      });

      return newJob;
    } catch (err: any) {
      console.error('Error creating job:', err);
      setError(err.message);
      toast({
        title: 'Error creating job',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateJob = async (jobId: string, updates: Partial<Job>) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', jobId)
        .select()
        .single();

      if (updateError) throw updateError;

      setJobs(prev => prev.map(job => 
        job.id === jobId ? { ...job, ...data } : job
      ));

      toast({
        title: 'Success',
        description: 'Job updated successfully',
      });

      return data;
    } catch (err: any) {
      console.error('Error updating job:', err);
      setError(err.message);
      toast({
        title: 'Error updating job',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (deleteError) throw deleteError;

      setJobs(prev => prev.filter(job => job.id !== jobId));
      
      toast({
        title: 'Success',
        description: 'Job deleted successfully',
      });

      return true;
    } catch (err: any) {
      console.error('Error deleting job:', err);
      setError(err.message);
      toast({
        title: 'Error deleting job',
        description: err.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    jobs,
    metrics,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    refetch: fetchJobs,
  };
};
