
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Filter, SortDesc } from "lucide-react";
import { SearchResult } from "@/types/recruiting";
import { EnhancedCandidate } from "@/types/enhanced-candidate";
import CandidateCard from "./CandidateCard";
import SearchSidebar from "./SearchSidebar";
import SourceBadge from "./SourceBadge";

interface SearchResultsContainerProps {
  searchResult: SearchResult;
  onViewProfile: (candidate: EnhancedCandidate) => void;
  onViewSnapshot: (candidate: EnhancedCandidate) => void;
  onFeedback: (candidateId: string, helpful: boolean) => void;
  onRefinementClick: (query: string) => void;
}

const SearchResultsContainer: React.FC<SearchResultsContainerProps> = ({
  searchResult,
  onViewProfile,
  onViewSnapshot,
  onFeedback,
  onRefinementClick
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
      <div className="lg:col-span-3 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Best Matches ({searchResult.candidates.length})
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
              <p className="text-gray-600 text-base sm:text-lg">Ranked by AI relevance and digital footprint analysis</p>
              <SourceBadge source="ai_analysis" confidence={searchResult.search_quality_score} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              {Math.round(searchResult.search_quality_score * 100)}% confidence
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
              onViewProfile={onViewProfile}
              onViewSnapshot={onViewSnapshot}
              onFeedback={onFeedback}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <SearchSidebar 
          searchResult={searchResult} 
          onRefinementClick={onRefinementClick}
        />
      </div>
    </div>
  );
};

export default SearchResultsContainer;
