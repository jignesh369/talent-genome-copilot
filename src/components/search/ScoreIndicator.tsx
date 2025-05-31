
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import SourceBadge from './SourceBadge';

interface ScoreIndicatorProps {
  score: number;
  label: string;
  color?: string;
  sources?: string[];
  confidence?: number;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ 
  score, 
  label, 
  color = "blue",
  sources = [],
  confidence 
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center space-x-2 group cursor-pointer">
          <div className={`w-3 h-3 rounded-full transition-all duration-200 group-hover:scale-110 ${
            color === 'blue' ? 'bg-blue-500' : 
            color === 'green' ? 'bg-green-500' : 
            color === 'purple' ? 'bg-purple-500' : 'bg-gray-500'
          }`}></div>
          <span className="text-xs text-gray-600 font-medium">{label}</span>
          <span className="text-xs font-bold text-gray-800">{score.toFixed(1)}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="space-y-2">
          <p className="font-medium">{label}: {score.toFixed(1)}/10</p>
          {confidence && <p>Confidence: {Math.round(confidence * 100)}%</p>}
          {sources.length > 0 && (
            <div>
              <p className="text-xs text-gray-600 mb-1">Sources:</p>
              <div className="flex flex-wrap gap-1">
                {sources.map((source, index) => (
                  <SourceBadge key={index} source={source} size="sm" showTooltip={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default ScoreIndicator;
