
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, MessageSquare, Twitter, Users, Globe, Brain } from "lucide-react";

interface SourceBadgeProps {
  source: string;
  confidence?: number;
  lastUpdated?: string;
  size?: 'sm' | 'default';
  showTooltip?: boolean;
}

const SourceBadge: React.FC<SourceBadgeProps> = ({ 
  source, 
  confidence, 
  lastUpdated, 
  size = 'default',
  showTooltip = true 
}) => {
  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'github': return <Github className="h-3 w-3" />;
      case 'stackoverflow': return <MessageSquare className="h-3 w-3" />;
      case 'twitter': return <Twitter className="h-3 w-3" />;
      case 'linkedin': return <Users className="h-3 w-3" />;
      case 'ai_analysis': return <Brain className="h-3 w-3" />;
      default: return <Globe className="h-3 w-3" />;
    }
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'bg-gray-100 text-gray-800';
    if (confidence >= 0.8) return 'bg-green-100 text-green-800 border-green-200';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const badge = (
    <Badge 
      variant="outline" 
      className={`${getConfidenceColor(confidence)} ${size === 'sm' ? 'text-xs px-2 py-1' : ''} flex items-center space-x-1`}
    >
      {getSourceIcon(source)}
      <span className="capitalize">{source.replace('_', ' ')}</span>
      {confidence && <span className="ml-1 text-xs">({Math.round(confidence * 100)}%)</span>}
    </Badge>
  );

  if (!showTooltip) return badge;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">Source: {source.replace('_', ' ')}</p>
            {confidence && <p>Confidence: {Math.round(confidence * 100)}%</p>}
            {lastUpdated && <p>Updated: {new Date(lastUpdated).toLocaleDateString()}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SourceBadge;
