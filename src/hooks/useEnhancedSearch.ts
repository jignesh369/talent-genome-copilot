
import { useState } from 'react';
import { enhancedSearchPipeline, EnhancedSearchResult, SearchProgress } from '@/services/search/enhancedSearchPipeline';
import { useToast } from '@/hooks/use-toast';

export const useEnhancedSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<EnhancedSearchResult | null>(null);
  const [searchProgress, setSearchProgress] = useState<SearchProgress | null>(null);
  const { toast } = useToast();

  const executeSearch = async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    setSearchResult(null);
    setSearchProgress(null);

    try {
      // Set up progress callback
      enhancedSearchPipeline.setProgressCallback(setSearchProgress);
      
      // Execute the enhanced search pipeline
      const result = await enhancedSearchPipeline.executeSearchPipeline(query);
      
      setSearchResult(result);
      
      toast({
        title: "Search Completed",
        description: `Found ${result.candidates.length} candidates with enhanced AI analysis`,
      });
      
    } catch (error) {
      console.error('Enhanced search error:', error);
      toast({
        title: "Search Error",
        description: "Failed to complete enhanced search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResult(null);
    setSearchProgress(null);
  };

  return {
    isSearching,
    searchResult,
    searchProgress,
    executeSearch,
    clearSearch
  };
};
