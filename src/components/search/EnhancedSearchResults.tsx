
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  Users, 
  MapPin, 
  Star,
  MessageSquare,
  Eye,
  Zap
} from 'lucide-react';
import { SearchResult, EnhancedCandidate } from '@/types/enhanced-candidate';

interface EnhancedSearchResultsProps {
  searchResult: SearchResult;
  onViewCandidate: (candidate: EnhancedCandidate) => void;
  onContactCandidate: (candidate: EnhancedCandidate) => void;
}

const EnhancedSearchResults: React.FC<EnhancedSearchResultsProps> = ({
  searchResult,
  onViewCandidate,
  onContactCandidate
}) => {
  return (
    <div className="space-y-6">
      {/* Search Quality & AI Interpretation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            AI Search Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Search Quality</span>
                <span className="text-sm text-gray-600">{searchResult.search_quality_score}%</span>
              </div>
              <Progress value={searchResult.search_quality_score} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Diversity Score</span>
                <span className="text-sm text-gray-600">{searchResult.diversity_metrics.background_diversity_score}%</span>
              </div>
              <Progress value={searchResult.diversity_metrics.background_diversity_score} className="h-2" />
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-1">AI Interpretation</h4>
            <p className="text-sm text-blue-800">{searchResult.ai_interpretation.interpreted_intent}</p>
          </div>

          {searchResult.suggested_refinements.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Suggested Refinements</h4>
              <div className="flex flex-wrap gap-2">
                {searchResult.suggested_refinements.map((suggestion, index) => (
                  <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Candidate Results ({searchResult.total_found})
            </CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Sort by Relevance
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {searchResult.candidates.map((candidate) => (
              <div key={candidate.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{candidate.name}</h3>
                        <Badge className="bg-green-100 text-green-800">
                          {Math.round(candidate.match_score)}% Match
                        </Badge>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{candidate.technical_depth_score}/100</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-2">
                        {candidate.current_title} • {candidate.location} • {candidate.experience_years}+ years
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">AI Summary</p>
                        <p className="text-sm text-gray-600">{candidate.ai_summary}</p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {candidate.skills.slice(0, 6).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.skills.length - 6} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-4 text-xs text-gray-500">
                        <span>🎯 {candidate.community_influence_score}% Influence</span>
                        <span>📈 {candidate.learning_velocity_score}% Learning Rate</span>
                        <span>🔄 {candidate.availability_status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button size="sm" onClick={() => onViewCandidate(candidate)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onContactCandidate(candidate)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>

                {/* Relevance Factors */}
                {candidate.relevance_factors.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center mb-2">
                      <Zap className="w-4 h-4 mr-1 text-blue-500" />
                      <span className="text-sm font-medium">Why this candidate matches:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {candidate.relevance_factors.slice(0, 3).map((factor, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {factor.factor} ({Math.round(factor.weight * 100)}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSearchResults;
