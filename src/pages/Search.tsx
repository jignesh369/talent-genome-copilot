
import React, { useState } from 'react';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import SearchTabsContainer from '@/components/search/SearchTabsContainer';
import SearchModalsContainer from '@/components/search/SearchModalsContainer';
import { useSearch } from '@/hooks/useSearch';
import { useSearchModals } from '@/hooks/useSearchModals';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { PersonalizedSequence } from '@/types/outreach-sequence';
import { useToast } from '@/hooks/use-toast';

const Search = () => {
  const [activeTab, setActiveTab] = useState('search');
  const { toast } = useToast();
  
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

  const { processAutomaticOutreach } = useRecruitingIntelligence();

  const handleContactCandidate = async (candidate: EnhancedCandidate) => {
    console.log('Opening outreach sequence modal for candidate:', candidate.name);
    openOutreachSequence(candidate);
  };

  const handleSequenceStart = async (personalizedSequence: PersonalizedSequence) => {
    try {
      console.log('Starting outreach sequence:', personalizedSequence);
      
      toast({
        title: "Outreach Sequence Started",
        description: `Personalized sequence launched successfully for ${outreachCandidate?.name}`,
      });
      
      setOutreachCandidate(null);
    } catch (error) {
      console.error('Error starting sequence:', error);
      toast({
        title: "Error",
        description: "Failed to start outreach sequence. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAutomaticOutreach = async () => {
    try {
      toast({
        title: "Processing Automatic Outreach",
        description: "Analyzing candidates and generating triggered outreach...",
      });

      await processAutomaticOutreach();
    } catch (error) {
      console.error('Error in automatic outreach:', error);
      toast({
        title: "Error",
        description: "Failed to process automatic outreach.",
        variant: "destructive"
      });
    }
  };

  return (
    <RecruiterLayout 
      title="AI-Powered Talent Discovery" 
      subtitle="Discover exceptional talent with enhanced AI outreach and smart triggers"
      showSearch={false}
    >
      <div className="max-w-7xl mx-auto space-y-6">
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
      </div>
    </RecruiterLayout>
  );
};

export default Search;
