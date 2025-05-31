
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Mic, 
  Filter, 
  Sparkles, 
  History, 
  Bookmark,
  Brain,
  Target
} from 'lucide-react';
import { useSearchManagement } from '@/hooks/useSearchManagement';

const UnifiedSearchInterface = () => {
  const {
    query,
    setQuery,
    isSearching,
    searchResult,
    isListening,
    activeTab,
    setActiveTab,
    handleSearch,
    handleVoiceInput
  } = useSearchManagement();

  const [searchMode, setSearchMode] = useState<'basic' | 'advanced' | 'ai'>('basic');

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              AI-Powered Talent Discovery
            </CardTitle>
            <div className="flex space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Target className="w-3 h-3 mr-1" />
                Smart Search Active
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search Mode Selector */}
          <Tabs value={searchMode} onValueChange={(value) => setSearchMode(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Search</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Filters</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Describe your ideal candidate... (e.g., 'Senior React developer with startup experience')"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  variant={isListening ? "destructive" : "outline"} 
                  size="icon"
                  onClick={handleVoiceInput}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {isSearching ? 'Searching...' : 'AI Search'}
                </Button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-3 h-3 mr-1" />
                  Senior Level
                </Button>
                <Button variant="outline" size="sm">
                  Remote OK
                </Button>
                <Button variant="outline" size="sm">
                  Available Now
                </Button>
                <Button variant="outline" size="sm">
                  Tech Stack Match
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Skills (React, Node.js...)" />
                <Input placeholder="Location" />
                <Input placeholder="Experience Level" />
                <Input placeholder="Company Size" />
                <Input placeholder="Salary Range" />
                <Input placeholder="Availability" />
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  <span className="font-medium">AI Search Assistant</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Describe your hiring needs in natural language. Our AI will understand context, 
                  infer requirements, and find the best matches.
                </p>
                <Input
                  placeholder="Tell me what kind of person you're looking for..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Search Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <History className="w-4 h-4 mr-2" />
            Search History
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved Searches
          </Button>
        </div>

        {searchResult && (
          <div className="text-sm text-gray-600">
            Found {searchResult.total_found} candidates • Quality Score: {searchResult.search_quality_score}%
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedSearchInterface;
