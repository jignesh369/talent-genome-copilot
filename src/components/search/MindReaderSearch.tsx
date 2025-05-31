import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Brain, Mic, ThumbsUp, ThumbsDown, ExternalLink, User, Lightbulb, Github, Star, GitFork, Calendar, Clock, Loader2, TrendingUp, Users, MessageSquare, Award, Zap, Target, Eye, Twitter, Linkedin, Radar, Sparkles, Filter, SortDesc, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiSearchService } from "@/services/aiSearchService";
import { EnhancedCandidate, SearchResult } from "@/types/enhanced-candidate";
import DigitalFootprintModal from "./DigitalFootprintModal";

const MindReaderSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [footprintCandidate, setFootprintCandidate] = useState<EnhancedCandidate | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please describe who you're looking for",
        description: "Try something like 'senior React developer with startup experience'",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    try {
      const result = await aiSearchService.processNaturalLanguageQuery(query);
      setSearchResult(result);
      setIsSearching(false);
      toast({
        title: "Search Complete",
        description: `Found ${result.candidates.length} candidates with ${Math.round(result.search_quality_score * 10)}% confidence.`,
      });
    } catch (error) {
      console.error('Search error:', error);
      setIsSearching(false);
      toast({
        title: "Search Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };
      recognition.start();
    } else {
      toast({
        title: "Voice input not supported",
        description: "Please use the text input instead.",
        variant: "destructive"
      });
    }
  };

  const handleFeedback = (candidateId: string, isPositive: boolean) => {
    toast({
      title: isPositive ? "Thanks for the feedback!" : "Feedback noted",
      description: isPositive ? "We'll find more candidates like this" : "We'll adjust future recommendations",
    });
  };

  const ScoreIndicator = ({ score, label, color = "blue" }: { score: number; label: string; color?: string }) => (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
      <span className="text-xs text-gray-600">{label}</span>
      <span className="text-xs font-medium">{score.toFixed(1)}</span>
    </div>
  );

  const OSINTMetrics = ({ candidate }: { candidate: EnhancedCandidate }) => (
    <div className="grid grid-cols-3 gap-3 p-3 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-lg border border-blue-100">
      <div className="text-center">
        <div className="text-lg font-bold text-blue-700">{candidate.technical_depth_score.toFixed(1)}</div>
        <div className="text-xs text-gray-600">Technical</div>
        <Progress value={candidate.technical_depth_score * 10} className="h-1 mt-1" />
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-green-700">{candidate.community_influence_score.toFixed(1)}</div>
        <div className="text-xs text-gray-600">Community</div>
        <Progress value={candidate.community_influence_score * 10} className="h-1 mt-1" />
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-purple-700">{candidate.learning_velocity_score.toFixed(1)}</div>
        <div className="text-xs text-gray-600">Learning</div>
        <Progress value={candidate.learning_velocity_score * 10} className="h-1 mt-1" />
      </div>
    </div>
  );

  const CandidateCard = ({ candidate }: { candidate: EnhancedCandidate }) => (
    <Card className="group hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 border-l-4 border-l-purple-500 hover:border-l-purple-600 cursor-pointer transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-2 ring-purple-100 group-hover:ring-purple-200 transition-all">
                <AvatarImage src={candidate.avatar_url} />
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 font-semibold">
                  {candidate.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {candidate.name}
                </h3>
                <span className="text-sm text-gray-500">@{candidate.handle}</span>
                <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-2 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  {candidate.match_score}% match
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-gray-700 font-medium">{candidate.current_title}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{candidate.current_company}</span>
                <Badge variant="outline" className="text-xs">
                  {candidate.availability_status}
                </Badge>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed group-hover:text-gray-800 transition-colors">
                {candidate.ai_summary}
              </p>
              
              <OSINTMetrics candidate={candidate} />
              
              <div className="flex flex-wrap gap-1 mt-3">
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

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Updated {new Date(candidate.osint_last_fetched).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3" />
                    <span>{candidate.experience_years}+ years exp</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <ScoreIndicator score={candidate.technical_depth_score} label="Tech" color="blue" />
                  <ScoreIndicator score={candidate.community_influence_score} label="Community" color="green" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCandidate(candidate);
              }}
            >
              <User className="h-4 w-4 mr-2" />
              View Profile
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-purple-200 hover:border-purple-300 text-purple-700 hover:text-purple-800 shadow-sm hover:shadow-md transition-all"
              onClick={(e) => {
                e.stopPropagation();
                setFootprintCandidate(candidate);
              }}
            >
              <Radar className="h-4 w-4 mr-2" />
              <Sparkles className="h-3 w-3 mr-1" />
              Snapshot
            </Button>
            
            <div className="flex space-x-1">
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeedback(candidate.id, true);
                }}
                className="px-2 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFeedback(candidate.id, false);
                }}
                className="px-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CandidateDetailsModal = ({ candidate }: { candidate: EnhancedCandidate }) => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={candidate.avatar_url} />
            <AvatarFallback className="bg-purple-100 text-purple-700 text-lg">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{candidate.name}</CardTitle>
            <p className="text-gray-600">{candidate.current_title} at {candidate.current_company}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {candidate.match_score}% match
              </Badge>
              <Badge variant="outline">
                {candidate.availability_status}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">AI Summary</h3>
              <p className="text-gray-700">{candidate.ai_summary}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Bio</h3>
              <p className="text-gray-600 italic">"{candidate.bio}"</p>
            </div>

            <OSINTMetrics candidate={candidate} />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Contact Preferences</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Best Method:</strong> {candidate.best_contact_method.platform}</p>
                  <p><strong>Approach Style:</strong> {candidate.best_contact_method.approach_style}</p>
                  <p><strong>Best Time:</strong> {candidate.best_contact_method.best_time}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Technical Assessment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Code Quality</span>
                      <span className="text-sm text-gray-600">{candidate.technical_depth_score.toFixed(1)}/10</span>
                    </div>
                    <Progress value={candidate.technical_depth_score * 10} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Learning Velocity</span>
                      <span className="text-sm text-gray-600">{candidate.learning_velocity_score.toFixed(1)}/10</span>
                    </div>
                    <Progress value={candidate.learning_velocity_score * 10} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Primary Technologies</h4>
                    <div className="space-y-2">
                      {candidate.skills.slice(0, 5).map((skill, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{skill}</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-20 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-blue-500 rounded-full" 
                                style={{ width: `${Math.random() * 40 + 60}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">Expert</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="career" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Career Trajectory Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Progression Pattern</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Type:</span>
                      <Badge variant="outline">{candidate.career_trajectory_analysis.progression_type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Growth Rate:</span>
                      <span className="text-sm font-medium">
                        {(candidate.career_trajectory_analysis.growth_rate * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Stability:</span>
                      <span className="text-sm font-medium">
                        {(candidate.career_trajectory_analysis.stability_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Predicted Next Move</h4>
                  <p className="text-sm text-gray-600">
                    {candidate.career_trajectory_analysis.next_likely_move}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">Community Engagement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Github className="h-5 w-5 text-gray-700" />
                    <span className="font-medium">GitHub</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Repositories:</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stars Earned:</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contributions:</span>
                      <span className="font-medium">567 this year</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="h-5 w-5 text-orange-500" />
                    <span className="font-medium">Stack Overflow</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Reputation:</span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Answers:</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Badges:</span>
                      <span className="font-medium">2 🥇 8 🥈 15 🥉</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Twitter className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Twitter</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Followers:</span>
                      <span className="font-medium">1,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tech Engagement:</span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Influence Score:</span>
                      <span className="font-medium">7.8/10</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div>
              <h3 className="font-semibold mb-4">AI-Generated Insights</h3>
              
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2 text-green-600" />
                    Relevance Factors
                  </h4>
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
                  <h4 className="font-medium mb-2 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-purple-600" />
                    Cultural Fit Assessment
                  </h4>
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
        </Tabs>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleFeedback(candidate.id, true)}
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              Good Match
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleFeedback(candidate.id, false)}
            >
              <ThumbsDown className="h-4 w-4 mr-1" />
              Poor Match
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View Full Profile
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
              <User className="h-4 w-4 mr-1" />
              Contact Candidate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
          <div className="relative p-4 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-2xl shadow-lg">
            <Brain className="h-10 w-10 text-purple-600" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          AI-Powered Talent Discovery
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover exceptional talent with comprehensive OSINT analysis and AI insights. 
          <span className="text-purple-600 font-medium"> Describe your ideal candidate</span> and watch the magic happen.
        </p>
      </div>

      {/* Enhanced Search Interface */}
      <Card className="max-w-5xl mx-auto shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="e.g., 'Senior React developer with ML experience from a startup background who contributes to open source'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 text-base h-14 border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 rounded-xl shadow-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                >
                  ✕
                </Button>
              )}
            </div>
            <Button 
              onClick={handleVoiceInput}
              disabled={isListening}
              variant="outline"
              size="lg"
              className="px-4 h-14 border-2 hover:border-purple-300 hover:bg-purple-50 transition-all"
            >
              <Mic className={`h-5 w-5 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
            </Button>
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-3" />
                  Discover Talent
                </>
              )}
            </Button>
          </div>

          {/* Enhanced Quick Suggestions */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Try these examples:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Senior React developer with ML experience and startup background",
                "Full-stack engineer from fintech with leadership skills",
                "Frontend specialist with design skills and open source contributions",
                "DevOps engineer with Kubernetes expertise and community presence"
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(suggestion)}
                  className="text-xs h-8 justify-start text-left hover:bg-purple-50 hover:border-purple-200 transition-colors"
                >
                  <Target className="h-3 w-3 mr-2 text-purple-500" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Results Layout */}
      {searchResult && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Candidate Results */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Best Matches ({searchResult.candidates.length})
                </h2>
                <p className="text-gray-600 mt-1">Ranked by AI relevance and digital footprint analysis</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-3 py-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {Math.round(searchResult.search_quality_score * 10)}% confidence
                </Badge>
                <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-200">
                  <Filter className="h-4 w-4 mr-2" />
                  Refine
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200">
                  <SortDesc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {searchResult.candidates.map((candidate) => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate}
                />
              ))}
            </div>
          </div>

          {/* Enhanced AI Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                  </div>
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">Search Interpretation:</h4>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {searchResult.ai_interpretation.interpreted_intent}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">Key Requirements:</h4>
                  <div className="space-y-2">
                    {searchResult.ai_interpretation.extracted_requirements.slice(0, 4).map((req, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-xs font-medium text-gray-700 capitalize">
                            {req.category.replace('_', ' ')}
                          </span>
                          <p className="text-xs text-gray-600">{req.value}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(req.importance * 100)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">Diversity Insights:</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">
                        {Object.keys(searchResult.diversity_metrics.location_distribution).length}
                      </div>
                      <div className="text-green-600">Locations</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-purple-800">
                        {searchResult.diversity_metrics.background_diversity_score.toFixed(1)}
                      </div>
                      <div className="text-purple-600">Diversity</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-800">Suggested Refinements:</h4>
                  <div className="space-y-2">
                    {searchResult.suggested_refinements.slice(0, 3).map((refinement, index) => (
                      <Button 
                        key={index}
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-auto p-2 w-full justify-start hover:bg-purple-50 transition-colors"
                        onClick={() => setQuery(refinement)}
                      >
                        <RefreshCw className="h-3 w-3 mr-2" />
                        {refinement}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full hover:bg-purple-50 hover:border-purple-200">
                  <Target className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {!searchResult && !isSearching && (
        <Card className="max-w-3xl mx-auto shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
          <CardContent className="text-center py-16">
            <div className="relative mb-6">
              <Brain className="h-16 w-16 text-purple-400 mx-auto" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to discover exceptional talent?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-lg mx-auto">
              Use natural language to describe your ideal candidate. Our AI analyzes public data across 
              multiple platforms to find perfect matches with comprehensive insights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Github className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-medium text-blue-800">GitHub Analysis</div>
                <div className="text-blue-600">Code quality & contributions</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-medium text-green-800">Community Presence</div>
                <div className="text-green-600">Stack Overflow, Twitter, LinkedIn</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-medium text-purple-800">AI Insights</div>
                <div className="text-purple-600">Career trajectory & fit analysis</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keep existing modals */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-2 z-10 bg-white shadow-md hover:bg-gray-100"
                onClick={() => setSelectedCandidate(null)}
              >
                ✕
              </Button>
              {/* CandidateDetailsModal component would go here */}
            </div>
          </div>
        </div>
      )}

      <DigitalFootprintModal
        candidate={footprintCandidate}
        isOpen={!!footprintCandidate}
        onClose={() => setFootprintCandidate(null)}
      />
    </div>
  );
};

export default MindReaderSearch;
