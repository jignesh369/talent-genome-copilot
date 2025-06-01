
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { candidateProfileService } from '@/services/candidateProfileService';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const useCandidateProfileCreation = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const createCandidateProfile = async (profileData: Partial<EnhancedCandidate>) => {
    setIsCreating(true);
    try {
      const candidate = await candidateProfileService.createCandidateProfile(profileData);
      
      toast({
        title: "Profile Created",
        description: `Successfully created profile for ${candidate.name}`,
      });
      
      return candidate;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create candidate profile",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createCandidateProfile,
    isCreating
  };
};
