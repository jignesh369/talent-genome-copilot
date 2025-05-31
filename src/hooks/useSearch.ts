
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { aiSearchService } from "@/services/aiSearchService";
import { SearchResult } from "@/types/enhanced-candidate";

export const useSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please describe who you're looking for",
        description: "Try something like 'senior React developer with startup experience'",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const result = await aiSearchService.processNaturalLanguageQuery(query);
      setSearchResult(result);
      setIsSearching(false);
      toast({
        title: "Search Complete",
        description: `Found ${result.candidates.length} candidates with ${Math.round(result.search_quality_score * 10)}% confidence.`,
      });
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
      toast({
        title: "Search Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };
      recognition.start();
    } else {
      toast({
        title: "Voice input not supported",
        description: "Please use the text input instead.",
        variant: "destructive"
      });
    }
  };

  const handleFeedback = (candidateId: string, isPositive: boolean) => {
    toast({
      title: isPositive ? "Thanks for the feedback!" : "Feedback noted",
      description: isPositive ? "We'll find more candidates like this" : "We'll adjust future recommendations",
    });
  };

  return {
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    handleSearch,
    handleVoiceInput,
    handleFeedback
  };
};
