
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CandidateSearch } from '@/types/recruiting';
import { Search, Filter } from 'lucide-react';

interface CandidateSearchFiltersProps {
  searchParams: CandidateSearch;
  onSearch: (newParams: Partial<CandidateSearch>) => void;
}

const CandidateSearchFilters: React.FC<CandidateSearchFiltersProps> = ({ 
  searchParams, 
  onSearch 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Input
        placeholder="Search candidates..."
        value={searchParams.query || ''}
        onChange={(e) => onSearch({ query: e.target.value })}
      />
      
      <Select 
        value={searchParams.status || 'all'} 
        onValueChange={(value) => onSearch({ status: value === 'all' ? undefined : value })}
      >
        <SelectTrigger>
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="screening">Screening</SelectItem>
          <SelectItem value="interviewing">Interviewing</SelectItem>
          <SelectItem value="offer">Offer</SelectItem>
          <SelectItem value="hired">Hired</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={searchParams.sort_by || 'score'} 
        onValueChange={(value) => onSearch({ sort_by: value as any })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="score">Score</SelectItem>
          <SelectItem value="date">Date Applied</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="relevance">Relevance</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline">
        Advanced Filters
      </Button>
    </div>
  );
};

export default CandidateSearchFilters;
