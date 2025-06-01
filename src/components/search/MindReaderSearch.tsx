
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
import { useAISearch } from "@/hooks/useSearch";

const MindReaderSearch = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [footprintCandidate, setFootprintCandidate] = useState<EnhancedCandidate | null>(null);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const searchMutation = useAISearch();

  const handleSearch = async () => {
    if (!query.trim()) return;
    await searchMutation.mutateAsync({ query });
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const handleFeedback = (candidateId: string, isPositive: boolean) => {
    console.log('Feedback for candidate:', candidateId, isPositive);
  };

  const handleViewProfile = (candidate: EnhancedCandidate) => {
    setSelectedCandidate(candidate);
  };

  const handleViewSnapshot = (candidate: EnhancedCandidate) => {
    setFootprintCandidate(candidate);
  };

  const searchResult = searchMutation.data;

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10 p-4 sm:p-6">
      <SearchHeader />
      
      <SearchInterface
        query={query}
        setQuery={setQuery}
        isSearching={searchMutation.isPending}
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
                  Best Matches ({searchResult.matches.length})
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                  <p className="text-gray-600 text-base sm:text-lg">Ranked by AI relevance and digital footprint analysis</p>
                  <SourceBadge source="ai_analysis" confidence={0.9} />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  90% confidence
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
              {searchResult.candidates.map((candidate) => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate}
                  onViewProfile={handleViewProfile}
                  onViewSnapshot={handleViewSnapshot}
                  onFeedback={handleFeedback}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <SearchSidebar 
              searchResult={{
                candidates: searchResult.candidates,
                total_found: searchResult.totalResults,
                search_quality_score: searchResult.search_quality_score,
                ai_interpretation: searchResult.ai_interpretation,
                suggested_refinements: searchResult.suggested_refinements,
                diversity_metrics: searchResult.diversity_metrics
              }} 
              onRefinementClick={setQuery}
            />
          </div>
        </div>
      )}

      {!searchResult && !searchMutation.isPending && <EmptyState />}

      {selectedCandidate && (
        <CandidateDetailsModal 
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onFeedback={handleFeedback}
        />
      )}

      <DigitalFootprintModal
        candidate={footprintCandidate}
        isOpen={!!footprintCandidate}
        onClose={() => setFootprintCandidate(null)}
      />
    </div>
  );
};

export default MindReaderSearch;
