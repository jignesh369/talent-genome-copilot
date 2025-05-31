import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Search, Brain, Mic, ThumbsUp, ThumbsDown, ExternalLink, User, Lightbulb, Github, Star, GitFork, Calendar, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MindReaderSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [aiExplanation, setAiExplanation] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  // Enhanced mock search results with OSINT data
  const mockResults = [
    {
      id: 1,
      name: "Sarah Chen",
      handle: "@sarahbuilds",
      aiSummary: "Built ML infrastructure at Series A startup, scaled to 10M+ users",
      skills: ["React", "TypeScript", "Machine Learning", "AWS"],
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      matchScore: 95,
      avatar: null,
      osint: {
        github: {
          isLoading: false,
          repos: [
            { name: "ml-pipeline", stars: 234, language: "Python" },
            { name: "react-components", stars: 89, language: "TypeScript" },
            { name: "data-viz", stars: 156, language: "JavaScript" }
          ],
          totalStars: 479,
          languages: ["Python", "TypeScript", "JavaScript"],
          lastActive: "2 days ago"
        },
        stackoverflow: {
          isLoading: false,
          score: 2847,
          badges: { gold: 2, silver: 8, bronze: 15 },
          topTags: ["python", "machine-learning", "react"],
          lastActive: "1 week ago"
        },
        techRadar: ["TypeScript 🔥", "Python 🧠", "AWS ⚡", "ML 🚀"],
        bio: "Full-stack engineer passionate about ML infrastructure",
        lastUpdated: "2 hours ago"
      }
    },
    {
      id: 2,
      name: "Michael Rodriguez", 
      handle: "@mikecodes",
      aiSummary: "Full-stack engineer with strong DevOps background, ex-Google",
      skills: ["Python", "Kubernetes", "React", "GCP"],
      github: "https://github.com/mikecodes",
      linkedin: "https://linkedin.com/in/michaelr",
      matchScore: 87,
      avatar: null,
      osint: {
        github: {
          isLoading: false,
          repos: [
            { name: "k8s-deploy", stars: 567, language: "Go" },
            { name: "microservices", stars: 234, language: "Python" }
          ],
          totalStars: 801,
          languages: ["Go", "Python", "Shell"],
          lastActive: "1 day ago"
        },
        stackoverflow: {
          isLoading: true,
          score: 0,
          badges: { gold: 0, silver: 0, bronze: 0 },
          topTags: [],
          lastActive: ""
        },
        techRadar: ["Kubernetes 🎯", "Go 💪", "DevOps 🔧"],
        bio: "DevOps engineer scaling distributed systems",
        lastUpdated: "1 hour ago"
      }
    },
    {
      id: 3,
      name: "Emily Zhang",
      handle: "@emilyux",
      aiSummary: "Frontend specialist with design background, loves clean interfaces",
      skills: ["React", "Vue.js", "Figma", "TypeScript"],
      github: "https://github.com/emilyzhang",
      linkedin: null,
      matchScore: 82,
      avatar: null,
      osint: {
        github: {
          isLoading: false,
          repos: [
            { name: "design-system", stars: 123, language: "TypeScript" },
            { name: "animation-lib", stars: 67, language: "CSS" }
          ],
          totalStars: 190,
          languages: ["TypeScript", "CSS", "JavaScript"],
          lastActive: "3 hours ago"
        },
        stackoverflow: {
          isLoading: false,
          score: 1234,
          badges: { gold: 1, silver: 4, bronze: 8 },
          topTags: ["css", "react", "design"],
          lastActive: "3 days ago"
        },
        techRadar: ["CSS 🎨", "React ⚛️", "Design 💫"],
        bio: "UI/UX engineer crafting delightful experiences",
        lastUpdated: "30 minutes ago"
      }
    }
  ];

  const mockExplanation = {
    interpretation: "Looking for a senior React developer with machine learning experience and startup background",
    filtersApplied: [
      { filter: "Skills", value: "React, TypeScript, Machine Learning" },
      { filter: "Experience Level", value: "Senior (5+ years)" },
      { filter: "Company Stage", value: "Startup/Scale-up" },
      { filter: "Tech Stack", value: "Modern JavaScript, Cloud platforms" }
    ],
    searchStrategy: "Prioritized candidates with React + ML combination, weighted startup experience heavily"
  };

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
    
    // Simulate AI processing
    setTimeout(() => {
      setSearchResults(mockResults);
      setAiExplanation(mockExplanation);
      setIsSearching(false);
      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} candidates matching your criteria.`,
      });
    }, 2000);
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

  const handleFeedback = (candidateId: number, isPositive: boolean) => {
    toast({
      title: isPositive ? "Thanks for the feedback!" : "Feedback noted",
      description: isPositive ? "We'll find more candidates like this" : "We'll adjust future recommendations",
    });
  };

  const GitHubHoverCard = ({ github, osint }: { github: string, osint: any }) => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-auto">
          <Github className="h-4 w-4 text-gray-600 hover:text-gray-900" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">GitHub Activity</h4>
            <Badge variant="outline" className="text-xs">
              <Star className="h-3 w-3 mr-1" />
              {osint.github.totalStars}
            </Badge>
          </div>
          
          {osint.github.isLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-gray-600">Loading GitHub data...</span>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <p className="text-xs text-gray-600">Top Repositories:</p>
                {osint.github.repos.slice(0, 3).map((repo: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="font-medium">{repo.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs px-1">
                        {repo.language}
                      </Badge>
                      <span className="text-gray-500 flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        {repo.stars}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <p className="text-xs text-gray-600 mb-1">Main Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {osint.github.languages.map((lang: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Last active: {osint.github.lastActive}
              </div>
            </>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  const StackOverflowBadge = ({ osint }: { osint: any }) => (
    <div className="flex items-center space-x-1">
      {osint.stackoverflow.isLoading ? (
        <div className="flex items-center space-x-1">
          <Loader2 className="h-3 w-3 animate-spin text-orange-500" />
          <span className="text-xs text-gray-500">SO Loading...</span>
        </div>
      ) : (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SO</span>
                </div>
                <span className="text-xs font-medium">{osint.stackoverflow.score}</span>
              </div>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-64">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Stack Overflow Profile</h4>
              
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>{osint.stackoverflow.badges.gold}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>{osint.stackoverflow.badges.silver}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span>{osint.stackoverflow.badges.bronze}</span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-600 mb-1">Top Tags:</p>
                <div className="flex flex-wrap gap-1">
                  {osint.stackoverflow.topTags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Last active: {osint.stackoverflow.lastActive}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mind-Reader Search</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Who are you looking for today? Describe your ideal candidate in natural language.
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
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Try:</span>
            {[
              "Senior React developer with ML experience",
              "Full-stack engineer from fintech background",
              "Frontend specialist with design skills",
              "DevOps engineer with Kubernetes expertise"
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

      {/* Results Layout */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Candidate Results */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Best Matches ({searchResults.length})</h2>
            </div>

            <div className="space-y-4">
              {searchResults.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback className="bg-purple-100 text-purple-700">
                            {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold">{candidate.name}</h3>
                            <span className="text-sm text-gray-500">{candidate.handle}</span>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {candidate.matchScore}% match
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-3 leading-relaxed">{candidate.aiSummary}</p>
                          
                          {/* Bio */}
                          {candidate.osint.bio && (
                            <p className="text-sm text-gray-600 mb-3 italic">"{candidate.osint.bio}"</p>
                          )}
                          
                          {/* Tech Radar Strip */}
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {candidate.osint.techRadar.map((tech: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-purple-200">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {candidate.skills.map((skill: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          {/* OSINT Data Row */}
                          <div className="flex items-center space-x-4 mb-3 p-2 bg-gray-50 rounded-lg">
                            {/* GitHub */}
                            {candidate.github && (
                              <GitHubHoverCard github={candidate.github} osint={candidate.osint} />
                            )}
                            
                            {/* Stack Overflow */}
                            <StackOverflowBadge osint={candidate.osint} />
                            
                            {/* Last Updated */}
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              <span>Updated {candidate.osint.lastUpdated}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            {candidate.github && (
                              <a href={candidate.github} target="_blank" rel="noopener noreferrer" 
                                 className="text-gray-600 hover:text-gray-900">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                            {candidate.linkedin && (
                              <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer"
                                 className="text-blue-600 hover:text-blue-800">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <User className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleFeedback(candidate.id, true)}
                            className="px-2"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleFeedback(candidate.id, false)}
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

          {/* AI Explanation Sidebar */}
          <div className="lg:col-span-1">
            {aiExplanation && (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-sm">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                    How I Searched
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">My Understanding:</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {aiExplanation.interpretation}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Filters Applied:</h4>
                    <div className="space-y-2">
                      {aiExplanation.filtersApplied.map((filter: any, index: number) => (
                        <div key={index} className="text-xs">
                          <span className="font-medium text-gray-700">{filter.filter}:</span>
                          <span className="text-gray-600 ml-1">{filter.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Search Strategy:</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {aiExplanation.searchStrategy}
                    </p>
                  </div>

                  <Button variant="outline" size="sm" className="w-full text-xs">
                    Refine Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {searchResults.length === 0 && !isSearching && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-12">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to find your next hire?</h3>
            <p className="text-gray-600">
              Describe your ideal candidate and let our AI do the heavy lifting.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MindReaderSearch;
