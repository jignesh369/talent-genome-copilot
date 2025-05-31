
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status: 'applied' | 'screening' | 'interview' | 'final' | 'offer' | 'hired' | 'rejected';
  stage: string | null;
  score: number | null;
  cover_letter: string | null;
  applied_at: string;
  updated_at: string;
  // Joined data
  job?: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
  candidate?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    current_title: string | null;
  };
}

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organizationId } = useAuth();
  const { toast } = useToast();

  const fetchApplications = async (jobId?: string) => {
    if (!organizationId) return;
    
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('applications')
        .select(`
          *,
          jobs!inner (
            id,
            title,
            department,
            location,
            organization_id
          ),
          candidates (
            id,
            first_name,
            last_name,
            email,
            current_title
          )
        `)
        .eq('jobs.organization_id', organizationId);

      if (jobId) {
        query = query.eq('job_id', jobId);
      }

      const { data, error: fetchError } = await query
        .order('applied_at', { ascending: false });

      if (fetchError) throw fetchError;

      setApplications(data || []);
    } catch (err: any) {
      console.error('Error fetching applications:', err);
      setError(err.message);
      toast({
        title: 'Error loading applications',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (organizationId) {
      fetchApplications();
    }
  }, [organizationId]);

  const createApplication = async (applicationData: {
    job_id: string;
    candidate_id: string;
    cover_letter?: string;
  }) => {
    try {
      setError(null);

      const { data, error: createError } = await supabase
        .from('applications')
        .insert({
          job_id: applicationData.job_id,
          candidate_id: applicationData.candidate_id,
          cover_letter: applicationData.cover_letter || null,
          status: 'applied' as const,
        })
        .select(`
          *,
          jobs (
            id,
            title,
            department,
            location
          ),
          candidates (
            id,
            first_name,
            last_name,
            email,
            current_title
          )
        `)
        .single();

      if (createError) throw createError;

      setApplications(prev => [data, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Application submitted successfully',
      });

      return data;
    } catch (err: any) {
      console.error('Error creating application:', err);
      setError(err.message);
      toast({
        title: 'Error creating application',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateApplicationStatus = async (
    applicationId: string, 
    status: Application['status'],
    stage?: string
  ) => {
    try {
      setError(null);

      const updates: any = { status };
      if (stage !== undefined) {
        updates.stage = stage;
      }

      const { data, error: updateError } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', applicationId)
        .select()
        .single();

      if (updateError) throw updateError;

      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, ...data } : app
      ));

      toast({
        title: 'Success',
        description: 'Application status updated successfully',
      });

      return data;
    } catch (err: any) {
      console.error('Error updating application:', err);
      setError(err.message);
      toast({
        title: 'Error updating application',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const getApplicationsByStatus = (status: Application['status']) => {
    return applications.filter(app => app.status === status);
  };

  const getApplicationsForJob = (jobId: string) => {
    return applications.filter(app => app.job_id === jobId);
  };

  const getApplicationsForCandidate = (candidateId: string) => {
    return applications.filter(app => app.candidate_id === candidateId);
  };

  return {
    applications,
    loading,
    error,
    createApplication,
    updateApplicationStatus,
    getApplicationsByStatus,
    getApplicationsForJob,
    getApplicationsForCandidate,
    refetch: fetchApplications,
  };
};
