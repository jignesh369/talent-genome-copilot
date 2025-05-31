
import React, { useState } from 'react';
import { useCandidates } from '@/hooks/useCandidates';
import { CandidateSearch } from '@/types/recruiting';
import CandidateStatsGrid from './candidates/CandidateStatsGrid';
import CandidateSearchFilters from './candidates/CandidateSearchFilters';
import CandidatesList from './candidates/CandidatesList';

const CandidatesManagement: React.FC = () => {
  const { candidates, loading, searchCandidates, updateCandidate } = useCandidates();
  const [searchParams, setSearchParams] = useState<CandidateSearch>({});

  const handleSearch = (newParams: Partial<CandidateSearch>) => {
    const updatedParams = { ...searchParams, ...newParams };
    setSearchParams(updatedParams);
    searchCandidates(updatedParams);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading candidates...</div>;
  }

  return (
    <div className="space-y-6">
      <CandidateStatsGrid candidates={candidates} />
      
      <div className="space-y-4">
        <CandidateSearchFilters 
          searchParams={searchParams}
          onSearch={handleSearch}
        />
        <CandidatesList candidates={candidates} />
      </div>
    </div>
  );
};

export default CandidatesManagement;
