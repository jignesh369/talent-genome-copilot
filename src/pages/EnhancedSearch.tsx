
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';
import UnifiedSearchInterface from '@/components/search/UnifiedSearchInterface';
import EnhancedSearchResults from '@/components/search/EnhancedSearchResults';
import SearchAnalyticsPanel from '@/components/search/SearchAnalyticsPanel';
import { useSearchManagement } from '@/hooks/useSearchManagement';
import { EnhancedCandidate } from '@/types/enhanced-candidate';

const EnhancedSearch = () => {
  const { searchResult } = useSearchManagement();
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);

  // Mock analytics data
  const searchMetrics = {
    totalSearches: 1247,
    avgSearchTime: 2.3,
    successRate: 94,
    topQueries: ['React Developer', 'Senior Engineer', 'Product Manager', 'Data Scientist', 'DevOps'],
    diversityScore: 87,
    aiAccuracy: 92
  };

  const handleViewCandidate = (candidate: EnhancedCandidate) => {
    setSelectedCandidate(candidate);
  };

  const handleContactCandidate = (candidate: EnhancedCandidate) => {
    console.log('Contacting candidate:', candidate.name);
  };

  return (
    <RecruiterLayout 
      title="AI-Powered Search" 
      subtitle="Discover exceptional talent with intelligent search"
    >
      <div className="space-y-6">
        <UnifiedSearchInterface />

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList>
            <TabsTrigger value="results">Search Results</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            {searchResult ? (
              <EnhancedSearchResults
                searchResult={searchResult}
                onViewCandidate={handleViewCandidate}
                onContactCandidate={handleContactCandidate}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Use the search interface above to find candidates</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <SearchAnalyticsPanel searchMetrics={searchMetrics} />
          </TabsContent>
        </Tabs>
      </div>
    </RecruiterLayout>
  );
};

export default EnhancedSearch;
