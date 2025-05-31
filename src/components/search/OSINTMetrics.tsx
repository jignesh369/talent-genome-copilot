
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
    if (score >= 8) return { bg: 'bg-green-100', text: 'text-green-700', hover: 'group-hover:text-green-800', progress: 'bg-green-500' };
    if (score >= 6) return { bg: 'bg-blue-100', text: 'text-blue-700', hover: 'group-hover:text-blue-800', progress: 'bg-blue-500' };
    if (score >= 4) return { bg: 'bg-yellow-100', text: 'text-yellow-700', hover: 'group-hover:text-yellow-800', progress: 'bg-yellow-500' };
    return { bg: 'bg-red-100', text: 'text-red-700', hover: 'group-hover:text-red-800', progress: 'bg-red-500' };
  };

  const technicalColor = getScoreColor(candidate.technical_depth_score);
  const communityColor = getScoreColor(candidate.community_influence_score);
  const learningColor = getScoreColor(candidate.learning_velocity_score);

  const MetricCard = ({ 
    score, 
    label, 
    sources, 
    color 
  }: { 
    score: number; 
    label: string; 
    sources: string[]; 
    color: ReturnType<typeof getScoreColor> 
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="text-center group cursor-pointer">
          <div className={`text-lg sm:text-xl font-bold ${color.text} ${color.hover} transition-colors`}>
            {score.toFixed(1)}
          </div>
          <div className="text-xs text-gray-600 font-medium">{label}</div>
          <Progress 
            value={score * 10} 
            className="h-2 mt-2"
            style={{
              background: color.bg.replace('bg-', ''),
            }}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-2">
          <p className="font-medium">{label}: {score.toFixed(1)}/10</p>
          <div className="space-y-1">
            <p className="text-xs text-gray-600">Sources:</p>
            <div className="flex flex-wrap gap-1">
              {sources.map((source, index) => (
                <SourceBadge key={index} source={source} size="sm" showTooltip={false} />
              ))}
            </div>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className="space-y-3">
      <TooltipProvider>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
          <MetricCard
            score={candidate.technical_depth_score}
            label="Technical Depth"
            sources={getTechnicalSources()}
            color={technicalColor}
          />
          
          <MetricCard
            score={candidate.community_influence_score}
            label="Community Impact"
            sources={getCommunitySources()}
            color={communityColor}
          />
          
          <MetricCard
            score={candidate.learning_velocity_score}
            label="Learning Velocity"
            sources={getLearningVelocitySources()}
            color={learningColor}
          />
        </div>
      </TooltipProvider>
      
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
