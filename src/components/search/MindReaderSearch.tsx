
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Brain, Mic, ThumbsUp, ThumbsDown, ExternalLink, User, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MindReaderSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [aiExplanation, setAiExplanation] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  // Enhanced mock search results
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
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {candidate.skills.map((skill: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
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
