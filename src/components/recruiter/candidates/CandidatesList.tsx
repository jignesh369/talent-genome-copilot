
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Candidate } from '@/types/recruiting';
import { Search, Users } from 'lucide-react';
import CandidateCard from './CandidateCard';

interface CandidatesListProps {
  candidates: Candidate[];
}

const CandidatesList: React.FC<CandidatesListProps> = ({ candidates }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Candidate Database ({candidates.length})
          </CardTitle>
          <Button>
            <Search className="w-4 h-4 mr-2" />
            AI Search
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}

          {candidates.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No candidates found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidatesList;
