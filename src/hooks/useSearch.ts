
import { useState, useCallback } from 'react';
import { useBackendIntegration } from './useBackendIntegration';
import { useAuthContext } from './useAuthContext';
import { useToast } from './use-toast';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

export interface SearchResult {
  candidates: EnhancedCandidate[];
  search_quality_score: number;
  search_metadata?: {
    total_found: number;
    search_time_ms: number;
    sources_used: string[];
  };
}

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { searchCandidates, loading: backendLoading } = useBackendIntegration();
  const { user, organizationId } = useAuthContext();
  const { toast } = useToast();

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search query to find candidates.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      setError('Please log in to search for candidates');
      return;
    }

    if (!organizationId) {
      setError('No organization found for your account');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      console.log('Starting search with query:', query);
      
      const searchParams = {
        query,
        organization_id: organizationId
      };

      const result = await searchCandidates(searchParams);
      
      console.log('Search result:', result);

      if (result && result.candidates) {
        setSearchResult({
          candidates: result.candidates,
          search_quality_score: result.search_quality_score || 0.85,
          search_metadata: result.search_metadata
        });
        
        toast({
          title: "Search Complete",
          description: `Found ${result.candidates.length} candidates matching your criteria.`,
        });
      } else {
        setSearchResult({
          candidates: [],
          search_quality_score: 0,
          search_metadata: {
            total_found: 0,
            search_time_ms: 0,
            sources_used: []
          }
        });
        
        toast({
          title: "No Results",
          description: "No candidates found matching your search criteria.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error('Search error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during search';
      setError(errorMessage);
      
      toast({
        title: "Search Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  }, [query, user, organizationId, searchCandidates, toast]);

  const handleVoiceInput = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Input Error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive"
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice Input Unavailable",
        description: "Voice input is not supported in your browser.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleFeedback = useCallback(async (candidateId: string, feedback: 'positive' | 'negative', reason?: string) => {
    try {
      console.log('Feedback submitted:', { candidateId, feedback, reason });
      
      toast({
        title: "Feedback Submitted",
        description: `Thank you for your ${feedback} feedback on this candidate.`,
      });
    } catch (err) {
      console.error('Feedback error:', err);
      toast({
        title: "Feedback Error",
        description: "Could not submit feedback. Please try again.",
        variant: "destructive"
      });
    }
  }, [toast]);

  return {
    query,
    setQuery,
    searchResult,
    isSearching: isSearching || backendLoading,
    isListening,
    error,
    handleSearch,
    handleVoiceInput,
    handleFeedback
  };
};
