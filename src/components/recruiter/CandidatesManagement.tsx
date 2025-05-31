
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCandidates } from '@/hooks/useCandidates';
import { CandidateSearch } from '@/types/recruiting';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Eye,
  Mail,
  Phone,
  MapPin,
  Star,
  MessageSquare,
  Calendar,
  Users
} from 'lucide-react';

const CandidatesManagement: React.FC = () => {
  const { candidates, loading, searchCandidates, updateCandidate } = useCandidates();
  const [searchParams, setSearchParams] = useState<CandidateSearch>({});

  const handleSearch = (newParams: Partial<CandidateSearch>) => {
    const updatedParams = { ...searchParams, ...newParams };
    setSearchParams(updatedParams);
    searchCandidates(updatedParams);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'interviewing': return 'bg-purple-100 text-purple-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'hired': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading candidates...</div>;
  }

  const statusCounts = {
    total: candidates.length,
    new: candidates.filter(c => c.status === 'new').length,
    screening: candidates.filter(c => c.status === 'screening').length,
    interviewing: candidates.filter(c => c.status === 'interviewing').length,
    offer: candidates.filter(c => c.status === 'offer').length
  };

  return (
    <div className="space-y-6">
      {/* Candidate Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Candidates</p>
                <p className="text-2xl font-bold">{statusCounts.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Applications</p>
                <p className="text-2xl font-bold">{statusCounts.new}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">New</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Screening</p>
                <p className="text-2xl font-bold">{statusCounts.screening}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Screening</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interviewing</p>
                <p className="text-2xl font-bold">{statusCounts.interviewing}</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Interview</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Offers Made</p>
                <p className="text-2xl font-bold">{statusCounts.offer}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Offer</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidates List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Candidate Database ({candidates.length})
            </CardTitle>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              AI Search
            </Button>
          </div>

          {/* Advanced Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Input
              placeholder="Search candidates..."
              value={searchParams.query || ''}
              onChange={(e) => handleSearch({ query: e.target.value })}
            />
            
            <Select 
              value={searchParams.status || 'all'} 
              onValueChange={(value) => handleSearch({ 
                status: value === 'all' ? undefined : value as 'new' | 'screening' | 'interviewing' | 'offer' | 'hired' | 'rejected'
              })}
            >
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={searchParams.sort_by || 'score'} 
              onValueChange={(value) => handleSearch({ sort_by: value as any })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Score</SelectItem>
                <SelectItem value="date">Date Applied</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              Advanced Filters
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {candidate.first_name[0]}{candidate.last_name[0]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {candidate.first_name} {candidate.last_name}
                        </h3>
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className={`font-medium ${getScoreColor(candidate.score)}`}>
                            {candidate.score}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {candidate.email}
                        </div>
                        {candidate.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {candidate.phone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {candidate.location}
                        </div>
                      </div>

                      <div className="text-sm text-gray-700 mb-2">
                        {candidate.current_title} at {candidate.current_company} • {candidate.experience_years} years experience
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.skills.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {candidates.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No candidates found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidatesManagement;
