
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { CandidateSearch } from '@/types/recruiting';

export interface Candidate {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location: string;
  current_title: string | null;
  current_company: string | null;
  experience_years: number;
  skills: string[];
  score: number;
  status: 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected';
  source: 'direct' | 'referral' | 'job_board' | 'linkedin' | 'agency' | 'other';
  resume_url: string | null;
  avatar_url: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  organization_id: string;
  created_at: string;
  updated_at: string;
}

export const useCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { organizationId } = useAuth();
  const { toast } = useToast();

  const fetchCandidates = async () => {
    if (!organizationId) return;
    
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('candidates')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Transform skills array if needed
      const transformedCandidates = data?.map(candidate => ({
        ...candidate,
        skills: candidate.skills || []
      })) || [];

      setCandidates(transformedCandidates);
    } catch (err: any) {
      console.error('Error fetching candidates:', err);
      setError(err.message);
      toast({
        title: 'Error loading candidates',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (organizationId) {
      fetchCandidates();
    }
  }, [organizationId]);

  const searchCandidates = async (searchParams: CandidateSearch) => {
    if (!organizationId) return;
    
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('candidates')
        .select('*')
        .eq('organization_id', organizationId);

      if (searchParams.query) {
        query = query.or(`first_name.ilike.%${searchParams.query}%,last_name.ilike.%${searchParams.query}%,email.ilike.%${searchParams.query}%`);
      }

      if (searchParams.status) {
        query = query.eq('status', searchParams.status);
      }

      if (searchParams.experience_min) {
        query = query.gte('experience_years', searchParams.experience_min);
      }

      if (searchParams.experience_max) {
        query = query.lte('experience_years', searchParams.experience_max);
      }

      // Add sorting
      if (searchParams.sort_by) {
        const ascending = searchParams.sort_order === 'asc';
        switch (searchParams.sort_by) {
          case 'score':
            query = query.order('score', { ascending });
            break;
          case 'date':
            query = query.order('created_at', { ascending });
            break;
          case 'name':
            query = query.order('first_name', { ascending });
            break;
          default:
            query = query.order('created_at', { ascending: false });
        }
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error: searchError } = await query;

      if (searchError) throw searchError;

      const transformedCandidates = data?.map(candidate => ({
        ...candidate,
        skills: candidate.skills || []
      })) || [];

      setCandidates(transformedCandidates);
    } catch (err: any) {
      console.error('Error searching candidates:', err);
      setError(err.message);
      toast({
        title: 'Error searching candidates',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createCandidate = async (candidateData: Partial<Candidate>) => {
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

      const newCandidateData = {
        first_name: candidateData.first_name || '',
        last_name: candidateData.last_name || '',
        email: candidateData.email || '',
        phone: candidateData.phone || null,
        location: candidateData.location || '',
        current_title: candidateData.current_title || null,
        current_company: candidateData.current_company || null,
        experience_years: candidateData.experience_years || 0,
        skills: candidateData.skills || [],
        score: candidateData.score || 0,
        status: candidateData.status || 'new' as const,
        source: candidateData.source || 'direct' as const,
        resume_url: candidateData.resume_url || null,
        avatar_url: candidateData.avatar_url || null,
        portfolio_url: candidateData.portfolio_url || null,
        linkedin_url: candidateData.linkedin_url || null,
        organization_id: organizationId,
      };

      const { data, error: createError } = await supabase
        .from('candidates')
        .insert(newCandidateData)
        .select()
        .single();

      if (createError) throw createError;

      const newCandidate = { ...data, skills: data.skills || [] };
      setCandidates(prev => [newCandidate, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Candidate created successfully',
      });

      return newCandidate;
    } catch (err: any) {
      console.error('Error creating candidate:', err);
      setError(err.message);
      toast({
        title: 'Error creating candidate',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateCandidate = async (candidateId: string, updates: Partial<Candidate>) => {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('candidates')
        .update(updates)
        .eq('id', candidateId)
        .select()
        .single();

      if (updateError) throw updateError;

      setCandidates(prev => prev.map(candidate => 
        candidate.id === candidateId ? { ...candidate, ...data, skills: data.skills || [] } : candidate
      ));

      toast({
        title: 'Success',
        description: 'Candidate updated successfully',
      });

      return data;
    } catch (err: any) {
      console.error('Error updating candidate:', err);
      setError(err.message);
      toast({
        title: 'Error updating candidate',
        description: err.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteCandidate = async (candidateId: string) => {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('candidates')
        .delete()
        .eq('id', candidateId);

      if (deleteError) throw deleteError;

      setCandidates(prev => prev.filter(candidate => candidate.id !== candidateId));
      
      toast({
        title: 'Success',
        description: 'Candidate deleted successfully',
      });

      return true;
    } catch (err: any) {
      console.error('Error deleting candidate:', err);
      setError(err.message);
      toast({
        title: 'Error deleting candidate',
        description: err.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    candidates,
    loading,
    error,
    searchCandidates,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    refetch: fetchCandidates,
  };
};
