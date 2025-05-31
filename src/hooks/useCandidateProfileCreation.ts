
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CandidateProfileService } from '@/services/candidateProfileService';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const useCandidateProfileCreation = (onProfileCreated: (profile: EnhancedCandidate) => void) => {
  const [candidateName, setCandidateName] = useState('');
  const [perplexityApiKey, setPerplexityApiKey] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string>('');
  const [generatedProfile, setGeneratedProfile] = useState<Partial<EnhancedCandidate> | null>(null);
  const { toast } = useToast();

  const searchCandidateInfo = async () => {
    if (!candidateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a candidate name",
        variant: "destructive"
      });
      return;
    }

    if (!perplexityApiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Perplexity API key to search the internet",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    console.log('Searching for candidate:', candidateName);

    try {
      const searchResult = await CandidateProfileService.searchCandidateInfo({
        candidateName,
        perplexityApiKey
      });
      
      setSearchResults(searchResult);
      const profile = CandidateProfileService.generateCandidateProfile(candidateName, searchResult);
      setGeneratedProfile(profile);
      
      toast({
        title: "Search Complete",
        description: "Found professional information and generated candidate profile",
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search for candidate information. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const createProfile = () => {
    if (generatedProfile) {
      onProfileCreated(generatedProfile as EnhancedCandidate);
      toast({
        title: "Profile Created",
        description: `Successfully created profile for ${generatedProfile.name}`,
      });
      
      // Reset form
      setCandidateName('');
      setSearchResults('');
      setGeneratedProfile(null);
    }
  };

  return {
    candidateName,
    setCandidateName,
    perplexityApiKey,
    setPerplexityApiKey,
    isSearching,
    searchResults,
    generatedProfile,
    searchCandidateInfo,
    createProfile
  };
};
