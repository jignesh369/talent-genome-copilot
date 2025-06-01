
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface SavedJob {
  id: string;
  job_id: string;
  saved_at: string;
  job?: {
    id: string;
    title: string;
    department: string;
    location: string;
    remote: boolean;
    salary_min?: number;
    salary_max?: number;
    status: string;
  };
}

export const useSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSavedJobs = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // First get the candidate ID
      const { data: candidate } = await supabase
        .from('candidates')
        .select('id')
        .eq('email', user.email)
        .single();

      if (!candidate) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('saved_jobs')
        .select(`
          *,
          jobs (
            id,
            title,
            department,
            location,
            remote,
            salary_min,
            salary_max,
            status
          )
        `)
        .eq('candidate_id', candidate.id)
        .order('saved_at', { ascending: false });

      if (error) throw error;
      setSavedJobs(data || []);
    } catch (error: any) {
      console.error('Error fetching saved jobs:', error);
      toast({
        title: 'Error loading saved jobs',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [user]);

  const saveJob = async (jobId: string) => {
    if (!user) return;

    try {
      // Get candidate ID
      const { data: candidate } = await supabase
        .from('candidates')
        .select('id')
        .eq('email', user.email)
        .single();

      if (!candidate) throw new Error('Candidate not found');

      const { error } = await supabase
        .from('saved_jobs')
        .insert({
          candidate_id: candidate.id,
          job_id: jobId,
        });

      if (error) throw error;

      toast({
        title: 'Job saved',
        description: 'Job has been added to your saved jobs',
      });

      fetchSavedJobs();
    } catch (error: any) {
      toast({
        title: 'Error saving job',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const unsaveJob = async (jobId: string) => {
    if (!user) return;

    try {
      // Get candidate ID
      const { data: candidate } = await supabase
        .from('candidates')
        .select('id')
        .eq('email', user.email)
        .single();

      if (!candidate) throw new Error('Candidate not found');

      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('candidate_id', candidate.id)
        .eq('job_id', jobId);

      if (error) throw error;

      toast({
        title: 'Job removed',
        description: 'Job has been removed from your saved jobs',
      });

      fetchSavedJobs();
    } catch (error: any) {
      toast({
        title: 'Error removing job',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.some(saved => saved.job_id === jobId);
  };

  return {
    savedJobs,
    loading,
    saveJob,
    unsaveJob,
    isJobSaved,
    refetch: fetchSavedJobs,
  };
};
