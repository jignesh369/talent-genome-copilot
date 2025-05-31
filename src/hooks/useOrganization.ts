
import { useState, useEffect } from 'react';
import { Organization } from '@/types/organization';

export const useOrganization = (organizationId?: string) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      if (!organizationId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // TODO: Replace with actual Supabase call
        // Simulated data for now
        const mockOrg: Organization = {
          id: organizationId,
          name: 'TechCorp Inc.',
          domain: 'techcorp.com',
          industry: 'Technology',
          size: '51-200 employees',
          plan: 'professional',
          status: 'active',
          contactEmail: 'admin@techcorp.com',
          contactName: 'John Smith',
          userLimit: 25,
          jobLimit: 15,
          currentUsers: 12,
          currentJobs: 8,
          monthlyAmount: 299,
          nextBilling: 'Jan 15, 2024',
          website: 'https://techcorp.com',
          description: 'Leading technology company focused on innovation.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setOrganization(mockOrg);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch organization');
        setOrganization(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [organizationId]);

  const updateOrganization = async (updates: Partial<Organization>) => {
    if (!organization) return;

    try {
      setLoading(true);
      // TODO: Replace with actual Supabase call
      const updatedOrg = { ...organization, ...updates };
      setOrganization(updatedOrg);
      setError(null);
      return updatedOrg;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update organization');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    organization,
    loading,
    error,
    updateOrganization
  };
};
