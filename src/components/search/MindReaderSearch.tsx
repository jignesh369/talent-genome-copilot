import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Brain, Mic, ThumbsUp, ThumbsDown, ExternalLink, User, Lightbulb, Github, Star, GitFork, Calendar, Clock, Loader2, TrendingUp, Users, MessageSquare, Award, Zap, Target, Eye, Twitter, Linkedin, Radar } from "lucide-react";
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

  const OSINTDataCard = ({ candidate }: { candidate: EnhancedCandidate }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
      {/* Technical Depth */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Github className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">Technical Depth</span>
        </div>
        <Progress value={candidate.technical_depth_score * 10} className="h-2" />
        <div className="flex justify-between text-xs text-gray-600">
          <span>Code Quality</span>
          <span>{candidate.technical_depth_score.toFixed(1)}/10</span>
        </div>
      </div>

      {/* Community Influence */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium">Community Impact</span>
        </div>
        <Progress value={candidate.community_influence_score * 10} className="h-2" />
        <div className="flex justify-between text-xs text-gray-600">
          <span>Influence</span>
          <span>{candidate.community_influence_score.toFixed(1)}/10</span>
        </div>
      </div>

      {/* Learning Velocity */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium">Learning Velocity</span>
        </div>
        <Progress value={candidate.learning_velocity_score * 10} className="h-2" />
        <div className="flex justify-between text-xs text-gray-600">
          <span>Growth Rate</span>
          <span>{candidate.learning_velocity_score.toFixed(1)}/10</span>
        </div>
      </div>
    </div>
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

            <OSINTDataCard candidate={candidate} />

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
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Mind-Reader Search</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          AI-powered talent discovery with comprehensive OSINT analysis. Describe your ideal candidate and discover hidden gems.
        </p>
      </div>

      {/* Search Interface */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="e.g., 'Senior React developer with ML experience from a startup background'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 text-base h-12"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleVoiceInput}
              disabled={isListening}
              variant="outline"
              size="lg"
              className="px-3"
            >
              <Mic className={`h-4 w-4 ${isListening ? 'text-red-500 animate-pulse' : ''}`} />
            </Button>
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-purple-600 hover:bg-purple-700 px-6"
              size="lg"
            >
              {isSearching ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Enhanced Quick Suggestions */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Try:</span>
            {[
              "Senior React developer with ML experience",
              "Full-stack engineer from fintech background with leadership skills",
              "Frontend specialist with design skills and startup experience",
              "DevOps engineer with Kubernetes expertise and open source contributions"
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setQuery(suggestion)}
                className="text-xs h-7"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Results Layout */}
      {searchResult && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Candidate Results */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Best Matches ({searchResult.candidates.length})
              </h2>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {Math.round(searchResult.search_quality_score * 10)}% confidence
                </Badge>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Refine
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {searchResult.candidates.map((candidate) => (
                <Card 
                  key={candidate.id} 
                  className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500 cursor-pointer"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.avatar_url} />
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold">{candidate.name}</h3>
                            <span className="text-sm text-gray-500">{candidate.handle}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {candidate.match_score}% match
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-3 leading-relaxed">{candidate.ai_summary}</p>
                          
                          {candidate.bio && (
                            <p className="text-sm text-gray-600 mb-3 italic">"{candidate.bio}"</p>
                          )}
                          
                          {/* Enhanced OSINT Data Row */}
                          <OSINTDataCard candidate={candidate} />
                          
                          <div className="flex flex-wrap gap-1 mb-3 mt-3">
                            {candidate.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Updated {new Date(candidate.osint_last_fetched).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Target className="h-3 w-3" />
                              <span>{candidate.availability_status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button 
                          size="sm" 
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidate(candidate);
                          }}
                        >
                          <User className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFootprintCandidate(candidate);
                          }}
                        >
                          <Radar className="h-4 w-4 mr-1" />
                          View Snapshot
                        </Button>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFeedback(candidate.id, true);
                            }}
                            className="px-2"
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
                            className="px-2"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced AI Explanation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                  AI Search Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Interpretation:</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {searchResult.ai_interpretation.interpreted_intent}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Requirements Extracted:</h4>
                  <div className="space-y-2">
                    {searchResult.ai_interpretation.extracted_requirements.map((req, index) => (
                      <div key={index} className="text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700 capitalize">{req.category}:</span>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(req.importance * 100)}%
                          </Badge>
                        </div>
                        <span className="text-gray-600">{req.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Search Strategy:</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {searchResult.ai_interpretation.search_strategy}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Diversity Metrics:</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Locations:</span>
                      <span>{Object.keys(searchResult.diversity_metrics.location_distribution).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience Levels:</span>
                      <span>{Object.keys(searchResult.diversity_metrics.experience_distribution).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Diversity Score:</span>
                      <span>{searchResult.diversity_metrics.background_diversity_score.toFixed(1)}/10</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Suggested Refinements:</h4>
                  <div className="space-y-1">
                    {searchResult.suggested_refinements.map((refinement, index) => (
                      <Button 
                        key={index}
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-auto p-1 w-full justify-start"
                        onClick={() => toast({ title: "Feature coming soon!", description: refinement })}
                      >
                        • {refinement}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Target className="h-3 w-3 mr-1" />
                  Refine Search
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-2 z-10"
                onClick={() => setSelectedCandidate(null)}
              >
                ✕
              </Button>
              <CandidateDetailsModal candidate={selectedCandidate} />
            </div>
          </div>
        </div>
      )}

      {/* Digital Footprint Modal */}
      <DigitalFootprintModal
        candidate={footprintCandidate}
        isOpen={!!footprintCandidate}
        onClose={() => setFootprintCandidate(null)}
      />

      {/* Empty State */}
      {!searchResult && !isSearching && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to discover hidden talent?</h3>
            <p className="text-gray-600">
              Use natural language to describe your ideal candidate. Our AI will analyze public data across multiple platforms to find the perfect match.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Powered by comprehensive OSINT analysis including GitHub, LinkedIn, Twitter, Stack Overflow, and more.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MindReaderSearch;
