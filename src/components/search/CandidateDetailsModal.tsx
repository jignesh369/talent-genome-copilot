
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Star, X, ExternalLink, Target, Zap, ThumbsUp, ThumbsDown, Brain, Contact } from "lucide-react";
import { EnhancedCandidate } from "@/types/enhanced-candidate";

interface CandidateDetailsModalProps {
  candidate: EnhancedCandidate;
  onClose: () => void;
  onFeedback: (candidateId: string, isPositive: boolean) => void;
  onViewProfile?: (candidate: EnhancedCandidate) => void;
  onContactCandidate?: (candidate: EnhancedCandidate) => void;
}

const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({ 
  candidate, 
  onClose, 
  onFeedback,
  onViewProfile,
  onContactCandidate
}) => {
  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(candidate);
    } else {
      // Default behavior - open LinkedIn profile if available
      if (candidate.osint_profile.linkedin?.profile_url) {
        window.open(candidate.osint_profile.linkedin.profile_url, '_blank');
      }
    }
  };

  const handleContactCandidate = () => {
    if (onContactCandidate) {
      onContactCandidate(candidate);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-300">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 ring-4 ring-purple-200 shadow-lg">
                  <AvatarImage src={candidate.avatar_url} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-lg font-bold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{candidate.name}</CardTitle>
                  <p className="text-lg text-gray-600 mt-1">{candidate.current_title} at {candidate.current_company}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {candidate.match_score}% match
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      {candidate.availability_status}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                <TabsTrigger value="technical" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Technical</TabsTrigger>
                <TabsTrigger value="career" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Career</TabsTrigger>
                <TabsTrigger value="insights" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold flex items-center mb-3">
                        <Brain className="h-5 w-5 mr-2 text-purple-600" />
                        Summary
                      </h3>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <p className="text-gray-800 leading-relaxed">{candidate.ai_summary}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-3">Bio</h3>
                      <p className="text-gray-600 italic leading-relaxed p-4 bg-gray-50 rounded-xl">"{candidate.bio}"</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold mb-3">Key Metrics</h3>
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(candidate.technical_depth_score || 0)}
                          </div>
                          <div className="text-sm text-gray-600">Technical Depth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {Math.round(candidate.community_influence_score || 0)}
                          </div>
                          <div className="text-sm text-gray-600">Community Impact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {Math.round(candidate.learning_velocity_score || 0)}
                          </div>
                          <div className="text-sm text-gray-600">Learning Velocity</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-3">Contact Preferences</h3>
                      <div className="space-y-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-700">Best Method:</span>
                          <Badge variant="outline">{candidate.best_contact_method.platform}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-700">Approach Style:</span>
                          <span className="text-gray-600">{candidate.best_contact_method.approach_style}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-700">Best Time:</span>
                          <span className="text-gray-600">{candidate.best_contact_method.best_time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="px-3 py-1 hover:bg-purple-50 hover:border-purple-200 transition-colors cursor-pointer"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-4">Cultural Fit Assessment</h3>
                  
                  <div className="space-y-4">
                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium flex items-center">
                          <Target className="h-4 w-4 mr-2 text-green-600" />
                          Relevance Factors
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {candidate.relevance_factors.map((factor, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{factor.factor}</span>
                                <span className="text-xs text-gray-500">{(factor.weight * 100).toFixed(0)}% weight</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{factor.evidence}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-purple-600" />
                          Cultural Fit Assessment
                        </h4>
                      </div>
                      <div className="space-y-3">
                        {candidate.cultural_fit_indicators.map((indicator, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium capitalize">
                                {indicator.aspect.replace('_', ' ')}
                              </span>
                              <span className="text-sm text-gray-600">
                                {indicator.score.toFixed(1)}/10
                              </span>
                            </div>
                            <Progress value={indicator.score * 10} className="h-2 mb-2" />
                            <div className="space-y-1">
                              {indicator.evidence.map((evidence, evidenceIndex) => (
                                <p key={evidenceIndex} className="text-xs text-gray-600">
                                  • {evidence}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Technical details coming soon...</p>
                </div>
              </TabsContent>

              <TabsContent value="career" className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Career timeline coming soon...</p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onFeedback(candidate.id, true)}
                  className="hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Good Match
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onFeedback(candidate.id, false)}
                  className="hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Poor Match
                </Button>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  onClick={handleViewProfile}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Profile
                </Button>
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all" 
                  size="sm"
                  onClick={handleContactCandidate}
                >
                  <Contact className="h-4 w-4 mr-2" />
                  Contact Candidate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;
