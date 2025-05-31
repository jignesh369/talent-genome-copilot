
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, Briefcase, Calendar, Star, Github, Linkedin, Twitter,
  ThumbsUp, ThumbsDown, ExternalLink, Mail, Phone, Globe,
  TrendingUp, Users, Award, BookOpen
} from "lucide-react";
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import OSINTMetrics from './OSINTMetrics';
import SourceBadge from './SourceBadge';

interface CandidateDetailsModalProps {
  candidate: EnhancedCandidate;
  onClose: () => void;
  onFeedback: (candidateId: string, feedback: 'positive' | 'negative', reason?: string) => void;
  onContactCandidate?: (candidate: EnhancedCandidate) => void;
}

const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({ 
  candidate, 
  onClose, 
  onFeedback,
  onContactCandidate 
}) => {
  const [feedbackReason, setFeedbackReason] = useState('');

  const handleFeedback = (type: 'positive' | 'negative') => {
    onFeedback(candidate.id, type, feedbackReason || undefined);
    onClose();
  };

  const getSocialLinks = () => {
    const links = [];
    if (candidate.osint_profile.github) {
      links.push({ name: 'GitHub', url: candidate.osint_profile.github, icon: Github });
    }
    if (candidate.osint_profile.linkedin) {
      links.push({ name: 'LinkedIn', url: candidate.osint_profile.linkedin, icon: Linkedin });
    }
    if (candidate.osint_profile.twitter) {
      links.push({ name: 'Twitter', url: candidate.osint_profile.twitter, icon: Twitter });
    }
    return links;
  };

  return (
    <Dialog open={!!candidate} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Candidate Profile</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 p-1">
            {/* Header Section */}
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-purple-100">
                <AvatarImage src={candidate.avatar_url} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 font-bold text-xl">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                  <p className="text-gray-600">@{candidate.handle}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">{candidate.current_title}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{candidate.current_company}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {candidate.match_score}% match
                  </Badge>
                  <Badge variant="outline">
                    {candidate.availability_status}
                  </Badge>
                  <SourceBadge source="ai_analysis" size="sm" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {onContactCandidate && (
                  <Button 
                    onClick={() => onContactCandidate(candidate)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    Contact Candidate
                  </Button>
                )}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleFeedback('positive')}
                    className="hover:bg-green-50 hover:border-green-200"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Good Match
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleFeedback('negative')}
                    className="hover:bg-red-50 hover:border-red-200"
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Poor Match
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* AI Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  AI Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{candidate.ai_summary}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="hover:bg-blue-50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* OSINT Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Digital Footprint Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <OSINTMetrics candidate={candidate} />
              </CardContent>
            </Card>

            {/* Social Links */}
            {getSocialLinks().length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Professional Profiles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getSocialLinks().map((link, index) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">{link.name}</span>
                          <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="text-gray-700">{candidate.location}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <p className="text-gray-700">{candidate.experience_years}+ years</p>
                </CardContent>
              </Card>
            </div>

            {/* Data Freshness */}
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>Profile last updated: {new Date(candidate.osint_last_fetched).toLocaleDateString()}</span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDetailsModal;
