
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Eye, User, Contact } from "lucide-react";
import { EnhancedCandidate } from "@/types/enhanced-candidate";

interface SimplifiedCandidateCardProps {
  candidate: EnhancedCandidate;
  onViewDetails: (candidate: EnhancedCandidate) => void;
  onViewProfile?: (candidate: EnhancedCandidate) => void;
  onContactCandidate?: (candidate: EnhancedCandidate) => void;
}

const SimplifiedCandidateCard: React.FC<SimplifiedCandidateCardProps> = ({
  candidate,
  onViewDetails,
  onViewProfile,
  onContactCandidate
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar_url} />
              <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {candidate.name}
                </h3>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {candidate.match_score}% match
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {candidate.availability_status}
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-3">
                {candidate.current_title} at {candidate.current_company}
              </p>
              
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {candidate.bio}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{candidate.technical_depth_score}</div>
                  <div className="text-xs text-gray-500">Technical Depth</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{candidate.community_influence_score}</div>
                  <div className="text-xs text-gray-500">Community Impact</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{candidate.learning_velocity_score}</div>
                  <div className="text-xs text-gray-500">Learning Velocity</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {candidate.skills.slice(0, 6).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{candidate.skills.length - 6} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{candidate.experience_years}+ years experience</span>
                <span>{candidate.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 ml-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(candidate)}
              className="whitespace-nowrap"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            {onViewProfile && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onViewProfile(candidate)}
                className="whitespace-nowrap"
              >
                <User className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            )}
            {onContactCandidate && (
              <Button 
                size="sm" 
                onClick={() => onContactCandidate(candidate)}
                className="whitespace-nowrap bg-purple-600 hover:bg-purple-700"
              >
                <Contact className="h-4 w-4 mr-2" />
                Contact
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimplifiedCandidateCard;
