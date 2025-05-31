
import React, { useState } from 'react';
import { EnhancedCandidate } from "@/types/enhanced-candidate";
import DigitalFootprintModal from "./DigitalFootprintModal";
import CandidateDetailsModal from "./CandidateDetailsModal";
import SearchInterface from "./SearchInterface";
import SearchResultsContainer from "./SearchResultsContainer";
import EmptyState from "./EmptyState";
import { useSearch } from "@/hooks/useSearch";

const SearchContainer = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [footprintCandidate, setFootprintCandidate] = useState<EnhancedCandidate | null>(null);
  
  const {
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    handleSearch,
    handleVoiceInput,
    handleFeedback
  } = useSearch();

  return (
    <>
      <SearchInterface
        query={query}
        setQuery={setQuery}
        isSearching={isSearching}
        isListening={isListening}
        onSearch={handleSearch}
        onVoiceInput={handleVoiceInput}
      />

      {searchResult && (
        <SearchResultsContainer
          searchResult={searchResult}
          onViewProfile={setSelectedCandidate}
          onViewSnapshot={setFootprintCandidate}
          onFeedback={handleFeedback}
          onRefinementClick={setQuery}
        />
      )}

      {!searchResult && !isSearching && <EmptyState />}

      {selectedCandidate && (
        <CandidateDetailsModal 
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onFeedback={handleFeedback}
        />
      )}

      <DigitalFootprintModal
        candidate={footprintCandidate}
        isOpen={!!footprintCandidate}
        onClose={() => setFootprintCandidate(null)}
      />
    </>
  );
};

export default SearchContainer;
