
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import SourceBadge from './SourceBadge';
import DataFreshnessIndicator from './DataFreshnessIndicator';

interface OSINTMetricsProps {
  candidate: EnhancedCandidate;
}

const OSINTMetrics: React.FC<OSINTMetricsProps> = ({ candidate }) => {
  const getTechnicalSources = () => {
    const sources = [];
    if (candidate.osint_profile.github) sources.push('github');
    if (candidate.osint_profile.stackoverflow) sources.push('stackoverflow');
    return sources;
  };

  const getCommunitySources = () => {
    const sources = [];
    if (candidate.osint_profile.twitter) sources.push('twitter');
    if (candidate.osint_profile.reddit) sources.push('reddit');
    if (candidate.osint_profile.devto) sources.push('devto');
    return sources;
  };

  const getLearningVelocitySources = () => {
    const sources = [];
    if (candidate.osint_profile.github) sources.push('github');
    if (candidate.osint_profile.kaggle) sources.push('kaggle');
    if (candidate.osint_profile.medium) sources.push('medium');
    return sources;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return { bg: 'bg-green-100', text: 'text-green-700', hover: 'group-hover:text-green-800', progress: 'bg-green-100' };
    if (score >= 6) return { bg: 'bg-blue-100', text: 'text-blue-700', hover: 'group-hover:text-blue-800', progress: 'bg-blue-100' };
    if (score >= 4) return { bg: 'bg-yellow-100', text: 'text-yellow-700', hover: 'group-hover:text-yellow-800', progress: 'bg-yellow-100' };
    return { bg: 'bg-red-100', text: 'text-red-700', hover: 'group-hover:text-red-800', progress: 'bg-red-100' };
  };

  const technicalColor = getScoreColor(candidate.technical_depth_score);
  const communityColor = getScoreColor(candidate.community_influence_score);
  const learningColor = getScoreColor(candidate.learning_velocity_score);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-center group cursor-pointer">
                <div className={`text-xl font-bold ${technicalColor.text} ${technicalColor.hover} transition-colors`}>
                  {candidate.technical_depth_score.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600 font-medium">Technical Depth</div>
                <Progress value={candidate.technical_depth_score * 10} className={`h-2 mt-2 ${technicalColor.progress}`} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-2">
                <p className="font-medium">Technical Depth: {candidate.technical_depth_score.toFixed(1)}/10</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Sources:</p>
                  <div className="flex flex-wrap gap-1">
                    {getTechnicalSources().map((source, index) => (
                      <SourceBadge key={index} source={source} size="sm" showTooltip={false} />
                    ))}
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-center group cursor-pointer">
                <div className={`text-xl font-bold ${communityColor.text} ${communityColor.hover} transition-colors`}>
                  {candidate.community_influence_score.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600 font-medium">Community Impact</div>
                <Progress value={candidate.community_influence_score * 10} className={`h-2 mt-2 ${communityColor.progress}`} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-2">
                <p className="font-medium">Community Impact: {candidate.community_influence_score.toFixed(1)}/10</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Sources:</p>
                  <div className="flex flex-wrap gap-1">
                    {getCommunitySources().map((source, index) => (
                      <SourceBadge key={index} source={source} size="sm" showTooltip={false} />
                    ))}
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-center group cursor-pointer">
                <div className={`text-xl font-bold ${learningColor.text} ${learningColor.hover} transition-colors`}>
                  {candidate.learning_velocity_score.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600 font-medium">Learning Velocity</div>
                <Progress value={candidate.learning_velocity_score * 10} className={`h-2 mt-2 ${learningColor.progress}`} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-2">
                <p className="font-medium">Learning Velocity: {candidate.learning_velocity_score.toFixed(1)}/10</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-600">Sources:</p>
                  <div className="flex flex-wrap gap-1">
                    {getLearningVelocitySources().map((source, index) => (
                      <SourceBadge key={index} source={source} size="sm" showTooltip={false} />
                    ))}
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Last OSINT Update:</span>
        <DataFreshnessIndicator 
          lastUpdated={candidate.osint_last_fetched} 
          platform="osint"
          size="sm"
        />
      </div>
    </div>
  );
};

export default OSINTMetrics;
