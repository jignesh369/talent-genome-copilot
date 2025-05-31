
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, Search, Loader2 } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { useToast } from '@/hooks/use-toast';

const SearchInterface: React.FC = () => {
  const {
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    handleSearch,
    handleVoiceInput,
    error
  } = useSearch();
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search query to find candidates.",
        variant: "destructive"
      });
      return;
    }
    handleSearch();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">AI Candidate Search</CardTitle>
        <p className="text-gray-600 text-center">
          Search for candidates using natural language and AI-powered matching
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="e.g., 'Find React developers with 3+ years experience in San Francisco'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pr-20 py-3 text-lg"
              disabled={isSearching}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                disabled={isSearching || isListening}
                className={`p-2 ${isListening ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="w-full py-3 text-lg"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Search Candidates
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {isListening && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-blue-700">Listening... Speak now</p>
            </div>
          </div>
        )}

        {searchResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Search Complete</h3>
            <p className="text-green-700 text-sm">
              Found {searchResult.candidates?.length || 0} candidates matching your criteria
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchInterface;
