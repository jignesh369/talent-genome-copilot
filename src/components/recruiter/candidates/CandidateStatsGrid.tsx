
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { Candidate } from '@/types/recruiting';

interface CandidateStatsGridProps {
  candidates: Candidate[];
}

const CandidateStatsGrid: React.FC<CandidateStatsGridProps> = ({ candidates }) => {
  const statusCounts = {
    total: candidates.length,
    new: candidates.filter(c => c.status === 'new').length,
    screening: candidates.filter(c => c.status === 'screening').length,
    interviewing: candidates.filter(c => c.status === 'interviewing').length,
    offer: candidates.filter(c => c.status === 'offer').length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Candidates</p>
              <p className="text-2xl font-bold">{statusCounts.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Applications</p>
              <p className="text-2xl font-bold">{statusCounts.new}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">New</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Screening</p>
              <p className="text-2xl font-bold">{statusCounts.screening}</p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800">Screening</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Interviewing</p>
              <p className="text-2xl font-bold">{statusCounts.interviewing}</p>
            </div>
            <Badge className="bg-purple-100 text-purple-800">Interview</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Offers Made</p>
              <p className="text-2xl font-bold">{statusCounts.offer}</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Offer</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateStatsGrid;
