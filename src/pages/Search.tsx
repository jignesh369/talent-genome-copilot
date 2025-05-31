
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import SearchInterface from '@/components/search/SearchInterface';
import SearchHistory from '@/components/search/SearchHistory';
import { useSearch } from '@/hooks/useSearch';
import { Search as SearchIcon, History, Bell } from 'lucide-react';

const Search = () => {
  const [activeTab, setActiveTab] = useState('search');
  const {
    query,
    setQuery,
    isSearching,
    isListening,
    handleSearch,
    handleVoiceInput
  } = useSearch();

  return (
    <RecruiterLayout 
      title="AI-Powered Talent Discovery" 
      subtitle="Discover exceptional talent with comprehensive analysis and search history"
      showSearch={false}
    >
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search" className="flex items-center space-x-2">
              <SearchIcon className="h-4 w-4" />
              <span>Search</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>History & Saved</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Alerts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <SearchInterface 
              query={query}
              setQuery={setQuery}
              isSearching={isSearching}
              isListening={isListening}
              onSearch={handleSearch}
              onVoiceInput={handleVoiceInput}
            />
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
      </div>
    </RecruiterLayout>
  );
};

export default Search;
