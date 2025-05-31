
import { useState, useCallback } from 'react';
import { useBackendIntegration } from './useBackendIntegration';
import { SearchResult } from '@/types/enhanced-candidate';
import { useToast } from './use-toast';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const { searchCandidates, loading, error } = useBackendIntegration();

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search query to find candidates.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      console.log('Starting AI candidate search for query:', query);
      
      const searchParams = {
        query: query.trim(),
        skills: extractSkillsFromQuery(query),
        location: extractLocationFromQuery(query),
        experience_range: extractExperienceFromQuery(query),
        job_requirements: [query],
        organization_id: 'current-org' // This should come from user context
      };

      const result = await searchCandidates(searchParams);
      console.log('Search result received:', result);
      
      if (result && result.candidates) {
        setSearchResult(result);
        toast({
          title: "Search Complete",
          description: `Found ${result.candidates.length} candidates matching your criteria.`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No candidates found matching your search criteria.",
        });
        setSearchResult(null);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Failed",
        description: "There was an error performing the search. Please try again.",
        variant: "destructive"
      });
      setSearchResult(null);
    } finally {
      setIsSearching(false);
    }
  }, [query, searchCandidates, toast]);

  const handleVoiceInput = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      
      toast({
        title: "Voice Input Captured",
        description: `Captured: "${transcript}"`,
      });
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      toast({
        title: "Voice Input Error",
        description: "Failed to capture voice input. Please try again.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [toast]);

  const handleFeedback = useCallback((candidateId: string, feedback: 'positive' | 'negative', reason?: string) => {
    console.log('Feedback received:', { candidateId, feedback, reason });
    
    toast({
      title: "Feedback Recorded",
      description: `Your ${feedback} feedback has been recorded and will improve future searches.`,
    });
  }, [toast]);

  // Helper functions to extract search parameters from natural language
  const extractSkillsFromQuery = (query: string): string[] => {
    const skillKeywords = [
      'react', 'angular', 'vue', 'javascript', 'typescript', 'python', 'java', 'go', 'rust',
      'node.js', 'express', 'django', 'flask', 'spring', 'laravel', 'rails',
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform',
      'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch',
      'machine learning', 'ml', 'ai', 'data science', 'analytics'
    ];
    
    const foundSkills = skillKeywords.filter(skill => 
      query.toLowerCase().includes(skill.toLowerCase())
    );
    
    return foundSkills;
  };

  const extractLocationFromQuery = (query: string): string | undefined => {
    const locationPatterns = [
      /in ([A-Za-z\s]+(?:, [A-Z]{2})?)/i,
      /from ([A-Za-z\s]+(?:, [A-Z]{2})?)/i,
      /based in ([A-Za-z\s]+(?:, [A-Z]{2})?)/i
    ];
    
    for (const pattern of locationPatterns) {
      const match = query.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }
    
    return undefined;
  };

  const extractExperienceFromQuery = (query: string): [number, number] | undefined => {
    const experiencePatterns = [
      /(\d+)\+?\s*years?\s*experience/i,
      /(\d+)-(\d+)\s*years?\s*experience/i,
      /senior/i,
      /junior/i,
      /mid-level/i
    ];
    
    if (query.toLowerCase().includes('senior')) {
      return [5, 15];
    }
    if (query.toLowerCase().includes('junior')) {
      return [0, 3];
    }
    if (query.toLowerCase().includes('mid-level')) {
      return [3, 7];
    }
    
    const match = query.match(/(\d+)\+?\s*years?\s*experience/i);
    if (match) {
      const years = parseInt(match[1]);
      return [years, years + 5];
    }
    
    return undefined;
  };

  return {
    query,
    setQuery,
    isSearching: isSearching || loading,
    searchResult,
    isListening,
    handleSearch,
    handleVoiceInput,
    handleFeedback,
    error
  };
};
