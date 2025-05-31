import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Target, User, Radar, Sparkles, ThumbsUp, ThumbsDown, Briefcase, Brain } from "lucide-react";
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import OSINTMetrics from './OSINTMetrics';
import ScoreIndicator from './ScoreIndicator';
import SourceBadge from './SourceBadge';

interface CandidateCardProps {
  candidate: EnhancedCandidate;
  onViewProfile: (candidate: EnhancedCandidate) => void;
  onViewSnapshot: (candidate: EnhancedCandidate) => void;
  onContactCandidate: (candidate: EnhancedCandidate) => void;
  onFeedback: (candidateId: string, feedback: 'positive' | 'negative', reason?: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onViewProfile, 
  onViewSnapshot, 
  onContactCandidate,
  onFeedback 
}) => {
  const getMatchSources = () => {
    const sources = [];
    if (candidate.osint_profile.github) sources.push('github');
    if (candidate.osint_profile.linkedin) sources.push('linkedin');
    if (candidate.osint_profile.stackoverflow) sources.push('stackoverflow');
    return sources;
  };

  return (
    <Card className="group hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-500 border-0 bg-gradient-to-r from-white to-gray-50/50 hover:from-white hover:to-purple-50/30 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] rounded-2xl overflow-hidden">
      <CardContent className="p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 flex-1">
            <div className="relative flex-shrink-0 self-center sm:self-start">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all duration-300 shadow-lg">
                <AvatarImage src={candidate.avatar_url} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 font-bold text-lg">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  {candidate.name}
                </h3>
                <span className="text-sm text-gray-500 font-medium">@{candidate.handle}</span>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-3 py-1 shadow-sm hover:shadow-md transition-shadow">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {candidate.match_score}% match
                </Badge>
                <div className="flex flex-wrap gap-1">
                  {getMatchSources().slice(0, 2).map((source, index) => (
                    <SourceBadge key={index} source={source} size="sm" />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Briefcase className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700 font-semibold">{candidate.current_title}</span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="text-gray-600">{candidate.current_company}</span>
                <Badge variant="outline" className="text-xs font-medium bg-white self-center sm:self-start">
                  {candidate.availability_status}
                </Badge>
              </div>
              
              <div className="mb-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors line-clamp-3 flex-1">
                    {candidate.ai_summary}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-1">
                    <Brain className="h-3 w-3 text-purple-500" />
                    <SourceBadge source="ai_analysis" size="sm" />
                  </div>
                </div>
              </div>
              
              <OSINTMetrics candidate={candidate} />
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                {candidate.skills.slice(0, 6).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs hover:bg-purple-50 hover:border-purple-200 hover:scale-105 transition-all duration-200 cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 6 && (
                  <Badge variant="outline" className="text-xs text-gray-500 hover:bg-gray-50 transition-colors">
                    +{candidate.skills.length - 6} more
                  </Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5 pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-gray-500">
                  <div className="flex items-center space-x-2 hover:text-gray-700 transition-colors">
                    <Clock className="h-3 w-3" />
                    <span>Updated {new Date(candidate.osint_last_fetched).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-gray-700 transition-colors">
                    <Target className="h-3 w-3" />
                    <span>{candidate.experience_years}+ years experience</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center sm:justify-end space-x-4">
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
          
          <div className="flex flex-row lg:flex-col justify-center lg:justify-start space-x-3 lg:space-x-0 lg:space-y-3 lg:ml-6 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:translate-x-4 lg:group-hover:translate-x-0">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onViewProfile(candidate);
              }}
            >
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-purple-200 hover:border-purple-300 text-purple-700 hover:text-purple-800 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onViewSnapshot(candidate);
              }}
            >
              <Radar className="h-4 w-4 mr-2" />
              <Sparkles className="h-3 w-3 mr-1" />
              AI Snapshot
            </Button>
            
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onContactCandidate(candidate);
              }}
            >
              Contact
            </Button>
            
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onFeedback(candidate.id, 'positive');
                }}
                className="px-3 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-200 hover:scale-110"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onFeedback(candidate.id, 'negative');
                }}
                className="px-3 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all duration-200 hover:scale-110"
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

export default CandidateCard;
