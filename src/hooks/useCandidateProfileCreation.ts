
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { candidateProfileService } from '@/services/candidateProfileService';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export const useCandidateProfileCreation = (onProfileCreated?: (profile: EnhancedCandidate) => void) => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [perplexityApiKey, setPerplexityApiKey] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string>('');
  const [generatedProfile, setGeneratedProfile] = useState<EnhancedCandidate | null>(null);

  const createCandidateProfile = async (profileData: Partial<EnhancedCandidate>) => {
    setIsCreating(true);
    try {
      const candidate = await candidateProfileService.createCandidateProfile(profileData);
      
      toast({
        title: "Profile Created",
        description: `Successfully created profile for ${candidate.name}`,
      });
      
      onProfileCreated?.(candidate);
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

  const searchCandidateInfo = async () => {
    if (!candidateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a candidate name",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    try {
      // Simulate search results as a string
      const mockResultsText = `Found information for ${candidateName}:
      
• Software Engineer at Tech Corp
• Located in San Francisco, CA
• 5+ years of experience
• Skills: JavaScript, React, Node.js
• Active on LinkedIn with professional presence
• Strong technical background in web development`;
      
      setSearchResults(mockResultsText);

      // Generate a mock profile
      const mockProfile: EnhancedCandidate = {
        id: `temp_${Date.now()}`,
        name: candidateName,
        handle: candidateName.toLowerCase().replace(/\s+/g, ''),
        email: `${candidateName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        location: "San Francisco, CA",
        current_title: "Software Engineer",
        current_company: "Tech Corp",
        experience_years: 5,
        skills: ["JavaScript", "React", "Node.js"],
        ai_summary: `Experienced software engineer with strong technical background`,
        career_trajectory_analysis: {
          progression_type: 'ascending',
          growth_rate: 5.0,
          stability_score: 6.0,
          next_likely_move: 'Senior Role',
          timeline_events: []
        },
        technical_depth_score: 7.5,
        community_influence_score: 6.0,
        cultural_fit_indicators: [],
        learning_velocity_score: 7.0,
        osint_profile: await candidateProfileService.generateDefaultOSINTProfile(`temp_${Date.now()}`),
        match_score: 85,
        relevance_factors: [],
        availability_status: 'passive',
        best_contact_method: {
          platform: 'email',
          confidence: 0.8,
          best_time: '9-17',
          approach_style: 'direct'
        },
        profile_last_updated: new Date().toISOString(),
        osint_last_fetched: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setGeneratedProfile(mockProfile);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search candidate information",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const createProfile = async () => {
    if (!generatedProfile) return;
    
    await createCandidateProfile(generatedProfile);
    setGeneratedProfile(null);
    setCandidateName('');
    setSearchResults('');
  };

  return {
    createCandidateProfile,
    isCreating,
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
