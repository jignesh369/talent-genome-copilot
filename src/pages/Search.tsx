
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search as SearchIcon, Sparkles, Target, Filter } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleMindReaderSearch = () => {
    setIsSearching(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsSearching(false);
    }, 3000);
  };

  const recentSearches = [
    "Senior React Developer with 5+ years experience",
    "Product Manager with B2B SaaS background",
    "UX Designer skilled in Figma and user research",
    "DevOps Engineer with AWS and Kubernetes expertise"
  ];

  const suggestedTalent = [
    {
      name: "Alex Thompson",
      title: "Senior Frontend Developer",
      match: 94,
      skills: ["React", "TypeScript", "Next.js"],
      location: "San Francisco, CA",
      availability: "Available"
    },
    {
      name: "Maria Garcia",
      title: "Product Manager",
      match: 91,
      skills: ["Strategy", "Analytics", "B2B SaaS"],
      location: "Remote",
      availability: "Available"
    },
    {
      name: "David Chen",
      title: "Full Stack Developer",
      match: 88,
      skills: ["React", "Node.js", "Python"],
      location: "New York, NY",
      availability: "Available"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI-Powered Search</h1>
        <p className="text-gray-600">Describe what you're looking for and let our AI find the perfect candidates</p>
      </div>

      {/* Mind Reader Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Mind Reader Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your ideal candidate in natural language... 
            
Example: 'I need a senior frontend developer who has worked with React for at least 5 years, has experience with TypeScript, and has worked in a fast-paced startup environment. They should be comfortable with modern tooling and have good communication skills for working with our remote team.'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-h-[120px]"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleMindReaderSearch}
              disabled={!searchQuery || isSearching}
              className="flex-1"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  AI is analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Search with AI
                </>
              )}
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {isSearching && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <h3 className="text-lg font-medium">AI is searching through talent profiles...</h3>
              <p className="text-gray-600">Analyzing resumes, skills, and compatibility</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Suggested Talent */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Suggested Talent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedTalent.map((candidate) => (
              <div key={candidate.name} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{candidate.name}</h4>
                    <p className="text-sm text-gray-600">{candidate.title}</p>
                    <p className="text-sm text-gray-500">{candidate.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">
                      {candidate.match}% match
                    </Badge>
                    <p className="text-xs text-gray-500">{candidate.availability}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1">
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Searches & Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded border"
                >
                  {search}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900">Natural Language</h4>
                <p>Describe requirements as you would to a human recruiter</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Be Specific</h4>
                <p>Include years of experience, specific technologies, and soft skills</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Context Matters</h4>
                <p>Mention company stage, team size, and work environment</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Search;
