
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface Interview {
  id: string;
  application_id: string;
  type: 'phone' | 'video' | 'onsite' | 'technical' | 'panel';
  scheduled_at: string;
  duration: number;
  interviewer: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback: string | null;
  rating: number | null;
  meeting_link: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  application?: {
    id: string;
    job_id: string;
    candidate_id: string;
    jobs?: {
      title: string;
      department: string;
    };
    candidates?: {
      first_name: string;
      last_name: string;
      email: string;
    };
  };
}

export const useInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organizationId } = useAuth();
  const { toast } = useToast();

  const fetchInterviews = async (applicationId?: string) => {
    if (!organizationId) return;
    
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('interviews')
        .select(`
          *,
          applications!inner (
            id,
            job_id,
            candidate_id,
            jobs!inner (
              title,
              department,
              organization_id
            ),
            candidates (
              first_name,
              last_name,
              email
            )
          )
        `)
        .eq('applications.jobs.organization_id', organizationId);

      if (applicationId) {
        query = query.eq('application_id', applicationId);
      }

      const { data, error: fetchError } = await query
        .order('scheduled_at', { ascending: true });

      if (fetchError) throw fetchError;

      setInterviews(data || []);
    } catch (err: any) {
      console.error('Error fetching interviews:', err);
      setError(err.message);
      toast({
        title: 'Error loading interviews',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (organizationId) {
      fetchInterviews();
    }
  }, [organizationId]);

  const scheduleInterview = async (interviewData: {
    application_id: string;
    type: Interview['type'];
    scheduled_at: string;
    duration?: number;
    interviewer: string;
    meeting_link?: string;
    location?: string;
  }) => {
    try {
      setError(null);

      const { data, error: createError } = await supabase
        .from('interviews')
        .insert({
          application_id: interviewData.application_id,
          type: interviewData.type,
          scheduled_at: interviewData.scheduled_at,
          duration: interviewData.duration || 60,
          interviewer: interviewData.interviewer,
          meeting_link: interviewData.meeting_link || null,
          location: interviewData.location || null,
          status: 'scheduled' as const,
        })
        .select(`
          *,
          applications (
            id,
            job_id,
            candidate_id,
            jobs (
              title,
              department
            ),
            candidates (
              first_name,
              last_name,
              email
            )
          )
        `)
        .single();

      if (createError) throw createError;

      setInterviews(prev => [data, ...prev].sort((a, b) => 
        new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
      ));
      
      toast({
        title: 'Success',
        description: 'Interview scheduled successfully',
      });

      return data;
    } catch (err: any) {
      console.error('Error scheduling interview:', err);
      setError(err.message);
      toast({
        title: 'Error scheduling interview',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateInterview = async (
    interviewId: string, 
    updates: Partial<Interview>
  ) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('interviews')
        .update(updates)
        .eq('id', interviewId)
        .select()
        .single();

      if (updateError) throw updateError;

      setInterviews(prev => prev.map(interview => 
        interview.id === interviewId ? { ...interview, ...data } : interview
      ));

      toast({
        title: 'Success',
        description: 'Interview updated successfully',
      });

      return data;
    } catch (err: any) {
      console.error('Error updating interview:', err);
      setError(err.message);
      toast({
        title: 'Error updating interview',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const completeInterview = async (
    interviewId: string,
    feedback: string,
    rating: number
  ) => {
    return updateInterview(interviewId, {
      status: 'completed',
      feedback,
      rating
    });
  };

  const cancelInterview = async (interviewId: string, reason?: string) => {
    const updates: any = { status: 'cancelled' };
    if (reason) {
      updates.feedback = reason;
    }
    return updateInterview(interviewId, updates);
  };

  const getInterviewsByStatus = (status: Interview['status']) => {
    return interviews.filter(interview => interview.status === status);
  };

  const getUpcomingInterviews = () => {
    const now = new Date();
    return interviews.filter(interview => 
      interview.status === 'scheduled' && 
      new Date(interview.scheduled_at) > now
    );
  };

  const getTodaysInterviews = () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.scheduled_at);
      return interviewDate >= startOfDay && interviewDate < endOfDay;
    });
  };

  return {
    interviews,
    loading,
    error,
    scheduleInterview,
    updateInterview,
    completeInterview,
    cancelInterview,
    getInterviewsByStatus,
    getUpcomingInterviews,
    getTodaysInterviews,
    refetch: fetchInterviews,
  };
};
