
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown } from "lucide-react";
import { SearchResult, EnhancedCandidate } from '@/types/enhanced-candidate';
import CandidateCard from './CandidateCard';
import SearchSidebar from './SearchSidebar';

interface EnhancedSearchResultsProps {
  searchResult: SearchResult;
  onViewCandidate: (candidate: EnhancedCandidate) => void;
  onContactCandidate: (candidate: EnhancedCandidate) => void;
  onFeedback?: (candidateId: string, isPositive: boolean) => void;
}

const EnhancedSearchResults: React.FC<EnhancedSearchResultsProps> = ({
  searchResult,
  onViewCandidate,
  onContactCandidate,
  onFeedback = () => {}
}) => {
  const handleRefinementClick = (refinement: string) => {
    console.log('Refinement clicked:', refinement);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Best Matches ({searchResult.candidates.length})
                </CardTitle>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" className="hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Refine
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-gray-50">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>
            
            <p className="text-gray-600 mt-2">
              Ranked by relevance and digital footprint analysis
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              {searchResult.candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onViewProfile={onViewCandidate}
                  onViewSnapshot={onViewCandidate}
                  onContactCandidate={onContactCandidate}
                  onFeedback={onFeedback}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <SearchSidebar 
          searchResult={searchResult}
          onRefinementClick={handleRefinementClick}
        />
      </div>
    </div>
  );
};

export default EnhancedSearchResults;
