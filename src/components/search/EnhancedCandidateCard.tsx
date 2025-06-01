
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Building2, 
  Star, 
  TrendingUp, 
  MessageCircle, 
  Eye,
  GitBranch,
  Linkedin,
  Github
} from 'lucide-react';
import { CandidateJobMatch } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';

interface EnhancedCandidateCardProps {
  match: CandidateJobMatch;
  onViewDetails: () => void;
  onViewDigitalFootprint: () => void;
  onContact: () => void;
}

const EnhancedCandidateCard: React.FC<EnhancedCandidateCardProps> = ({
  match,
  onViewDetails,
  onViewDigitalFootprint,
  onContact,
}) => {
  const candidate = match.enhanced_candidates;
  if (!candidate) return null;

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRecommendationBadge = (strength: string) => {
    const colors = {
      exceptional: 'bg-green-100 text-green-800',
      strong: 'bg-blue-100 text-blue-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      weak: 'bg-red-100 text-red-800',
    };
    return colors[strength as keyof typeof colors] || colors.moderate;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatar_url || ''} alt={candidate.name} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                {candidate.handle && (
                  <span className="text-sm text-gray-500">@{candidate.handle}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                {candidate.current_title && (
                  <span className="font-medium">{candidate.current_title}</span>
                )}
                {candidate.current_company && (
                  <>
                    <span>at</span>
                    <span className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      {candidate.current_company}
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                {candidate.location && (
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {candidate.location}
                  </span>
                )}
                <span>{candidate.experience_years} years exp</span>
                <Badge 
                  variant="outline" 
                  className={cn("capitalize", 
                    candidate.availability_status === 'active' ? 'text-green-600' :
                    candidate.availability_status === 'passive' ? 'text-blue-600' : 
                    'text-red-600'
                  )}
                >
                  {candidate.availability_status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className={cn(
              "text-2xl font-bold mb-1 px-3 py-1 rounded-lg",
              getMatchColor(match.overall_match_score)
            )}>
              {match.overall_match_score}%
            </div>
            <Badge className={getRecommendationBadge(match.recommendation_strength)}>
              {match.recommendation_strength}
            </Badge>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 6).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {/* AI Summary */}
        {candidate.ai_summary && (
          <div className="mb-4">
            <p className="text-sm text-gray-700 line-clamp-2">{candidate.ai_summary}</p>
          </div>
        )}

        {/* Scores */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-sm font-medium">Technical</span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {candidate.technical_depth_score.toFixed(1)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-yellow-600 mr-1" />
              <span className="text-sm font-medium">Influence</span>
            </div>
            <div className="text-lg font-bold text-yellow-600">
              {candidate.community_influence_score.toFixed(1)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <GitBranch className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm font-medium">Learning</span>
            </div>
            <div className="text-lg font-bold text-green-600">
              {candidate.learning_velocity_score.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Match Explanation */}
        {match.match_explanation && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">{match.match_explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onViewDetails}>
              <Eye className="w-4 h-4 mr-1" />
              Details
            </Button>
            <Button variant="outline" size="sm" onClick={onViewDigitalFootprint}>
              <Github className="w-4 h-4 mr-1" />
              OSINT
            </Button>
          </div>
          
          <Button onClick={onContact} size="sm">
            <MessageCircle className="w-4 h-4 mr-1" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCandidateCard;
