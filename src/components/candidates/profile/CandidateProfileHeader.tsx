
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, MessageSquare, Phone } from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface CandidateProfileHeaderProps {
  candidate: EnhancedCandidate;
  onScheduleInterview: () => void;
}

const CandidateProfileHeader: React.FC<CandidateProfileHeaderProps> = ({
  candidate,
  onScheduleInterview
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-semibold">
              {candidate.first_name[0]}{candidate.last_name[0]}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{candidate.first_name} {candidate.last_name}</h1>
              <p className="text-gray-600">{candidate.current_title}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {candidate.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {candidate.experience_years}+ years
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Badge className="bg-green-100 text-green-800">
              {Math.round(candidate.placement_probability_score)}% Placement Probability
            </Badge>
            <Badge variant="outline">
              Stage: {candidate.pipeline_stage}
            </Badge>
          </div>
        </div>

        <div className="flex space-x-3 mt-4">
          <Button size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message
          </Button>
          <Button size="sm" variant="outline">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
          <Button size="sm" variant="outline" onClick={onScheduleInterview}>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateProfileHeader;
