
import React, { useState } from 'react';
import { useSearch } from '@/hooks/useSearch';
import SimplifiedCandidateCard from './SimplifiedCandidateCard';
import CandidateDetailsModal from './CandidateDetailsModal';
import DigitalFootprintModal from './DigitalFootprintModal';
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Clock } from 'lucide-react';

const SearchResultsContainer: React.FC = () => {
  const { searchResult, handleFeedback } = useSearch();
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDigitalFootprint, setShowDigitalFootprint] = useState(false);

  if (!searchResult) {
    return null;
  }

  const { candidates } = searchResult;

  const handleCandidateClick = (candidate: EnhancedCandidate) => {
    setSelectedCandidate(candidate);
    setShowDetailsModal(true);
  };

  const handleViewDigitalFootprint = (candidate: EnhancedCandidate) => {
    setSelectedCandidate(candidate);
    setShowDigitalFootprint(true);
  };

  const handleCloseModals = () => {
    setShowDetailsModal(false);
    setShowDigitalFootprint(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Search Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Search Results Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">Total Found:</span>
              <Badge variant="secondary">{candidates?.length || 0}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Quality Score:</span>
              <Badge variant="secondary">
                {Math.round((searchResult.search_quality_score || 0.85) * 100)}%
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">Status:</span>
              <Badge variant="secondary">Complete</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      {candidates && candidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <SimplifiedCandidateCard
              key={candidate.id}
              candidate={candidate}
              onViewProfile={() => handleCandidateClick(candidate)}
              onViewSnapshot={() => handleViewDigitalFootprint(candidate)}
              onContactCandidate={() => handleCandidateClick(candidate)}
              onFeedback={(candidateId, feedback, reason) => handleFeedback(candidateId, feedback, reason)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Candidates Found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or using different keywords.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      {selectedCandidate && (
        <>
          {showDetailsModal && (
            <CandidateDetailsModal
              candidate={selectedCandidate}
              onClose={handleCloseModals}
              onFeedback={handleFeedback}
              onContactCandidate={() => {}}
            />
          )}
          <DigitalFootprintModal
            candidate={showDigitalFootprint ? selectedCandidate : null}
            isOpen={showDigitalFootprint}
            onClose={handleCloseModals}
          />
        </>
      )}
    </div>
  );
};

export default SearchResultsContainer;
