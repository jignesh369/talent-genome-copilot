
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Target, User, Sparkles, ThumbsUp, ThumbsDown, Briefcase } from "lucide-react";
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface CandidateCardProps {
  candidate: EnhancedCandidate;
  onViewProfile: (candidate: EnhancedCandidate) => void;
  onViewSnapshot: (candidate: EnhancedCandidate) => void;
  onContactCandidate: (candidate: EnhancedCandidate) => void;
  onFeedback: (candidateId: string, isPositive: boolean) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onViewProfile, 
  onViewSnapshot, 
  onContactCandidate,
  onFeedback 
}) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-200 cursor-pointer rounded-xl overflow-hidden bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
            <div className="relative flex-shrink-0 self-center sm:self-start">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16 ring-2 ring-purple-100 shadow-md">
                <AvatarImage src={candidate.avatar_url} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 font-bold text-lg">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse mx-auto mt-0.5"></div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {candidate.name}
                </h3>
                <span className="text-sm text-gray-500">@{candidate.handle}</span>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {candidate.match_score}% match
                </Badge>
                <Badge variant="outline" className="text-xs bg-white">
                  {candidate.availability_status}
                </Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Briefcase className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700 font-medium">{candidate.current_title}</span>
                </div>
                <span className="hidden sm:inline text-gray-400">•</span>
                <span className="text-gray-600">{candidate.current_company}</span>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed line-clamp-2">
                  {candidate.ai_summary}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {Math.round(candidate.technical_depth_score || 0)}
                  </div>
                  <div className="text-xs text-gray-500">Technical</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {Math.round(candidate.community_influence_score || 0)}
                  </div>
                  <div className="text-xs text-gray-500">Community</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(candidate.learning_velocity_score || 0)}
                  </div>
                  <div className="text-xs text-gray-500">Learning</div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                {candidate.skills.slice(0, 6).map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs hover:bg-purple-50 hover:border-purple-200 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 6 && (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    +{candidate.skills.length - 6} more
                  </Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500">
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Updated {new Date(candidate.osint_last_fetched).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3" />
                    <span>{candidate.experience_years}+ years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-row lg:flex-col justify-center lg:justify-start space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-4">
            <Button 
              size="sm" 
              className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onViewProfile(candidate);
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="border-purple-200 hover:bg-purple-50 text-purple-700 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onViewSnapshot(candidate);
              }}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Snapshot
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="border-green-200 hover:bg-green-50 text-green-700 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onContactCandidate(candidate);
              }}
            >
              Contact
            </Button>
            
            <div className="flex space-x-1">
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onFeedback(candidate.id, true);
                }}
                className="px-2 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onFeedback(candidate.id, false);
                }}
                className="px-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-all"
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
