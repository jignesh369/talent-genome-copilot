
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter, SortDesc } from "lucide-react";
import { EnhancedCandidate } from "@/types/enhanced-candidate";
import DigitalFootprintModal from "./DigitalFootprintModal";
import CandidateCard from "./CandidateCard";
import SearchSidebar from "./SearchSidebar";
import SourceBadge from "./SourceBadge";
import CandidateDetailsModal from "./CandidateDetailsModal";
import SearchHeader from "./SearchHeader";
import SearchInterface from "./SearchInterface";
import EmptyState from "./EmptyState";
import ErrorBoundary from "../ErrorBoundary";
import { useSearch } from "@/hooks/useSearch";
import { useAuth } from "@/components/auth/AuthProvider";

const MindReaderSearch = () => {
  console.log('MindReaderSearch: Component rendering');
  
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [footprintCandidate, setFootprintCandidate] = useState<EnhancedCandidate | null>(null);
  
  const { user, loading: authLoading, organizationId } = useAuth();
  
  const {
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    handleSearch,
    handleVoiceInput,
    handleFeedback,
    error
  } = useSearch();

  console.log('MindReaderSearch: Current state', {
    query,
    isSearching,
    hasSearchResult: !!searchResult,
    error,
    candidatesCount: searchResult?.candidates?.length || 0,
    authLoading,
    organizationId,
    userId: user?.id
  });

  // Show loading state while auth is initializing
  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 p-4 sm:p-6">
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="text-gray-600">Initializing...</span>
          </div>
        </div>
      </div>
    );
  }

  // Show auth required message if user is not authenticated
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 p-4 sm:p-6">
        <div className="text-center py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Authentication Required</h3>
            <p className="text-yellow-700">Please log in to access the search functionality.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleContactCandidate = (candidate: EnhancedCandidate) => {
    console.log('Contact candidate:', candidate.name);
    // This will be handled by the parent component
  };

  const handleSearchWrapper = () => {
    console.log('MindReaderSearch: Search button clicked with query:', query);
    handleSearch();
  };

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 p-4 sm:p-6">
        <SearchHeader />
        
        <SearchInterface
          query={query}
          setQuery={setQuery}
          isSearching={isSearching}
          isListening={isListening}
          onSearch={handleSearchWrapper}
          onVoiceInput={handleVoiceInput}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Search Error: {error}</p>
            <p className="text-sm text-red-500 mt-1">Please check your authentication and try again.</p>
          </div>
        )}

        {!organizationId && user && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-600">No organization found for your account.</p>
            <p className="text-sm text-yellow-500 mt-1">Please contact your administrator to assign you to an organization.</p>
          </div>
        )}

        {isSearching && (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <span className="text-gray-600">Analyzing candidates...</span>
            </div>
          </div>
        )}

        {searchResult && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Best Matches ({searchResult.candidates?.length || 0})
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                    <p className="text-gray-600 text-base sm:text-lg">AI-powered real-time candidate analysis</p>
                    <SourceBadge source="ai_analysis" confidence={searchResult.search_quality_score || 0.85} />
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
                {searchResult.candidates && searchResult.candidates.length > 0 ? (
                  searchResult.candidates.map((candidate) => (
                    <CandidateCard 
                      key={candidate.id} 
                      candidate={candidate}
                      onViewProfile={setSelectedCandidate}
                      onViewSnapshot={setFootprintCandidate}
                      onContactCandidate={handleContactCandidate}
                      onFeedback={handleFeedback}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No candidates found matching your criteria. Try adjusting your search terms.
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

        {!searchResult && !isSearching && organizationId && <EmptyState />}

        {selectedCandidate && (
          <CandidateDetailsModal 
            candidate={selectedCandidate}
            onClose={() => setSelectedCandidate(null)}
            onFeedback={handleFeedback}
            onContactCandidate={handleContactCandidate}
          />
        )}

        <DigitalFootprintModal
          candidate={footprintCandidate}
          isOpen={!!footprintCandidate}
          onClose={() => setFootprintCandidate(null)}
        />
      </div>
    </ErrorBoundary>
  );
};

export default MindReaderSearch;
