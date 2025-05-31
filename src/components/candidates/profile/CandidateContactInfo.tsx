
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface CandidateContactInfoProps {
  candidate: EnhancedCandidate;
}

const CandidateContactInfo: React.FC<CandidateContactInfoProps> = ({ candidate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-3 text-gray-400" />
          <span className="text-sm">{candidate.email}</span>
        </div>
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-3 text-gray-400" />
          <span className="text-sm">{candidate.phone || 'Not provided'}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-3 text-gray-400" />
          <span className="text-sm">{candidate.location}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateContactInfo;
