
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface CandidateEngagementHistoryProps {
  candidate: EnhancedCandidate;
}

const CandidateEngagementHistory: React.FC<CandidateEngagementHistoryProps> = ({ candidate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Engagement History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {candidate.interaction_timeline.slice(0, 5).map((interaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm font-medium">{interaction.type}</p>
                <p className="text-xs text-gray-500">
                  {new Date(interaction.timestamp).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {interaction.response_received ? 'Responded' : 'No Response'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateEngagementHistory;
