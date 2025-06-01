
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  MapPin, 
  Building2, 
  Calendar, 
  Star, 
  TrendingUp, 
  Users, 
  Code, 
  MessageCircle,
  Phone,
  Mail,
  Linkedin,
  Github
} from "lucide-react";
import { EnhancedCandidate } from "@/types/enhanced-candidate";

interface CandidateDetailsModalProps {
  candidate: EnhancedCandidate | null;
  isOpen?: boolean;
  onClose: () => void;
  onContact?: (candidate: EnhancedCandidate) => void;
  onContactCandidate?: (candidate: EnhancedCandidate) => void;
}

const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({ 
  candidate, 
  isOpen = true,
  onClose,
  onContact,
  onContactCandidate
}) => {
  if (!candidate) return null;

  const osint = candidate.osint_profile;

  return (
    <Dialog open={isOpen && !!candidate} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Candidate Profile</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={candidate.avatar_url} />
              <AvatarFallback className="text-lg">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
              <p className="text-lg text-gray-600">{candidate.current_title}</p>
              <p className="text-gray-500 flex items-center">
                <Building2 className="w-4 h-4 mr-1" />
                {candidate.current_company}
              </p>
              <p className="text-gray-500 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {candidate.location}
              </p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{candidate.match_score}%</div>
              <p className="text-sm text-gray-500">Match Score</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Contact</h3>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>{candidate.email}</span>
              </div>
              {osint?.linkedin?.url && (
                <div className="flex items-center space-x-2 text-sm">
                  <Linkedin className="w-4 h-4" />
                  <a href={osint.linkedin.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {osint?.github?.username && (
                <div className="flex items-center space-x-2 text-sm">
                  <Github className="w-4 h-4" />
                  <a href={`https://github.com/${osint.github.username}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    GitHub Profile
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Experience</h3>
              <p className="text-sm">{candidate.experience_years} years</p>
              <p className="text-sm text-gray-600">
                Status: <Badge variant="outline">{candidate.availability_status}</Badge>
              </p>
            </div>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <h3 className="font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills?.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* AI Summary */}
          {candidate.ai_summary && (
            <>
              <div>
                <h3 className="font-semibold mb-3">AI Summary</h3>
                <p className="text-gray-700 leading-relaxed">{candidate.ai_summary}</p>
              </div>
              <Separator />
            </>
          )}

          {/* Scores */}
          <div>
            <h3 className="font-semibold mb-3">Assessment Scores</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {candidate.technical_depth_score.toFixed(1)}
                </div>
                <p className="text-sm text-gray-600">Technical Depth</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {candidate.community_influence_score.toFixed(1)}
                </div>
                <p className="text-sm text-gray-600">Community Influence</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {candidate.learning_velocity_score.toFixed(1)}
                </div>
                <p className="text-sm text-gray-600">Learning Velocity</p>
              </div>
            </div>
          </div>

          {/* OSINT Data */}
          {osint && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3">Digital Footprint</h3>
                <div className="grid grid-cols-2 gap-4">
                  {osint.github && (
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Github className="w-5 h-5" />
                        <span className="font-medium">GitHub</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>Repositories: {osint.github.repos}</p>
                        <p>Stars: {osint.github.stars}</p>
                        <p>Commits: {osint.github.commits}</p>
                      </div>
                    </div>
                  )}
                  
                  {osint.linkedin && (
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Linkedin className="w-5 h-5" />
                        <span className="font-medium">LinkedIn</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>Connections: {osint.linkedin.connections}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={() => (onContact || onContactCandidate)?.(candidate)}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Candidate
            </Button>
            <Button variant="outline" className="flex-1">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDetailsModal;
