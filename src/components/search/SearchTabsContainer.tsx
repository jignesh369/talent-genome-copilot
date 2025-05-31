
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { SearchResult } from '@/types/enhanced-candidate';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import SearchInterface from './SearchInterface';
import CandidateCard from './CandidateCard';
import SearchSidebar from './SearchSidebar';
import EmptyState from './EmptyState';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter, SortDesc, Zap } from "lucide-react";
import SourceBadge from './SourceBadge';

interface SearchTabsContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  query: string;
  setQuery: (query: string) => void;
  isSearching: boolean;
  searchResult: SearchResult | null;
  isListening: boolean;
  handleSearch: () => void;
  handleVoiceInput: () => void;
  handleFeedback: (candidateId: string, feedback: 'positive' | 'negative', reason?: string) => void;
  handleAutomaticOutreach: () => void;
  onViewProfile: (candidate: EnhancedCandidate) => void;
  onViewSnapshot: (candidate: EnhancedCandidate) => void;
  onContactCandidate: (candidate: EnhancedCandidate) => void;
}

const SearchTabsContainer: React.FC<SearchTabsContainerProps> = ({
  activeTab,
  setActiveTab,
  query,
  setQuery,
  isSearching,
  searchResult,
  isListening,
  handleSearch,
  handleVoiceInput,
  handleFeedback,
  handleAutomaticOutreach,
  onViewProfile,
  onViewSnapshot,
  onContactCandidate
}) => {
  // Adapter function to convert boolean feedback to string format for CandidateCard
  const handleCandidateFeedback = (candidateId: string, isPositive: boolean) => {
    const feedback = isPositive ? 'positive' : 'negative';
    handleFeedback(candidateId, feedback);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="search">AI Search</TabsTrigger>
        <TabsTrigger value="triggers">Smart Triggers</TabsTrigger>
        <TabsTrigger value="history">Search History</TabsTrigger>
      </TabsList>

      <TabsContent value="search" className="space-y-6">
        <SearchInterface
          query={query}
          setQuery={setQuery}
          isSearching={isSearching}
          isListening={isListening}
          onSearch={handleSearch}
          onVoiceInput={handleVoiceInput}
        />

        {searchResult && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Best Matches ({searchResult.candidates?.length || 0})
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                    <p className="text-gray-600 text-base sm:text-lg">
                      AI-powered candidate matching with real-time analysis
                    </p>
                    <SourceBadge 
                      source="ai_analysis" 
                      confidence={searchResult.search_quality_score || 0.85} 
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    {Math.round((searchResult.search_quality_score || 0.85) * 100)}% confidence
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-200 transition-colors">
                      <Filter className="h-4 w-4 mr-2" />
                      Refine
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <SortDesc className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {searchResult.candidates?.map((candidate) => (
                  <CandidateCard 
                    key={candidate.id} 
                    candidate={candidate}
                    onViewProfile={onViewProfile}
                    onViewSnapshot={onViewSnapshot}
                    onContactCandidate={onContactCandidate}
                    onFeedback={handleCandidateFeedback}
                  />
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    No candidates found in search results.
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <SearchSidebar 
                searchResult={searchResult} 
                onRefinementClick={setQuery}
              />
            </div>
          </div>
        )}

        {!searchResult && !isSearching && <EmptyState />}
      </TabsContent>

      <TabsContent value="triggers" className="space-y-6">
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Smart Outreach Triggers</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Set up automated triggers to reach out to candidates when they show availability signals or match specific criteria.
              </p>
              <Button onClick={handleAutomaticOutreach} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                <Zap className="w-4 h-4 mr-2" />
                Process Automatic Outreach
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="space-y-6">
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Search History</h3>
              <p className="text-gray-600">
                Your recent searches will appear here. This helps you track what you've been looking for and refine your search strategy.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SearchTabsContainer;
