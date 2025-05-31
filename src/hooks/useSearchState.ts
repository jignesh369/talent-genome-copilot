
import { useState } from 'react';
import { SearchResult } from '@/types/enhanced-candidate';

export const useSearchState = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState("search");

  return {
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
  };
};
