
import { useSearchState } from './useSearchState';
import { useSearchActions } from './useSearchActions';
import { useVoiceInput } from './useVoiceInput';

export const useSearchManagement = () => {
  const {
    query,
    setQuery,
    isSearching,
    setIsSearching,
    searchResult,
    setSearchResult,
    isListening,
    setIsListening,
    activeTab,
    setActiveTab
  } = useSearchState();

  const { handleVoiceInput } = useVoiceInput({ setQuery, setIsListening });

  const {
    handleSearch,
    handleFeedback,
    handleAutomaticOutreach
  } = useSearchActions({
    query,
    setIsSearching,
    setSearchResult,
    setIsListening,
    searchResult
  });

  return {
    // Search state
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    activeTab,
    setActiveTab,
    
    // Search actions
    handleSearch,
    handleVoiceInput,
    handleFeedback,
    handleAutomaticOutreach
  };
};
