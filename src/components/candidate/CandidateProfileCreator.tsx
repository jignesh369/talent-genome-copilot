
import React from 'react';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { useCandidateProfileCreation } from '@/hooks/useCandidateProfileCreation';
import ProfileSearchForm from './ProfileSearchForm';
import SearchResults from './SearchResults';
import ProfilePreview from './ProfilePreview';

interface CandidateProfileCreatorProps {
  onProfileCreated: (profile: EnhancedCandidate) => void;
}

const CandidateProfileCreator: React.FC<CandidateProfileCreatorProps> = ({ onProfileCreated }) => {
  const {
    candidateName,
    setCandidateName,
    perplexityApiKey,
    setPerplexityApiKey,
    isSearching,
    searchResults,
    generatedProfile,
    searchCandidateInfo,
    createProfile
  } = useCandidateProfileCreation(onProfileCreated);

  return (
    <div className="space-y-6">
      <ProfileSearchForm
        candidateName={candidateName}
        setCandidateName={setCandidateName}
        perplexityApiKey={perplexityApiKey}
        setPerplexityApiKey={setPerplexityApiKey}
        isSearching={isSearching}
        onSearch={searchCandidateInfo}
      />

      <SearchResults searchResults={searchResults} />

      {generatedProfile && (
        <ProfilePreview 
          profile={generatedProfile} 
          onCreateProfile={createProfile} 
        />
      )}
    </div>
  );
};

export default CandidateProfileCreator;
