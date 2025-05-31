
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle } from 'lucide-react';

interface CandidateJourney {
  candidate_id: string;
  candidate_name: string;
  current_step: number;
  status: 'active' | 'responded' | 'completed' | 'opted_out';
  last_interaction: string;
  total_steps: number;
  response_received: boolean;
}

interface CandidateJourneysTabProps {
  candidateJourneys: CandidateJourney[];
}

const CandidateJourneysTab: React.FC<CandidateJourneysTabProps> = ({ candidateJourneys }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'opted_out': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Candidate Journeys</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {candidateJourneys.map((journey) => (
            <div key={journey.candidate_id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {journey.candidate_name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium">{journey.candidate_name}</div>
                  <div className="text-sm text-gray-600">
                    Step {journey.current_step} of {journey.total_steps} • 
                    Last interaction: {new Date(journey.last_interaction).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24">
                  <Progress value={(journey.current_step / journey.total_steps) * 100} className="h-2" />
                </div>
                <Badge className={getStatusColor(journey.status)}>
                  {journey.status}
                </Badge>
                {journey.response_received && (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateJourneysTab;
