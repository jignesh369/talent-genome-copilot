import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, Brain, Mic, ExternalLink, User, Lightbulb, Github, Star, Loader2, Users, MessageSquare, Award, Target, X, Filter, SortDesc, Sparkles, Twitter, Zap, ThumbsUp, ThumbsDown } from "lucide-react";
import { EnhancedCandidate } from "@/types/enhanced-candidate";
import DigitalFootprintModal from "./DigitalFootprintModal";
import CandidateCard from "./CandidateCard";
import SearchSidebar from "./SearchSidebar";
import OSINTMetrics from "./OSINTMetrics";
import SourceBadge from "./SourceBadge";
import SourceAttribution from "./SourceAttribution";
import DataFreshnessIndicator from "./DataFreshnessIndicator";
import { useSearch } from "@/hooks/useSearch";

const MindReaderSearch = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<EnhancedCandidate | null>(null);
  const [footprintCandidate, setFootprintCandidate] = useState<EnhancedCandidate | null>(null);
  
  const {
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    handleSearch,
    handleVoiceInput,
    handleFeedback
  } = useSearch();

  const CandidateDetailsModal = ({ candidate }: { candidate: EnhancedCandidate }) => {
    const getAISources = () => [
      { platform: 'ai_analysis', confidence: 0.95, lastUpdated: new Date().toISOString(), verified: true }
    ];

    const getProfileSources = () => {
      const sources = [];
      if (candidate.osint_profile.linkedin) {
        sources.push({
          platform: 'linkedin',
          confidence: 0.9,
          lastUpdated: candidate.osint_last_fetched,
          verified: true,
          url: candidate.osint_profile.linkedin.profile_url
        });
      }
      if (candidate.osint_profile.github) {
        sources.push({
          platform: 'github',
          confidence: 0.95,
          lastUpdated: candidate.osint_last_fetched,
          verified: true
        });
      }
      return sources;
    };

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in-0 duration-300">
        <div className="max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 zoom-in-95 duration-300">
          <Card className="border-0 shadow-none">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20 ring-4 ring-purple-200 shadow-lg">
                    <AvatarImage src={candidate.avatar_url} />
                    <AvatarFallback className="bg-purple-100 text-purple-700 text-xl font-bold">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900">{candidate.name}</CardTitle>
                    <p className="text-lg text-gray-600 mt-1">{candidate.current_title} at {candidate.current_company}</p>
                    <div className="flex items-center space-x-3 mt-3">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {candidate.match_score}% match
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        {candidate.availability_status}
                      </Badge>
                      <DataFreshnessIndicator 
                        lastUpdated={candidate.osint_last_fetched}
                        platform="profile"
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedCandidate(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                  <TabsTrigger value="technical" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Technical</TabsTrigger>
                  <TabsTrigger value="career" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Career</TabsTrigger>
                  <TabsTrigger value="community" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Community</TabsTrigger>
                  <TabsTrigger value="insights" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">AI Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold flex items-center">
                            <Brain className="h-5 w-5 mr-2 text-purple-600" />
                            AI Summary
                          </h3>
                          <SourceBadge source="ai_analysis" confidence={0.95} />
                        </div>
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                          <p className="text-gray-800 leading-relaxed">{candidate.ai_summary}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold">Bio</h3>
                          <div className="flex space-x-1">
                            {getProfileSources().slice(0, 2).map((source, index) => (
                              <SourceBadge key={index} source={source.platform} confidence={source.confidence} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 italic leading-relaxed p-4 bg-gray-50 rounded-xl">"{candidate.bio}"</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <OSINTMetrics candidate={candidate} />
                      
                      <div>
                        <h3 className="text-xl font-bold mb-4">Contact Preferences</h3>
                        <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-700">Best Method:</span>
                            <Badge variant="outline">{candidate.best_contact_method.platform}</Badge>
                            <SourceBadge source="ai_analysis" size="sm" />
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

                      <SourceAttribution 
                        sources={getProfileSources()} 
                        title="Profile Data Sources"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Key Skills</h3>
                      <div className="flex space-x-1">
                        {getProfileSources().slice(0, 3).map((source, index) => (
                          <SourceBadge key={index} source={source.platform} size="sm" />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {candidate.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="px-3 py-2 hover:bg-purple-50 hover:border-purple-200 transition-colors cursor-pointer"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">AI-Generated Insights</h3>
                      <SourceBadge source="ai_analysis" confidence={0.92} />
                    </div>
                    
                    <div className="space-y-4">
                      <Card className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium flex items-center">
                            <Target className="h-4 w-4 mr-2 text-green-600" />
                            Relevance Factors
                          </h4>
                          <SourceBadge source="ai_analysis" size="sm" />
                        </div>
                        <div className="space-y-2">
                          {candidate.relevance_factors.map((factor, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{factor.factor}</span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-gray-500">{(factor.weight * 100).toFixed(0)}% weight</span>
                                    <SourceBadge source={factor.source} size="sm" />
                                  </div>
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
                          <SourceBadge source="ai_analysis" size="sm" />
                        </div>
                        <div className="space-y-3">
                          {candidate.cultural_fit_indicators.map((indicator, index) => (
                            <div key={index}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium capitalize">
                                  {indicator.aspect.replace('_', ' ')}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-600">
                                    {indicator.score.toFixed(1)}/10
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {Math.round(indicator.confidence * 100)}% confidence
                                  </span>
                                </div>
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

                {/* ... keep existing code for other tabs ... */}
              </Tabs>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleFeedback(candidate.id, true)}
                    className="hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Good Match
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleFeedback(candidate.id, false)}
                    className="hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Poor Match
                  </Button>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 transition-colors">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Full Profile
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all" size="sm">
                    <User className="h-4 w-4 mr-2" />
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

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-6">
      {/* Enhanced Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-8">
          <div className="relative p-6 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <Brain className="h-12 w-12 text-purple-600" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
          AI-Powered Talent Discovery
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover exceptional talent with comprehensive OSINT analysis and AI insights. 
          <span className="text-purple-600 font-semibold"> Describe your ideal candidate</span> and watch the magic happen.
        </p>
      </div>

      {/* Enhanced Search Interface */}
      <Card className="max-w-6xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-gray-50/50 to-purple-50/30 backdrop-blur-sm">
        <CardContent className="p-10">
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
              <Input
                placeholder="e.g., 'Senior React developer with ML experience from a startup background who contributes to open source'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-14 text-lg h-16 border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button 
              onClick={handleVoiceInput}
              disabled={isListening}
              variant="outline"
              size="lg"
              className="px-6 h-16 border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md"
            >
              <Mic className={`h-6 w-6 ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-600'}`} />
            </Button>
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-10 h-16 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
              size="lg"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6 mr-3" />
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Enhanced Candidate Results */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Best Matches ({searchResult.candidates.length})
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                  <p className="text-gray-600 text-lg">Ranked by AI relevance and digital footprint analysis</p>
                  <SourceBadge source="ai_analysis" confidence={searchResult.search_quality_score} />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  {Math.round(searchResult.search_quality_score * 10)}% confidence
                </Badge>
                <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-200 transition-colors">
                  <Filter className="h-4 w-4 mr-2" />
                  Refine
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 transition-colors">
                  <SortDesc className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              {searchResult.candidates.map((candidate) => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate}
                  onViewProfile={setSelectedCandidate}
                  onViewSnapshot={setFootprintCandidate}
                  onFeedback={handleFeedback}
                />
              ))}
            </div>
          </div>

          {/* Enhanced AI Sidebar */}
          <div className="lg:col-span-1">
            <SearchSidebar 
              searchResult={searchResult} 
              onRefinementClick={setQuery}
            />
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

      {/* Enhanced Modals */}
      {selectedCandidate && (
        <CandidateDetailsModal candidate={selectedCandidate} />
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
