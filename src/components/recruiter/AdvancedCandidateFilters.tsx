
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Filter, X, Search, Star, MapPin, Calendar, Briefcase } from 'lucide-react';

interface FilterState {
  searchQuery: string;
  status: string[];
  skills: string[];
  location: string;
  experienceRange: [number, number];
  scoreRange: [number, number];
  source: string[];
  availability: string;
  dateRange: string;
}

interface AdvancedCandidateFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
}

const AdvancedCandidateFilters: React.FC<AdvancedCandidateFiltersProps> = ({
  onFiltersChange,
  onReset
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    status: [],
    skills: [],
    location: '',
    experienceRange: [0, 20],
    scoreRange: [0, 100],
    source: [],
    availability: '',
    dateRange: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'screening', label: 'Screening' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'offer', label: 'Offer' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const sourceOptions = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'job_board', label: 'Job Boards' },
    { value: 'referral', label: 'Referrals' },
    { value: 'direct', label: 'Direct Application' },
    { value: 'agency', label: 'Agency' }
  ];

  const skillSuggestions = [
    'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 
    'Kubernetes', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Machine Learning'
  ];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleArrayFilter = (filterKey: keyof FilterState, value: string) => {
    const currentArray = filters[filterKey] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters({ [filterKey]: newArray });
  };

  const addSkill = (skill: string) => {
    if (!filters.skills.includes(skill)) {
      updateFilters({ skills: [...filters.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    updateFilters({ skills: filters.skills.filter(s => s !== skill) });
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      searchQuery: '',
      status: [],
      skills: [],
      location: '',
      experienceRange: [0, 20],
      scoreRange: [0, 100],
      source: [],
      availability: '',
      dateRange: ''
    };
    setFilters(clearedFilters);
    onReset();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.status.length) count++;
    if (filters.skills.length) count++;
    if (filters.location) count++;
    if (filters.source.length) count++;
    if (filters.availability) count++;
    if (filters.dateRange) count++;
    return count;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <span>Advanced Filters</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()} active</Badge>
            )}
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Always visible basic filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search candidates..."
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="pl-10"
            />
          </div>

          <Select value={filters.availability} onValueChange={(value) => updateFilters({ availability: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any availability</SelectItem>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="2weeks">2 weeks notice</SelectItem>
              <SelectItem value="1month">1 month notice</SelectItem>
              <SelectItem value="3months">3+ months</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => updateFilters({ location: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-6 pt-4 border-t">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status.value}
                    variant={filters.status.includes(status.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleArrayFilter('status', status.value)}
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Skills</label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {skillSuggestions.map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(skill)}
                      disabled={filters.skills.includes(skill)}
                    >
                      + {skill}
                    </Button>
                  ))}
                </div>
                {filters.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {filters.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                        {skill} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Experience Range */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Experience: {filters.experienceRange[0]} - {filters.experienceRange[1]} years
              </label>
              <Slider
                value={filters.experienceRange}
                onValueChange={(value) => updateFilters({ experienceRange: value as [number, number] })}
                max={20}
                step={1}
                className="w-full"
              />
            </div>

            {/* Score Range */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                AI Score: {filters.scoreRange[0]} - {filters.scoreRange[1]}
              </label>
              <Slider
                value={filters.scoreRange}
                onValueChange={(value) => updateFilters({ scoreRange: value as [number, number] })}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Source Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Source</label>
              <div className="flex flex-wrap gap-2">
                {sourceOptions.map((source) => (
                  <Button
                    key={source.value}
                    variant={filters.source.includes(source.value) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleArrayFilter('source', source.value)}
                  >
                    {source.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Application Date
              </label>
              <Select value={filters.dateRange} onValueChange={(value) => updateFilters({ dateRange: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="quarter">This quarter</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedCandidateFilters;
