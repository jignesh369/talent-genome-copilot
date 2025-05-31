
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, SortDesc } from 'lucide-react';
import SimplifiedCandidateCard from './SimplifiedCandidateCard';
import SearchSidebar from './SearchSidebar';
import { SearchResult, EnhancedCandidate } from '@/types/enhanced-candidate';

interface SearchResultsContainerProps {
  searchResult: SearchResult;
  onViewProfile: (candidate: EnhancedCandidate) => void;
  onViewSnapshot: (candidate: EnhancedCandidate) => void;
  onContactCandidate: (candidate: EnhancedCandidate) => void;
  onFeedback: (candidateId: string, isPositive: boolean) => void;
  onRefinementClick: (refinement: string) => void;
}

const SearchResultsContainer: React.FC<SearchResultsContainerProps> = ({
  searchResult,
  onViewProfile,
  onViewSnapshot,
  onContactCandidate,
  onFeedback,
  onRefinementClick
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <div className="xl:col-span-3">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Best Matches ({searchResult.candidates.length})
            </h2>
            <p className="text-gray-600">Ranked by AI relevance and digital footprint analysis</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-200">
              <Filter className="h-4 w-4 mr-2" />
              Refine
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
              <SortDesc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {searchResult.candidates.map((candidate) => (
            <SimplifiedCandidateCard 
              key={candidate.id} 
              candidate={candidate}
              onViewProfile={onViewProfile}
              onViewSnapshot={onViewSnapshot}
              onFeedback={onFeedback}
              onContactCandidate={onContactCandidate}
            />
          ))}
        </div>
      </div>

      <div className="xl:col-span-1">
        <SearchSidebar 
          searchResult={searchResult} 
          onRefinementClick={onRefinementClick}
        />
      </div>
    </div>
  );
};

export default SearchResultsContainer;
