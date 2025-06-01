import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  MessageCircle, 
  Calendar, 
  Star, 
  MapPin, 
  Briefcase,
  Activity,
  Zap,
  Shield,
  ChevronRight,
  Clock
} from "lucide-react";
import { EnhancedCandidate } from '@/types/enhanced-candidate';

interface EnhancedCandidateCardProps {
  candidate: EnhancedCandidate;
  onViewProfile?: (candidate: EnhancedCandidate) => void;
  onSendMessage?: (candidate: EnhancedCandidate) => void;
  onScheduleInterview?: (candidate: EnhancedCandidate) => void;
  onMoveStage?: (candidate: EnhancedCandidate, stage: string) => void;
}

const EnhancedCandidateCard: React.FC<EnhancedCandidateCardProps> = ({
  candidate,
  onViewProfile,
  onSendMessage,
  onScheduleInterview,
  onMoveStage
}) => {
  const getSourceIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'portal': return '🌐';
      case 'linkedin': return '💼';
      case 'github': return '💻';
      case 'ats': return '📋';
      default: return '📄';
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      'sourced': 'bg-gray-100 text-gray-800',
      'qualified': 'bg-blue-100 text-blue-800',
      'interviewing': 'bg-purple-100 text-purple-800',
      'offer_stage': 'bg-orange-100 text-orange-800',
      'hired': 'bg-green-100 text-green-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const hasActiveAvailabilitySignals = candidate.osint_profile?.availability_signals?.some(signal => 
    signal.signal_type === 'active_job_search' || signal.signal_type === 'career_change'
  ) || false;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                {candidate.first_name?.[0] || candidate.name[0]}{candidate.last_name?.[0] || candidate.name[1] || ''}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg text-gray-900">
                  {candidate.first_name && candidate.last_name ? 
                    `${candidate.first_name} ${candidate.last_name}` : 
                    candidate.name}
                </h3>
                {hasActiveAvailabilitySignals && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <Activity className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{candidate.current_title}</span>
                <span>•</span>
                <span>{candidate.current_company}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{candidate.location}</span>
                <span>•</span>
                <span>{getSourceIcon(candidate.source_details?.type || 'manual')} {candidate.source_details?.type || 'manual'}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge className={getStageColor(candidate.pipeline_stage || 'sourced')}>
              {(candidate.pipeline_stage || 'sourced').replace('_', ' ')}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{candidate.score || candidate.match_score}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AI Summary */}
        {candidate.ai_summary && (
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Zap className="w-4 h-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-800">{candidate.ai_summary}</p>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(candidate.engagement_score || candidate.community_influence_score || 0)}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {Math.round(candidate.engagement_score || candidate.community_influence_score || 0)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">Engagement</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">
              <Activity className="w-3 h-3 mr-1" />
              {Math.round(candidate.placement_probability_score || candidate.match_score || 0)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">Placement</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
              <Shield className="w-3 h-3 mr-1" />
              {Math.round(candidate.cultural_fit_score || candidate.community_influence_score || 0)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">Culture Fit</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {candidate.skills?.slice(0, 4).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {(candidate.skills?.length || 0) > 4 && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                +{(candidate.skills?.length || 0) - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        {(candidate.interaction_timeline?.length || 0) > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Recent Activity</p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                Last contact: {new Date(candidate.last_contact_date || candidate.updated_at || new Date()).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>{candidate.interaction_timeline?.length || 0} interactions</span>
            </div>
          </div>
        )}

        {/* Availability Signals */}
        {(candidate.availability_signals?.length || candidate.osint_profile?.availability_signals?.length || 0) > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Availability Signals</p>
            <div className="flex flex-wrap gap-1">
              {(candidate.availability_signals || candidate.osint_profile?.availability_signals || []).slice(0, 2).map((signal, index) => (
                <Badge key={index} className="text-xs bg-green-100 text-green-800">
                  {signal.signal_type?.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onViewProfile?.(candidate)}
          >
            View Profile
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          <Button 
            size="sm" 
            onClick={() => onSendMessage?.(candidate)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Message
          </Button>
          <Button 
            size="sm" 
            onClick={() => onScheduleInterview?.(candidate)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Interview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCandidateCard;
