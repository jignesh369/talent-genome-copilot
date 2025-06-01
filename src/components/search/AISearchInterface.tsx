
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Mic, 
  Filter, 
  Sparkles, 
  Loader2,
  MapPin,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';
import { useAISearch, SearchParams } from '@/hooks/useSearch';
import { cn } from '@/lib/utils';

interface AISearchInterfaceProps {
  onSearchResults: (results: any) => void;
}

const AISearchInterface: React.FC<AISearchInterfaceProps> = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [filters, setFilters] = useState<SearchParams['filters']>({});
  const [showFilters, setShowFilters] = useState(false);

  const searchMutation = useAISearch();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    const params: SearchParams = {
      query: searchQuery,
      filters,
      limit: 50,
    };

    try {
      const results = await searchMutation.mutateAsync(params);
      onSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const quickSearches = [
    'React developers with 5+ years',
    'Machine learning engineers',
    'Senior frontend developers in San Francisco',
    'DevOps engineers with Kubernetes',
    'Full-stack developers with startup experience'
  ];

  const skillSuggestions = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Kubernetes', 
    'GraphQL', 'PostgreSQL', 'Machine Learning', 'Docker'
  ];

  const addSkillFilter = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: [...(prev.skills || []), skill]
    }));
  };

  const removeSkillFilter = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills?.filter(s => s !== skill) || []
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>AI-Powered Talent Discovery</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Search */}
        <div className="relative">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Describe your ideal candidate... (e.g., 'Senior React developer with GraphQL experience')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-12 h-12 text-lg"
              />
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "absolute right-2 top-1/2 transform -translate-y-1/2",
                  isVoiceActive && "text-red-500"
                )}
                onClick={() => setIsVoiceActive(!isVoiceActive)}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={searchMutation.isPending || !searchQuery.trim()}
              className="h-12 px-6"
            >
              {searchMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
              Search
            </Button>
          </div>
        </div>

        {/* Quick Searches */}
        <div>
          <p className="text-sm text-gray-600 mb-3">Quick searches:</p>
          <div className="flex flex-wrap gap-2">
            {quickSearches.map((query) => (
              <Badge
                key={query}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
                onClick={() => setSearchQuery(query)}
              >
                {query}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filters Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </Button>
          
          {Object.keys(filters).some(key => filters[key as keyof typeof filters]) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters({})}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="border-dashed">
            <CardContent className="pt-6 space-y-4">
              {/* Skills Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Required Skills</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {filters.skills?.map((skill) => (
                    <Badge
                      key={skill}
                      variant="default"
                      className="cursor-pointer"
                      onClick={() => removeSkillFilter(skill)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillSuggestions
                    .filter(skill => !filters.skills?.includes(skill))
                    .map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => addSkillFilter(skill)}
                    >
                      + {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Experience Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Min Experience (years)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.experience_years?.min || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      experience_years: {
                        ...prev.experience_years,
                        min: parseInt(e.target.value) || undefined
                      }
                    }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Max Experience (years)</label>
                  <Input
                    type="number"
                    placeholder="20"
                    value={filters.experience_years?.max || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      experience_years: {
                        ...prev.experience_years,
                        max: parseInt(e.target.value) || undefined
                      }
                    }))}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="City, State or Remote"
                    value={filters.location || ''}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      location: e.target.value
                    }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Availability Status */}
              <div>
                <label className="text-sm font-medium mb-2 block">Availability</label>
                <div className="flex space-x-2">
                  {['active', 'passive', 'unavailable'].map((status) => (
                    <Button
                      key={status}
                      variant={filters.availability_status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        availability_status: status === filters.availability_status ? undefined : status
                      }))}
                      className="capitalize"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default AISearchInterface;
