
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface CandidateExperience {
  id: string;
  candidate_id: string;
  company: string;
  title: string;
  description?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  achievements?: string[];
  created_at: string;
  updated_at: string;
}

export const useCandidateExperiences = () => {
  const [experiences, setExperiences] = useState<CandidateExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchExperiences = async () => {
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
        .from('candidate_experiences')
        .select('*')
        .eq('candidate_id', candidate.id)
        .order('start_date', { ascending: false });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error: any) {
      console.error('Error fetching experiences:', error);
      toast({
        title: 'Error loading experiences',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [user]);

  const createExperience = async (experienceData: Omit<CandidateExperience, 'id' | 'candidate_id' | 'created_at' | 'updated_at'>) => {
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
        .from('candidate_experiences')
        .insert({
          candidate_id: candidate.id,
          ...experienceData,
        });

      if (error) throw error;

      toast({
        title: 'Experience added',
        description: 'Work experience has been added to your profile',
      });

      fetchExperiences();
    } catch (error: any) {
      toast({
        title: 'Error adding experience',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const updateExperience = async (id: string, experienceData: Partial<CandidateExperience>) => {
    try {
      const { error } = await supabase
        .from('candidate_experiences')
        .update(experienceData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Experience updated',
        description: 'Work experience has been updated',
      });

      fetchExperiences();
    } catch (error: any) {
      toast({
        title: 'Error updating experience',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const { error } = await supabase
        .from('candidate_experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Experience deleted',
        description: 'Work experience has been removed from your profile',
      });

      fetchExperiences();
    } catch (error: any) {
      toast({
        title: 'Error deleting experience',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return {
    experiences,
    loading,
    createExperience,
    updateExperience,
    deleteExperience,
    refetch: fetchExperiences,
  };
};
