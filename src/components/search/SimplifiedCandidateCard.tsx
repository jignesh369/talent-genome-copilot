
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Target, User, Radar, Sparkles, ThumbsUp, ThumbsDown, Briefcase, Brain, Contact } from "lucide-react";
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import OSINTMetrics from './OSINTMetrics';
import ScoreIndicator from './ScoreIndicator';
import SourceBadge from './SourceBadge';

interface SimplifiedCandidateCardProps {
  candidate: EnhancedCandidate;
  onViewProfile: (candidate: EnhancedCandidate) => void;
  onViewSnapshot: (candidate: EnhancedCandidate) => void;
  onFeedback: (candidateId: string, isPositive: boolean) => void;
  onContactCandidate: (candidate: EnhancedCandidate) => void;
}

const SimplifiedCandidateCard: React.FC<SimplifiedCandidateCardProps> = ({ 
  candidate, 
  onViewProfile, 
  onViewSnapshot, 
  onFeedback,
  onContactCandidate
}) => {
  const getMatchSources = () => {
    const sources = [];
    if (candidate.osint_profile.github) sources.push('github');
    if (candidate.osint_profile.linkedin) sources.push('linkedin');
    if (candidate.osint_profile.stackoverflow) sources.push('stackoverflow');
    return sources;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-6">
          {/* Left Section - Profile Info */}
          <div className="flex items-start space-x-4 flex-1">
            <Avatar className="h-16 w-16 ring-2 ring-purple-100">
              <AvatarImage src={candidate.avatar_url} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 font-bold">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              {/* Name and Match Score */}
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {candidate.match_score}% match
                </Badge>
                <span className="text-sm text-gray-500">@{candidate.handle}</span>
              </div>
              
              {/* Job Title and Company */}
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700 font-medium">{candidate.current_title}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{candidate.current_company}</span>
                <Badge variant="outline" className="text-xs bg-white">
                  {candidate.availability_status}
                </Badge>
              </div>
              
              {/* AI Summary */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed line-clamp-2">
                  {candidate.ai_summary}
                </p>
              </div>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {candidate.skills.slice(0, 5).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 5 && (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    +{candidate.skills.length - 5} more
                  </Badge>
                )}
              </div>

              {/* Metrics and Meta Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Updated {new Date(candidate.osint_last_fetched).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    <span>{candidate.experience_years}+ years</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ScoreIndicator 
                    score={candidate.technical_depth_score} 
                    label="Tech" 
                    color="blue"
                    sources={['github', 'stackoverflow']}
                  />
                  <ScoreIndicator 
                    score={candidate.community_influence_score} 
                    label="Community" 
                    color="green"
                    sources={['twitter', 'reddit', 'devto']}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - Actions */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            <Button 
              size="sm" 
              variant="outline"
              className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={() => onViewProfile(candidate)}
            >
              <User className="h-4 w-4 mr-2" />
              View Full Profile
            </Button>
            
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={() => onContactCandidate(candidate)}
            >
              <Contact className="h-4 w-4 mr-2" />
              Contact Candidate
            </Button>
            
            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onFeedback(candidate.id, true)}
                className="px-3 hover:bg-green-50 hover:border-green-200"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onFeedback(candidate.id, false)}
                className="px-3 hover:bg-red-50 hover:border-red-200"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimplifiedCandidateCard;
