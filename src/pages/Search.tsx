
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Search as SearchIcon, Sparkles, Target, Filter, Brain, Zap, Users, TrendingUp, Star, Clock, MapPin } from "lucide-react";

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
    "DevOps Engineer with AWS and Kubernetes expertise",
    "Data Scientist with ML and Python skills",
    "Full-stack developer familiar with Node.js"
  ];

  const suggestedTalent = [
    {
      name: "Alex Thompson",
      title: "Senior Frontend Developer",
      match: 94,
      skills: ["React", "TypeScript", "Next.js"],
      location: "San Francisco, CA",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      experience: "6 years",
      salary: "$130k - $150k"
    },
    {
      name: "Maria Garcia",
      title: "Product Manager",
      match: 91,
      skills: ["Strategy", "Analytics", "B2B SaaS"],
      location: "Remote",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1494790108755-2616b95a05bc?w=150&h=150&fit=crop&crop=face",
      experience: "5 years",
      salary: "$140k - $160k"
    },
    {
      name: "David Chen",
      title: "Full Stack Developer",
      match: 88,
      skills: ["React", "Node.js", "Python"],
      location: "New York, NY",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      experience: "4 years",
      salary: "$120k - $140k"
    },
    {
      name: "Sarah Kim",
      title: "UX Designer",
      match: 86,
      skills: ["Figma", "User Research", "Prototyping"],
      location: "Austin, TX",
      availability: "Available",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      experience: "3 years",
      salary: "$95k - $115k"
    }
  ];

  const searchStats = [
    { label: "Active Profiles", value: "15.2K", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "AI Matches", value: "89%", icon: Brain, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Response Rate", value: "42%", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { label: "Avg Time", value: "3.2s", icon: Zap, color: "text-orange-600", bg: "bg-orange-50" }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Hero Image */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">AI-Powered Talent Discovery</h1>
              <p className="text-purple-100 text-lg max-w-2xl">
                Describe your ideal candidate in natural language and let our advanced AI find perfect matches from millions of profiles
              </p>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=200&fit=crop" 
                alt="AI Search" 
                className="rounded-lg shadow-xl w-64 h-40 object-cover border-4 border-white/20"
              />
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Search Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {searchStats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Mind Reader Search */}
      <Card className="overflow-hidden border-0 shadow-xl">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Mind Reader Search
                </span>
                <p className="text-sm text-gray-600 font-normal mt-1">
                  Powered by GPT-4 and advanced resume analysis
                </p>
              </div>
            </CardTitle>
          </CardHeader>
        </div>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your ideal candidate in natural language...

Example: 'I need a senior frontend developer who has worked with React for at least 5 years, has experience with TypeScript, and has worked in a fast-paced startup environment. They should be comfortable with modern tooling and have good communication skills for working with our remote team. Bonus points for experience with Next.js and GraphQL.'"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-[140px] text-base border-2 focus:border-purple-500 transition-colors"
            />
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                💡 Try: "React developer with startup experience"
              </Badge>
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                🎯 Try: "Product manager for B2B SaaS"
              </Badge>
              <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                🚀 Try: "Full-stack engineer, remote-friendly"
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleMindReaderSearch}
              disabled={!searchQuery || isSearching}
              className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  AI is analyzing profiles...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Search with AI Magic
                </>
              )}
            </Button>
            <Button variant="outline" className="h-12 border-2 hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Processing Animation */}
      {isSearching && (
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">AI is searching through talent profiles...</h3>
                <p className="text-gray-600">Analyzing resumes, skills, experience, and cultural fit</p>
              </div>
              <div className="flex justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Processing resumes
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  Matching skills
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  Ranking candidates
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Suggested Talent */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              <span className="text-green-800">Top AI Matches</span>
              <Badge className="bg-green-100 text-green-800 ml-2">Live Results</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {suggestedTalent.map((candidate) => (
              <Card key={candidate.name} className="border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{candidate.name}</h4>
                          <p className="text-gray-600">{candidate.title}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {candidate.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {candidate.experience}
                            </span>
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
                            <Star className="w-3 h-3 mr-1" />
                            {candidate.match}% match
                          </Badge>
                          <p className="text-xs text-gray-500">{candidate.availability}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Salary Range:</span>
                          <span className="font-medium">{candidate.salary}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 hover:bg-gray-50">
                          View Profile
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Recent Searches */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="w-full text-left p-3 text-sm text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg border transition-all duration-200 hover:border-blue-200"
                >
                  <div className="flex items-start space-x-2">
                    <SearchIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{search}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Search Tips */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-600" />
                <span className="text-amber-800">Pro Search Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Natural Language</h4>
                    <p className="text-gray-600">Describe requirements as you would to a human recruiter</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Be Specific</h4>
                    <p className="text-gray-600">Include years of experience, specific technologies, and soft skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Context Matters</h4>
                    <p className="text-gray-600">Mention company stage, team size, and work environment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Cultural Fit</h4>
                    <p className="text-gray-600">Describe personality traits and work style preferences</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Search;
