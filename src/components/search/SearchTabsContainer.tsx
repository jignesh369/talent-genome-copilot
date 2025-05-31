
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SearchInterface from './SearchInterface';
import SearchHistory from './SearchHistory';
import EmptyState from './EmptyState';
import SearchResultsContainer from './SearchResultsContainer';
import { Search as SearchIcon, History, Bell, Sparkles } from 'lucide-react';
import { SearchResult, EnhancedCandidate } from '@/types/enhanced-candidate';

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
  handleFeedback: (candidateId: string, isPositive: boolean) => void;
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
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="flex items-center justify-between">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="search" className="flex items-center space-x-2">
            <SearchIcon className="h-4 w-4" />
            <span>Search</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
          </TabsTrigger>
        </TabsList>
        
        {searchResult && (
          <Button 
            onClick={handleAutomaticOutreach}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Process Auto Outreach
          </Button>
        )}
      </div>

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
          <SearchResultsContainer
            searchResult={searchResult}
            onViewProfile={onViewProfile}
            onViewSnapshot={onViewSnapshot}
            onContactCandidate={onContactCandidate}
            onFeedback={handleFeedback}
            onRefinementClick={setQuery}
          />
        )}

        {!searchResult && !isSearching && <EmptyState />}
      </TabsContent>

      <TabsContent value="history">
        <SearchHistory />
      </TabsContent>

      <TabsContent value="alerts">
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Bell className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="text-lg font-semibold">Search Alerts</h3>
              <p className="text-gray-600">
                Set up alerts for new candidates matching your saved searches. 
                Get notified when new talent becomes available.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SearchTabsContainer;
