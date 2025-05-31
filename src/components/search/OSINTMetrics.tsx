
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface OSINTMetricsProps {
  candidate: EnhancedCandidate;
}

const OSINTMetrics: React.FC<OSINTMetricsProps> = ({ candidate }) => (
  <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
    <div className="text-center group cursor-pointer">
      <div className="text-xl font-bold text-blue-700 group-hover:text-blue-800 transition-colors">
        {candidate.technical_depth_score.toFixed(1)}
      </div>
      <div className="text-xs text-gray-600 font-medium">Technical Depth</div>
      <Progress value={candidate.technical_depth_score * 10} className="h-2 mt-2 bg-blue-100" />
    </div>
    <div className="text-center group cursor-pointer">
      <div className="text-xl font-bold text-green-700 group-hover:text-green-800 transition-colors">
        {candidate.community_influence_score.toFixed(1)}
      </div>
      <div className="text-xs text-gray-600 font-medium">Community Impact</div>
      <Progress value={candidate.community_influence_score * 10} className="h-2 mt-2 bg-green-100" />
    </div>
    <div className="text-center group cursor-pointer">
      <div className="text-xl font-bold text-purple-700 group-hover:text-purple-800 transition-colors">
        {candidate.learning_velocity_score.toFixed(1)}
      </div>
      <div className="text-xs text-gray-600 font-medium">Learning Velocity</div>
      <Progress value={candidate.learning_velocity_score * 10} className="h-2 mt-2 bg-purple-100" />
    </div>
  </div>
);

export default OSINTMetrics;
