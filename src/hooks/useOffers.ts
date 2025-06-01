
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export interface Offer {
  id: string;
  application_id: string;
  title: string;
  salary_amount: number;
  salary_currency: string;
  benefits?: string[];
  start_date?: string;
  expiry_date?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired';
  offer_letter_url?: string;
  notes?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  application?: {
    id: string;
    job?: {
      id: string;
      title: string;
      department: string;
      organization?: {
        name: string;
      };
    };
  };
}

export const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchOffers = async () => {
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
        .from('offers')
        .select(`
          *,
          applications!inner (
            id,
            candidate_id,
            jobs (
              id,
              title,
              department,
              organizations (
                name
              )
            )
          )
        `)
        .eq('applications.candidate_id', candidate.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error: any) {
      console.error('Error fetching offers:', error);
      toast({
        title: 'Error loading offers',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [user]);

  const respondToOffer = async (offerId: string, status: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('offers')
        .update({ status })
        .eq('id', offerId);

      if (error) throw error;

      toast({
        title: `Offer ${status}`,
        description: `You have ${status} the job offer`,
      });

      fetchOffers();
    } catch (error: any) {
      toast({
        title: 'Error responding to offer',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return {
    offers,
    loading,
    respondToOffer,
    refetch: fetchOffers,
  };
};
