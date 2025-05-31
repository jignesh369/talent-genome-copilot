
import { useToast } from "@/hooks/use-toast";
import { aiSearchService } from "@/services/aiSearchService";
import { SearchResult } from "@/types/enhanced-candidate";

interface UseSearchActionsProps {
  query: string;
  setIsSearching: (isSearching: boolean) => void;
  setSearchResult: (result: SearchResult | null) => void;
  setIsListening: (isListening: boolean) => void;
  searchResult: SearchResult | null;
}

export const useSearchActions = ({
  query,
  setIsSearching,
  setSearchResult,
  setIsListening,
  searchResult
}: UseSearchActionsProps) => {
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
    console.log('Starting search for:', query);
    
    try {
      const result = await aiSearchService.processNaturalLanguageQuery(query);
      console.log('Search result:', result);
      setSearchResult(result);
      toast({
        title: "Search Complete",
        description: `Found ${result.candidates.length} candidates with ${Math.round(result.search_quality_score * 100)}% confidence.`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        // We'll need to update query from parent component
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
    console.log('Feedback for candidate:', candidateId, 'positive:', isPositive);
    toast({
      title: isPositive ? "Thanks for the feedback!" : "Feedback noted",
      description: isPositive ? "We'll find more candidates like this" : "We'll adjust future recommendations",
    });
  };

  const handleAutomaticOutreach = async () => {
    if (!searchResult) return;
    
    toast({
      title: "Processing Outreach",
      description: "Analyzing candidates for automated outreach sequences...",
    });
    
    // Simulate processing
    setTimeout(() => {
      toast({
        title: "Outreach Complete",
        description: `Initiated outreach sequences for ${searchResult.candidates.length} candidates.`,
      });
    }, 2000);
  };

  return {
    handleSearch,
    handleVoiceInput,
    handleFeedback,
    handleAutomaticOutreach
  };
};
