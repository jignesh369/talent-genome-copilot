
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchInterface from './SearchInterface';
import SearchResultsContainer from './SearchResultsContainer';
import SearchHistory from './SearchHistory';
import { useSearch } from '@/hooks/useSearch';
import { Search, History, BarChart3 } from 'lucide-react';

const SearchTabsContainer: React.FC = () => {
  const { searchResult } = useSearch();

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2" disabled={!searchResult}>
            <BarChart3 className="w-4 h-4" />
            Results ({searchResult?.candidates?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <SearchInterface />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <SearchResultsContainer />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <SearchHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchTabsContainer;
