
import React from 'react';
import { useSearchManagement } from '@/hooks/useSearchManagement';
import { useSearchModals } from '@/hooks/useSearchModals';
import SearchTabsContainer from './SearchTabsContainer';
import SearchModalsContainer from './SearchModalsContainer';
import { PersonalizedSequence } from '@/types/outreach-sequence';

const EnhancedSearchContainer = () => {
  const {
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    activeTab,
    setActiveTab,
    handleSearch,
    handleVoiceInput,
    handleFeedback,
    handleAutomaticOutreach
  } = useSearchManagement();

  const {
    selectedCandidate,
    footprintCandidate,
    outreachCandidate,
    openCandidateDetails,
    openDigitalFootprint,
    openOutreachSequence,
    setSelectedCandidate,
    setFootprintCandidate,
    setOutreachCandidate
  } = useSearchModals();

  const handleContactCandidate = (candidate: any) => {
    openOutreachSequence(candidate);
  };

  const handleSequenceStart = (sequence: PersonalizedSequence) => {
    console.log('Starting sequence:', sequence);
    setOutreachCandidate(null);
  };

  return (
    <>
      <SearchTabsContainer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        query={query}
        setQuery={setQuery}
        isSearching={isSearching}
        searchResult={searchResult}
        isListening={isListening}
        handleSearch={handleSearch}
        handleVoiceInput={handleVoiceInput}
        handleFeedback={handleFeedback}
        handleAutomaticOutreach={handleAutomaticOutreach}
        onViewProfile={openCandidateDetails}
        onViewSnapshot={openDigitalFootprint}
        onContactCandidate={handleContactCandidate}
      />

      <SearchModalsContainer
        selectedCandidate={selectedCandidate}
        footprintCandidate={footprintCandidate}
        outreachCandidate={outreachCandidate}
        onCloseCandidate={() => setSelectedCandidate(null)}
        onCloseFootprint={() => setFootprintCandidate(null)}
        onCloseOutreach={() => setOutreachCandidate(null)}
        onContactCandidate={handleContactCandidate}
        onFeedback={handleFeedback}
        onSequenceStart={handleSequenceStart}
      />
    </>
  );
};

export default EnhancedSearchContainer;
