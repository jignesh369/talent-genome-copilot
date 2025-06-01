
import React, { useState } from 'react';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import SearchTabsContainer from '@/components/search/SearchTabsContainer';
import SearchModalsContainer from '@/components/search/SearchModalsContainer';
import SearchProgressIndicator from '@/components/search/SearchProgressIndicator';
import { useAISearch } from '@/hooks/useSearch';
import { useEnhancedSearch } from '@/hooks/useEnhancedSearch';
import { useSearchModals } from '@/hooks/useSearchModals';
import { useRecruitingIntelligence } from '@/hooks/useRecruitingIntelligence';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { PersonalizedSequence } from '@/types/outreach-sequence';
import { useToast } from '@/hooks/use-toast';

const Search = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [useEnhancedMode, setUseEnhancedMode] = useState(false);
  const { toast } = useToast();
  
  const searchMutation = useAISearch();
  const enhancedSearch = useEnhancedSearch();

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

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    if (useEnhancedMode) {
      await enhancedSearch.executeSearch(query);
    } else {
      await searchMutation.mutateAsync({ query });
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const handleFeedback = (candidateId: string, isPositive: boolean) => {
    console.log('Feedback for candidate:', candidateId, isPositive);
  };

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

  const currentSearchResult = useEnhancedMode ? enhancedSearch.searchResult : searchMutation.data;
  const isSearching = useEnhancedMode ? enhancedSearch.isSearching : searchMutation.isPending;

  return (
    <RecruiterLayout 
      title="AI-Powered Talent Discovery" 
      subtitle="Discover exceptional talent with enhanced AI outreach and smart triggers"
      showSearch={false}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Search Progress Indicator */}
        {useEnhancedMode && enhancedSearch.searchProgress && (
          <SearchProgressIndicator progress={enhancedSearch.searchProgress} />
        )}

        <SearchTabsContainer
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          query={query}
          setQuery={setQuery}
          isSearching={isSearching}
          searchResult={currentSearchResult}
          isListening={isListening}
          handleSearch={handleSearch}
          handleVoiceInput={handleVoiceInput}
          handleFeedback={handleFeedback}
          handleAutomaticOutreach={handleAutomaticOutreach}
          onViewProfile={openCandidateDetails}
          onViewSnapshot={openDigitalFootprint}
          onContactCandidate={handleContactCandidate}
          useEnhancedMode={useEnhancedMode}
          setUseEnhancedMode={setUseEnhancedMode}
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
