
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Star, Zap, Clock, Calendar, TrendingUp, Users, Target, Brain } from "lucide-react";
import { useEnhancedCandidates } from "@/hooks/useEnhancedCandidates";
import EnhancedCandidateCard from "@/components/candidates/EnhancedCandidateCard";

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { 
    enhancedCandidates, 
    loading, 
    searchEnhancedCandidates,
    getHighEngagementCandidates,
    getActivelySeeking,
    getTopCandidates
  } = useEnhancedCandidates();

  // Filter candidates based on search query
  const filteredCandidates = searchQuery 
    ? enhancedCandidates.filter(candidate =>
        candidate.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.current_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : enhancedCandidates;

  const handleViewProfile = (candidate: any) => {
    console.log('View profile for:', candidate);
  };

  const handleSendMessage = (candidate: any) => {
    console.log('Send message to:', candidate);
  };

  const handleScheduleInterview = (candidate: any) => {
    console.log('Schedule interview with:', candidate);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading enhanced candidates...</p>
        </div>
      </div>
    );
  }

  // Calculate stats from enhanced candidates
  const totalCandidates = enhancedCandidates.length;
  const highEngagementCount = getHighEngagementCandidates(70).length;
  const activelySeeking = getActivelySeeking().length;
  const topCandidates = getTopCandidates(10).length;

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Enhanced Talent Pipeline</h1>
            <p className="text-indigo-100 text-lg">AI-powered candidate insights and engagement tracking</p>
          </div>
          <div className="hidden lg:flex space-x-4">
            <Button size="lg" variant="secondary">
              <Brain className="h-5 w-5 mr-2" />
              AI Insights
            </Button>
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search candidates by name, skills, engagement, or availability..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        <Button variant="outline" size="lg">
          <Filter className="h-4 w-4 mr-2" />
          Enhanced Filters
        </Button>
        <Button variant="outline" size="lg">
          <TrendingUp className="h-4 w-4 mr-2" />
          Sort by AI Score
        </Button>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Enhanced</p>
                <p className="text-2xl font-bold text-blue-900">{totalCandidates}</p>
              </div>
              <div className="p-2 bg-blue-200 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">High Engagement</p>
                <p className="text-2xl font-bold text-green-900">{highEngagementCount}</p>
              </div>
              <div className="p-2 bg-green-200 rounded-lg">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Actively Seeking</p>
                <p className="text-2xl font-bold text-purple-900">{activelySeeking}</p>
              </div>
              <div className="p-2 bg-purple-200 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Top Candidates</p>
                <p className="text-2xl font-bold text-orange-900">{topCandidates}</p>
              </div>
              <div className="p-2 bg-orange-200 rounded-lg">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Candidates Grid */}
      {filteredCandidates.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">No candidates found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'Try adjusting your search terms' : 'No enhanced candidates available yet'}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredCandidates.map((candidate) => (
            <EnhancedCandidateCard
              key={candidate.id}
              candidate={candidate}
              onViewProfile={handleViewProfile}
              onSendMessage={handleSendMessage}
              onScheduleInterview={handleScheduleInterview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Candidates;
