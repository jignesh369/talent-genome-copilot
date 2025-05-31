
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mic, X, Loader2, Sparkles, Lightbulb, Target } from "lucide-react";

interface SearchInterfaceProps {
  query: string;
  setQuery: (query: string) => void;
  isSearching: boolean;
  isListening: boolean;
  onSearch: () => void;
  onVoiceInput: () => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  query,
  setQuery,
  isSearching,
  isListening,
  onSearch,
  onVoiceInput
}) => {
  const suggestions = [
    "Senior React developer with ML experience and startup background",
    "Full-stack engineer from fintech with leadership skills",
    "Frontend specialist with design skills and open source contributions",
    "DevOps engineer with Kubernetes expertise and community presence"
  ];

  return (
    <Card className="max-w-6xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-gray-50/50 to-purple-50/30 backdrop-blur-sm">
      <CardContent className="p-10">
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            <Input
              placeholder="e.g., 'Senior React developer with ML experience from a startup background who contributes to open source'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-14 text-lg h-16 border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button 
            onClick={onVoiceInput}
            disabled={isListening}
            variant="outline"
            size="lg"
            className="px-6 h-16 border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md"
          >
            <Mic className={`h-6 w-6 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
          </Button>
          <Button 
            onClick={onSearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-10 h-16 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
            size="lg"
          >
            {isSearching ? (
              <>
                <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6 mr-3" />
                Discover Talent
              </>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Try these examples:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setQuery(suggestion)}
                className="text-xs h-8 justify-start text-left hover:bg-purple-50 hover:border-purple-200 transition-colors"
              >
                <Target className="h-3 w-3 mr-2 text-purple-500" />
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchInterface;
