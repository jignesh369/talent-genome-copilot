
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult } from '@/types/assessment';
import { 
  TrendingUp, 
  Clock, 
  User, 
  Eye, 
  Award,
  Brain,
  MessageSquare,
  Heart,
  Zap
} from 'lucide-react';

interface AssessmentResultsProps {
  result: AssessmentResult;
  candidateName: string;
  onViewDetails: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  result,
  candidateName,
  onViewDetails
}) => {
  const getRecommendationConfig = (recommendation: string) => {
    switch (recommendation) {
      case 'strong_fit':
        return { 
          label: 'Strong Fit', 
          color: 'bg-green-500 text-white',
          icon: Award 
        };
      case 'good_fit':
        return { 
          label: 'Good Fit', 
          color: 'bg-blue-500 text-white',
          icon: TrendingUp 
        };
      case 'moderate_fit':
        return { 
          label: 'Moderate Fit', 
          color: 'bg-yellow-500 text-white',
          icon: User 
        };
      case 'poor_fit':
        return { 
          label: 'Poor Fit', 
          color: 'bg-red-500 text-white',
          icon: TrendingUp 
        };
      default:
        return { 
          label: 'Unknown', 
          color: 'bg-gray-500 text-white',
          icon: User 
        };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical': return <Brain className="w-4 h-4" />;
      case 'communication': return <MessageSquare className="w-4 h-4" />;
      case 'culture': return <Heart className="w-4 h-4" />;
      case 'speed': return <Zap className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const recommendationConfig = getRecommendationConfig(result.recommendation);
  const RecommendationIcon = recommendationConfig.icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {candidateName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-lg">{candidateName}</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{result.totalTime} min</span>
                <span>•</span>
                <span>{new Date(result.completedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <Badge className={`${recommendationConfig.color} px-3 py-1`}>
            <RecommendationIcon className="w-4 h-4 mr-1" />
            {recommendationConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {result.score.overall}
            <span className="text-lg text-gray-500">/100</span>
          </div>
          <p className="text-sm text-gray-600">Overall Assessment Score</p>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-sm">Score Breakdown</h4>
          {result.score.breakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(item.category)}
                  <span className="font-medium">{item.category}</span>
                </div>
                <span className="font-semibold">
                  {item.score}/{item.maxScore}
                </span>
              </div>
              <Progress value={(item.score / item.maxScore) * 100} className="h-2" />
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <Brain className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-blue-900">{result.score.technical}</p>
            <p className="text-xs text-blue-600">Technical</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <MessageSquare className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-green-900">{result.score.communication}</p>
            <p className="text-xs text-green-600">Communication</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-3 text-center">
            <Heart className="w-5 h-5 text-pink-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-pink-900">{result.score.culture}</p>
            <p className="text-xs text-pink-600">Culture Fit</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 text-center">
            <Zap className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-orange-900">{result.score.speed}</p>
            <p className="text-xs text-orange-600">Speed</p>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          onClick={onViewDetails}
          variant="outline"
          className="w-full"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Detailed Results
        </Button>
      </CardContent>
    </Card>
  );
};

export default AssessmentResults;
