
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { X, Brain, Target, Zap, Shield, TrendingUp, Users, Code } from "lucide-react";
import { EnhancedCandidate } from "@/types/enhanced-candidate";
import SourceBadge from "./SourceBadge";
import SourceAttribution from "./SourceAttribution";

interface DigitalFootprintModalProps {
  candidate: EnhancedCandidate | null;
  isOpen: boolean;
  onClose: () => void;
}

const DigitalFootprintModal: React.FC<DigitalFootprintModalProps> = ({ 
  candidate, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen || !candidate) return null;

  const getSnapshotSources = () => [
    { platform: 'ai_analysis', confidence: 0.95, lastUpdated: new Date().toISOString(), verified: true },
    { platform: 'github', confidence: 0.92, lastUpdated: candidate.osint_last_fetched, verified: true },
    { platform: 'stackoverflow', confidence: 0.88, lastUpdated: candidate.osint_last_fetched, verified: true },
    { platform: 'linkedin', confidence: 0.90, lastUpdated: candidate.osint_last_fetched, verified: true }
  ];

  const getSkillRadarData = () => [
    { category: 'Frontend Development', score: candidate.technical_depth_score * 0.9, max: 10 },
    { category: 'Backend Development', score: candidate.technical_depth_score * 0.8, max: 10 },
    { category: 'Machine Learning', score: candidate.technical_depth_score * 0.7, max: 10 },
    { category: 'DevOps', score: candidate.technical_depth_score * 0.6, max: 10 },
    { category: 'Leadership', score: candidate.community_influence_score * 0.8, max: 10 },
    { category: 'Communication', score: candidate.community_influence_score * 0.9, max: 10 }
  ];

  const achievements = [
    { title: 'Open Source Contributor', description: 'Active in multiple open source projects', icon: Code, color: 'blue' },
    { title: 'Top Performer', description: 'Consistently high-quality work', icon: TrendingUp, color: 'green' },
    { title: 'Community Builder', description: 'Strong community engagement', icon: Users, color: 'purple' },
    { title: 'Innovation Leader', description: 'Drives technical innovation', icon: Zap, color: 'orange' }
  ];

  const riskSignals = [
    { type: 'Low Activity', severity: 'low', description: 'Reduced GitHub activity in last 3 months', recommendation: 'Verify current engagement levels' }
  ];

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
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-purple-600" />
                    AI Digital Footprint Snapshot
                  </CardTitle>
                  <p className="text-lg text-gray-600 mt-1">{candidate.name}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <SourceBadge source="ai_analysis" confidence={0.95} />
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Real-time Analysis
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

          <CardContent className="p-8 space-y-8">
            {/* AI Summary */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  AI Analysis Summary
                </h3>
                <SourceBadge source="ai_analysis" confidence={0.95} />
              </div>
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <p className="text-gray-800 leading-relaxed">{candidate.ai_summary}</p>
              </div>
            </div>

            {/* Skill Radar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Skill Assessment
                </h3>
                <div className="flex space-x-1">
                  <SourceBadge source="github" size="sm" />
                  <SourceBadge source="stackoverflow" size="sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {getSkillRadarData().map((skill, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{skill.category}</span>
                      <span className="text-sm text-gray-600">{skill.score.toFixed(1)}/{skill.max}</span>
                    </div>
                    <Progress value={(skill.score / skill.max) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Badges */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-orange-600" />
                  Achievement Badges
                </h3>
                <SourceBadge source="ai_analysis" size="sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${achievement.color}-100`}>
                        <achievement.icon className={`h-5 w-5 text-${achievement.color}-600`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Signals */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-red-600" />
                  Risk Assessment
                </h3>
                <SourceBadge source="ai_analysis" size="sm" />
              </div>
              <div className="space-y-3">
                {riskSignals.map((risk, index) => (
                  <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            {risk.severity.toUpperCase()}
                          </Badge>
                          <span className="font-medium text-gray-900">{risk.type}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          <strong>Recommendation:</strong> {risk.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Source Attribution */}
            <SourceAttribution 
              sources={getSnapshotSources()} 
              title="Digital Footprint Data Sources"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalFootprintModal;
