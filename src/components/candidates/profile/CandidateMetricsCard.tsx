
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EnhancedCandidate } from '@/types/enhanced-recruiting';

interface CandidateMetricsCardProps {
  candidate: EnhancedCandidate;
}

const CandidateMetricsCard: React.FC<CandidateMetricsCardProps> = ({ candidate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Engagement Score</span>
            <span className="text-sm font-medium">{candidate.engagement_score}%</span>
          </div>
          <Progress value={candidate.engagement_score} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Cultural Fit</span>
            <span className="text-sm font-medium">{candidate.cultural_fit_score}/100</span>
          </div>
          <Progress value={candidate.cultural_fit_score} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Portal Activity</span>
            <span className="text-sm font-medium">{candidate.portal_activity_score}%</span>
          </div>
          <Progress value={candidate.portal_activity_score} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateMetricsCard;
