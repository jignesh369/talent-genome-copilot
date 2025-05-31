
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Shield, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Award,
  Users,
  BookOpen,
  Lightbulb,
  Clock,
  Brain
} from "lucide-react";
import { EnhancedCandidate } from '@/types/enhanced-candidate';
import { DigitalFootprintSnapshot } from '@/types/digital-footprint';
import { digitalFootprintService } from '@/services/digitalFootprintService';
import { useToast } from "@/hooks/use-toast";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Legend
} from 'recharts';

interface DigitalFootprintModalProps {
  candidate: EnhancedCandidate;
  isOpen: boolean;
  onClose: () => void;
}

const DigitalFootprintModal: React.FC<DigitalFootprintModalProps> = ({
  candidate,
  isOpen,
  onClose
}) => {
  const [snapshot, setSnapshot] = useState<DigitalFootprintSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && candidate) {
      generateSnapshot();
    }
  }, [isOpen, candidate]);

  const generateSnapshot = async () => {
    setIsLoading(true);
    try {
      const result = await digitalFootprintService.generateSnapshot(candidate);
      setSnapshot(result);
    } catch (error) {
      console.error('Failed to generate snapshot:', error);
      toast({
        title: "Error",
        description: "Failed to generate digital footprint snapshot",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBadgeIcon = (iconType: string) => {
    switch (iconType) {
      case 'open-source': return <BookOpen className="h-4 w-4" />;
      case 'top-performer': return <Target className="h-4 w-4" />;
      case 'thought-leader': return <Lightbulb className="h-4 w-4" />;
      case 'community-builder': return <Users className="h-4 w-4" />;
      case 'innovation': return <Zap className="h-4 w-4" />;
      case 'mentorship': return <Award className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getBadgeColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low': return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRiskColorClasses = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-50 border-red-200 text-red-900';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'low': return 'bg-blue-50 border-blue-200 text-blue-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Digital Footprint Snapshot</CardTitle>
                  <p className="text-gray-600">{candidate.name} - {candidate.current_title}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {snapshot && (
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {Math.round(snapshot.confidence_score * 100)}% Confidence
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-600">Analyzing digital footprint...</p>
                  <p className="text-sm text-gray-500">Scanning GitHub, LinkedIn, Twitter, and more</p>
                </div>
              </div>
            ) : snapshot ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills Radar</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-600" />
                      AI-Generated Summary
                    </h3>
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
                      <CardContent className="p-4">
                        <p className="text-gray-800 leading-relaxed">{snapshot.ai_summary}</p>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-blue-200">
                          <span className="text-sm text-gray-600">
                            Generated {new Date(snapshot.last_generated).toLocaleString()}
                          </span>
                          <Badge variant="outline" className="bg-white">
                            AI Analysis
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Award className="h-4 w-4 mr-2 text-green-600" />
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {snapshot.achievement_badges.slice(0, 3).map((badge) => (
                          <div key={badge.id} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{badge.title}</span>
                          </div>
                        ))}
                        {snapshot.achievement_badges.length === 0 && (
                          <p className="text-sm text-gray-500 italic">No notable achievements detected</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                        Areas of Attention
                      </h4>
                      <div className="space-y-2">
                        {snapshot.risk_signals.slice(0, 3).map((risk, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {getRiskIcon(risk.severity)}
                            <span className="text-sm">{risk.title}</span>
                          </div>
                        ))}
                        {snapshot.risk_signals.length === 0 && (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-700">No significant risks detected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-600" />
                      Skills Radar Chart
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <ResponsiveContainer width="100%" height={300}>
                            <RadarChart data={snapshot.skill_radar.categories}>
                              <PolarGrid />
                              <PolarAngleAxis 
                                dataKey="category" 
                                tick={{ fontSize: 12 }}
                                className="text-gray-600"
                              />
                              <PolarRadiusAxis 
                                angle={0} 
                                domain={[0, snapshot.skill_radar.max_score]} 
                                tick={{ fontSize: 10 }}
                                tickCount={6}
                              />
                              <Radar
                                name="Skill Level"
                                dataKey="score"
                                stroke="#8b5cf6"
                                fill="#8b5cf6"
                                fillOpacity={0.3}
                                strokeWidth={2}
                              />
                              <Legend />
                            </RadarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>

                      <div className="space-y-4">
                        <h4 className="font-medium">Skill Breakdown</h4>
                        {snapshot.skill_radar.categories.map((category, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{category.category}</span>
                              <span className="text-sm text-gray-600">
                                {category.score.toFixed(1)}/{category.max_score}
                              </span>
                            </div>
                            <Progress value={(category.score / category.max_score) * 100} className="h-2" />
                            <p className="text-xs text-gray-500">
                              Evidence: {category.evidence.join(', ')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Award className="h-5 w-5 mr-2 text-green-600" />
                      Achievement Badges
                    </h3>
                    
                    {snapshot.achievement_badges.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {snapshot.achievement_badges.map((badge) => (
                          <Card key={badge.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-lg ${getBadgeColorClasses(badge.color)}`}>
                                  {getBadgeIcon(badge.icon)}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{badge.title}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                                  <p className="text-xs text-gray-500">
                                    <strong>Evidence:</strong> {badge.evidence}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="bg-gray-50">
                        <CardContent className="p-8 text-center">
                          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h4 className="font-medium text-gray-600 mb-2">No Badges Earned Yet</h4>
                          <p className="text-sm text-gray-500">
                            This candidate hasn't met the criteria for any achievement badges based on available data.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="risks" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                      Risk Analysis
                    </h3>
                    
                    {snapshot.risk_signals.length > 0 ? (
                      <div className="space-y-4">
                        {snapshot.risk_signals.map((risk, index) => (
                          <Card key={index} className={`border ${getRiskColorClasses(risk.severity)}`}>
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getRiskIcon(risk.severity)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h4 className="font-semibold">{risk.title}</h4>
                                    <Badge variant="outline" className="text-xs">
                                      {risk.severity} risk
                                    </Badge>
                                  </div>
                                  <p className="text-sm mb-2">{risk.description}</p>
                                  <div className="space-y-1">
                                    <p className="text-sm">
                                      <strong>Recommendation:</strong> {risk.recommendation}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      <strong>Source:</strong> {risk.detected_from}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-8 text-center">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                          <h4 className="font-medium text-green-800 mb-2">All Clear!</h4>
                          <p className="text-sm text-green-700">
                            No significant risk signals detected in this candidate's profile.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Failed to generate snapshot. Please try again.</p>
                <Button onClick={generateSnapshot} className="mt-4">
                  Retry
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalFootprintModal;
