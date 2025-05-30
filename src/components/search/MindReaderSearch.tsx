
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Brain, Zap, Filter, Star, MapPin, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MindReaderSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

  // Mock search results for demonstration
  const mockResults = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior React Developer",
      location: "San Francisco, CA",
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js", "GraphQL"],
      matchScore: 95,
      avatar: null,
      summary: "Passionate frontend developer with expertise in modern React patterns and scalable web applications.",
      availability: "Open to new opportunities"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Full Stack Engineer",
      location: "Austin, TX",
      experience: "7 years",
      skills: ["React", "Python", "AWS", "Docker"],
      matchScore: 87,
      avatar: null,
      summary: "Experienced full-stack developer with strong backend and cloud infrastructure knowledge.",
      availability: "Actively looking"
    },
    {
      id: 3,
      name: "Emily Zhang",
      title: "Frontend Developer",
      location: "Remote",
      experience: "3 years",
      skills: ["React", "Vue.js", "Tailwind CSS", "Jest"],
      matchScore: 82,
      avatar: null,
      summary: "Creative frontend developer with eye for design and strong testing practices.",
      availability: "Open to remote work"
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a search query",
        description: "Describe what kind of candidate you're looking for.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate AI search delay
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} candidates matching your criteria.`,
      });
    }, 2000);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mind-Reader Search</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Describe your ideal candidate in natural language. Our AI will understand your requirements and find the perfect matches.
        </p>
      </div>

      {/* Search Interface */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-purple-600" />
            AI-Powered Candidate Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="e.g., 'I need a senior React developer with 5+ years experience who has worked with TypeScript and knows GraphQL'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 text-base"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-purple-600 hover:bg-purple-700"
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
              "Senior React developer with GraphQL",
              "Full-stack engineer with AWS experience",
              "UI/UX designer with Figma skills",
              "DevOps engineer with Kubernetes"
            ].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setQuery(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Search Results ({searchResults.length})</h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Refine Search
            </Button>
          </div>

          <div className="grid gap-4">
            {searchResults.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={candidate.avatar} />
                        <AvatarFallback>
                          {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold">{candidate.name}</h3>
                          <Badge className={getMatchColor(candidate.matchScore)}>
                            {candidate.matchScore}% match
                          </Badge>
                        </div>
                        
                        <p className="text-purple-600 font-medium">{candidate.title}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {candidate.location}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {candidate.experience}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            {candidate.availability}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mt-2">{candidate.summary}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {candidate.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm">View Profile</Button>
                      <Button size="sm" variant="outline">Message</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              Use the search box above to describe your ideal candidate in natural language.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MindReaderSearch;
